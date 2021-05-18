import os
from flask_script import Manager, Shell 
from flask_migrate import Migrate, MigrateCommand 

from app import create_app, db    
from app.models import * 

app = create_app(os.getenv('FLASK_CONFIG') or 'default')

@app.route('/login')
def index():
    return app.send_static_file('index.html')

manager = Manager(app)
migrate = Migrate(app, db)


def make_shell_content():
    return dict(
        app=app, db=db, faculty=NkFaculty, roles=NkRoles,
        registeruser=NkRegisterUser, registercanditate=NkRegisterCandidate,
        votingpool = NkVotingPool
    )

manager.add_command("shell", Shell(make_context=make_shell_content))
manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    app.run()


