import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProductPage() {
   const [product, setProduct] = useState(null);
   const { id } = useParams();
   console.log(id);
   useEffect(() => {
       // Replace 'id' with the actual product id
       fetch(`/product/${id}`)
           .then(response => {
               setProduct(response.data);
           })
           .catch(error => {
               console.error('Error fetching product data: ', error);
           });
   }, [id]);

   if (!product) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

   return (
       <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
           <div>
               <div className="text-xl font-medium text-black">{product.title}</div>
               <p className="text-gray-500">{product.description}</p>
               <img src={product.image_url} alt={product.title} className="h-48 w-full object-cover mt-2" />
               <p className="mt-2 text-sm text-gray-500">Posted on {new Date(product.date_posted).toLocaleDateString()}</p>
           </div>
       </div>
   );
}
