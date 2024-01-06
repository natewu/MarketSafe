# Perspective API
from googleapiclient import discovery
import json
from dotenv import load_dotenv

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

result = analyze_review("This product sucks, it easily broke and I had to return it twice.")
print(json.dumps(result, indent=2))
