from flask import current_app,jsonify,request
from app import create_app,db
from models import User, Post, UsersShema

# from eyewearSimilarity import *

# Create an application instance
app = create_app()

with app.app_context():
	db.create_all()


@app.route('/create_user', methods=['POST'])
def create_user():
    data = request.get_json()
    
    username = data.get('username')
    email = data.get('email')
    posts_data = data.get('posts', [])  # Assuming 'posts' is a list of post data

    if not username or not email:
        return jsonify({"error": "Username and email are required"}), 400

    # Check if the user already exists
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"error": "User already exists"}), 400
    
    new_user = User(username=username, email=email)
    db.session.add(new_user)
    db.session.commit()

    for post_data in posts_data:
        title = post_data.get('title')
        body = post_data.get('body')
        if title and body:
            new_post = Post(title=title, body=body, user_id=new_user.id)
            db.session.add(new_post)
    
    db.session.commit()
    return jsonify({"message": "User created successfully", "user": UsersShema.dump(new_user)}), 201

if __name__ == "__main__":
	app.run(debug=True)