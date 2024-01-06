import os
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
    prompt = f"Can you tell me, in these two categories with the the following reviews: {reviews}, based on the product description: {product}?" + "\n Back up each of your claims in these categories, as well as saying 'yes' or 'no': Misinformation, Harmful content. Misinformation includes a bad review expecting something that was clearly not part of the product. Please answer in the following format:" + """\n
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
    product = "Item detailsKidsRobot Nano R3 Dev Board with I/O Expansion Shield, Compatible with Arduino Nano 3.0, Pre-Soldered Headers, USB Type-C Interface (DO NOT Support Apple M1 CPU)"
    reviews = "Rating 1/5: The manufacturer’s drivers absolutely won’t work on a Mac, even an Intel Mac. Garbage.."
    
    pprint(analyze_product_reviews(product, reviews))