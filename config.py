import os

basedir =  os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'hard to guess string'
    SQLAKCHEMY_COMMIT_ON_TEARDOWN = True 
    FLASK_MAIL_SUBJECT_PREFIX = '[Flasky]'
    FLASK_MAIL_SENDER = 'Flasky Admin <nankim45@gmail.com>'
    FLASKY_ADMIN = os.environ.get('FLASKY_ADMIN')

    @staticmethod 
    def init_app(app):
        pass 

class DevelopmentConfig(Config):
    DEBUG = True 
    PROPAGATE_EXCEPTIONS = True # Prevent expiration exceptions
    JWT_SECRET_KEY = "difficult-to-guess-cafe-py"
    JWT_ACCESS_TOKEN_EXPIRES = False
   
    SQLALCHEMY_DATABASE_URI = "mysql://root:@127.0.0.1/nk-ovs" 

    MYSQL_DATABASE_HOST = 'localhost'
    MYSQL_DATABASE_USER = 'root'
    MYSQL_DATABASE_PASSWORD = ''
    MYSQL_DATABASE_DB = 'nk-ovs'
    

class TestingConfig(Config):
    TESTING = True 
    PROPAGATE_EXCEPTIONS = True # Prevent expiration exceptions
    JWT_SECRET_KEY = "difficult-to-guess-cafe-py"
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'nk-ovs.sqlite')


class ProductionConfig(Config):
    PROPAGATE_EXCEPTIONS = True # Prevent expiration exceptions
    JWT_SECRET_KEY = "difficult-to-guess-cafe-py"
    # JWT_ACCESS_TOKEN_EXPIRES = timedelta(7)
    SQLALCHEMY_DATABASE_URI = os.environ.get('DEV_DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'nk-ovs.sqlite')


config = {
    'development': DevelopmentConfig, 
    'testing': TestingConfig, 
    'production': ProductionConfig,
    'default': DevelopmentConfig
}