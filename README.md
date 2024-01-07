# MarketSafe

## Inspiration 💡
In the digital era, we are constantly bombarded with information. It is hard to tell what is real and what is fake. We are inspired to create a platform that can help people to identify fake content and make better decisions.

MarketSafe is a cutting edge platform using the latest machine learning technology to help people to identify fake content. Marketplaces such as Amazon, eBay, and Alibaba are filled with fake reviews. It is hard to tell which reviews are real and which are fake. MarketSafe is a platform that can help people to identify fake reviews and make better decisions.

Businesses use MarketSafe to identify fake reviews and improve their products and services. MarketSafe can help businesses to identify fake reviews and automatically flag them for review.

## What it does 🤔

## How we built it ⚙️
First and foremost, it is Crafted with 💙. We have built a ML-enabled full-stack application that solves a real world problem. The whole process can be broken into the following points:

- React on the front-end with styling done in Tailwind and Sass

- Flask, Python, SQLite3, and Google Cloud, Pytorch on the back-end

-  External services such as GPT4, Google Cloud Natural Language API, Google Cloud BigQuery.

Our application is technically complex, polished, original, useful, and built with excellent execution. 

## Design 🎨
![image](https://github.com/natewu/HackED24/assets/36091727/53f455c3-6fd2-4115-add3-c5f06508573d)


## Challenges we ran into   😤

## Accomplishments that we're proud of 💚

## What we learned 🙌

## What's next?  🚀


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
