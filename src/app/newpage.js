// "use client";

// import React, { useState, useEffect } from "react";

// export default function Home() {
//   const [products, setProducts] = useState([]);
//   const [product, setProduct] = useState({
//     id: null,
//     title: "",
//     description: "",
//     price: "",
//   });

//   const [imageUrl, setImageUrl] = useState("");

//   useEffect(() => {
//     const fetchImage = async () => {
//       try {
//         const response = await fetch(
//           "https://api.pexels.com/v1/search?query=shoe&per_page=1",
//           {
//             headers: {
//               Authorization:
//                 "lio7tuhQQRQl0HEG6zDoPPjZDyBTIdi9CoZecgAC8RPPMqABEIJBFkJY",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch image");
//         }
//         const data = await response.json();
//         const image = data.photos[0];
//         setImageUrl(image.src.small);

//         const getProductsResponse = await fetch(
//           "http://localhost:8055/items/products",
//           {
//             method: "GET",
//           }
//         );
//         const products = await getProductsResponse.json();
//         setProducts(products.data);
//       } catch (error) {
//         console.error("Error fetching image:", error);
//         alert("Failed to fetch the image. Please try again later.");
//       }
//     };

//     fetchImage();
//   }, [imageUrl]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProduct({ ...product, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (product.id) {
//       updateItem();
//     } else {
//       createItem();
//     }
//   };

//   const handleEdit = (editedProduct) => {
//     setProduct({ ...editedProduct });
//   };

//   const handleDelete = (deletedProduct) => {
//     const isConfirmed = window.confirm(
//       "Are you sure you want to delete this product?"
//     );
//     if (isConfirmed) {
//       deleteItem(deletedProduct.id);
//     }
//   };

//   const createItem = async () => {
//     try {
//       const response = await fetch("http://localhost:8055/items/products", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(product),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create item");
//       }

//       const updatedProducts = await fetchProducts();
//       setProducts(updatedProducts);

//       setProduct({ id: null, title: "", description: "", price: "" });
//     } catch (error) {
//       console.error("Error creating item:", error);
//     }
//   };

//   const updateItem = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:8055/items/products/${product.id}`,
//         {
//           method: "PATCH",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(product),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update item");
//       }

//       const updatedProducts = await fetchProducts();
//       setProducts(updatedProducts);

//       setProduct({ id: null, title: "", description: "", price: "" });
//     } catch (error) {
//       console.error("Error updating item:", error);
//     }
//   };

//   const deleteItem = async (itemId) => {
//     try {
//       const response = await fetch(
//         `http://localhost:8055/items/products/${itemId}`,
//         {
//           method: "DELETE",
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete item");
//       }

//       const updatedProducts = await fetchProducts();
//       setProducts(updatedProducts);
//     } catch (error) {
//       console.error("Error deleting item:", error);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const getProductsResponse = await fetch(
//         "http://localhost:8055/items/products",
//         {
//           method: "GET",
//         }
//       );
//       const products = await getProductsResponse.json();
//       return products.data;
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       return [];
//     }
//   };

//   return (
//     <>
//       <head>
//         <title>eCommerce</title>
//       </head>
//       <body>
//         <header className="p-5 text-left bg-gray-200 font-bold">
//           <p>🟠eCommerce 🛒</p>
//         </header>

//         <main className="flex min-h-screen flex-col justify-between items-center p-5">
//           <div className="text-center">
//             <h1 className="font-bold text-3xl">ADD PRODUCT</h1>
//             <p>Add a product by filling the product form below</p>
//           </div>

//           <div className="max-w-4xl mx-auto">
//             <div className="border-t-2 border-gray-300 mb-4 "></div>
//             <form onSubmit={handleSubmit} className="my-10">
//               <div className="flex">
//                 <div className="mr-4">
//                   <label htmlFor="title" className="block font-bold">
//                     Title
//                   </label>
//                   <input
//                     type="text"
//                     name="title"
//                     className="w-full p-2 rounded box-border mb-2"
//                     value={product.title}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="mr-4">
//                   <label htmlFor="description" className="block font-bold">
//                     Description
//                   </label>
//                   <input
//                     type="text"
//                     name="description"
//                     className="w-full p-2 rounded box-border mb-2"
//                     value={product.description}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="mr-4">
//                   <label htmlFor="price" className="block font-bold">
//                     Price
//                   </label>
//                   <input
//                     type="number"
//                     name="price"
//                     className="w-full p-2 rounded box-border mb-2"
//                     value={product.price}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 <div className="mt-auto p-2">
//                   <button
//                     type="submit"
//                     className="bg-orange-500 text-white px-3 py-1 rounded-md"
//                   >
//                     {product.id ? "Update Item" : "Create Item"}
//                   </button>
//                 </div>
//               </div>
//             </form>
//             <div className="border-t-2 border-gray-300 mt-4"></div>
//           </div>
//           <h1 className="text-lg font-bold p-5">Available Products🛒</h1>
//           {products.length === 0 && <p>No products available</p>}

//           <section className="grid grid-cols-4 gap-4">
//             {products.map((product, index) => (
//               <div key={index}>
//                 <div>
//                   {imageUrl && <img src={imageUrl} alt="Pexels Image" />}
//                 </div>
//                 <h3 className="text-sm font-semibold">
//                   <b>{product.title}</b>
//                 </h3>
//                 <p className="text-sm">{product.description}</p>
//                 <p className="text-amber-500">
//                   <b>${product.price}</b>
//                 </p>
//                 <button
//                   className="bg-orange-500 text-white px-3 py-1 rounded-md mr-2"
//                   onClick={() => handleEdit(product)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="bg-orange-500 text-white px-3 py-1 rounded-md"
//                   onClick={() => handleDelete(product)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </section>
//         </main>
//       </body>
//     </>
//   );
// }
