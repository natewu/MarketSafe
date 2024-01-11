import React from 'react';
import { Chart } from 'react-google-charts';
import WordCloud from 'react-wordcloud';

export const AverageRatingChart = ({ analytics }) => {
    const data = [
        ['Category', 'Value'],
        ['Average Rating', analytics ? analytics.average_rating : 0],
    ];
   
    return (
        <Chart
            chartType="Bar"
            data={data}
            options={{ title: 'Review Statistics' }}
            width="100%"
            height="400px"
        />
    );
};

   
// Create a pie chart for percentages of different review categories
export const PieChart = (analytics) => {
const data = Object.entries(analytics)
    .filter(([key]) => key.endsWith('_to_total_ratings'))
    .map(([category, value]) => [category.replace('_to_total_ratings', ''), value]);

return (
    <Chart
    chartType="PieChart"
    data={data}
    options={{ title: 'Percentages of Different Review Categories' }}
    width="100%"
    height="400px"
    />
);
};
const options = {
    rotations: 2,
    rotationAngles: [-90, 0],
    fontSizes: [20,70],
};


// Create a word cloud for misinformation keywords
export const WordCloudMisInformationChart = ({ analytics }) => {
    console.log(analytics);
    if (analytics && analytics.misinformation_keywords) {
        const words = analytics.misinformation_keywords.map(({ text, weight }) => ({ text, value: weight }));
        return (
            <div>
                <h1 className='font-bold text-lg'>Misinformation Keywords</h1>
                <WordCloud 
                    options={options}
                    words={words} />        
            </div>       
        );
    }
    return <></>;
};

export const WordCloudHarmfulChart = ({ analytics }) => {
    if (analytics && analytics.harmful_keywords) {
        const words = analytics.harmful_keywords.map(({ text, weight }) => ({ text, value: weight }));
        return (
            <div>
                <h1 className='font-bold text-lg'>Harmful Keywords</h1>
                <WordCloud 
                    options={options}
                    words={words} />        
            </div>
        );
    }
    return <></>;
};

function getPieChartData(analytics, category, title) {
    let data = [];
    let total = analytics['total_reviews'];
    let normalActors = total - analytics[category];
    data.push(['Category', 'Count']);
    data.push([`${title} Review`, analytics[category]]);
    data.push(['Normal Review', normalActors]);
    return data;
   }
   

export const PercentagePieChart = ({analytics, category, title}) => {
    console.log("here" + category)
    let data = getPieChartData(analytics, category, title);
    let options = {
      title: `Percentage of Reviews that Contain ${title}`,
      pieHole: 0.4,
    };
    return (
      <Chart
        width={'600px'}
        height={'320px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={options}
      />
    );
};


