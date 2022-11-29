from django.core.mail import send_mail
from django.dispatch import receiver
from django.db.models import signals

from core.user.models import User
from .models import News


@receiver(signals.post_save, sender=News)
def send_post_mail(sender, instance, created, **kwargs):
    message_subject = instance.title
    message = instance.content
    from_email = 'admin@admin.pl'
    all_users_emails = User.objects.values_list('email', flat=True)

    for user_email in all_users_emails:
        user = User.objects.get(email=user_email)
        if user.newsletter and instance.rso_alarm and instance.province_id in user.provinces.all():
            send_mail(
                message_subject,
                message,
                from_email,
                [user_email]
            )
