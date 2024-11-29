"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#Signup endpoint
@api.route('/signup', methods=['POST'])
def signup():
    data = request.json
    doc_id = data.get('doc_id')
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    existing_user = User.query.filter((User.doc_id == doc_id)).first()
    if existing_user:
        return jsonify({"msg": "Usuario ya existe"}), 401
    
    if name == None:
        name = "Unknown"

    new_user = User(doc_id=doc_id, name=name, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario creado exitosamente!"}), 201

@api.route("/login", methods=["POST"])
def login():
    body = request.json
    doc_id = body.get("doc_id", None)
    password = body.get("password", None)

    user = User.query.filter_by(doc_id=doc_id).first()
    if user == None:
        return jsonify({"msg": "Bad document ID or password"}), 401

    if user.password != password:
        return jsonify({"msg": "Bad document ID or password"}), 401

    access_token = create_access_token(identity=doc_id)
    return jsonify(access_token=access_token), 201
