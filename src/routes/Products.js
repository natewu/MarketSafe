import {React, useState} from 'react';
import AddIcon from '@mui/icons-material/Add';


// Mock data
const products = [
 { id: 1, img: 'https://via.placeholder.com/150', title: 'Product 1', desc: 'This is product 1' },
 { id: 2, img: 'https://via.placeholder.com/150', title: 'Product 2', desc: 'This is product 2' },
 { id: 2, img: 'https://via.placeholder.com/150', title: 'Product 2', desc: 'This is product 2' },
 { id: 2, img: 'https://via.placeholder.com/150', title: 'Product 2', desc: 'This is product 2' },
 { id: 2, img: 'https://via.placeholder.com/150', title: 'Product 2', desc: 'This is product 2' },
 // Add more products as needed
];
   
export default function Products() {


    const [isOpen, setIsOpen] = useState(false);
    const [url, setUrl] = useState('');
    
       
    const handleSubmit = () => {
        console.log(url);
        setIsOpen(false);
       };
     
    return (
    <div>
        {isOpen && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                <div className="flex items-center justify-center min-h-screen">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <div className="bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                            Add Product
                        </h3>
                        <div className="mt-2">
                            <input type="text" value={url} onChange={e => setUrl(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Enter URL"/>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button onClick={handleSubmit} type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                        Submit
                    </button>
                    <button onClick={() => setIsOpen(false)} type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                        Close
                    </button>
                    </div>
                </div>
            </div>
        </div>
      )}



   <div className="p-6">
    <div className='grid grid-cols-2 gap-3'>
        <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Shopping Dashboard</h1>
        </div>
        <div>
            <button onClick={() => setIsOpen(true)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
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
     </div>
 );
}
