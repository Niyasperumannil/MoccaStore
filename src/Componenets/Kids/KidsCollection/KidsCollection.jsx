import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./KidsCollection.css";
import Footer from "../../LangingPageMain/Footer/Footer";

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    brand: "KIDS ZONE",
    title: "Kids Zone Boys Graphic T-Shirt",
    price: 699,
    image:
      "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/301036626OFFWHITE_1_800x.jpg?v=1760520823",
    onlineExclusive: true,
    productType: "T-Shirts",
    fabric: "Cotton",
    color: "Blue",
    pattern: "Graphic",
    fit: "Regular",
    size: "M",
    description:
      "Comfortable graphic tee for boys, made with soft cotton for everyday wear."
  },
  {
    id: 2,
    brand: "LITTLE STAR",
    title: "Little Star Girls Floral Dress",
    price: 1199,
    image:
      "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/301036631OFFWHITE_1_800x.jpg?v=1760627698",
    onlineExclusive: false,
    productType: "Dresses",
    fabric: "Cotton",
    color: "Pink",
    pattern: "Floral",
    fit: "Regular",
    size: "S",
    description:
      "Cute floral dress for girls, perfect for parties and casual outings."
  },
  {
    id: 3,
    brand: "FUN KIDS",
    title: "Fun Kids Boys Denim Shorts",
    price: 799,
    image:
      "https://cdn.shopify.com/s/files/1/0266/6276/4597/files/301036838RED_1_800x.jpg?v=1760520837",
    onlineExclusive: false,
    productType: "Shorts",
    fabric: "Denim",
    color: "Blue",
    pattern: "Plain",
    fit: "Relaxed",
    size: "L",
    description: "Casual denim shorts with relaxed fit for active kids."
  }
];

const FILTER_DEFINITIONS = [
  { key: "onlineExclusive", title: "Online Exclusive", type: "flag" },
  { key: "brand", title: "Brand", type: "list" },
  { key: "productType", title: "Product Type", type: "list" },
  { key: "fabric", title: "Fabric", type: "list" },
  { key: "color", title: "Color", type: "list" },
  { key: "pattern", title: "Pattern", type: "list" },
  { key: "fit", title: "Fit", type: "list" },
  { key: "size", title: "Size", type: "list" }
];

function uniqueCounts(products, key) {
  const map = {};
  products.forEach((p) => {
    const val = p[key];
    if (val) map[val] = (map[val] || 0) + 1;
  });
  return map;
}

