from flask import current_app,jsonify,request
from app import create_app,db
from models import Articles, EyeWear, Post, User,articles_schema, users_schema,user_schema, eyewears_schema, posts_schema
# from eyewearSimilarity import *

# Create an application instance
app = create_app()

with app.app_context():
	db.create_all()

@app.route("/articles", methods=["GET"], strict_slashes=False)
def articles():

	articles = Articles.query.all()
	
	results = articles_schema.dump(articles)

	return jsonify(results)


if __name__ == "__main__":
	app.run(debug=True)