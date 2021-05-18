from flask import (render_template, redirect, request, flash, session, url_for, jsonify)
from werkzeug.security import generate_password_hash, check_password_hash 
from flask_login import login_user, logout_user, login_required
from flask_cors import CORS
from flask_jwt_extended import (
    jwt_required, create_access_token, 
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity,
)

from . import auth
from .. import db, jwt
from ..models import NkRegisterUser, NkRegisterCandidate
from ..db.extendreg import ExtendRegister

# This line below avoid permission error in react(frontend)
CORS(auth, resources={r'/*': {'origins': '*'}})

EXTEND_REG = ExtendRegister()


@auth.route('/api/candidate_roles', methods=['GET', 'POST'])
def retrieveCandidateRoled():
    return jsonify(message=EXTEND_REG.retrieveCandidateRoles())



@auth.route('/api/login', methods=['GET', 'POST'])
def login():
    if not request.is_json:
        return jsonify(msg="Missing JSON in request"), 400

    # The user will login with email
    username = request.json.get("email", None)
    password = request.json.get("password", None)

    if username != None and password != None:
        user = NkRegisterUser.query.filter_by(email=username).first()
        if not user or not check_password_hash(user.passwordhash, password):
            return jsonify(error="Please check your login details and try again.")

        else:
            # Get admin user
            if user.is_admin == True:
                access = {
                        'accessToken': create_access_token(
                        identity=[{'id': user.id, 'username': username, 
                                }]),
                    'refreshToken': create_refresh_token(
                        identity=[{'id': user.id, 'username': user.username, 
                                }])
                }
                return jsonify(access), 200

             # Get public users 
            elif user.is_public == True:  
                # access = {
                #     'accessToken': create_access_token(
                #         identity=[{'id': user.id, 'username': username, 
                #                 'authpub': user.is_public }]),
                #     'refreshToken': create_refresh_token(
                #         identity=[{'id': user.id, 'username': user.username, 
                #                 'authpub': user.is_public }])
                # }
                
                return jsonify({'message': "access_connexion_allowed...", 'access': user.id}), 200
        
    return jsonify(error="You are not login")
            
                

# Get new token after expiration

@auth.route("/api/refresh", methods=["GET", "POST"])
@jwt_refresh_token_required
def refresh():
    current_user = get_jwt_identity()
    access =  { 'accessToken': create_access_token(identity=current_user) }
    return jsonify(access), 200


@auth.route('/api/signup', methods=['GET', 'POST'])
def signup():
    if not request.is_json:
        return jsonify(msg="Missing JSON in request"), 400

    fullname = request.json.get("fullname", None) 
    username = request.json.get("username", None)
    email = request.json.get('email', None)
    regnumber = request.json.get("regnumber", None)
    password = request.json.get("passwordhash", None)
    reppassword = request.json.get("reppeatpassword", None)
    is_public = request.json.get("is_public", None)
    is_admin =  request.json.get('is_admin', None)
    faculty = request.json.get('faculty',)

    if email !=None and username != None \
        and password !=None and reppassword !=None and faculty != None:
        register = NkRegisterUser.query.filter_by(email=email).first()

        if register:
            return jsonify(error="Email address already exists.")
        
        elif password == reppassword:
            try:
                if is_public == True:
                    EXTEND_REG.register(
                        email= email,
                        reg_number = regnumber, username =username, faculty=faculty, 
                        passwordhash = generate_password_hash(password, method="sha256"),
                        is_admin=is_admin, is_public=is_public, actived=True
                    ) 
                else: 
                    EXTEND_REG.register(
                    email= email,
                    reg_number = regnumber, username =username,
                    passwordhash = generate_password_hash(password, method="sha256"),
                    is_admin= is_admin, is_public=is_public, actived=True, fullname=fullname
                ) 

                return jsonify(message="Successfuly registered!"), 200
            except RecursionError:
                return jsonify(error="Error from server!."), 400

        else:
            return jsonify(error="Password did not match."), 400
    return jsonify(error="Please fill all fields")



# Register candidate 

@auth.route('/api/register_candidate', methods=['GET', 'POST'])
def registerCandidate():
    if not request.is_json:
        return jsonify(msg="Missing JSON in request"), 400

    firstname = request.json.get("firstname", None)
    email = request.json.get('email', None)
    lastname = request.json.get("lastname", None)
    intake = request.json.get("intake", None)
    image = request.json.get('image', None)
    imagename = request.json.get('name', None)
    roles = request.json.get('roles', None)

    if email !=None and firstname !=None and lastname !=None \
        and intake !=None and roles != None:
        register = NkRegisterUser.query.filter_by(email=email).first()
        if register:
            try:
                EXTEND_REG.registerCandidate(
                    firstname = firstname, lastname=lastname,
                    email=email, candidateid=register.id, intake=intake,
                    imagename=imagename, image=image, roles=roles
                ) 
                return jsonify(message="Successfuly registered!"), 200
            except RecursionError:
                return jsonify(error="Error from server!."), 400
        
        else:
            return jsonify(error="Make sure you're student from this campus!")

    elif imagename != None and image != None:
        EXTEND_REG.registerCandidate(imagename=imagename, image=image ) 
        return jsonify(message="Successfuly registered!"), 200

    return jsonify(error="Please fill all fields")
