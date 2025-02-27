import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1); // Default quantity starts from 1
  const { id } = useParams(); // Retrieve the product ID from the URL

  // Fetch product data from the API based on the product ID
  const fetchData = async () => {
    try {
      let res = await fetch(`http://localhost:8088/products/${id}`);
      res = await res.json();
      console.log(res);
      setProduct(res.data); // Assuming that 'data' contains the product details
    } catch (error) {
      console.log(error);
    }
  };

  // Handle adding product to the cart
  const handleClick = () => {
    console.log("Product added to the cart:", product);
    console.log("Quantity:", qty);
    // Implement your cart functionality here
  };

  // Increment the quantity
  const handleIncrement = () => {
    setQty((prevQty) => prevQty + 1);
  };

  // Decrement the quantity (prevent going below 1)
  const handleDecrement = () => {
    if (qty > 1) {
      setQty((prevQty) => prevQty - 1);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, [id]); // Re-fetch if the product ID changes

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Conditional rendering to avoid accessing undefined properties */}
      {product.productImages ? (
        <img
          src={product.productImages[0]}
          alt={product.productName}
          className="w-full h-auto object-cover rounded-lg"
        />
      ) : (
        <p className="text-gray-500 text-center">Loading product image...</p>
      )}
      <h3 className="text-3xl font-semibold text-gray-800 mt-6">{product.productName}</h3>
      <h4 className="text-xl font-bold text-blue-500 mt-2">${product.productPrice}</h4>
      <p className="text-gray-600 mt-4">{product.productDescription}</p>

      {/* Quantity Selector */}
      <div className="mt-4 flex items-center space-x-4">
        <button
          onClick={handleDecrement}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg focus:outline-none hover:bg-gray-400"
        >
          -
        </button>
        <h3 className="text-xl font-bold">{qty}</h3>
        <button
          onClick={handleIncrement}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg focus:outline-none hover:bg-gray-400"
        >
          +
        </button>
      </div>

      {/* Add to Cart button */}
      <button
        onClick={handleClick}
        className="mt-6 w-full py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default SingleProduct;
