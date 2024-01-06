from app import db,ma
from datetime import datetime
from sqlalchemy import event

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500))
    title = db.Column(db.String(100))
    reviewer = db.Column(db.String(100))
    percentProfanity = db.Column(db.Float())
    percentThreat = db.Column(db.Float())
    percentInsult = db.Column(db.Float())
    percentToxicity = db.Column(db.Float())
    percentSevereToxicity = db.Column(db.Float())
    percentSexuallyExplicit = db.Column(db.Float())
    isMisinformation = db.Column(db.Boolean())
    isHarmfulContent = db.Column(db.Boolean())
    misinformationExplanation = db.Column(db.String(100))
    harmfulContentExplanation = db.Column(db.String(100))
    product_id = db.Column(db.Integer, db.ForeignKey("product.id"), nullable=False)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), primary_key=True)
    date_posted = db.Column(db.DateTime, nullable=False, default=datetime.now)
    description = db.Column(db.Text, nullable=True)
    reviews = db.relationship('Review', backref="product", lazy=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    firstName = db.Column(db.String(20), nullable=False)
    lastName = db.Column(db.String(20), nullable=False)
    description = db.Column(db.Text)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60))    
    products = db.relationship("Product", backref="user", lazy=True)

class UsersShema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("id","firstName","lastName", "description", "email", "password", "products")
class ProductShema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("id","title", "date_posted", "description", "reviews", "user_id")

class ReviewShema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("id","content", "title", "reviewer", "reviews",
            "percentProfanity", "percentThreat", "percentInsult", "percentToxicity", "percentSevereToxicity",
            "percentSexuallyExplicit", "isMisinformation", "isHarmfulContent", "misinformationExplanation",
            "harmfulContentExplanation")

# IMPORTANT: These events are for instantiating DEFAULT values in a database. Especially helpful in a hackathon to sync SQLite
@event.listens_for(User.__table__, 'after_create')
def create_users(*args, **kwargs):
    
    db.session.add(User(id=1, firstName = "Allan", lastName = "Kong", email= "allan", password="allan"))
    db.session.commit()

user_schema = UsersShema()
users_schema = UsersShema(many=True)

product_schema = ProductShema()
products_schema = ProductShema(many=True)

review_schema = ProductShema()
reviews_schema = ProductShema(many=True)