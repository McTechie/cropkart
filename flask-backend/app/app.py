from flask import Flask
from flask_restx import Api, Resource, fields
from flask_sqlalchemy import SQLAlchemy
# from celery_config import *
import requests
from bs4 import BeautifulSoup

from celery.schedules import crontab

CELERY_BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_ACCEPT_CONTENT = ['json']

CELERYBEAT_SCHEDULE = {
    'run-task-every-day': {
        'task': 'myapp.tasks.run_my_task',
        'schedule': crontab(hour=5, minute=0),
    },
}

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///products.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
api = Api(app)
db = SQLAlchemy(app)

def create_app():
    app = Flask(__name__)
    with app.app_context():
        app.config['CELERY_BROKER_URL'] = CELERY_BROKER_URL
        app.config['CELERY_RESULT_BACKEND'] = CELERY_RESULT_BACKEND
        app.config['CELERY_TASK_SERIALIZER'] = CELERY_TASK_SERIALIZER
        app.config['CELERY_RESULT_SERIALIZER'] = CELERY_RESULT_SERIALIZER
        app.config['CELERY_ACCEPT_CONTENT'] = CELERY_ACCEPT_CONTENT
        app.config['CELERYBEAT_SCHEDULE'] = CELERYBEAT_SCHEDULE
        # applicatio.config.from_object(config_by_name[config_name])
        # register_extensions(application)
        # # Register blueprints
        # from app.api import blueprint
        # application.register_blueprint(blueprint, url_prefix="/api/v1/")
        # celery.conf.update(application.config)
        # celery_tier2.conf.update(application.config)
        return app

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
@api.route('/fetchveg')
class VegPrices(Resource):
    def get(self):
        # Make a request to the website
        url = "https://vegetablemarketprice.com/market/maharashtra/today"
        response = requests.get(url)

        # Create a BeautifulSoup object
        soup = BeautifulSoup(response.content, 'html.parser')

        # Find the table on the webpage
        table = soup.find('table')

        # Find the table headers
        headers = []
        for th in table.find_all('th'):
            headers.append(th.text.strip())

        # Find the table rows with id=todayVetableTableRows
        rows = []
        for tr in table.find_all('tr', {'class': 'todayVetableTableRows'}):
            row = []
            for td in tr.find_all('td'):
                row.append(td.text.strip())
            rows.append(row)

        # Create the pandas DataFrame
        # df = pd.DataFrame(rows, columns=headers)

        # Print the DataFrame
        list_of_rows = [rows[0][i:i+6] for i in range(0, len(rows[0]), 6)]
        response=[]
        for row in list_of_rows:
            res={
                'name':row[1],
                'wholesale_price':row[2],
                'type':'vegetable',
                'retail_price':row[3][0]+row[3][6:]
            }
            response.append(res)
        return(response)
    

@api.route('/fetchfruits')
class VegPrices(Resource):
    def get(self):
        # Make a request to the website
        url = "https://vegetablemarketprice.com/fruits/kerala/today"
        response = requests.get(url)

        # Create a BeautifulSoup object
        soup = BeautifulSoup(response.content, 'html.parser')

        # Find the table on the webpage
        table = soup.find('table')

        # Find the table headers
        headers = []
        for th in table.find_all('th'):
            headers.append(th.text.strip())

        # Find the table rows with id=todayVetableTableRows
        rows = []
        for tr in table.find_all('tr', {'class': 'todayVetableTableRows'}):
            row = []
            for td in tr.find_all('td'):
                row.append(td.text.strip())
            rows.append(row)

        # Create the pandas DataFrame
        # df = pd.DataFrame(rows, columns=headers)

        # Print the DataFrame
        list_of_rows = [rows[0][i:i+6] for i in range(0, len(rows[0]), 6)]
        response=[]
        for row in list_of_rows:
            res={
                'name':row[1],
                'type':'fruit',
                'wholesale_price':row[2],
                'retail_price':row[3][0]+row[3][6:]
            }
            response.append(res)
        return(response)


with app.app_context():
    db.create_all()

if __name__ == '__main__':
    # db.create_all()
    app.run(debug=True)
