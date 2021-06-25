# run `python manage.py makemigrations stocks_api && python manage.py migrate`
# after adding a new model

from django.db import models


class Stock(models.Model):
    symbol = models.CharField(max_length=20)
    date = models.DateTimeField()
    opn = models.FloatField()
    high = models.FloatField()
    low = models.FloatField()
    close = models.FloatField()

    def __str__(self):
        return f"Stock({self.symbol}, {self.date}, {self.opn}, {self.high}, {self.low}, {self.close})"
