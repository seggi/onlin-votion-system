
from flask import (jsonify, request)
from werkzeug.security import generate_password_hash, check_password_hash 
from flask_login import login_user, logout_user, login_required
from flask_cors import CORS
from flask_jwt_extended import (
    jwt_required, create_access_token, 
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity,
)

from . import main
from .. import db, jwt
from ..db.regtrievedata import RetrieveData
from ..models import NkVotingPool

CORS(main, resources={r'/*': {'origins': '*'}})

RETRIEVEDATA = RetrieveData()

@main.route('/api/retrieve_candidate_list', methods=['GET', 'POST'])
# @jwt_required"message" : RETRIEVEDATA.getAllCandidate()
def retrieveCandidateList():
    return jsonify(RETRIEVEDATA.getAllCandidate())

@main.route('/api/retrieve_candidate_list_id/<id>', methods=['GET', 'POST'])
def adminRetrieveCandidateListId(id):
    getcandidatelist = RETRIEVEDATA.retrieveCandidateId(id)
    if len(getcandidatelist) > 0:
        return jsonify(getcandidatelist)
    return jsonify(error="No Candidate Register yet!")

@main.route('/api/retrieve_candidate_result', methods=['GET', 'POST'])
def adminRetrieveCandidateResult():
    getcandidatelist = RETRIEVEDATA.retrieveCandidateResult()
    if len(getcandidatelist) > 0:
        return jsonify(getcandidatelist)
    return jsonify(error="Nothing yet to display!")



@main.route('/api/vote_section', methods=['GET', 'POST'])
def vote():
    if not request.is_json:
        return jsonify(msg="Missing JSON in request"), 400
    
    voterid = request.json.get('voterid', None)
    candidateid = request.json.get('candidateid', None)
    positionid = request.json.get('positionid', None)
    status =  request.json.get('status', None)

    

    if voterid != None and candidateid != None and status != None and positionid != None:
        return jsonify(message=RETRIEVEDATA.votePool(voterid=voterid, candidateid=candidateid, status=status, positionid=positionid))

    return jsonify(message='Error from server!')


# ----------------------- Admin Section ---------------------------

@main.route('/api/admin_retrieve_candidate_list', methods=['GET', 'POST'])
# @jwt_required
def adminRetrieveCandidateList():
    getcandidatelist = RETRIEVEDATA.retrieveCandidate()
    if len(getcandidatelist) > 0:
        return jsonify(data=getcandidatelist)
    return jsonify(error="No Candidate Register yet!")


@main.route('/api/retrieve_global_info', methods=['GET', 'POST'])
# @jwt_required
def retrievGlobalInfo():
    if len(RETRIEVEDATA.retrievGlobalInfo()) > 0:
         return jsonify(data=RETRIEVEDATA.retrievGlobalInfo())
    return jsonify(error="Nothing to show.")


@main.route('/api/confirm_request', methods=['GET', 'POST'])
@jwt_required
def validateCandidate():
    candidateid = request.json.get('confirmcandidacy', None)
    status = request.json.get('confirmstatus', None)
    if candidateid != None and status != None:
        RETRIEVEDATA.validateCandidate(candidateid, status)
        getcandidatelist = RETRIEVEDATA.retrieveCandidate()
        if len(getcandidatelist) > 0:
            return jsonify(data=getcandidatelist)
        return jsonify(error="No Candidate Register yet!")
    return jsonify(error="Error from server.")






