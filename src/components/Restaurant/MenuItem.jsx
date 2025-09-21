import { IMAGE_CDN } from "../../data/api";

const formatPrice = (price) => {
  if (price == null) return "Price unavailable";

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price / 100);
};

const MenuItem = ({ item, quantity, onAdd, onRemove }) => {
  const { name, price, defaultPrice, finalPrice, imageId, description, isVeg } =
    item;
  const itemPrice = finalPrice ?? price ?? defaultPrice;
  const imageUrl = imageId ? `${IMAGE_CDN}${imageId}` : null;

  return (
    <article className="menu-item">
      <div className="menu-item-details">
        <span
          className={`menu-item-veg ${isVeg ? "is-veg" : "is-non-veg"}`}
          aria-label={isVeg ? "Vegetarian" : "Non-vegetarian"}
        />
        <h3 className="menu-item-name">{name}</h3>
        <p className="menu-item-price">{formatPrice(itemPrice)}</p>
        {description && <p className="menu-item-description">{description}</p>}
      </div>

      <div className="menu-item-action">
        {imageUrl && <img className="menu-item-image" src={imageUrl} alt={name} />}
        {quantity > 0 ? (
          <div className="quantity-control" aria-label={`${name} quantity`}>
            <button type="button" onClick={onRemove} aria-label={`Remove one ${name}`}>
              −
            </button>
            <span aria-live="polite">{quantity}</span>
            <button type="button" onClick={onAdd} aria-label={`Add one ${name}`}>
              +
            </button>
          </div>
        ) : (
          <button
            className="add-to-cart"
            type="button"
            onClick={onAdd}
            disabled={!itemPrice || item.inStock === 0}
          >
            ADD
          </button>
        )}
      </div>
    </article>
  );
};

export default MenuItem;
