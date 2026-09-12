import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import ProductList from "./ProductList";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://dummyjson.com/products"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data.products);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Built-in approach using filter()
  // const filteredProducts = products.filter((product) =>
  //   product.title.toLowerCase().includes(search.toLowerCase())
  // );

  // Without filter() — Using a Loop
  // const filteredProducts = [];

  // for (let i = 0; i < products.length; i++) {
  //   const productTitle = products[i].title.toLowerCase();
  //   const searchText = search.toLowerCase();

  //   if (productTitle.includes(searchText)) {
  //     filteredProducts.push(products[i]);
  //   }
  // }

  // Without filter() AND Without includes()
  const filteredProducts = [];

  const searchText = search.toLowerCase();
  
  for (let i = 0; i < products.length; i++) {
    const productTitle = products[i].title.toLowerCase();
  
    let found = false;
  
    for (let j = 0; j <= productTitle.length - searchText.length; j++) {
      let match = true;
  
      for (let k = 0; k < searchText.length; k++) {
        if (productTitle[j + k] !== searchText[k]) {
          match = false;
          break;
        }
      }
  
      if (match) {
        found = true;
        break;
      }
    }
  
    if (found) {
      filteredProducts.push(products[i]);
    }
  }
  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Something went wrong: {error}</h2>;
  }

  return (
    <div>
      <h1>Product Search</h1>

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      <ProductList products={filteredProducts} />
    </div>
  );
}

export default App;