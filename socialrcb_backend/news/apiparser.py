import requests
import json
import mysql.connector


mydb = mysql.connector.connect(
    host='localhost',
    user='root',
    password='',
    database='socialrcb2'
)

provinces = []
categories = []


class News:
    def __init__(self, id, title, shortcut, content, rso_alarm, rso_icon, valid_from, valid_to, repetition, longitude,
                 latitude, water_level_value, water_level_warning_status_value, water_level_alarm_status_value,
                 water_level_trend, type, river_name, location_name, created_at, updated_at, province_name, province_id,
                 province_slug, province_city):
        self.title = title
        self.id = id
        self.shortcut = shortcut
        self.content = content
        self.rso_alarm = rso_alarm
        self.rso_icon = rso_icon
        self.valid_from = valid_from
        self.valid_to = valid_to
        self.repetition = repetition
        self.longitude = longitude
        self.latitude = latitude
        self.water_level_value = water_level_value
        self.water_level_warning_status_value = water_level_warning_status_value
        self.water_level_alarm_status_value = water_level_alarm_status_value
        self.water_level_trend = water_level_trend
        self.type = type
        self.river_name = river_name
        self.location_name = location_name
        self.created_at = created_at
        self.updated_at = updated_at
        self.province_id = province_id
        self.province_slug = province_slug
        self.province_city = province_city
        self.province_name = province_name

    def __str__(self):
        txt = str(self.id)
        if self.title:
            txt += ' ' + str(self.title)
        if self.content:
            txt += ' ' + str(self.content)
        return txt


def insert_into_database(data, db, category):
    cursor = db.cursor()
    cursor.execute('SELECT id from news_news')
    ids = cursor.fetchall()
    ids_int = []
    for i in ids:
        ids_int.append(i[0])

    sql = "INSERT INTO news_news (id, title, shortcut, content, rso_alarm,  rso_icon, valid_from, valid_to, repetition, longitude, latitude, water_level_value,  water_level_warning_status_value, water_level_alarm_status_value, water_level_trend, type, river_name, location_name, created_at, updated_at, province_id_id, province_city, category_id) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)"
    for i in data:
        if int(i.id) not in ids_int:
            val = (
            i.id, i.title, i.shortcut, i.content, i.rso_alarm, i.rso_icon, i.valid_from, i.valid_to, i.repetition,
            i.longitude, i.latitude, i.water_level_value, i.water_level_warning_status_value,
            i.water_level_alarm_status_value, i.water_level_trend, i.type, i.river_name, i.location_name, i.created_at,
            i.updated_at, i.province_id, i.province_city, category)
            cursor.execute(sql, val)
            db.commit()
        else:
            continue


def generate_news(db=mydb, categories=categories):
    url = "https://komunikaty.tvp.pl/komunikatyxml/wszystkie/category/0?_format=json"
    for j in range(0, len(categories), 1):
        url_cat = url
        url_cat = url_cat.replace('category',
                                  categories[j].replace('ą', 'a').replace('ś', 's').replace('ł', 'l').replace('ń',
                                                                                                              'n').replace(
                                      'ó', 'o'))
        print(url_cat)
        page = requests.get(url_cat)
        save = str(page.text)

        news_table = []

        with open('data.json', 'w') as file:
            file.write(save)

        with open('data.json') as json_file:
            data = json.load(json_file)
            if 'newses' in data:
                for news in data['newses']:
                    id = news['id']
                    title = news['title']
                    shortcut = news['shortcut']
                    content = news['content']
                    rso_alarm = news['rso_alarm']
                    rso_icon = news['rso_icon']
                    valid_from = news['valid_from']
                    valid_to = news['valid_to']
                    repetition = news['repetition']
                    longitude = news['longitude']
                    latitude = news['latitude']
                    water_level_value = news['water_level_value']
                    water_level_warning_status_value = news['water_level_warning_status_value']
                    water_level_alarm_status_value = news['water_level_alarm_status_value']
                    water_level_trend = news['water_level_trend']
                    type = ''
                    if type in news:
                        type = news['type']
                    river_name = news['river_name']
                    location_name = news['location_name']
                    created_at = news['created_at']
                    updated_at = news['updated_at']
                    province_name = ''
                    province_id = ''
                    province_slug = ''
                    province_city = ''
                    for i in range(0, 17, 1):
                        if str(i) in news['provinces']:
                            x = news['provinces']
                            prov = x[str(i)]
                            province_name = prov['name']
                            if i == int(prov['id']):
                                province_id = i
                            else:
                                province_id = prov['id']
                            province_slug = prov['slug_name']
                            province_city = prov['city']

                        else:
                            continue

                    news = News(id, title, shortcut, content, rso_alarm, rso_icon, valid_from, valid_to, repetition,
                                longitude, latitude, water_level_value, water_level_warning_status_value,
                                water_level_alarm_status_value, water_level_trend, type, river_name, location_name,
                                created_at, updated_at, province_name, province_id, province_slug, province_city)
                    news_table.append(news)
        news_table.reverse()
        insert_into_database(news_table, db, j + 1)


def generate_provinces(db, provinces):
    cursor = db.cursor()
    cursor.execute('SELECT id from news_province')
    ids = cursor.fetchall()
    ids_int = []
    for i in ids:
        ids_int.append(i[0])
    sql = "INSERT INTO news_province (id, name, slug) VALUES ( %s, %s, %s )"
    for i in range(0, len(provinces), 1):
        if i + 1 not in ids_int:
            slug = provinces[i].replace('ą', 'a').replace('ś', 's').replace('ł', 'l').replace('ń', 'n').replace('ó',
                                                                                                                'o')
            val = (i + 1, provinces[i], slug)
            cursor.execute(sql, val)
            db.commit()


def generate_categories(db, categories):
    cursor = db.cursor()
    cursor.execute('SELECT id from news_category')
    ids = cursor.fetchall()
    ids_int = []
    for i in ids:
        ids_int.append(i[0])
    sql = "INSERT INTO news_category (id, name, slug) VALUES ( %s, %s, %s )"
    for i in range(0, len(categories), 1):
        if i + 1 not in ids_int:
            slug = categories[i].replace('ą', 'a').replace('ś', 's').replace('ł', 'l').replace('ń', 'n').replace('ó',
                                                                                                                 'o')
            val = (i + 1, categories[i], slug)
            cursor.execute(sql, val)
            db.commit()



with open('kategorie.txt', 'r', encoding='utf-8') as category:
    lines = category.readlines()
    categories = [i.strip('\n') for i in lines]

with open('wojewodztwa.txt', 'r', encoding='utf-8') as province:
    lines = province.readlines()
    provinces = [i.strip('\n') for i in lines]

generate_provinces(mydb, provinces)
generate_categories(mydb, categories)
#print(categories)
generate_news(mydb, categories)