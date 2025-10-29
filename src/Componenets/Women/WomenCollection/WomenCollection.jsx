import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./WomenCollection.css";

const API_URL = "https://backendmocca.onrender.com/api/womenproducts";
const BACKEND_URL = "https://backendmocca.onrender.com"; // backend API for Razorpay & orders

const FILTER_DEFINITIONS = [
  { key: "onlineExclusive", title: "Online Exclusive", type: "flag" },
  { key: "brand", title: "Brand", type: "list" },
  { key: "productType", title: "Product Type", type: "list" },
  { key: "fabric", title: "Fabric", type: "list" },
  { key: "color", title: "Color", type: "list" },
  { key: "pattern", title: "Pattern", type: "list" },
  { key: "fit", title: "Fit", type: "list" },
  { key: "size", title: "Size", type: "list" },
];

function uniqueCounts(products, key) {
  const map = {};
  products.forEach((p) => {
    const val = p[key];
    if (val) map[val] = (map[val] || 0) + 1;
  });
  return map;
}

const WomenCollection = () => {
  const navigate = useNavigate();

  // User-token check
  const [userToken, setUserToken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("Please log in first to access the Women's Collection.");
      navigate("/register");
    } else {
      setUserToken(token);
    }
  }, [navigate]);

  // Sidebar & cart state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [openSections, setOpenSections] = useState(() =>
    FILTER_DEFINITIONS.reduce((acc, def) => {
      acc[def.key] = true;
      return acc;
    }, {})
  );

  const [selections, setSelections] = useState({
    brand: new Set(),
    productType: new Set(),
    fabric: new Set(),
    color: new Set(),
    pattern: new Set(),
    fit: new Set(),
    size: new Set(),
    onlineExclusive: false,
  });

  // Cart items
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (userToken) {
      const stored = localStorage.getItem(`cart_${userToken}`);
      if (stored) setCart(JSON.parse(stored));
    }
  }, [userToken]);
  useEffect(() => {
    if (userToken) {
      localStorage.setItem(`cart_${userToken}`, JSON.stringify(cart));
    }
  }, [cart, userToken]);

  // Fetch products
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(API_URL);
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch products:", err);
      }
    };
    fetchProducts();
  }, []);

  // Available counts for filters
  const available = useMemo(() => {
    const out = {};
    FILTER_DEFINITIONS.forEach((def) => {
      if (def.key === "onlineExclusive") return;
      out[def.key] = uniqueCounts(products, def.key);
    });
    return out;
  }, [products]);

  const toggleSelect = (group, value) => {
    setSelections((prev) => {
      if (group === "onlineExclusive") {
        return { ...prev, onlineExclusive: !prev.onlineExclusive };
      }
      const copy = { ...prev, [group]: new Set(prev[group]) };
      if (copy[group].has(value)) copy[group].delete(value);
      else copy[group].add(value);
      return copy;
    });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (selections.onlineExclusive && !p.onlineExclusive) return false;
      for (let key of Object.keys(available)) {
        if (selections[key] && selections[key].size > 0) {
          if (!selections[key].has(p[key])) return false;
        }
      }
      return true;
    });
  }, [selections, available, products]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (i) => i.id === product.id || i._id === product._id
      );
      if (existing) {
        return prev.map((i) =>
          i.id === product.id || i._id === product._id
            ? { ...i, qty: i.qty + 1 }
            : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };
  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id || i._id === id
            ? { ...i, qty: Math.max(1, i.qty + delta) }
            : i
        )
        .filter((i) => i.qty > 0)
    );
  };
  const removeItem = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id && i._id !== id));
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  // Razorpay Checkout & Order Save
  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const token = userToken;
      if (!token) {
        alert("Please log in to continue.");
        navigate("/register");
        return;
      }

      // Create order on backend
      const { data } = await axios.post(
        `${BACKEND_URL}/api/payment/create-order`,
        { amount: cartTotal, currency: "INR" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!data.success) {
        alert("Failed to create payment order. Try again.");
        return;
      }

      const { id: order_id, amount: order_amount, currency } = data.order;

      // Initialize Razorpay checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_yourKeyHere",
        amount: order_amount.toString(),
        currency: currency,
        name: "WestStyle Store",
        description: "Women’s Collection Purchase",
        order_id: order_id,
        handler: async (response) => {
          console.log("🔔 Razorpay response:", response);
          try {
            const verifyRes = await axios.post(
              `${BACKEND_URL}/api/payment/verify-payment`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                cart,
                amount: cartTotal,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            console.log("✅ verifyRes.data:", verifyRes.data);
            if (verifyRes.data.success) {
              alert("✅ Payment Successful! Your order has been placed.");
              setCart([]);
              localStorage.removeItem(`cart_${userToken}`);
            } else {
              alert(
                "⚠️ Payment verification failed: " +
                  (verifyRes.data.message || "")
              );
            }
          } catch (err) {
            console.error("❌ Error during payment verification:", err);
            if (err.response) {
              console.error(
                "↳ Backend responded with:",
                err.response.status,
                err.response.data
              );
            } else if (err.request) {
              console.error("↳ No response from backend:", err.request);
            } else {
              console.error("↳ Error:", err.message);
            }
            alert("Verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "WestStyle User",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: { color: "#ff4081" },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("❌ Error during Razorpay checkout:", error);
      alert("Unable to process payment. Try again later.");
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="women-root__wrap">
      <header className="women-header__bar">
        <div className="women-header__inner">
          <h2 className="women-header__title">Women’s Collection</h2>
          <div className="women-header__controls">
            <button
              className="women-header__filter-toggle"
              onClick={() => setSidebarOpen(true)}
            >
              ☰ Filter
            </button>
            <button
              className="women-header__cart-toggle"
              onClick={() => setCartOpen(true)}
            >
              🛒 Cart ({cart.length})
            </button>
          </div>
        </div>
      </header>

      <main className="women-main__area">
        <section className="women-grid__wrap">
          {filteredProducts.length === 0 ? (
            <p className="no-products">No products found.</p>
          ) : (
            filteredProducts.map((p) => (
              <article
                key={p._id || p.id}
                className="women-card__item"
                onClick={() =>
                  navigate(`/women/product/${p._id || p.id}`, { state: p })
                }
              >
                <div className="women-card__tag">
                  {p.onlineExclusive ? "Exclusive" : "New"}
                </div>
                <img
                  className="women-card__image"
                  src={
                    p.image?.startsWith("http")
                      ? p.image
                      : `https://backendmocca.onrender.com${p.image}`
                  }
                  alt={p.title}
                />
                <div className="women-card__meta">
                  <div className="women-card__brand">{p.brand}</div>
                  <div className="women-card__title">{p.title}</div>
                  <div className="women-card__price">₹{p.price}</div>
                </div>
                <button
                  className="women-card__cartbtn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p);
                  }}
                >
                  Add to Cart
                </button>
              </article>
            ))
          )}
        </section>
      </main>

      <aside
        className={`women-filter__drawer ${sidebarOpen ? "women-filter__open" : ""}`}
      >
        <div className="women-filter__head">
          <h3>Filter</h3>
          <button onClick={() => setSidebarOpen(false)}>×</button>
        </div>
        <div className="women-filter__sections">
          {FILTER_DEFINITIONS.map((def) => {
            const options =
              def.key === "onlineExclusive"
                ? [{ value: "Exclusive" }]
                : Object.keys(available[def.key] || {}).map((v) => ({
                    value: v,
                    count: available[def.key][v],
                  }));
            return (
              <div key={def.key} className="women-filter__section">
                <button
                  className="women-filter__section-header"
                  onClick={() => toggleSection(def.key)}
                >
                  <span>{def.title}</span>
                  <span
                    className={`women-filter__chev ${
                      openSections[def.key] ? "open" : ""
                    }`}
                  >
                    ⌄
                  </span>
                </button>
                <div
                  className={`women-filter__section-body ${
                    openSections[def.key] ? "expanded" : "collapsed"
                  }`}
                >
                  {options.map((opt) => (
                    <label key={opt.value} className="women-filter__option">
                      <input
                        type="checkbox"
                        checked={
                          def.key === "onlineExclusive"
                            ? selections.onlineExclusive
                            : selections[def.key].has(opt.value)
                        }
                        onChange={() =>
                          toggleSelect(
                            def.key,
                            def.key === "onlineExclusive"
                              ? "Exclusive"
                              : opt.value
                          )
                        }
                      />
                      <span>
                        {opt.value}{" "}
                        {opt.count && (
                          <span className="women-filter__count">
                            ({opt.count})
                          </span>
                        )}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </aside>
      {sidebarOpen && (
        <div
          className="women-filter__overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`women-cart__drawer ${cartOpen ? "open" : ""}`}>
        <div className="women-cart__head">
          <h3>Your Cart</h3>
          <button onClick={() => setCartOpen(false)}>×</button>
        </div>
        <div className="women-cart__body">
          {cart.length === 0 ? (
            <div className="women-cart__empty">Your cart is empty.</div>
          ) : (
            cart.map((item) => (
              <div key={item._id || item.id} className="women-cart__item">
                <img
                  src={
                    item.image?.startsWith("http")
                      ? item.image
                      : `https://backendmocca.onrender.com${item.image}`
                  }
                  alt={item.title}
                />
                <div className="women-cart__info">
                  <div className="women-cart__title">{item.title}</div>
                  <div className="women-cart__price">₹{item.price}</div>
                  <div className="women-cart__qty">
                    <button onClick={() => updateQty(item._id || item.id, -1)}>
                      -
                    </button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item._id || item.id, 1)}>
                      +
                    </button>
                  </div>
                  <button
                    className="women-cart__remove"
                    onClick={() => removeItem(item._id || item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="women-cart__foot">
          <div className="women-cart__total">Total: ₹{cartTotal}</div>
          <button className="women-cart__checkout" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </aside>
      {cartOpen && (
        <div
          className="women-cart__overlay"
          onClick={() => setCartOpen(false)}
        />
      )}
    </div>
  );
};

export default WomenCollection;
