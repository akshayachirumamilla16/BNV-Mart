import { useState } from "react";
import "./App.css";

const products = [
  // PICKLES
  {
    id: 1,
    name: "Mango Pickle",
    price: 249,
    category: "Pickles",
    emoji: "🥭",
    ingredients:
      "Raw mango pieces, red chilli powder, mustard seeds, fenugreek, salt and cooking oil.",
  },
  {
    id: 2,
    name: "Gongura Pickle",
    price: 249,
    category: "Pickles",
    emoji: "🌿",
    ingredients:
      "Fresh gongura leaves, red chilli powder, garlic, mustard seeds, salt and cooking oil.",
  },
  {
    id: 3,
    name: "Lemon Pickle",
    price: 199,
    category: "Pickles",
    emoji: "🍋",
    ingredients:
      "Fresh lemons, red chilli powder, mustard seeds, turmeric, salt and cooking oil.",
  },
  {
    id: 4,
    name: "Tomato Pickle",
    price: 229,
    category: "Pickles",
    emoji: "🍅",
    ingredients:
      "Fresh tomatoes, red chilli powder, garlic, mustard seeds, salt and cooking oil.",
  },
  {
    id: 5,
    name: "Ginger Pickle",
    price: 259,
    category: "Pickles",
    emoji: "🫚",
    ingredients:
      "Fresh ginger, red chilli powder, tamarind, mustard seeds, salt and cooking oil.",
  },
  {
    id: 6,
    name: "Chicken Pickle",
    price: 399,
    category: "Pickles",
    emoji: "🍗",
    ingredients:
      "Chicken, red chilli powder, ginger, garlic, turmeric, salt and cooking oil.",
  },
  {
    id: 7,
    name: "Mutton Pickle",
    price: 449,
    category: "Pickles",
    emoji: "🍖",
    ingredients:
      "Mutton, red chilli powder, ginger, garlic, turmeric, salt and cooking oil.",
  },

  // SNACKS
  {
    id: 8,
    name: "Murukku",
    price: 199,
    category: "Snacks & Sweets",
    emoji: "🥨",
    ingredients:
      "Rice flour, urad dal flour, sesame seeds, butter, salt and spices.",
  },
  {
    id: 9,
    name: "Chekkalu",
    price: 199,
    category: "Snacks & Sweets",
    emoji: "🍘",
    ingredients:
      "Rice flour, chana dal, sesame seeds, green chilli, salt and cooking oil.",
  },
  {
    id: 10,
    name: "Boondi",
    price: 169,
    category: "Snacks & Sweets",
    emoji: "🟡",
    ingredients:
      "Gram flour (besan), peanuts, curry leaves, red chilli powder, salt and oil.",
  },
  {
    id: 11,
    name: "Boondi Laddu",
    price: 199,
    category: "Snacks & Sweets",
    emoji: "🍡",
    ingredients:
      "Gram flour, sugar syrup, ghee, cardamom, cashews and raisins.",
  },
  {
    id: 12,
    name: "Karapusa",
    price: 189,
    category: "Snacks & Sweets",
    emoji: "🍜",
    ingredients:
      "Gram flour, rice flour, red chilli powder, ajwain, salt and cooking oil.",
  },
  {
    id: 13,
    name: "Palli Chikki",
    price: 199,
    category: "Snacks & Sweets",
    emoji: "🥜",
    ingredients:
      "Roasted peanuts and pure jaggery.",
  },
  {
    id: 14,
    name: "Dry Fruit Laddu",
    price: 299,
    category: "Snacks & Sweets",
    emoji: "🫘",
    ingredients:
      "Almonds, cashews, dates, pistachios, raisins, ghee and cardamom.",
  },
  {
    id: 15,
    name: "Ragi Laddu",
    price: 229,
    category: "Snacks & Sweets",
    emoji: "🍪",
    ingredients:
      "Ragi flour, jaggery, ghee, cardamom and roasted nuts.",
  },

  // SPICES
  {
    id: 16,
    name: "Garam Masala",
    price: 149,
    category: "Spices",
    emoji: "🌶️",
    ingredients:
      "Coriander, cumin, black pepper, cloves, cinnamon, cardamom and bay leaf.",
  },
  {
    id: 17,
    name: "Coriander Powder",
    price: 129,
    category: "Spices",
    emoji: "🌿",
    ingredients:
      "Freshly cleaned, roasted and finely ground coriander seeds.",
  },
];

