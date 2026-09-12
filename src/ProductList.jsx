import ProductCard from "./ProductCard";

function ProductList({ products }) {
  if (products.length === 0) {
    return <h3>No products found</h3>;
  }

  return (
    <div>
        {/* Built-in Rendering: .map() */}
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

export default ProductList;