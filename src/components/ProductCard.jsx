import { Link } from "react-router";
import { HeartIcon } from "./Icons";
import { useCart } from "./useCart";

export function ProductCard({ product, compact = false }) {
  const { addItem, isInWishlist, toggleWishlist } = useCart();
  const isSaved = isInWishlist(product.id);

  function handleAdd(event) {
    event.preventDefault();
    const button = event.currentTarget;
    addItem(product);
    button.textContent = "Added";
    button.dataset.added = "true";
    window.setTimeout(() => {
      button.textContent = "Add to Bag";
      button.dataset.added = "false";
    }, 1200);
  }

  function handleWishlist(event) {
    event.preventDefault();
    toggleWishlist(product);
  }

  return (
    <article className="product-card">
      <div className="product-card__image">
        <span>{product.label}</span>
        <img src={product.image} alt={product.alt} />
        <button className="product-card__wishlist" type="button" aria-label={`${isSaved ? "Remove" : "Save"} ${product.name} ${isSaved ? "from" : "to"} wishlist`} aria-pressed={isSaved} onClick={handleWishlist}>
          <HeartIcon />
        </button>
        <button className="quick-add" type="button" data-product-name={product.name} onClick={handleAdd}>
          Add to Bag
        </button>
      </div>
      <div className="product-card__meta">
        <h3>
          <Link to={`/products/${product.id}`}>{product.name}</Link>
        </h3>
        <p>
          {product.price}
          {product.oldPrice ? <s>{product.oldPrice}</s> : null}
        </p>
      </div>
      {!compact && product.descriptor ? <p className="product-card__descriptor">{product.descriptor}</p> : null}
    </article>
  );
}
