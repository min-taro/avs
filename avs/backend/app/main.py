from fastapi import FastAPI, HTTPException, Depends, Query, Request
from pydantic import BaseModel
from pywebpush import webpush, WebPushException
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List, Optional
from datetime import datetime, date
import models
import schemas
import crud
from database import engine, get_db
import json
#from cryptography.hazmat.primitives.asymmetric import ec
#from cryptography.hazmat.primitives import serialization

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="このメールアドレスはすでに登録済みです")
    crud.create_user(db, user)
    return {"message": "会員登録が完了しました"}

@app.post("/login", response_model=schemas.UserResponse)
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    authenticated_user = crud.authenticate_user(db, user.email, user.password)
    if not authenticated_user:
        raise HTTPException(status_code=400, detail="メールアドレスまたはパスワードが間違っています")
    return schemas.UserResponse(username=authenticated_user.username, role=authenticated_user.role)

@app.post("/settings", response_model=schemas.SettingResponse)
def upsert_setting(setting: schemas.SettingCreate, db: Session = Depends(get_db)):
    return crud.upsert_setting(db, setting)


@app.post("/volunteer_infos", response_model=schemas.VolunteerInfo)
def create_volunteer_info(volunteer_info: schemas.VolunteerInfoCreate, db: Session = Depends(get_db)):
    return crud.create_volunteer_info(db, volunteer_info)

@app.get("/volunteer_infos", response_model=List[schemas.VolunteerInfo])
def get_volunteer_infos(db: Session = Depends(get_db)):
    volunteer_infos = crud.get_volunteer_infos(db)
    for info in volunteer_infos:
        if isinstance(info.date, (date, datetime)):
            info.date = info.date.isoformat()
        if isinstance(info.updateDate, (date, datetime)):
            info.updateDate = info.updateDate.isoformat()
    return volunteer_infos

@app.get("/news_infos", response_model=List[schemas.NewsInfo])
def get_news_infos(db: Session = Depends(get_db)):
    return crud.get_news_infos(db)

@app.post("/news_infos", response_model=schemas.NewsInfo)
def create_news_info(news_info: schemas.NewsInfoCreate, db: Session = Depends(get_db)):
    return crud.create_news_info(db, news_info)

@app.post("/news_infos_by_ids", response_model=List[schemas.NewsInfo])
def get_news_infos_by_ids(ids: schemas.IdList, db: Session = Depends(get_db)):
    return crud.get_news_infos_by_ids(db, ids.ids)

@app.post("/volunteer_infos_by_uids", response_model=List[schemas.VolunteerInfo])
def get_volunteer_infos_by_uids(uids: schemas.UidList, db: Session = Depends(get_db)):
    return crud.get_volunteer_infos_by_uids(db, uids.uids)

@app.get("/search")
def search(keyword: str, db: Session = Depends(get_db)):
    volunteer_results = crud.search_volunteers(db, keyword)
    news_results = crud.search_news(db, keyword)
    return {
        "volunteers": volunteer_results,
        "news": news_results
    }

@app.get("/volunteer_info/{uid}", response_model=schemas.VolunteerInfo)
def get_volunteer_info(uid: str, db: Session = Depends(get_db)):
    volunteer_info = crud.get_volunteer_info_by_uid(db, uid)
    if not volunteer_info:
        raise HTTPException(status_code=404, detail="Volunteer not found")
    return volunteer_info

@app.get("/health")
def read_health():
    return {"status": "ok"}

#####WebPush#####

subscriptions = []

class Subscription(BaseModel):
    endpoint: str
    keys: dict

VAPID_PRIVATE_KEY = 'hvFoeZQFBg_S2JkA1nWLwrwqoOAyeiWpy-sAeNXXEyU'
VAPID_PUBLIC_KEY = 'BPDWnW_iuKPXyY1l2sZLfe0imk-JFzqO9OyWelFNKg9ALYkAqgxj8fFgShAjrN_HdommYb-5ERmzTQdRr7c31pI'
VAPID_CLAIMS = {
    "sub": "mailto:you@example.com"
}

@app.post("/subscribe")
async def subscribe(subscription: Subscription):
    subscriptions.append(subscription)
    with open('subscriptions.json', 'w') as f:
        json.dump([sub.dict() for sub in subscriptions], f)
    return {"message": "Subscription added"}

@app.on_event("startup")
async def load_subscriptions():
    global subscriptions
    try:
        with open('subscriptions.json', 'r') as f:
            subscriptions = [Subscription(**sub) for sub in json.load(f)]
    except FileNotFoundError:
        subscriptions = []

@app.get("/latest_volunteer")
async def latest_volunteer(db: Session = Depends(get_db)):
    latest_volunteer = db.query(models.VolunteerInfo).order_by(desc(models.VolunteerInfo.id)).first()
    if latest_volunteer:
        return {"title": latest_volunteer.title,"uid": latest_volunteer.uid}
    return {"title": "No volunteer information available"}

@app.get("/latest_news")
async def latest_news(db: Session = Depends(get_db)):
    latest_news = db.query(models.NewsInfo).order_by(desc(models.NewsInfo.id)).first()
    if latest_news:
        return {"title": latest_news.title, "content": latest_news.content}
    return {"title": "No news available", "content": ""}

@app.post("/send_notification")
async def send_notification(request: Request):
    data = await request.json()
    for sub in subscriptions:
        try:
            webpush(
                subscription_info=sub.dict(),
                data=json.dumps(data),
                vapid_private_key=VAPID_PRIVATE_KEY,
                vapid_claims=VAPID_CLAIMS
            )
        except WebPushException as ex:
            print("WebPush error: {}", repr(ex))
    return {"message": "Notifications sent"}