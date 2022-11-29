from django.db import models
from django.db.models.deletion import CASCADE


class Province(models.Model):
    name = models.CharField(max_length=64)
    slug = models.CharField(max_length=64)


class Category(models.Model):
    name = models.CharField(max_length=64)
    slug = models.CharField(max_length=64)


class News(models.Model):
    title = models.TextField(null=True, blank=True)
    shortcut = models.TextField(null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    rso_alarm = models.TextField(null=True, blank=True)
    rso_icon = models.TextField(null=True, blank=True)
    valid_from = models.DateTimeField(null=True, blank=True)
    valid_to = models.DateTimeField(null=True, blank=True)
    repetition = models.BooleanField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    latitude = models.FloatField(null=True, blank=True)
    water_level_value = models.IntegerField(null=True, blank=True)
    water_level_warning_status_value = models.IntegerField(null=True, blank=True)
    water_level_alarm_status_value = models.IntegerField(null=True, blank=True)
    water_level_trend = models.IntegerField(null=True, blank=True)
    type = models.TextField(max_length=64, null=True, blank=True)
    river_name = models.TextField(null=True, blank=True)
    location_name = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(null=True, blank=True)
    updated_at = models.DateTimeField(null=True, blank=True)
    province_id = models.ForeignKey(Province, on_delete=CASCADE)
    province_city = models.CharField(max_length=128, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=CASCADE)



