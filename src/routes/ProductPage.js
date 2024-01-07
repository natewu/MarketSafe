import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Papa from 'papaparse';
import {AverageRatingChart, WordCloudHarmfulChart, WordCloudMisInformationChart, PercentagePieChart} from './Analytics'
import Modal from 'react-modal';

export default function ProductPage() {
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState(null);
    const [analytics, setAnalytics] = useState(null);
    const [currentReview, setCurrentReview] = useState(null);
    

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = (review) => {
        setCurrentReview(review)
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };
              
    const { id } = useParams();
   console.log(id);
   useEffect(() => {
    // Replace 'id' with the actual product id
        axios.get(`http://127.0.0.1:5000/product/${id}`)
        .then(response => {
            setProduct(response.data);
        })
        .catch(error => {
            console.error('Error fetching product data: ', error);
        });
    
        axios.get(`http://127.0.0.1:5000/api/reviews/${id}`)
        .then(response => {
            setReviews(response.data);
        })
        .catch(error => {
            console.error('Error fetching reviews data: ', error);
        });

        axios.get(`http://localhost:5000/analyze/product/${id}`)
        .then(response => {
            setAnalytics(response.data);
        })
        .catch(error => {
            console.error('Error fetching analyze product data: ', error);
        });
        
    }, []);

    const handleDetection = () => {
        if (!product) {
            console.error('Product data is not loaded yet');
            return;
        }

        const csvReviewPath = '/data/phone_reviews.csv'; 
        Papa.parse(csvReviewPath, {
            download: true,
            header: true,
            complete: function (results) {
                const updatedResults = results.data.map(review => ({
                    ...review,
                    Product: product.title,
                    ProductId: product.id
                }));

                axios.post('http://127.0.0.1:5000/api/reviews/upload', updatedResults)
                    .then(response => {
                        console.log('Reviews added to the database', response);
                    })
                    .catch(error => {
                        console.error('Error uploading reviews to the database', error);
                    });
            }
        });
    };


   if (!product || !reviews || !analytics) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }


    const ReviewIndividualProperty = ({title, value}) => {
       return ( 
        <div>
            {value != null &&
            <div className="flex items-center text-left">
                <span className="text-gray-900 font-bold">{title}: <span className="ml-2 text-gray-700 font-thin">{value}</span></span>
            </div>}
        </div>
        );
    }


    const ReviewCard = ({ review }) => {
        var bgColor = review.isMisinformation || review.isHarmfulContent ? "bg-red-50 hover:bg-red-100"  : "bg-gray-50 hover:bg-gray-100" 
        var fontColor = review.isMisinformation || review.isHarmfulContent ? "text-red-500"  : "text-indigo-500" 
        return (
            <div onClick={() => openModal(review)} className={`max-w-md mx-auto rounded-xl shadow-md md:max-w-2xl m-4 ${bgColor}`}>
            <div className="">
              <div className="p-8">
                <div className={`uppercase tracking-wide text-lg font-semibold ${fontColor}`}>{review.title}</div>
                <a className="block mt-1 text-lg leading-tight font-medium text-black">{review.reviewer}</a>
                <p className="text-gray-500 text-left">{review.content}</p>
              </div>
            </div>
          </div>
        );
       };
       

       const ChartComponent = ({ analytics }) => {
        const categories = ["isMisinformation", "isHarmfulContent", "percentProfanity", "percentThreat", "percentInsult", "percentToxicity", "percentSevereToxicity", "percentSexuallyExplicit"];
        const titles = {
            "isMisinformation": "Misinformation",
            "isHarmfulContent": "Harmful Content",
            "percentProfanity": "Profanity",
            "percentThreat": "Threat",
            "percentInsult": "Insult",
            "percentToxicity": "Toxicity",
            "percentSevereToxicity": "Severe Toxicity",
            "percentSexuallyExplicit": "Sexually Explicit"
        };
     
        const [selectedCategory, setSelectedCategory] = useState(categories[0]);
     
        return (
            <div>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    {categories.map((category) => (
                       <option key={category} value={category}>{titles[category]}</option>
                    ))}
                </select>
     
                <PercentagePieChart analytics={analytics} category={selectedCategory} title={titles[selectedCategory]} />
            </div>
        );
     };

   return (
    <div className='grid grid-cols-2 gap-3 overflow-scroll my-10'>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            >
            <h2>Your Review</h2>
            <button onClick={closeModal}>Close</button>
            <div className="mt-4">
            {currentReview && 
            <div>
                <ReviewIndividualProperty title="Reviewer" value={currentReview.reviewer} />
                <ReviewIndividualProperty title="Rating" value={currentReview.rating} />
                <ReviewIndividualProperty title="Percent Profanity" value={currentReview.percentProfanity} />
                <ReviewIndividualProperty title="Percent Threat" value={currentReview.percentThreat} />
                <ReviewIndividualProperty title="Percent Insult" value={currentReview.percentInsult} />
                <ReviewIndividualProperty title="Percent Toxicity" value={currentReview.percentToxicity} />
                <ReviewIndividualProperty title="Percent Severe Toxicity" value={currentReview.percentSevereToxicity} />
                <ReviewIndividualProperty title="Percent Sexually Explicit" value={currentReview.percentSexuallyExplicit} />
                <ReviewIndividualProperty title="Is Misinformation" value={currentReview.isMisinformation ? 'Yes' : 'No'} />
                <ReviewIndividualProperty title="Is Harmful Content" value={currentReview.isHarmfulContent ? 'Yes' : 'No'} />
                <ReviewIndividualProperty title="Misinformation Explanation" value={currentReview.misinformationExplanation} />
                <ReviewIndividualProperty title="Harmful Content Explanation" value={currentReview.harmfulContentExplanation} />
            </div>
            }
            </div>
        </Modal>




       <div className="w-full h-fit p-5 mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
           <div>
               <div className="text-xl font-medium text-black">{product.title}</div>
               <img src={product.image_url} alt={product.title} className="h-48 w-full flex mx-auto p-10 object-cover mt-2" />
               <p className="text-gray-900 text-ms">{product.description}</p>
               <p className="mt-2 text-xs text-gray-600">Posted on {new Date(product.date_posted).toLocaleDateString()}</p>
               <button onClick={handleDetection} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Analyze Reviews
                </button>
           </div>
       </div>
       <div className="w-full h-fit p-5 mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 col-span-1">
            <div className='overflow-x-hidden overflow-y-scroll h-screen'>
                <h1 className="text-xl">Reviews</h1>
                {reviews.map((review) => 
                    <ReviewCard key={review.id} review={review} />
                )}
            </div>
        </div>

        <ChartComponent analytics={analytics}></ChartComponent>

        <div className="w-full h-fit p-5 mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 col-span-1">
            <AverageRatingChart analytics={analytics}></AverageRatingChart>
        </div>

        <div className="w-full h-fit p-5 mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 col-span-1">
            <WordCloudHarmfulChart analytics={analytics}></WordCloudHarmfulChart>
        </div>

        <div className="w-full h-fit p-5 mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 col-span-1">
            <WordCloudMisInformationChart analytics={analytics}></WordCloudMisInformationChart>
        </div>

        
    </div>
   );
}
