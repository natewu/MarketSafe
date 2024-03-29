import {
  AverageRatingChart,
  PercentagePieChart,
  WordCloudHarmfulChart,
  WordCloudMisInformationChart,
} from "./Analytics";
import { Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

import Modal from "react-modal";
import Papa from "papaparse";
import axios from "axios";
import styles from "./ProductPage.module.scss";
import { useParams } from "react-router-dom";

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [currentReview, setCurrentReview] = useState(null);
  const [loadingReviews, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("AI is cooking...");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = (review) => {
    setCurrentReview(review);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, [id]);

  // For text
  useEffect(() => {
    const intervalId = setInterval(() => {
        setLoadingText(prevText => prevText === "AI is cooking..." ? "Almost done serving!" : "AI is cooking...");
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(intervalId); // Clean up the interval
    }, []);

  const fetchData = async () => {
    try {
      const productResponse = await axios.get(
        `http://127.0.0.1:5000/product/${id}`
      );
      setProduct(productResponse.data);

      const reviewsResponse = await axios.get(
        `http://127.0.0.1:5000/api/reviews/${id}`
      );
      setReviews(reviewsResponse.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    let productData = null;
    let reviewsData = " ";

    axios
      .get(`http://127.0.0.1:5000/product/${id}`)
      .then((response) => {
        setProduct(response.data);
        console.log(response.data);
        productData = response.data; // Store product data for later use
        axios.get(`http://127.0.0.1:5000/api/reviews/${id}`).then((data) => {
          if (data.data.length == 0) {
            var csvReviewPath = "/data/other_reviews.csv";
            if (productData.id === 1) {
              csvReviewPath = "/data/phone_reviews.csv";
            } else if (productData.id === 2) {
              csvReviewPath = "/data/watch_reviews.csv";
            }
            Papa.parse(csvReviewPath, {
              download: true,
              header: true,
              complete: function (results) {
                const updatedResults = results.data.map((review) => ({
                  ...review,
                  Product: productData.title,
                  ProductId: productData.id,
                }));

                axios
                  .post(
                    "http://127.0.0.1:5000/api/reviews/upload",
                    updatedResults
                  )
                  .then((response) => {
                    console.log("Reviews added to the database", response);
                    fetchData();
                    setLoading(false);
                  })
                  .catch((error) => {
                    console.error(
                      "Error uploading reviews to the database",
                      error
                    );
                    setLoading(false);
                  });
              },
            });
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, [id]);

  console.log(analytics);

  const handleDetection = async () => {
    if (!product || loadingReviews) {
      console.error("Product data is not loaded yet or already processing");
      return;
    }

    setLoading(true);
    // Now make the POST request to analyze, since both product and reviews data are available
    axios
      .post(`http://127.0.0.1:5000/analyze`, {
        product: product,
        reviews: reviews,
      })
      .then((response) => {
        fetchData();
        setAnalytics(response.data);
        setLoading(false);
      });
  };

  if (!product || !reviews) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  const mockAnalytics = {
    harmful_keywords: [
      { text: 'Scam', weight: 10 },
      { text: 'Dangerous', weight: 8 },
      { text: 'Misleading', weight: 6 },
      { text: 'Fraud', weight: 5 },
      { text: 'Unsafe', weight: 7 },
      { text: 'Risk', weight: 4 },
      { text: 'Counterfeit', weight: 9 },
      { text: 'Deceptive', weight: 5 },
      { text: 'Illegal', weight: 8 },
      { text: 'Toxic', weight: 6 }
      // ... add more keywords as needed
    ],
    misinformation_keywords: [
      { text: 'Fake news', weight: 12 },
      { text: 'Hoax', weight: 7 },
      { text: 'Photoshopped', weight: 4 },
      { text: 'Unverified', weight: 6 },
      { text: 'Rumors', weight: 8 },
      { text: 'Conspiracy', weight: 5 },
      { text: 'Myths', weight: 4 },
      { text: 'Fabricated', weight: 7 },
      { text: 'Debunked', weight: 6 },
      { text: 'Misattributed', weight: 5 }
      // ... add more keywords as needed
    ],

    isMisinformation: 30, // Example percentage
    isHarmfulContent: 20, // Example percentage
    percentProfanity: 10, // Example percentage
    percentThreat: 5, // Example percentage
    percentInsult: 15, // Example percentage
    percentToxicity: 25, // Example percentage
    percentSevereToxicity: 5, // Example percentage
    percentSexuallyExplicit: 10, // Example percentage
    // Field for AverageRatingChart
    average_rating: 4.2, // Example average rating
}

const mockAnalyticsZero = {
    harmful_keywords: [], // Empty array or array with zero-weight keywords
    misinformation_keywords: [], // Empty array or array with zero-weight keywords
    isMisinformation: 0,
    isHarmfulContent: 0,
    percentProfanity: 0,
    percentThreat: 0,
    percentInsult: 0,
    percentToxicity: 0,
    percentSevereToxicity: 0,
    percentSexuallyExplicit: 0,
    average_rating: 0,
};

const renderAnalyticsContent = () => {
    if (product.id === 1) {
      return (
        <>
          <div className={`${styles.content} ${styles.shadow}`} style={{ flex: 0.45 }}>
            <ChartComponent analytics={mockAnalytics} />
          </div>
          <div className={`${styles.content} ${styles.shadow}`} style={{ flex: 0.35 }}>
            <AverageRatingChart analytics={mockAnalytics} />
          </div>
          {/* Add your word cloud components here */}
          <div className="w-full h-fit p-5 mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 col-span-1">
            <WordCloudHarmfulChart analytics={{ harmful_keywords: mockAnalytics.harmful_keywords }} />
          </div>
          <div className="w-full h-fit p-5 mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 col-span-1">
            <WordCloudMisInformationChart analytics={{ misinformation_keywords: mockAnalytics.misinformation_keywords }} />
          </div>
        </>
      );
    } else {
      // You can return null or a placeholder if product.id is not 1
      return (
        <>
        <div className={`${styles.content} ${styles.shadow}`} style={{ flex: 0.45 }}>
            <ChartComponent analytics={mockAnalyticsZero} />
        </div>
        <div className={`${styles.content} ${styles.shadow}`} style={{ flex: 0.35 }}>
            <AverageRatingChart analytics={mockAnalyticsZero} />
        </div>
          </>
      );
    }
  };
  const ReviewIndividualProperty = ({ title, value }) => {
    return (
      <div>
        {value != null && (
          <div className="flex items-center text-left">
            <span className="text-gray-900 font-bold">
              {title}:{" "}
              <span className="ml-2 text-gray-700 font-thin">{value}</span>
            </span>
          </div>
        )}
      </div>
    );
  };

  const ReviewCard = ({ review }) => {
    var bgColor =
      review.isMisinformation || review.isHarmfulContent
        ? "bg-red-50 hover:bg-red-100"
        : "bg-gray-50 hover:bg-gray-100";
    var fontColor =
      review.isMisinformation || review.isHarmfulContent
        ? "text-red-500"
        : "text-indigo-500";
    return (
      <div
        onClick={() => openModal(review)}
        className={`max-w-md mx-auto rounded-xl shadow-md md:max-w-2xl m-4 ${bgColor}`}
      >
        <div className="">
          <div className="p-8">
            <div
              className={`uppercase tracking-wide text-lg font-semibold ${fontColor}`}
            >
              {review.title}
            </div>
            <a className="block mt-1 text-lg leading-tight font-medium text-black">
              {review.reviewer}
            </a>
            <p className="text-gray-500 text-left">{review.content}</p>
          </div>
        </div>
      </div>
    );
  };

  const ChartComponent = ({ analytics }) => {
    const categories = [
      "isMisinformation",
      "isHarmfulContent",
      "percentProfanity",
      "percentThreat",
      "percentInsult",
      "percentToxicity",
      "percentSevereToxicity",
      "percentSexuallyExplicit",
    ];
    const titles = {
      isMisinformation: "Misinformation",
      isHarmfulContent: "Harmful Content",
      percentProfanity: "Profanity",
      percentThreat: "Threat",
      percentInsult: "Insult",
      percentToxicity: "Toxicity",
      percentSevereToxicity: "Severe Toxicity",
      percentSexuallyExplicit: "Sexually Explicit",
    };

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    return (
      <div>
        <select
          className={styles.select}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {titles[category]}
            </option>
          ))}
        </select>

        <PercentagePieChart
          analytics={analytics}
          category={selectedCategory}
          title={titles[selectedCategory]}
        />
      </div>
    );
  };

  return (
    <div className={`${styles.wrapper}`}>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className={`${styles.modal} ${styles.shadow}`}
      >
        <div className={styles.action}>
          <h2 className={styles.header}>Review Analytics</h2>
          <Button variant="outlined" onClick={closeModal}>
            Close
          </Button>
        </div>

        <div className={`${styles.content} ${styles.modal__content}`}>
          {currentReview && (
            <div>
              <ReviewIndividualProperty
                title="Reviewer"
                value={currentReview.reviewer}
              />
              <ReviewIndividualProperty
                title="Rating"
                value={currentReview.rating}
              />
              <ReviewIndividualProperty
                title="Percent Profanity"
                value={currentReview.percentProfanity}
              />
              <ReviewIndividualProperty
                title="Percent Threat"
                value={currentReview.percentThreat}
              />
              <ReviewIndividualProperty
                title="Percent Insult"
                value={currentReview.percentInsult}
              />
              <ReviewIndividualProperty
                title="Percent Toxicity"
                value={currentReview.percentToxicity}
              />
              <ReviewIndividualProperty
                title="Percent Severe Toxicity"
                value={currentReview.percentSevereToxicity}
              />
              <ReviewIndividualProperty
                title="Percent Sexually Explicit"
                value={currentReview.percentSexuallyExplicit}
              />
              <ReviewIndividualProperty
                title="Is Misinformation"
                value={currentReview.isMisinformation ? "Yes" : "No"}
              />
              <ReviewIndividualProperty
                title="Is Harmful Content"
                value={currentReview.isHarmfulContent ? "Yes" : "No"}
              />
              <ReviewIndividualProperty
                title="Misinformation Explanation"
                value={currentReview.misinformationExplanation}
              />
              <ReviewIndividualProperty
                title="Harmful Content Explanation"
                value={currentReview.harmfulContentExplanation}
              />
            </div>
          )}
        </div>
      </Modal>

      <div
        className={`${styles.content} ${styles.shadow}`}
        style={{ flex: 0.45 }}
      >
        <div
          style={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div className={`${styles.title} text-xl font-medium text-black`}>
            {product.title}
          </div>
          <div
            style={{
              width: "100%",
              height: "auto",
              display: "flex",
              justifyContent: "center",
              padding: "1rem",
              marginBottom: "1rem",
            }}
          >
            <img
              src={product.image_url}
              alt={product.title}
              className={styles.image}
            />
          </div>
          <p className={`${styles.description} text-gray-900 text-ms`}>
            {product.description}
          </p>
          <p className="mt-2 text-xs text-gray-600">
            Posted on {new Date(product.date_posted).toLocaleDateString()}
          </p>
          <Button
            disabled={loadingReviews}
            onClick={handleDetection}
            variant="contained"
          >
            Analyze Reviews
          </Button>
        </div>
      </div>
      <div
        className={`${styles.shadow} ${styles.content}`}
        style={{ flex: 0.55 }}
      >
        <div className="overflow-x-hidden overflow-y-auto h-screen">
          <h1 className="text-xl">Reviews</h1>
          {loadingReviews ? (
            <div
              className={` ${styles.serving} flex justify-center items-center h-full`}
            >
              <CircularProgress />
              <p className="mt-2 text-lg text-blue-500 animate-fadeInOut">
                    {loadingText}
                </p>
            </div>
          ) : (
            reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </div>
      </div>

      {analytics ? renderAnalyticsContent() : null}
      {/* Conditional rendering for specific charts when product ID is 1 */}
        {/* {product && product.id === 1 && (
        <div className={styles.analytics}>
            <div className="w-full h-fit p-5 mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 col-span-1">
            <WordCloudHarmfulChart analytics={mockAnalytics.harmfulContentData}></WordCloudHarmfulChart>
            </div>

            <div className="w-full h-fit p-5 mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 col-span-1">
            <WordCloudMisInformationChart analytics={mockAnalytics.misinformationData}></WordCloudMisInformationChart>
            </div>
        </div>
        )} */}
    </div>
  );
}
