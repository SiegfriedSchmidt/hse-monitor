import peewee
from lib.init import database_path

database = peewee.SqliteDatabase(database_path, pragmas={'foreign_keys': 1})


def create_tables():
    database.create_tables([Statistic, Subscription])


class BaseModel(peewee.Model):
    class Meta:
        database = database

    def __str__(self):
        return str(self.__dict__['__data__'])


class Direction(BaseModel):
    id = peewee.AutoField()
    name = peewee.CharField(max_length=512, unique=True)
    url = peewee.CharField(max_length=512)


class Statistic(BaseModel):
    id = peewee.AutoField()
    stats = peewee.CharField(max_length=8192)
    hash = peewee.CharField(max_length=512)
    time = peewee.DateTimeField(formats='%Y-%m-%d %H:%M:%S')
    direction = peewee.ForeignKeyField(Direction, backref='stats')


class Subscription(BaseModel):
    id = peewee.AutoField()
    pushSubscription = peewee.CharField(max_length=512, unique=True)


create_tables()
if __name__ == '__main__':
    ...
