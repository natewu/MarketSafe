import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProductPage() {
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState(null);
    
    const { id } = useParams();
   console.log(id);
   useEffect(() => {
    // Replace 'id' with the actual product id
        axios.get(`http://localhost:5000/product/${id}`)
        .then(response => {
            setProduct(response.data);
        })
        .catch(error => {
            console.error('Error fetching product data: ', error);
        });
    
        axios.get(`http://localhost:5000/api/reviews/${id}`)
        .then(response => {
            setReviews(response.data);
        })
        .catch(error => {
            console.error('Error fetching product data: ', error);
        });
    }, []);


   if (!product || !reviews) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }


    const ReviewIndividualProperty = ({title, value}) => {
       return ( 
        <div>
            {value &&
            <div className="flex items-center">
                <span className="text-gray-600">{title}: <span className="ml-2 text-gray-900">{value}</span></span>
            </div>}
        </div>
        );
    }


    const ReviewCard = ({ review }) => {
        return (
          <div className="max-w-md mx-auto bg-gray-50 hover:bg-gray-100 rounded-xl shadow-md md:max-w-2xl m-4">
            <div className="">
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{review.title}</div>
                <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black">{review.reviewer}</a>
                <p className="mt-2 text-gray-500">{review.content}</p>
                <div className="mt-4">
                    <ReviewIndividualProperty title="Reviewer" value={review.reviewer} />
                    <ReviewIndividualProperty title="Rating" value={review.rating} />
                    <ReviewIndividualProperty title="Percent Profanity" value={review.percentProfanity} />
                    <ReviewIndividualProperty title="Percent Threat" value={review.percentThreat} />
                    <ReviewIndividualProperty title="Percent Insult" value={review.percentInsult} />
                    <ReviewIndividualProperty title="Percent Toxicity" value={review.percentToxicity} />
                    <ReviewIndividualProperty title="Percent Severe Toxicity" value={review.percentSevereToxicity} />
                    <ReviewIndividualProperty title="Percent Sexually Explicit" value={review.percentSexuallyExplicit} />
                    <ReviewIndividualProperty title="Is Misinformation" value={review.isMisinformation ? 'Yes' : 'No'} />
                    <ReviewIndividualProperty title="Is Harmful Content" value={review.isHarmfulContent ? 'Yes' : 'No'} />
                    <ReviewIndividualProperty title="Misinformation Explanation" value={review.misinformationExplanation} />
                    <ReviewIndividualProperty title="Harmful Content Explanation" value={review.harmfulContentExplanation} />
                </div>
              </div>
            </div>
          </div>
        );
       };
       
    

   return (
    <div className='grid grid-cols-2 overflow-scroll'>
       <div className="w-5/6 m-10 h-fit p-10 mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
           <div>
               <div className="text-xl font-medium text-black">{product.title}</div>
               <img src={product.image_url} alt={product.title} className="h-48 w-full flex mx-auto p-10 object-cover mt-2" />
               <p className="text-gray-900 text-ms">{product.description}</p>
               <p className="mt-2 text-xs text-gray-600">Posted on {new Date(product.date_posted).toLocaleDateString()}</p>
           </div>
       </div>
       <div className="w-full h-fit m-10 p-10 mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 col-span-1">
            <div className='overflow-x-hidden overflow-y-scroll h-96'>
                <h1 className="text-xl">Reviews</h1>
                {reviews.map((review) => 
                    <ReviewCard key={review.id} review={review} />
                )}
            </div>
        </div>
    </div>
   );
}
