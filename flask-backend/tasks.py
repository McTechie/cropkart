from celery import shared_task

@shared_task
def run_my_task():
    # This is the task that will run at 5 am every day
    print('Running my task...')