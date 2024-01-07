# MarketSafe

# Backend (src/flask-server)
```
python -m pip install flask_migrate
python -m pip install flask_marshmallow
python -m pip install flask_cors
python -m pip install python-dotenv
python -m pip install google-api-python-client
python -m pip install google-cloud-bigquery
python -m pip install yake
python -m pip install nltk
python server.py
```

# Frontend (root folder)
```
npm i
npm start
```

# When you pull any database changes on backend
Delete the "database.db" file in src/flask-server and RERUN "python server.py".

This will re-migrate the database schema and initialize any default database values from models.py
