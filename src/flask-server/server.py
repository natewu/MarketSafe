from flask import current_app,jsonify,request
from app import create_app,db
from aiutility.detection import *
from aiutility.prescreening import *
from models import Review, Product, User,products_schema, users_schema,user_schema, reviews_schema

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

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.json
    product = data.get('product')
    reviews = data.get('reviews')
    
    if not product or not reviews:
        return jsonify({"error": "Product or reviews not provided"}), 400

    try:
        analysis_result = analyze_product_reviews(product, reviews)
        return jsonify(analysis_result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == "__main__":
	app.run(debug=True)