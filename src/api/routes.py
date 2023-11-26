"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    
    data = request.json

    if not data["email"]:
        return jsonify({"msg": "No email provided"}), 401

    if not data["password"]:
        return jsonify({"msg": "No password provided"}), 401
    
    user = User(email=data["email"], password=data["password"], is_active=True)

    db.session.add(user)
    db.session.commit()

    return jsonify({"msg": "Successfully created a new user"})

@api.route('/login', methods=['POST'])
def login():
    data = request.json

    user = User.query.filter_by(email=data['email']).first()

    if user:
        token = create_access_token(identity=user.id)
        return jsonify({"token": token}), 200
    
    return jsonify({"msg": "Incorrect information."}), 200

@api.route('/user', methods=['GET'])
@jwt_required()
def show_users():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    return jsonify(user.serialize())