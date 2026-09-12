function ProductCard({ product }) {
  return (
    <div>
      <img
        src={product.thumbnail}
        alt={product.title}
        width="150"
      />

      <h3>{product.title}</h3>

      <p>Price: ₹{product.price}</p>
    </div>
  );
}

export default ProductCard;