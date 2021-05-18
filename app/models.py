import os 
import datetime

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import (Column, Integer, DateTime, Boolean, String, Float, Text, ForeignKey, LargeBinary)
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.sql import func
from flask_login import UserMixin

from app import db   


# Admin 

class NkFaculty(db.Model):
    __tablename__ = 'nk_faculty'
    id = Column('id', Integer, primary_key=True)
    name = Column(String(100), unique=False)
    created_date = Column(DateTime(timezone=True), default=func.now())

class NkRoles(db.Model):
    __tablename__ = '.id'
    id = Column('id', Integer, primary_key=True)
    name = Column(String(200), unique=False)
    created_date = Column(DateTime(timezone=True), default=func.now())

class NkRegisterUser(db.Model):
    __tablename__ = 'nk_register_user'
    id = Column('id', Integer, primary_key=True)
    first_name = Column(String(100), unique=False)
    last_name = Column(String(100), unique=False)
    email = Column(String(50), unique=True)
    username = Column(String(20), unique=False, nullable=False)
    reg_number = Column(String(30), unique=True, nullable=True)
    year_of_study = Column(String(30), unique=False, nullable=True)
    faculty = Column(String(30), unique=False, nullable=True)
    passwordhash = Column(String(500), unique=True, nullable=False)
    status = Column(Boolean(), nullable=True)
    is_admin = Column(Boolean())
    is_public = Column(Boolean())
    actived = Column(Boolean(), default=False)
    created_date = Column(DateTime(timezone=True), default=func.now())
    
    @property
    def password(self):
        raise AttributeError('Password is not a readable attribute')

    @password.setter
    def password(self, password):
        self.passwordhash = generate_password_hash(password)

    def verify_password(self, password):
        return check_password_hash(self.passwordhash, password)


class NkRegisterCandidate(db.Model):
    __tablename__ = 'nk_register_candidate'
    id = Column('id', Integer, primary_key=True)
    candidateid = Column(Integer, ForeignKey('nk_register_user.id'), nullable=False)
    roles = Column(Integer, ForeignKey('nk_roles.id'), nullable=False)
    imagename = Column(Text(), nullable=True)
    candidatepicture = Column(LargeBinary, nullable=True)
    status = Column(Boolean(), nullable=True,default=0)
    created_at = Column(DateTime(timezone=True), default=func.now())
    created_at = Column(DateTime(timezone=True), default=func.now())

class NkVotingPool(db.Model):
    __tablename__="nk_voting_pool"
    id = Column('id', Integer, primary_key=True)
    voterid = Column(Integer, ForeignKey('nk_register_user.id'), nullable=False)
    candidateid = Column(Integer, ForeignKey('nk_register_candidate.id'), nullable=False)
    positionid = Column(Integer, ForeignKey('nk_roles.id'))
    status = Column(Boolean(), nullable=True)
    created_at = Column(DateTime(timezone=True), default=func.now())




    



