from api import app, db, os

#Remove debug = true on when ru
if __name__ == "__main__":
	## if there isnt a db.sqlite in the repo, create one
	if not os.path.exists('db.sqlite'):
		db.create_all()
	app.run(debug=True)