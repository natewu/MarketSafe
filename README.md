# MarketSafe
<img width="914" alt="image" src="https://github.com/natewu/HackED24/assets/74941296/830d03ac-05ae-4905-8cb1-d9616a53a948">

## Inspiration 💡
In the digital era, we are constantly bombarded with information. It is hard to tell what is real and what is fake. We are inspired to create a platform that can help people to identify fake content and make better decisions.

MarketSafe is a cutting edge platform using the latest machine learning technology to help people to identify fake content. Marketplaces such as Amazon, eBay, and Alibaba are filled with fake reviews. It is hard to tell which reviews are real and which are fake. MarketSafe is a platform that can help people to identify fake reviews and make better decisions.

Businesses use MarketSafe to identify fake reviews and improve their products and services. MarketSafe can help businesses to identify fake reviews and automatically flag them for review.

## What it does 🤔
MarketSafe is an innovative platform that integrates artificial intelligence to scrutinize product reviews in real-time. It identifies and flags fake reviews, harmful content, and misinformation, enabling businesses to maintain a high standard of credibility. For businesses, this means enhanced product integrity, improved consumer trust, and an overall healthier marketplace environment. Consumers benefit from more accurate product information and reliable reviews, assisting them in making better purchasing decisions.

## How we built it ⚙️
First and foremost, we've crafted MarketSafe with 💙. We have built a ML-enabled full-stack application that solves a real world problem. The whole process can be broken into the following points:

- Front-end development with React, styled using Tailwind CSS and Sass for a responsive and user-friendly interface.
  
- Back-end development with Flask and Python, utilizing SQLite3 for database management, and integrating Google Cloud and PyTorch for advanced computing needs.
  
- Implementation of OpenAI's GPT-4 and Google Cloud's Natural Language API for analyzing and processing review content.
  
- Use of Google Cloud BigQuery for handling large datasets and analytics.

**The application's architecture ensures robustness, scalability, and a seamless user experience.**

## Design 🎨
![image](https://github.com/natewu/HackED24/assets/36091727/53f455c3-6fd2-4115-add3-c5f06508573d)


## Challenges we ran into   😤

## Accomplishments that we're proud of 💚

## What we learned 🙌

## What's next?  🚀
As MarketSafe continues to evolve, our vision encompasses a broader scope and deeper integration into the digital world. Here’s what we have planned for the future:

1. Expansion to Social Media and Other Platforms:
We aim to extend our services beyond traditional e-commerce websites to social media platforms like Twitter, Instagram, and Facebook. With misinformation and fake endorsements prevalent on social media, MarketSafe's technology could be pivotal in identifying and flagging misleading content, thus protecting brands and consumers alike.

2. Integration with Larger E-commerce Platforms:
Partnering with giants like Amazon, eBay, and Shopify, we plan to integrate MarketSafe directly into these platforms. This integration will offer businesses and consumers an in-built, reliable tool for review verification, enhancing trust and transparency at a larger scale.

3. Advanced Analytics and Reporting Features:
Future updates will include more sophisticated analytics tools, giving businesses deeper insights into customer sentiment, trends, and feedback patterns. These analytics can drive strategic decisions and product improvements.

4. Customizable Filters and AI Models:
Understanding that different businesses have unique needs, we will provide customizable AI models and filters. Companies can adjust these models to best suit their industry standards and customer base.

5. Global Expansion and Multilingual Support:
To cater to the global market, MarketSafe will expand its linguistic capabilities, offering multilingual support to identify and analyze reviews in various languages. This expansion will make our platform more accessible to non-English speaking markets.

6. Collaborations and Community Building:
We plan to collaborate with industry experts, regulatory bodies, and consumer rights organizations to continually refine our algorithms and approaches. By fostering a community around ethical business practices, we can collectively combat the spread of misinformation.

7. API Development for Wider Integration:
We will develop an API that can be integrated into various platforms and systems, allowing businesses to seamlessly incorporate MarketSafe's technology into their existing digital infrastructure.

By realizing these goals, MarketSafe aspires to become a cornerstone of digital integrity, fostering a safer, more transparent, and trustworthy online environment for businesses and consumers worldwide.

<img width="913" alt="image" src="https://github.com/natewu/HackED24/assets/74941296/cfb538a1-250b-4224-9a4b-53752dafc66a">


# Installation instructions

## Backend (src/flask-server)
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

## Frontend (root folder)
```
npm i
npm start
```

# When you pull any database changes on backend
Delete the "database.db" file in src/flask-server and RERUN "python server.py".

This will re-migrate the database schema and initialize any default database values from models.py
