from datetime import datetime, date
from app.db.conn import mysqlconn
from app.core.nkquery import NkSelet


# Retrieve data 

now = datetime.now()
strnow = now.strftime('%Y-%m-%d %H:%M:%S')

class RetrieveData(NkSelet):
    def __init__(self, cursor=mysqlconn.cursor()):
        super().__init__(cursor, conn=mysqlconn)

    def getAllCandidate(self):
        getcandidates =  self.selectAll(
            f'''
                SELECT nk_register_candidate.id as candidateid, nk_roles.name as roles,
                nk_register_candidate.candidatepicture as candidatepicture, nk_register_candidate.roles as roles_id,
                nk_register_candidate.imagename as imagename, nk_register_user.year_of_study,
                nk_register_user.status as voterstatus, nk_roles.id as roleid, 
                nk_register_user.first_name as first_name , nk_register_user.last_name as last_name,
                nk_register_user.faculty as faculty FROM nk_register_candidate LEFT JOIN 
                nk_register_user ON nk_register_user.id = nk_register_candidate.candidateid
                JOIN nk_roles ON nk_roles.id = nk_register_candidate.roles''')
        getroles = self.selectAll(''' 
            SELECT * FROM nk_roles
        ''')
        return getcandidates, getroles

    def votePool(self, voterid=None, candidateid=None, status=None, positionid=None):
        print(voterid, candidateid, positionid, status)
        if voterid != None !=positionid:
            voter = self.selectOne(
                f'''SELECT status FROM nk_voting_pool WHERE 
                            voterid={voterid} AND positionid={positionid} ''')
            if voter == None:
                self.insertData(f'''
                    INSERT INTO nk_voting_pool(voterid, candidateid, positionid, status, created_at)
                    VALUES ({voterid}, {candidateid}, {positionid}, {status}, '{strnow}')
                 ''')
                self.updateData(f'''
                    UPDATE nk_register_user SET status={status}
                    WHERE nk_register_user.id={voterid}
                 ''')
                message = "Congratulation"
                return message
            # elif voter['status'] == 0:
            #     self.insertData(f'''
            #         INSERT INTO nk_voting_pool(voterid, candidateid, status, created_at)
            #         VALUES ({voterid}, {candidateid},{status}, '{strnow}')
            #      ''')
            #     self.updateData(f'''
            #         UPDATE nk_register_user SET status={status}
            #         WHERE nk_register_user.id={voterid}
            #      ''')
            #     message = "Congratulation"
            #     return {'message':message}

            else:
                message = "You can't vote twice!"
                return message
        error = "You are not allowed to vote!"
        return {'error': error}

    # def votePool(self, voterid=None, candidateid=None, status=None):
    #     return self.insertData(f'''
    #         INSERT INTO nk_voting_pool(voterid, candidateid, status)
    #         VALUES ({voterid}, {candidateid},{status}, {strnow})
    #     ''')

    def retrieveCandidate(self):
        return self.selectAll(f'''
            SELECT nk_register_user.first_name, nk_register_user.last_name, nk_register_user.email, 
            nk_register_user.reg_number, nk_register_user.faculty, nk_register_candidate.candidatepicture,
            nk_register_candidate.id as candidateid, nk_faculty.name as faculty, nk_register_candidate.status,
            nk_register_candidate.created_at as date
            FROM nk_register_candidate LEFT JOIN nk_register_user ON 
            nk_register_user.id = nk_register_candidate.candidateid
            LEFT JOIN nk_faculty ON nk_faculty.id = nk_register_user.faculty
            
        ''')

    def retrieveCandidateId(self, id):
        return self.selectAll(f'''
            SELECT nk_register_user.first_name, nk_register_user.last_name, nk_register_user.email, 
            nk_register_user.reg_number, nk_register_user.faculty, nk_register_candidate.candidatepicture,
            nk_register_candidate.id as candidateid, nk_faculty.name as faculty, nk_register_candidate.status,
            nk_register_candidate.created_at as date, nk_roles.name as rolename, nk_roles.id as roleid
            FROM nk_register_candidate LEFT JOIN nk_register_user ON 
            nk_register_user.id = nk_register_candidate.candidateid
            LEFT JOIN nk_faculty ON nk_faculty.id = nk_register_user.faculty
            LEFT JOIN nk_roles ON nk_roles.id = nk_register_candidate.roles
            WHERE nk_register_candidate.roles = {id} AND nk_register_candidate.status = 1
        ''')

    def retrieveCandidateResult(self):
        return self.selectAll(f'''
            SELECT nk_register_user.first_name, nk_register_user.last_name, nk_register_user.email, 
            nk_register_user.reg_number, nk_register_user.faculty, nk_register_candidate.candidatepicture,
            nk_register_candidate.id as candidateid, nk_faculty.name as faculty, nk_register_candidate.status,
            nk_register_candidate.created_at as date, nk_roles.name as rolename, nk_roles.id as roleid,
            COUNT(nk_voting_pool.candidateid) as voteresult
            FROM nk_register_candidate LEFT JOIN nk_register_user ON 
            nk_register_user.id = nk_register_candidate.candidateid
            LEFT JOIN nk_faculty ON nk_faculty.id = nk_register_user.faculty
            LEFT JOIN nk_roles ON nk_roles.id = nk_register_candidate.roles
            LEFT JOIN nk_voting_pool ON nk_voting_pool.candidateid = nk_register_candidate.id
            GROUP BY nk_voting_pool.candidateid
        ''')

        


    def retrievGlobalInfo(self):
        getglobale = self.selectOne(f'''
            SELECT COUNT(nk_register_user.is_public) as students,
            COUNT(nk_register_candidate.id) as candidates
            FROM nk_register_user LEFT JOIN nk_register_candidate ON nk_register_candidate.candidateid =  nk_register_user.id
            WHERE nk_register_user.is_public = {1} 
        ''')

        getparticipants = self.selectOne(
            f'''
                SELECT COUNT(nk_register_user.status) as paticipants FROM nk_register_user 
                WHERE nk_register_user.status = {1}
            ''')

        getLeadingcandidate = self.selectAll(f'''
                SELECT COUNT(nk_voting_pool.candidateid) as leadingcandidate, nk_register_user.first_name,
                nk_register_user.last_name FROM nk_voting_pool
                LEFT JOIN nk_register_candidate ON nk_register_candidate.id = nk_voting_pool.candidateid
                LEFT JOIN nk_register_user ON  nk_register_user.id = nk_register_candidate.candidateid
                GROUP BY  nk_register_user.first_name, nk_voting_pool.candidateid, nk_register_user.last_name
            ''')

        selectresultbyfaculty = self.selectAll(f'''
            SELECT nk_register_candidate.id as candidateid,  nk_register_user.first_name, 
            nk_register_candidate.candidatepicture, COUNT(nk_voting_pool.id) as vote_result, nk_roles.name as roles,
            nk_register_user.last_name, nk_faculty.name as faculty FROM nk_register_user JOIN nk_faculty ON nk_faculty.id = nk_register_user.faculty 
            JOIN nk_register_candidate ON nk_register_candidate.candidateid = nk_register_user.id
            JOIN nk_voting_pool ON nk_voting_pool.candidateid  = nk_register_candidate.id 
            JOIN nk_roles ON nk_roles.id = nk_register_candidate.roles
            WHERE nk_register_user.is_public = {1}
            GROUP BY nk_register_candidate.id, nk_register_user.first_name, nk_register_user.last_name, 
            nk_faculty.name 
        ''')

        return selectresultbyfaculty, getglobale, getparticipants, getLeadingcandidate

    def validateCandidate(self,candidateid, status):
        self.updateData(f''' 
            UPDATE nk_register_candidate SET status={status} 
            WHERE nk_register_candidate.id = {candidateid}
        ''')

       