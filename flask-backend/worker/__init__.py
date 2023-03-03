from bs4 import BeautifulSoup
from flask import Flask
from celery import Celery
from datetime import timedelta
from celery.schedules import crontab
import requests



def make_celery(app):
    celery = Celery(app.import_name, backend=app.config['CELERY_BACKEND'],
                    broker=app.config['CELERY_BROKER_URL'])
    celery.conf.update(app.config)
    TaskBase = celery.Task

    class ContextTask(TaskBase):
        abstract = True
        def __call__(self, *args, **kwargs):
            with app.app_context():
                return TaskBase.__call__(self, *args, **kwargs)
    celery.Task = ContextTask
    return celery


app = Flask(__name__)
app.config['CELERY_BACKEND'] = "redis://redis:6379/0"
app.config['CELERY_BROKER_URL'] = "redis://redis:6379/0"

app.config['CELERYBEAT_SCHEDULE'] = {
    'call-every-5-am': {
        'task': 'call_scrapper',
        'schedule': crontab(hour=23, minute=30),
    },
}


app.config['CELERY_TIMEZONE'] = 'UTC'
celery_app = make_celery(app)


@celery_app.task(name='call_scrapper')
def call_scrapper():
    print ('something')
    # Make a request to the website
    veg_url = "https://vegetablemarketprice.com/market/maharashtra/today"
    fruit_url="https://vegetablemarketprice.com/fruits/kerala/today"
    def fetch(url):
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
    print(fetch(veg_url))
    print(fetch(fruit_url))