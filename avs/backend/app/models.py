from sqlalchemy import Column, Integer, Boolean, String, Text, JSON
from database import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), index=True)
    password = Column(String(255))
    email = Column(String(100), unique=True, index=True)
    role = Column(String(10), default='user')

class Setting(Base):
    __tablename__ = 'settings'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(Boolean)
    content = Column(Boolean)
    date = Column(Boolean)
    updateDate = Column(Boolean)
    llm = Column(String(50))

class VolunteerInfo(Base):
    __tablename__ = 'volunteer_infos'

    id = Column(Integer, primary_key=True, index=True)
    uid = Column(String(255), unique=True, index=True)
    title = Column(String(255))
    date = Column(String(50))
    updateDate = Column(String(50), nullable=True)
    provider = Column(String(255))
    content = Column(Text)
    sdgs = Column(Text)
    image = Column(String(255))

class NewsInfo(Base):
    __tablename__ = 'news_infos'

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    date = Column(String(50))
    updateDate = Column(String(50), nullable=True)
    content = Column(Text)

class Subscription(Base):
    __tablename__ = 'subscriptions'

    id = Column(Integer, primary_key=True, index=True)
    endpoint = Column(String(500), unique=True, index=True)
    subscription_keys = Column(JSON)