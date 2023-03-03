from flask import Flask
from celery import Celery
from datetime import timedelta
from celery.schedules import crontab



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