import os
from flask import Flask, request, jsonify
import requests
import json
from dotenv import load_dotenv
from pprint import pprint

load_dotenv()

# GPT4 Detection
def model_detect(prompt):
    """
    Takes in a prompt prompt and returns it as of type string
    """
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {os.environ.get('OPENAI_API_KEY')}",
    }

    payload = {
        "model": "gpt-4",
        "temperature": 0,
        "messages": [
            {
                "role": "user",
                "content": [
                    {
                        "type": "text",
                        "text": prompt,
                    },
                ],
            }
        ],
        "max_tokens": 1000,
    }
    
    response = requests.post(
        "https://api.openai.com/v1/chat/completions", headers=headers, json=payload
    )   
    
    # we want to get this in json format
    response = response.json()
    try:
        content = response["choices"][0]["message"]["content"]
        print(content)
        content = json.loads(content)
    except Exception as e:
        print(response)
        raise e

    return content

def analyze_product_reviews(product, reviews):
    """
    The prompt of the product and the product reviews
    """
    
    # concatenate harmful_content with presecreening output later
    prompt = f"Can you tell me, in these two categories with the the following reviews: {reviews}, based on the product description: {product}?" + "\n Back up each of your claims in these categories, as well as saying 'yes' or 'no': Misinformation, Harmful content. Please answer in the following format:" + """\n
    {
        "detection": [
            {
                "name": "misinformation",
                "explanation": "{explanation}",
                "verdict": "{yes or no}"
            },
            {
                "name": "harmful_content",
                "explanation": "{explanation}",
                "verdict": "{yes or no}"
            }
        ]   
    }""" + "\nMake sure that you output only valid json in the format above. Start your prompt with the character {"
    
    print(prompt)
    
    return model_detect(prompt)

if __name__ == "__main__":
    # this is to test the model
    product = "FluffyUnion Cat Water Fountain with Stainless Steel Lid, 2.4L/81oz Automatic water dispenser for Cats and Dogs About this item Stainless steel top: High grade stainless steel top is unbreakable, durable and easy to clean. Stainless steel top is hygienic and dishwasher-safe. Water level window: Stainless steel top pet fountain features water level window that will indicate the level of the water. It’s easier and convenient for you to see when it’s needed to be refilled. Circulating filtration system: the circulating filtration system uses a replaceable charcoal filter to purify the water, remove hair, dirt and food particles and a pre-filter sponge to catch the hair and debris. It provides fresh clean water to your lovely pets. Hassle-free: the pet fountain only takes a few minutes to set up. Disassembling for cleaning and maintenance is easy. BPA free cat fountain is safe for your pets. Call or email our customer support team in California if you have any questions. 360° multi-directional streams aerate the water for added oxygen and freshness. A source of running water encourages pets to drink more rather than still water. Hydration helps prevent your pet from urinary and kidney diseases."
    reviews = "Rating: 2/5 I put chocolate in this fountain and it didnt melt at all, it broke too and the seller wouldn't refund me, this chocolate fountain sucks"
    
    pprint(analyze_product_reviews(product, reviews))