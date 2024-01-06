import csv
from io import StringIO
from flask import current_app,jsonify,request
from app import create_app,db
from aiutility.detection import *
from aiutility.prescreening import *
from models import Review, Product, User, UsersShema,products_schema, users_schema,user_schema, reviews_schema
import re
from dotenv import load_dotenv
import os

load_dotenv()


# Create an application instance
app = create_app()

with app.app_context():
	db.create_all()


@app.route('/api/create_user', methods=['POST'])
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
    # adding into database
    
    return jsonify({"message": "User created successfully", "user": UsersShema.dump(new_user)}), 201

@app.route("/add_product", methods=["POST"])
def add_product():
	print(request.get_json())
	url = request.json['url']
	#url = "http://www.amazon.com/Kindle-Wireless-Reading-Display-Generation/dp/B0015T963C";
	regex = re.search("amazon.ca/([\\w-]+/)?(dp|gp/product)/(\\w+/)?(\\w{10})", url);
	ASIN = regex.group(4)

	url = "https://real-time-amazon-data.p.rapidapi.com/product-details"

	querystring = {"asin":ASIN,"country":"CA"}

	headers = {
		"X-RapidAPI-Key": os.environ.get('RAPID_API_KEY'),
		"X-RapidAPI-Host": "real-time-amazon-data.p.rapidapi.com"
	}

	response = requests.get(url, headers=headers, params=querystring)

	print(response.json())
     
	# Process the URL and add the product to the database
	# ...
	return jsonify({'message': 'Product added successfully'})


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

@app.route('/product/<int:product_id>', methods=['GET'])
def get_product(product_id):
   product = Product.query.get(product_id)
   if product is None:
       return jsonify({"error": "Product not found"}), 404
   else:
       return jsonify({
           "id": product.id,
           "title": product.title,
           "image_url": product.image_url,
           "date_posted": product.date_posted.isoformat(),
           "description": product.description,
           "user_id": product.user_id
       })

@app.route('/api/reviews/upload', methods=['POST'])
def upload_reviews():
    data = request.get_json()
    
    if data is None:
        return jsonify({"error": "No data provided"}), 400

    try:
        for entry in data:
            new_review = Review(
                content=entry.get('Description', ''),
                title=entry.get('Title', ''),
                rating=float(entry.get('Rating', 0)),  
                reviewer=entry.get('UserName', ''),
                product_id=1  # Default ID for NOW
            )
            db.session.add(new_review)

        db.session.commit()

        return jsonify({'message': 'Reviews uploaded successfully'}), 200

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

    
if __name__ == "__main__":
	app.run(debug=True)