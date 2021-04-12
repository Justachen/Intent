from api import app, db, bcrypt
from api.models import User
import datetime
from flask import abort, jsonify, request, make_response
from functools import wraps
import jwt
import uuid

# Test jwt for expiration and secret
def token_required(f):
	@wraps(f)
	def decorated(*args, **kwargs):
		token = None
		if 'x-access-token' in request.headers:
			token = request.headers['x-access-token']
		if not token:
			return {'message': 'Token is missing!'}, 401
		try:
			data = jwt.decode(token, app.config['SECRET_KEY'], algorithms='HS256')
			current_user = User.query.filter_by(public_id=data['public_id']).first()
		except Exception as err:
			print(err)
			return {'message': 'Token is invalid'}, 401
		return f(current_user, *args, **kwargs)
	return decorated

# Serve React App
@app.route('/')
def main():
	return {"home": "you are here"}

# Development route for keeping track and testing database for users
@app.route('/api/user/<public_id>', methods=['GET'])
@token_required
def get_user(current_user, public_id):

	user = User.query.filter_by(public_id=public_id).first()
	if not user:
		abort(400, 'No user found!')

	user_data = {}
	user_data['public_id'] = user.public_id
	user_data['email'] = user.email
	user_data['password'] = user.password 

	return {'user': user_data}

# Development route for keeping track and testing database for users
@app.route('/api/user', methods=['GET'])
@token_required
def get_all_user(current_user):

	users = User.query.all()
	output = []

	for user in users:
		user_data = {}
		user_data['public_id'] = user.public_id
		user_data['email'] = user.email
		user_data['password'] = user.password 
		output.append(user_data)

	return {'users': output}

# Register new users
@app.route('/api/user', methods=['POST'])
def create_user():
	data = request.get_json()
	user = User.query.filter_by(email=data['email']).first()
	if user:
		abort(400, 'Email is already registered!')

	temp_pass = data['password']
	hashed_password = bcrypt.generate_password_hash(temp_pass).decode('utf-8') ## Look into switching this hashing to bcrypt

	new_user = User(public_id=str(uuid.uuid4()), email=data['email'].lower(), password=hashed_password)
	db.session.add(new_user)
	db.session.commit()

	return {'message' : 'New user created!'}

# Login and generate a jwt token for user session
@app.route('/login')
def login():
	auth = request.authorization
	# No authorization information provided
	if not auth or not auth.username or not auth.password:
		return make_response('Missing information', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
	user = User.query.filter_by(email=auth.username.lower()).first()
	# Incorrect email
	if not user:
		return make_response('Could not verify email', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})
	# Incorrect Password
	if bcrypt.check_password_hash(user.password, auth.password):
		token = jwt.encode({'public_id': user.public_id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'], algorithm='HS256')
		return {'token' : token}
	return make_response('Could not verify password', 401, {'WWW-Authenticate' : 'Basic realm="Login required!"'})


# Remove users from database
@app.route('/api/user/<public_id>', methods=['DELETE'])
@token_required
def delete_user(current_user, public_id):
	user = User.query.filter_by(public_id=public_id).first()
	if not user:
		abort(400, 'No user found!')

	db.session.delete(user)
	db.session.commit()

	return {'message' : 'User was deleted'}

# Logout of account
@app.route('/logout')
@token_required
def logout(current_user):

	return {'Logged out!'}, 401