const KidsCollection = () => {
  const navigate = useNavigate();

  const [userToken, setUserToken] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (!token) {
      alert("Please log in first to access the Kids Collection.");
      navigate("/register");
    } else {
      setUserToken(token);
    }
  }, [navigate]);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [openSections, setOpenSections] = useState(
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
    onlineExclusive: false
  });

  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    if (userToken) {
      const storedCart = localStorage.getItem(`cart_${userToken}`);
      if (storedCart) setCart(JSON.parse(storedCart));
    }
  }, [userToken]);

  // Persist cart changes
  useEffect(() => {
    if (userToken) {
      localStorage.setItem(`cart_${userToken}`, JSON.stringify(cart));
    }
  }, [cart, userToken]);

  const available = useMemo(() => {
    const out = {};
    FILTER_DEFINITIONS.forEach((def) => {
      if (def.key === "onlineExclusive") return;
      out[def.key] = uniqueCounts(SAMPLE_PRODUCTS, def.key);
    });
    return out;
  }, []);

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
    return SAMPLE_PRODUCTS.filter((p) => {
      if (selections.onlineExclusive && !p.onlineExclusive) return false;
      for (let key of Object.keys(available)) {
        if (selections[key] && selections[key].size > 0) {
          if (!selections[key].has(p[key])) return false;
        }
      }
      return true;
    });
  }, [selections, available]);

  const addToCart = (product) => {
    if (!userToken) {
      alert("Please log in to add items to cart.");
      return;
    }
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i
        )
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const toggleSection = (key) =>
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <>
      <div className="kids-root__wrap">
        <header className="kids-header__bar">
          <div className="kids-header__inner">
            <h2 className="kids-header__title">Kids Collection</h2>
            <div className="kids-header__controls">
              <button
                className="kids-header__filter-toggle"
                onClick={() => setSidebarOpen(true)}
              >
                ☰ Filter
              </button>
              <button
                className="kids-header__cart-toggle"
                onClick={() => setCartOpen(true)}
              >
                🛒 Cart ({cart.length})
              </button>
            </div>
          </div>
        </header>

        <main className="kids-main__area">
          <section className="kids-grid__wrap">
            {filteredProducts.map((p) => (
              <article
                key={p.id}
                className="kids-card__item"
                onClick={() => navigate(`/kids/product/${p.id}`, { state: p })}
              >
                <div className="kids-card__tag">
                  {p.onlineExclusive ? "Exclusive" : "New"}
                </div>
                <img className="kids-card__image" src={p.image} alt={p.title} />
                <div className="kids-card__meta">
                  <div className="kids-card__brand">{p.brand}</div>
                  <div className="kids-card__title">{p.title}</div>
                  <div className="kids-card__price">₹{p.price}</div>
                </div>
                <button
                  className="kids-card__cartbtn"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(p);
                  }}
                >
                  Add to Cart
                </button>
              </article>
            ))}
          </section>
        </main>

        {/* Sidebar Filter */}
        <aside className={`kids-filter__drawer ${sidebarOpen ? "kids-filter__open" : ""}`}>
          <div className="kids-filter__head">
            <h3>Filter</h3>
            <button onClick={() => setSidebarOpen(false)}>×</button>
          </div>
          <div className="kids-filter__sections">
            {FILTER_DEFINITIONS.map((def) => {
              const options =
                def.key === "onlineExclusive"
                  ? [{ value: "Exclusive" }]
                  : Object.keys(available[def.key] || {}).map((v) => ({
                      value: v,
                      count: available[def.key][v]
                    }));
              return (
                <div key={def.key} className="kids-filter__section">
                  <button
                    className="kids-filter__section-header"
                    onClick={() => toggleSection(def.key)}
                  >
                    <span>{def.title}</span>
                    <span className={`kids-filter__chev ${openSections[def.key] ? "open" : ""}`}>⌄</span>
                  </button>
                  <div className={`kids-filter__section-body ${openSections[def.key] ? "expanded" : "collapsed"}`}>
                    {options.map((opt) => (
                      <label key={opt.value} className="kids-filter__option">
                        <input
                          type="checkbox"
                          checked={def.key === "onlineExclusive" ? selections.onlineExclusive : selections[def.key].has(opt.value)}
                          onChange={() => toggleSelect(def.key, def.key === "onlineExclusive" ? "Exclusive" : opt.value)}
                        />
                        <span>{opt.value} {opt.count && <span className="kids-filter__count">({opt.count})</span>}</span>
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
        {sidebarOpen && <div className="kids-filter__overlay" onClick={() => setSidebarOpen(false)} />}

        {/* Cart Drawer */}
        <aside className={`kids-cart__drawer ${cartOpen ? "open" : ""}`}>
          <div className="kids-cart__head">
            <h3>Your Cart</h3>
            <button onClick={() => setCartOpen(false)}>×</button>
          </div>
          <div className="kids-cart__body">
            {cart.length === 0 ? (
              <div className="kids-cart__empty">Your cart is empty.</div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="kids-cart__item">
                  <img src={item.image} alt={item.title} />
                  <div className="kids-cart__info">
                    <div className="kids-cart__title">{item.title}</div>
                    <div className="kids-cart__price">₹{item.price}</div>
                    <div className="kids-cart__qty">
                      <button onClick={() => updateQty(item.id, -1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                    <button className="kids-cart__remove" onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </div>
              ))
            )}
          </div>
          {cart.length > 0 && (
            <div className="kids-cart__footer">
              <div className="kids-cart__total">Total: <strong>₹{cartTotal}</strong></div>
              <button className="kids-cart__checkout">Checkout</button>
            </div>
          )}
        </aside>
        {cartOpen && <div className="kids-cart__overlay" onClick={() => setCartOpen(false)} />}
      </div>
      <Footer />
    </>
  );
};

export default KidsCollection;
