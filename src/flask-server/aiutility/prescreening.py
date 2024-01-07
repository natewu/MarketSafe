# Perspective API
"""
pip install google-api-python-client
pip install python-dotenv
pip install google-cloud-bigquery
Ask Ana for amazonhatespeech-1857bd410110.json and put it in this aiutility folder
"""
from googleapiclient import discovery
from google.cloud.bigquery.client import Client
import os
import json
from dotenv import load_dotenv
load_dotenv()

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = "src/flask-server/aiutility/amazonhatespeech-1857bd410110.json"

load_dotenv()

client = discovery.build(
    "commentanalyzer",
    "v1alpha1",
    developerKey=os.environ.get('PERSPECTIVE_API_KEY'),
    discoveryServiceUrl="https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1",
    static_discovery=False,
)

def analyze_review(review):
    analyze_request = {
        'comment': { 'text': review },
        'requestedAttributes': {'TOXICITY': {}, 'SEVERE_TOXICITY': {}, 'IDENTITY_ATTACK': {}, 'INSULT': {}, 'PROFANITY': {}, 'THREAT': {}, 'SEXUALLY_EXPLICIT': {}}
    }
    response = client.comments().analyze(body=analyze_request).execute()
    return response

#print(json.dumps(result, indent=2))
if __name__ == "__main__":
    result = analyze_review("""I have been a student for over thirty years. This is one of the worst books I’ve read on the Black Madonna. As a white, retired United Methodist pastor, Cleveland’s book was bad. After reading this book, I believe you will be inspired to never read a similar book. I will be watching for what kind of spiritual community Cleveland is able to find/create.  I still think in general women are stupid and bad. I dont want to read more books by women""")
    print(json.dumps(result, indent=2))

"""
Output format:
{
  "attributeScores": {
    "PROFANITY": {
      "spanScores": [
        {
          "begin": 0,
          "end": 66,
          "score": {
            "value": 0.06646215,
            "type": "PROBABILITY"
          }
        }
      ],
      "summaryScore": {
        "value": 0.06646215,
        "type": "PROBABILITY"
      }
    },
    "THREAT": {
      "spanScores": [
        {
          "begin": 0,
          "end": 66,
          "score": {
            "value": 0.007521313,
            "type": "PROBABILITY"
          }
        }
      ],
      "summaryScore": {
        "value": 0.007521313,
        "type": "PROBABILITY"
      }
    },
    "INSULT": {
      "spanScores": [
        {
          "begin": 0,
          "end": 66,
          "score": {
            "value": 0.06512285,
            "type": "PROBABILITY"
          }
        }
      ],
      "summaryScore": {
        "value": 0.06512285,
        "type": "PROBABILITY"
      }
    },
    "IDENTITY_ATTACK": {
      "spanScores": [
        {
          "begin": 0,
          "end": 66,
          "score": {
            "value": 0.0061416444,
            "type": "PROBABILITY"
          }
        }
      ],
      "summaryScore": {
        "value": 0.0061416444,
        "type": "PROBABILITY"
      }
    },
    "TOXICITY": {
      "spanScores": [
        {
          "begin": 0,
          "end": 66,
          "score": {
            "value": 0.20056234,
            "type": "PROBABILITY"
          }
        }
      ],
      "summaryScore": {
        "value": 0.20056234,
        "type": "PROBABILITY"
      }
    },
    "SEXUALLY_EXPLICIT": {
      "spanScores": [
        {
          "begin": 0,
          "end": 66,
          "score": {
            "value": 0.012739069,
            "type": "PROBABILITY"
          }
        }
      ],
      "summaryScore": {
        "value": 0.012739069,
        "type": "PROBABILITY"
      }
    },
    "SEVERE_TOXICITY": {
      "spanScores": [
        {
          "begin": 0,
          "end": 66,
          "score": {
            "value": 0.0037574768,
            "type": "PROBABILITY"
          }
        }
      ],
      "summaryScore": {
        "value": 0.0037574768,
        "type": "PROBABILITY"
      }
    }
  },
  "languages": [
    "en"
  ],
  "detectedLanguages": [
    "en"
  ]
}
"""