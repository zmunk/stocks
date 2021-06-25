## Backend
`git clone https://github.com/zmunk/stocks.git`  
`cd stocks`  
`sudo apt update`  
`sudo apt install python-is-python3 python3-venv`  
`python -m venv env`  
`source env/bin/activate`  
`pip install -r requirements.txt`  
`python manage.py migrate`  
`python -u manage.py load_stocks --path data`  
`python manage.py runserver`  


## Frontend
