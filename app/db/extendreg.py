from datetime import datetime, date
from app.db.conn import mysqlconn
from app.core.nkquery import NkSelet



# Extend registration

now = datetime.now()
strnow = now.strftime('%Y-%m-%d %H:%M:%S')

class ExtendRegister(NkSelet):
    def __init__(self, cursor=mysqlconn.cursor()):
        super().__init__(cursor, conn=mysqlconn)

    def register(self,
        email= None , username=None, reg_number=None, passwordhash = None,
        is_admin = None, is_public = None, actived = None, fullname=None, faculty=None):
        fdict = {1: 'BBM', 2: 'TTM', 3: 'BIT', 4:'CIS', 5: 'CE'}
        if email != None and username != None and reg_number!=None and passwordhash != None and\
            is_admin != None and is_public != None and actived != None and fullname == None and faculty != None:
            for x in fdict:
                if faculty == fdict[x]:
                    self.insertData(
                        f'''
                            INSERT INTO nk_register_user(email, username, 
                            passwordhash, is_admin, is_public, actived, created_date, faculty) 
                            VALUES ('{email}','{username}','{passwordhash}',
                            {is_admin},{is_public},{actived},'{strnow}', {x})
                        ''')
        activedv = 1
    
        if email != None and username != None and\
            is_admin != None and is_public != None and activedv != None and fullname != None:
            self.insertData(
                f'''
                    INSERT INTO nk_register_user(first_name, email, username, 
                    passwordhash, is_admin, is_public, actived, created_date) 
                    VALUES ('{fullname}','{email}','{username}','{passwordhash}',
                    {is_admin},{is_public},{activedv},'{strnow}')
                ''')

    def registerCandidate(self, email=None, firstname=None, lastname=None, intake=None,
                 candidateid=None, imagename = None, image=None, roles=None, faculty=None):
        defaultroles = ["President", "Minister", "Deputy"]
        
        if email != None and firstname != None and lastname != None and intake != None and roles!=None and faculty!=None:
            if roles == defaultroles[0]:
                self.insertData(
                    f'''
                        UPDATE nk_register_user SET first_name='{firstname}', last_name='{lastname}' 
                        WHERE email='{email}' ''')
                self.insertData(
                    f'''
                        INSERT INTO nk_register_candidate(candidateid, roles, status, created_at
                        ) 
                        VALUES ('{candidateid}',{1}, {0},'{strnow}')''')

            elif roles == defaultroles[1]:
                self.insertData(
                    f'''
                        UPDATE nk_register_user SET first_name='{firstname}', last_name='{lastname}' 
                        WHERE email='{email}' ''')
                self.insertData(
                    f'''
                        INSERT INTO nk_register_candidate(candidateid, roles, status, created_at
                        ) 
                        VALUES ('{candidateid}',{2}, {0},'{strnow}')''')


            elif roles == defaultroles[2]:
                self.insertData(
                    f'''
                        UPDATE nk_register_user SET first_name='{firstname}', last_name='{lastname}' 
                        WHERE email='{email}' ''')
                self.insertData(
                    f'''
                        INSERT INTO nk_register_candidate(candidateid, roles, status, created_at
                        ) 
                        VALUES ('{candidateid}',{3}, {0},'{strnow}')''')
                

        if imagename != None and image != None:
            id = self.selectOne(f'''
                SELECT id FROM nk_register_candidate WHERE id IN (SELECT MAX(id) FROM nk_register_candidate)
            ''')
            userid = id['id']
            
            self.insertData(
                f''' 
                    UPDATE nk_register_candidate SET candidatepicture='{image}', imagename='{imagename}'
                    WHERE id={userid}
                '''
            )

    def retrieveCandidateRoles(self):
        return self.selectAll('''SELECT * FROM nk_roles''')
    