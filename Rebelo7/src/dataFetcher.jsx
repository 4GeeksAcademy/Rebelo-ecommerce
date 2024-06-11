import  { useEffect, useState } from "react";


function DataFetcher() {
  const [products, setProducts] = useState([]);
  const [filterValue, setFilterValue] = useState(""); // State for holding the filter value

  useEffect(() => {
    async function fetchData() {
      let response = await fetch("https://raw.githubusercontent.com/lukaszwos/4geeks-ecommerce/master/data.json");
      let productData = await response.json();
      setProducts(productData); // Set all products initially
    }
    fetchData();
  }, []);

  // Filter products based on the filterValue
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div className="container">
      {/* Input field for filtering by name */}
      <input
        type="text"
        className="form-control mt-3"
        placeholder="Search by product name..."
        aria-label="Search"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />
      
      {filteredProducts.map((product, index) => (
        <div key={index} className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">Category: {product.category}</p>
              <p className="card-text">Price: {product.price}</p>
              <p className="card-text">In Stock: {product.inStock? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DataFetcher;

