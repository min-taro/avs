from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List, Dict


class UserCreate(BaseModel):
    username: str = Field(..., min_length=1, max_length=50)
    password: str = Field(..., min_length=1, max_length=50)
    email: EmailStr = Field(...)
    role: str = Field(default='user')


class UserLogin(BaseModel):
    email: EmailStr = Field(...)
    password: str = Field(..., min_length=1, max_length=50)

class UserResponse(BaseModel):
    username: str
    role: str

class SettingCreate(BaseModel):
    title: bool
    content: bool
    date: bool
    updateDate: bool
    llm: str

class SettingResponse(BaseModel):
    title: bool
    content: bool
    date: bool
    updateDate: bool
    llm: str

class VolunteerInfoBase(BaseModel):
    uid: str
    title: str
    date: Optional[str]
    updateDate: Optional[str]
    provider: str
    content: Optional[str]
    sdgs: Optional[str]
    image: Optional[str]

class VolunteerInfoCreate(VolunteerInfoBase):
    pass

class VolunteerInfo(VolunteerInfoBase):
    id: int

    class Config:
        from_attributes = True

class NewsInfoBase(BaseModel):
    title: str
    date: Optional[str]
    updateDate: Optional[str]
    content: Optional[str]

class NewsInfoCreate(NewsInfoBase):
    pass

class NewsInfo(NewsInfoBase):
    id: int

    class Config:
        from_attributes = True

class UidList(BaseModel):
    uids: List[str]

class IdList(BaseModel):
    ids: List[int]

class Subscription(BaseModel):
    id: int
    endpoint: str
    keys: Dict[str, str]

    class Config:
        from_attributes = True