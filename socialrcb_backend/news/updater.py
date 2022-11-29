from apscheduler.schedulers.background import BackgroundScheduler
from .apiparser import generate_news


def start():
    scheduler = BackgroundScheduler(timezone="Europe/Berlin")
    scheduler.add_job(generate_news, 'interval', minutes=1)
    scheduler.start()