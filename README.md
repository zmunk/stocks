https://user-images.githubusercontent.com/16511866/123431532-06458580-d5d2-11eb-8007-f60ef7f45923.mp4

# Description
The backend provides an endpoint that returns a list of stocks given the symbol name, the start date, and the end date. It creates the models from csv files.  
The frontend allows the user to change each of these parameters, and whenever a parameter is changed, a call is made to the backend.

# Setup
`sudo apt update`  
`sudo apt install python-is-python3 python3-venv npm`  

## Backend
`git clone https://github.com/zmunk/stocks.git`  
`cd stocks`  
`python -m venv env`  
`source env/bin/activate`  
`pip install -r requirements.txt`  
`python manage.py migrate`  
`python -u manage.py load_stocks --path data`  
`python manage.py runserver`  


## Frontend
`npm install`  
`npm start`  




