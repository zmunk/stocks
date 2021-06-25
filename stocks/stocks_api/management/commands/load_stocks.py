import os
import csv
from datetime import datetime, timezone
from django.core.management import BaseCommand
from stocks_api.models import Stock

class Command(BaseCommand):
    """
    $ python manage.py shell
    $ >>> from stocks_api.models import Stock
    $ >>> Stock.objects.all().delete()
    $ python manage.py load_stocks --path data/cm08JUN2021bhav.csv
    """
    help = 'Load a stocks csv file into the database'

    def add_arguments(self, parser):
        parser.add_argument('--path', type=str)

    def handle(self, *args, **kwargs):
        """
        TIMESTAMP: row[10] datetime
        OPEN: row[2] float
        HIGH: row[3] float
        LOW: row[4] float
        CLOSE: row[5] float
        SYMBOL: row[0] string
        """
        Stock.objects.all().delete()
        self.stdout.write("database cleared")
        self.stdout.write("creating objects.", ending="")
        path = kwargs['path']  # data/
        for filename in os.listdir(path):
            if filename[-4:] != ".csv":
                continue
            file = os.path.join(path, filename)
            with open(file, 'rt') as f:
                reader = csv.reader(f)
                next(reader, None)  # skip the headers
                for row in reader:
                    stock = Stock.objects.get_or_create(
                        date=datetime.strptime(row[10], "%d-%b-%Y").replace(tzinfo=timezone.utc),
                        opn=row[2],
                        high=row[3],
                        low=row[4],
                        close=row[5],
                        symbol=row[0],
                    )
            self.stdout.write(".", ending="")
        self.stdout.write("done")