function App() {
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const categories = [
    "All",
    "Pickles",
    "Snacks & Sweets",
    "Spices",
  ];

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  // ADD TO CART
  const addToCart = (product) => {
    setCart((oldCart) => {
      const existing = oldCart.find((item) => item.id === product.id);

      if (existing) {
        return oldCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...oldCart, { ...product, quantity: 1 }];
    });
  };

  // INCREASE QUANTITY
  const increaseQuantity = (id) => {
    setCart((oldCart) =>
      oldCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {
    setCart((oldCart) =>
      oldCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // DELETE ITEM
  const removeFromCart = (id) => {
    setCart((oldCart) =>
      oldCart.filter((item) => item.id !== id)
    );
  };

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // PLACE ORDER
  const placeOrder = (event) => {
    event.preventDefault();

    setShowCheckout(false);
    setShowCart(false);
    setOrderPlaced(true);
  };

  return (
    <div className="app">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="brand">
          <h2>🛒 BNV <span>Mart</span></h2>
          <small>Traditional Homemade Products</small>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#about">About Us</a>

          <button
            className="cart-btn"
            onClick={() => setShowCart(true)}
          >
            🛒 Cart ({cartCount})
          </button>
        </nav>
      </header>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="hero-text">
          <p className="tagline">🌿 HOMEMADE WITH LOVE</p>

          <h1>
            Traditional Taste,
            <br />
            <span>Delivered</span> to You
          </h1>

          <p>
            Authentic homemade pickles, snacks, sweets and
            traditional products made with quality ingredients.
          </p>

          <a href="#products" className="shop-btn">
            Shop Now →
          </a>
        </div>

        <div className="hero-emoji">
          🥭
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories">
        <p className="section-tag">EXPLORE OUR PRODUCTS</p>

        <h2>Shop by Category</h2>

        <div className="category-buttons">
          {categories.map((item) => (
            <button
              key={item}
              className={category === item ? "active" : ""}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="products-section">

        <div className="section-heading">
          <p>OUR COLLECTION</p>
          <h2>Our Products</h2>
        </div>

        <div className="product-grid">

          {filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>

              <div
                className="product-emoji"
                onClick={() => setSelectedProduct(product)}
              >
                {product.emoji}
              </div>

              <p className="product-category">
                {product.category}
              </p>

              <h3>{product.name}</h3>

              <div className="product-bottom">
                <strong>₹{product.price}</strong>

                <button
                  onClick={() => addToCart(product)}
                >
                  Add +
                </button>
              </div>

              <button
                className="details-btn"
                onClick={() => setSelectedProduct(product)}
              >
                View Details
              </button>

            </div>
          ))}

        </div>
      </section>

      {/* PRODUCT DETAILS */}
      {selectedProduct && (
        <div className="modal-overlay">

          <div className="modal">

            <button
              className="close-btn"
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>

            <div className="big-emoji">
              {selectedProduct.emoji}
            </div>

            <p className="modal-category">
              {selectedProduct.category}
            </p>

            <h2>{selectedProduct.name}</h2>

            <p className="modal-price">
              ₹{selectedProduct.price}
            </p>

            <div className="ingredients-box">
              <h3>🧂 Ingredients</h3>

              <p>
                {selectedProduct.ingredients}
              </p>
            </div>

            <button
              className="modal-add"
              onClick={() => {
                addToCart(selectedProduct);
                setSelectedProduct(null);
              }}
            >
              Add to Cart 🛒
            </button>

          </div>
        </div>
      )}

      {/* CART POPUP */}
      {showCart && (
        <div className="modal-overlay">

          <div className="cart-modal">

            <button
              className="close-btn"
              onClick={() => setShowCart(false)}
            >
              ✕
            </button>

            <h2>🛒 Your Cart</h2>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <p>Your cart is empty.</p>
              </div>
            ) : (
              <>
                <div className="cart-items">

                  {cart.map((item) => (
                    <div
                      className="cart-item"
                      key={item.id}
                    >

                      <div className="cart-item-info">
                        <span className="cart-item-emoji">
                          {item.emoji}
                        </span>

                        <div>
                          <h3>{item.name}</h3>
                          <p>₹{item.price} each</p>
                        </div>
                      </div>

                      <div className="cart-actions">

                        <div className="quantity">
                          <button
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                          >
                            +
                          </button>
                        </div>

                        <strong>
                          ₹{item.price * item.quantity}
                        </strong>

                        <button
                          className="delete-btn"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                        >
                          🗑️
                        </button>

                      </div>

                    </div>
                  ))}

                </div>

                <div className="cart-total">
                  <span>Total</span>
                  <strong>₹{total}</strong>
                </div>

                <button
                  className="checkout-btn"
                  onClick={() => {
                    setShowCart(false);
                    setShowCheckout(true);
                  }}
                >
                  Proceed to Checkout →
                </button>
              </>
            )}

          </div>
        </div>
      )}

      {/* CHECKOUT */}
      {showCheckout && (
        <div className="modal-overlay">

          <div className="checkout">

            <button
              className="close-btn"
              onClick={() => setShowCheckout(false)}
            >
              ✕
            </button>

            <h2>Place Your Order 🛒</h2>

            <div className="checkout-total">
              Total Amount:
              <strong> ₹{total}</strong>
            </div>

            <form onSubmit={placeOrder}>

              <input
                type="text"
                placeholder="Full Name"
                required
              />

              <input
                type="tel"
                placeholder="Mobile Number"
                pattern="[0-9]{10}"
                maxLength="10"
                required
              />

              <input
                type="email"
                placeholder="Email Address"
                required
              />

              <textarea
                placeholder="Complete Delivery Address"
                rows="4"
                required
              ></textarea>

              <h3>💳 Payment Method</h3>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />
                Cash on Delivery
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />
                UPI / PhonePe
              </label>

              {paymentMethod === "upi" && (
                <div className="upi-info">
                  📱 UPI / PhonePe payment selected.
                  <br />
                  Payment can be completed through UPI
                  after order confirmation.
                </div>
              )}

              <button
                className="place-order"
                type="submit"
              >
                Confirm & Place Order
              </button>

            </form>
          </div>
        </div>
      )}

      {/* ORDER CONFIRMATION */}
      {orderPlaced && (
        <div className="modal-overlay">

          <div className="success-box">

            <div className="success-icon">
              ✅
            </div>

            <h2>Order Confirmed!</h2>

            <p>
              Thank you for ordering from BNV Mart.
            </p>

            <p className="success-small">
              Your order has been successfully placed.
            </p>

            <button
              onClick={() => {
                setOrderPlaced(false);
                setCart([]);
              }}
            >
              Continue Shopping
            </button>

          </div>
        </div>
      )}

      {/* ABOUT */}
      <section id="about" className="about">

        <p>ABOUT BNV MART</p>

        <h2>
          From Our Home to Your Home ❤️
        </h2>

        <p>
          We bring you authentic homemade and traditional
          products prepared with care, quality ingredients
          and the taste of our village.
        </p>

      </section>

      {/* FOOTER */}
      <footer>

        <h3>🛒 BNV Mart</h3>

        <p>
          Authentic • Homemade • Traditional
        </p>

        <small>
          © 2026 BNV Mart. All rights reserved.
        </small>

      </footer>

    </div>
  );
}

export default App;