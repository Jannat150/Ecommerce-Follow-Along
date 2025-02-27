import React, { useState, useEffect } from 'react';

const ProductCart = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8088/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("Token")}`
      }
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((res) => {
      console.log(res);
      setProducts(res.data || []); // Ensure it's an array
    })
    .catch((error) => {
      console.error("Error fetching cart:", error);
    });
  }, []);

  return (
    <>
      {products.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        products.map((el, index) => (
          <div key={index}>
            <img
              src={el?.productId?.productImages?.[0] || "/placeholder-image.jpg"}
              alt={el?.productId?.productName || "Product Image"}
              width="150"
            />
            <h2>Name: {el?.productId?.productName || "Unknown Product"}</h2>
            <h3>Price: {el?.productId?.productPrice || "N/A"}</h3>
            <h4>{el?.productId?.productDescription || "No description available"}</h4>
          </div>
        ))
      )}
    </>
  );
};

export default ProductCart;
