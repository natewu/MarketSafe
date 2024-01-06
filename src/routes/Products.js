import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import styles from './Products.module.scss';

// Mock data
const products = [
 { id: 1, img: 'https://via.placeholder.com/150', title: 'Product 1', desc: 'This is product 1' },
 { id: 2, img: 'https://via.placeholder.com/150', title: 'Product 2', desc: 'This is product 2' },
 { id: 2, img: 'https://via.placeholder.com/150', title: 'Product 2', desc: 'This is product 2' },
 { id: 2, img: 'https://via.placeholder.com/150', title: 'Product 2', desc: 'This is product 2' },
 { id: 2, img: 'https://via.placeholder.com/150', title: 'Product 2', desc: 'This is product 2' },
 // Add more products as needed
];

function AddProduct() {
    console.log("bithc")
}

export default function Products() {
 return (
   <div className={`${styles.Products} p6`}>
    <div className='grid grid-cols-2 gap-3'>
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Shopping Dashboard</h1>
        </div>
        <div>
            <button onClick={AddProduct} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                <span className='mr-4'><AddIcon></AddIcon></span>
                Add Product
            </button>
        </div>
     </div>
     <div className="mt-4">
      <div className="flex space-x-4">
        <select className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">Category</option>
          {/* Add options here */}
        </select>
        <input type="search" className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Price Range"/>
        <input type="text" className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Tags"/>
      </div>
    </div>
     <div className="mt-4">
       <h2 className="text-2xl font-semibold text-gray-800 mb-2">Products</h2>
       <div className="grid grid-cols-3 gap-4">
       {products.map(product => (
         <div key={product.id} className="rounded-lg overflow-hidden">
           <img src={product.img} alt={product.title} className="w-full h-64 object-cover block mx-auto"/>
           <div className="p-4">
             <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.title}</h3>
             <p className="text-gray-600">{product.desc}</p>
           </div>
         </div>
       ))}
     </div>
     </div>
   </div>
 );
}
