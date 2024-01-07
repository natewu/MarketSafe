import json
from collections import defaultdict

import yake
import nltk
from collections import Counter
from nltk.corpus import stopwords

nltk.download('stopwords')
stop_words = set(stopwords.words('english'))

def extract_keywords(dict_info):
    misinformation_dict = defaultdict(int)
    harmful_dict = defaultdict(int)
    keywords_dict = {}
    for review in dict_info['reviews']:
        if review['misinformationExplanation'] is not None:
            kw_extractor = yake.KeywordExtractor(stopwords=stop_words)
            keywords = kw_extractor.extract_keywords(review['misinformationExplanation'])
            for kw, _ in keywords:
                misinformation_dict[kw] += 1


    if review['harmfulContentExplanation'] is not None:
        kw_extractor = yake.KeywordExtractor(stopwords=stop_words)
        keywords = kw_extractor.extract_keywords(review['harmfulContentExplanation'])
        for kw, _ in keywords:
            harmful_dict[kw] += 1
    keywords_dict["misinformation_keywords"] = misinformation_dict
    keywords_dict["harmful_keywords"] = harmful_dict
    return keywords_dict

def get_stats(dict_info):
    # Initialize a dictionary to store our statistics
    stats = defaultdict(int)

    # Iterate over the reviews
    for review in dict_info['reviews']:
        # Increment the total number of reviews
        stats['total_reviews'] += 1

        # Calculate the average rating
        stats['average_rating'] += review['rating']

        # Check if the review has any of the fields we're interested in
        badFeatures =  ['percentProfanity', 'percentThreat', 'percentInsult', 'percentToxicity', 'percentSevereToxicity', 'percentSexuallyExplicit', 'isMisinformation', 'isHarmfulContent']
        for key in badFeatures:
            if review[key] is not None:
                stats[key] += 1
        



   # Calculate the average ratings
    if stats['total_reviews'] > 0:
        stats['average_rating'] /= stats['total_reviews']
        for key in badFeatures:
            stats[f"{key}_to_total_ratings"] = stats[key]/stats['total_reviews']
    
    stats.update(extract_keywords(dict_info))
   # Convert the dictionary to JSON
       
    return json.dumps(dict(stats))
