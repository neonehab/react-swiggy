import { useMemo, useState } from "react";
import restaurantsMenu from "../../data/restaurantsMenu.json";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
  const [showIndex, setShowIndex] = useState(0);
  const [cart, setCart] = useState({});
  const menuCategories =
    restaurantsMenu?.groupedCard?.cardGroupMap?.REGULAR?.cards
      ?.filter(
        (item) =>
          item?.card?.card?.["@type"] ===
          "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
      )
      .map((item) => item.card.card) ?? [];

  const cartItems = useMemo(
    () =>
      Object.values(cart).reduce(
        (total, cartItem) => total + cartItem.quantity,
        0
      ),
    [cart]
  );
  const cartTotal = useMemo(
    () =>
      Object.values(cart).reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
      ),
    [cart]
  );

  const addItem = (item) => {
    const price = item.finalPrice ?? item.price ?? item.defaultPrice;
    if (price == null || item.inStock === 0) return;

    setCart((currentCart) => ({
      ...currentCart,
      [item.id]: {
        price: price / 100,
        quantity: (currentCart[item.id]?.quantity || 0) + 1,
      },
    }));
  };

  const removeItem = (item) => {
    setCart((currentCart) => {
      const quantity = (currentCart[item.id]?.quantity || 0) - 1;
      if (quantity <= 0) {
        const nextCart = { ...currentCart };
        delete nextCart[item.id];
        return nextCart;
      }

      return {
        ...currentCart,
        [item.id]: { ...currentCart[item.id], quantity },
      };
    });
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <main className="menu-page">
      <header className="menu-page-heading">
        <p className="menu-eyebrow">MENU</p>
        <h1>Find your favourites</h1>
        <p>Freshly prepared, just the way you like it.</p>
      </header>

      {cartItems > 0 && (
        <aside className="cart-summary" aria-live="polite">
          <div>
            <strong>
              {cartItems} {cartItems === 1 ? "item" : "items"} added
            </strong>
            <span>{formatCurrency(cartTotal)}</span>
          </div>
          <span className="cart-summary-label">Your cart</span>
        </aside>
      )}

      <div className="menu-categories">
        {menuCategories.map((category, index) => (
          <RestaurantCategory
            key={category.id}
            category={category}
            showContent={index === showIndex}
            setShowIndex={() =>
              setShowIndex((current) => (current === index ? null : index))
            }
            cart={cart}
            onAdd={addItem}
            onRemove={removeItem}
          />
        ))}
      </div>
    </main>
  );
};

export default RestaurantMenu;
