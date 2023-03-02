from flask import Flask
from flask_restx import Api, Resource, fields
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
api = Api(app)
db = SQLAlchemy(app)

# Create the database table for the Product resource
class Product(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price_retail = db.Column(db.String(100), nullable=False)
    price_wholesale = db.Column(db.String(100), nullable=False)

# Define the fields that should be returned in the API responses
product_fields = api.model('Product', {
    'id': fields.Integer(),
    'name': fields.String(),
    'price_retail': fields.String(),
    'price_wholesale': fields.String()
})

# Create the CRUD endpoints using Flask-RESTX
@api.route('/product')
class ProductList(Resource):
    @api.marshal_with(product_fields)
    def get(self):
        products = Product.query.all()
        return products

    @api.expect(product_fields)
    @api.marshal_with(product_fields)
    def post(self):
        data = api.payload
        product = Product(name=data['name'], price_retail=data['price_retail'], price_wholesale=data['price_wholesale'])
        db.session.add(product)
        db.session.commit()
        return product

@api.route('/products/<int:id>')
class ProductDetail(Resource):
    @api.marshal_with(product_fields)
    def get(self, id):
        product = Product.query.get(id)
        return product

    def delete(self, id):
        product = Product.query.get(id)
        db.session.delete(product)
        db.session.commit()
        return {'message': 'Product deleted'}

    @api.expect(product_fields)
    @api.marshal_with(product_fields)
    def put(self, id):
        data = api.payload
        product = Product.query.get(id)
        product.name = data['name']
        product.price_retail = data['price_retail']
        product.price_wholesale = data['price_wholesale']
        db.session.commit()
        return product
    
with app.app_context():
    db.create_all()

if __name__ == '__main__':
    # db.create_all()
    app.run(debug=True)
