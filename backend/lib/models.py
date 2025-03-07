import peewee
from lib.init import database_path

database = peewee.SqliteDatabase(database_path, pragmas={'foreign_keys': 1})


def create_tables():
    database.create_tables([Direction, Statistic, Subscription])


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
    # 10.07.2024 11:00:38
    time = peewee.DateTimeField(formats='%d.%m.%Y %H:%M:%S')
    direction = peewee.ForeignKeyField(Direction, backref='stats')


class Subscription(BaseModel):
    id = peewee.AutoField()
    pushSubscription = peewee.CharField(max_length=512, unique=True)


create_tables()
if __name__ == '__main__':
    # Statistic.delete().execute()
    # stat = Statistic.select().order_by(Statistic.time.desc()).get()
    # stat.delete_instance()
    # print(stat)
    # Subscription.delete().execute()
    # direction = Direction.select().where(Direction.name == 'Программная инженерия').get()
    # Statistic.create(time='27.07.2024 17:01:06', stats='{"stats": "1"}', hash='12932914921',
    #                  direction=direction)
    print(*Direction.select(), sep='\n')
    print(*Subscription.select(), sep='\n')
