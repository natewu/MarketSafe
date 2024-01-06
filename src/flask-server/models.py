from app import db,ma
from datetime import datetime
from sqlalchemy import event

class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(500))
    title = db.Column(db.String(100))
    reviewer = db.Column(db.String(100))
    rating = db.Column(db.Float())
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
    title = db.Column(db.String(100))
    image_url = db.Column(db.String(100))
    price = db.Column(db.Float)
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
        fields = ("id","title", "date_posted", "description", "reviews", "user_id", "image_url", "price")

class ReviewShema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("id","content", "title", "reviewer", "reviews", "rating",
            "percentProfanity", "percentThreat", "percentInsult", "percentToxicity", "percentSevereToxicity",
            "percentSexuallyExplicit", "isMisinformation", "isHarmfulContent", "misinformationExplanation",
            "harmfulContentExplanation")

# IMPORTANT: These events are for instantiating DEFAULT values in a database. Especially helpful in a hackathon to sync SQLite
@event.listens_for(User.__table__, 'after_create')
def create_users(*args, **kwargs):
    
    db.session.add(User(id=1, firstName = "Allan", lastName = "Kong", email= "allan", password="allan"))
    db.session.commit()

@event.listens_for(Product.__table__, 'after_create')
def create_products(*args, **kwargs):
    
    db.session.add(Product(id=1, title = "Easyfone Prime-A1 Pro 4G Unlocked Flip Mobile Phone for Seniors",
                           description = """
                                Brand	Easyfone
                                Wireless carrier	Unlocked for All Carriers
                                Operating system	Easyfone OS
                                Cellular technology	4G
                                Connectivity technology	Bluetooth, Wi-Fi
                                Colour	Red
                                Screen size	2.4 Inches
                                Wireless network technology	GSM, LTE
                                RAM memory installed size	6 GB
                                SIM card slot count	Single SIM
                                See less
                                About this item
                                Classic flip design, Flip to answer calls; Big button with talking numbers feature for easy dialing, Simple operating system for easy to use.
                                2.4" HD Main Display + 1.44" External colorful HD screen, Both screens display big font & big icon for easy viewing.
                                1500mAh battery, Long time standby with an easy cradle charger, Just place the phone on its stand, and it starts charging!
                                Powerful speaker with clear and loud sound, suitable for older users; HAC Compatible, good for user with hearing aid devices.
                                Additional SOS Button, 8 Photo Speed Dial Buttons(8 number keys can be set); 3 dedicated shortcut button (Block Button & Alarm Clock & Photo Speed Dial).
                                This phone is compatible with Telus, Rogers, Bell, Koodo, Fido, Virgin Mobile, Chatr, Public Mobile, Lucky Mobile, and other carriers run off their networks.(SIM Card Not Included)""",
                            user_id=1, image_url="https://m.media-amazon.com/images/I/61gPAJeN9ML._AC_SX425_.jpg", price=116.99))
    db.session.commit()

user_schema = UsersShema()
users_schema = UsersShema(many=True)

product_schema = ProductShema()
products_schema = ProductShema(many=True)

review_schema = ProductShema()
reviews_schema = ProductShema(many=True)