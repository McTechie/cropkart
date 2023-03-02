from celery import Celery
from celery.schedules import crontab
from celery import shared_task


app = Celery('myapp', broker='redis://localhost:6379/0')

@shared_task
def run_my_task():
    # This is the task that will run at 5 am every day
    print('Running my task...')

# Define a periodic task that runs at 5 am every day
app.conf.beat_schedule = {
    'run-task-every-day': {
        'task': 'worker.celery_app.run_my_task',
        'schedule': crontab(hour=22, minute=4),
    },
}

# Load task modules from all registered Django app configs.
# app.autodiscover_tasks()