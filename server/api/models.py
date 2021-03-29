from api import db

class User(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	public_id = db.Column(db.Integer, unique=True, nullable=False)
	username = db.Column(db.String(20), unique=True, nullable=False)
	email = db.Column(db.String(120), unique=True, nullable=False)
	password = db.Column(db.String(120), nullable=False)

	## dunder method that specifies how our object is printed when we print it out, 
	## we probably wont need this because we arent printing things out, we are just returning data for the most part
	def __repr__(self):
		return f"User('{self.username}', '{self.email}')"