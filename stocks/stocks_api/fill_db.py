# fill db using csv files
import csv
from datetime import datetime

from .models import Hero

# TIMESTAMP: row[10]
# HIGH: row[3]
# LOW: row[4]
# CLOSE: row[5]
# SYMBOL: row[0]

path = "data/cm08JUN2021bhav.csv"
with open(path) as f:
    reader = csv.reader(f)
    for row in reader:
        dt = datetime.strptime(row[10], "%d-%b-%Y")
        _, created = Hero.objects.get_or_create(
            first_name=row[0],
            last_name=row[1],
            middle_name=row[2],
        )
        # creates a tuple of the new object or
        # current object and a boolean of if it was created
