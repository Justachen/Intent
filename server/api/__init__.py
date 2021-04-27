import os
from flask import Flask
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Should generate a new SECRET_KEY for each project
app.config['SECRET_KEY'] = '1a2fcb6788e7fe9daed51012f959b8d2'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

from api import routes




