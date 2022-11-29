from django.apps import AppConfig

from news import updater


class NewsConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'news'

    def ready(self):
        updater.start()
        import news.signals
