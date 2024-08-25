from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
import time
from sqlalchemy.exc import OperationalError

DATABASE_URL = os.getenv("DATABASE_URL", "mysql+pymysql://root:rootpassword@db/user_db")

Base = declarative_base()

def wait_for_db(max_retries=5, retry_interval=5):
    retries = 0
    while retries < max_retries:
        try:
            engine = create_engine(DATABASE_URL)
            engine.connect()
            print("Successfully connected to the database")
            return engine
        except OperationalError:
            retries += 1
            print(f"Database connection attempt {retries}/{max_retries} failed. Retrying in {retry_interval} seconds...")
            time.sleep(retry_interval)
    
    raise Exception("Failed to connect to the database after multiple attempts")

engine = wait_for_db()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()