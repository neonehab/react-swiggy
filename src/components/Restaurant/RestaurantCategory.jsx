import MenuItem from "./MenuItem";

const RestaurantCategory = ({
  category,
  showContent,
  setShowIndex,
  cart,
  onAdd,
  onRemove,
}) => {
  const { title, itemCards = [] } = category;

  return (
    <section className="menu-category">
      <button
        className="menu-category-toggle"
        type="button"
        onClick={setShowIndex}
        aria-expanded={showContent}
      >
        <span>
          {title} <span className="menu-category-count">({itemCards.length})</span>
        </span>
        <span className="menu-category-chevron" aria-hidden="true">
          {showContent ? "−" : "+"}
        </span>
      </button>

      {showContent && (
        <div className="menu-category-items">
          {itemCards.map(({ card }) => {
            const item = card.info;
            return (
              <MenuItem
                key={item.id}
                item={item}
                quantity={cart[item.id] || 0}
                onAdd={() => onAdd(item)}
                onRemove={() => onRemove(item)}
              />
            );
          })}
        </div>
      )}
    </section>
  );
};

export default RestaurantCategory;
