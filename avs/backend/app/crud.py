import bcrypt
from sqlalchemy.orm import Session
import models
import schemas
from mail_sender import send_registration_email
from typing import List

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())
    db_user = models.User(username=user.username, password=hashed_password.decode('utf-8'), email=user.email, role=user.role)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    send_registration_email(user.email, user.username)
    return db_user

def authenticate_user(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if user and bcrypt.checkpw(password.encode('utf-8'), user.password.encode('utf-8')):
        return user
    return None

#def get_setting(db: Session):
#    return db.query(models.Setting).first()

def get_setting(db: Session):
    print("Fetching setting from database")
    setting = db.query(models.Setting).first()
    print("Setting fetched:", setting)
    return setting

def upsert_setting(db: Session, setting: schemas.SettingCreate):
    existing_setting = get_setting(db)
    if existing_setting:
        existing_setting.title = setting.title
        existing_setting.content = setting.content
        existing_setting.date = setting.date
        existing_setting.updateDate = setting.updateDate
        existing_setting.llm = setting.llm
    else:
        existing_setting = models.Setting(
            title=setting.title,
            content=setting.content,
            date=setting.date,
            updateDate=setting.updateDate,
            llm=setting.llm
        )
        db.add(existing_setting)
    db.commit()
    db.refresh(existing_setting)
    return existing_setting

def get_volunteer_infos(db: Session):
    volunteer_infos = db.query(models.VolunteerInfo).all()
    for info in volunteer_infos:
        print(f"Debug info from DB - date: {info.date}, updateDate: {info.updateDate}, sdgs: {info.sdgs}, type(sdgs): {type(info.sdgs)}")
    return volunteer_infos

def create_volunteer_info(db: Session, volunteer_info: schemas.VolunteerInfoCreate):
    db_volunteer_info = models.VolunteerInfo(
        uid=volunteer_info.uid,
        title=volunteer_info.title,
        date=volunteer_info.date,
        updateDate=volunteer_info.updateDate,
        provider=volunteer_info.provider,
        content=volunteer_info.content,
        sdgs=','.join(volunteer_info.sdgs) if volunteer_info.sdgs else None,
        image=volunteer_info.image
    )
    db.add(db_volunteer_info)
    db.commit()
    db.refresh(db_volunteer_info)
    return db_volunteer_info

def get_news_infos(db: Session):
    return db.query(models.NewsInfo).all()

def create_news_info(db: Session, news_info: schemas.NewsInfoCreate):
    db_news_info = models.NewsInfo(
        title=news_info.title,
        date=news_info.date,
        updateDate=news_info.updateDate,
        content=news_info.content
    )
    db.add(db_news_info)
    db.commit()
    db.refresh(db_news_info)
    return db_news_info

def get_volunteer_infos_by_uids(db: Session, uids: List[str]):
    return db.query(models.VolunteerInfo).filter(models.VolunteerInfo.uid.in_(uids)).all()

def get_news_infos_by_ids(db: Session, ids: List[int]):
    return db.query(models.NewsInfo).filter(models.NewsInfo.id.in_(ids)).all()

def search_volunteers(db: Session, keyword: str):
    return db.query(models.VolunteerInfo).filter(
        (models.VolunteerInfo.title.contains(keyword)) |
        (models.VolunteerInfo.content.contains(keyword))
    ).all()

def search_news(db: Session, keyword: str):
    return db.query(models.NewsInfo).filter(
        (models.NewsInfo.title.contains(keyword)) |
        (models.NewsInfo.content.contains(keyword))
    ).all()

def get_volunteer_info_by_uid(db: Session, uid: str):
    return db.query(models.VolunteerInfo).filter(models.VolunteerInfo.uid == uid).first()