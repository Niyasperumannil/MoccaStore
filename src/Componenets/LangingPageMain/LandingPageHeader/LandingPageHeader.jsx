import React, { useState } from 'react';
import './LandingPageHeader.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const dropdownItems = {
    MEN: {
      'Topwear': [
        { name: 'T-Shirts', link: '/men' },
        { name: 'Casual Shirts', link: '/men' },
        { name: 'Formal Shirts', link: '/men' },
        { name: 'Sweatshirts', link: '/men' },
        { name: 'Sweaters', link: '/men' },
        { name: 'Jackets', link: '/men' },
        { name: 'Blazers & Coats', link: '/men' },
        { name: 'Suits', link: '/men' },
        { name: 'Rain Jackets', link: '/men' },
      ],
      'Indian & Festive Wear': [
        { name: 'Kurtas & Kurta Sets', link: '/men/indian-festive/kurtas-kurta-sets' },
        { name: 'Sherwanis', link: '/men/indian-festive/sherwanis' },
        { name: 'Nehru Jackets', link: '/men/indian-festive/nehru-jackets' },
        { name: 'Dhotis', link: '/men/indian-festive/dhotis' },
      ],
      'Bottomwear': [
        { name: 'Jeans', link: '/men/bottomwear/jeans' },
        { name: 'Casual Trousers', link: '/men/bottomwear/casual-trousers' },
        { name: 'Formal Trousers', link: '/men/bottomwear/formal-trousers' },
        { name: 'Shorts', link: '/men/bottomwear/shorts' },
        { name: 'Track Pants & Joggers', link: '/men/bottomwear/track-pants-joggers' },
      ],
      'Innerwear & Sleepwear': [
        { name: 'Briefs & Trunks', link: '/men/innerwear/briefs-trunks' },
        { name: 'Boxers', link: '/men/innerwear/boxers' },
        { name: 'Vests', link: '/men/innerwear/vests' },
        { name: 'Sleepwear & Loungewear', link: '/men/innerwear/sleepwear-loungewear' },
        { name: 'Thermals', link: '/men/innerwear/thermals' },
      ],
      'Plus Size': [],
      'Footwear': [
        { name: 'Casual Shoes', link: '/men/footwear/casual-shoes' },
        { name: 'Sports Shoes', link: '/men/footwear/sports-shoes' },
        { name: 'Formal Shoes', link: '/men/footwear/formal-shoes' },
        { name: 'Sneakers', link: '/men/footwear/sneakers' },
        { name: 'Sandals & Floaters', link: '/men/footwear/sandals-floaters' },
        { name: 'Flip Flops', link: '/men/footwear/flip-flops' },
        { name: 'Socks', link: '/men/footwear/socks' },
      ],
      'Personal Care & Grooming': [],
      'Sunglasses & Frames': [],
      'Watches': [],
    },

    WOMEN: {
      'Topwear': [
        { name: 'Tops', link: '/women' },
        { name: 'T-Shirts', link: '/women' },
        { name: 'Shirts', link: '/women' },
        { name: 'Sweatshirts', link: '/women' },
        { name: 'Jackets', link: '/women' },
        { name: 'Shrugs', link: '/women' },
      ],
      'Indian Wear': [
        { name: 'Kurtas & Suits', link: '/women' },
        { name: 'Sarees', link: '/women' },
        { name: 'Lehenga Cholis', link: '/women' },
        { name: 'Dress Materials', link: '/women' },
        { name: 'Dupattas', link: '/women' },
      ],
      'Bottomwear': [
        { name: 'Jeans', link: '/women' },
        { name: 'Trousers', link: '/women' },
        { name: 'Skirts', link: '/women' },
        { name: 'Leggings', link: '/women' },
        { name: 'Palazzos', link: '/women' },
        { name: 'Shorts', link: '/women' },
      ],
      'Footwear': [
        { name: 'Flats', link: '/women/footwear/flats' },
        { name: 'Heels', link: '/women/footwear/heels' },
        { name: 'Boots', link: '/women/footwear/boots' },
        { name: 'Casual Shoes', link: '/women/footwear/casual-shoes' },
      ],
      'Beauty & Personal Care': [
        { name: 'Makeup', link: '/women/beauty/makeup' },
        { name: 'Skincare', link: '/women/beauty/skincare' },
        { name: 'Haircare', link: '/women/beauty/haircare' },
        { name: 'Fragrances', link: '/women/beauty/fragrances' },
      ],
      'Bags & Backpacks': [],
      'Jewellery': [],
      'Watches': []
    },

    // KIDS: {
    //   'Topwear': [
    //     { name: 'T-Shirts', link: '/Kids' },
    //     { name: 'Shirts', link: '/Kids' },
    //     { name: 'Sweatshirts', link: '/Kids' },
    //   ],
    //   'Bottomwear': [
    //     { name: 'Jeans', link: '/Kids' },
    //     { name: 'Shorts', link: '/Kids' },
    //     { name: 'Trousers', link: '/Kids' },
    //   ],
    //   'Footwear': [
    //     { name: 'Sneakers', link: '/Kids' },
    //     { name: 'Sandals', link: '/Kids' },
    //   ],
    //   'Toys & Games': [],
    //   'Accessories': [],
    // },

    // BEAUTY: {
    //   'Makeup': [
    //     { name: 'Lipstick', link: '/beauty/makeup/lipstick' },
    //     { name: 'Eyeliner', link: '/beauty/makeup/eyeliner' },
    //     { name: 'Foundation', link: '/beauty/makeup/foundation' },
    //   ],
    //   'Skincare': [
    //     { name: 'Moisturizers', link: '/beauty/skincare/moisturizers' },
    //     { name: 'Serums', link: '/beauty/skincare/serums' },
    //     { name: 'Sunscreen', link: '/beauty/skincare/sunscreen' },
    //   ],
    //   'Haircare': [
    //     { name: 'Shampoo', link: '/beauty/haircare/shampoo' },
    //     { name: 'Conditioner', link: '/beauty/haircare/conditioner' },
    //     { name: 'Styling', link: '/beauty/haircare/styling' },
    //   ],
    //   'Fragrances': [
    //     { name: 'Perfumes', link: '/beauty/fragrances/perfumes' },
    //     { name: 'Body Mists', link: '/beauty/fragrances/body-mists' },
    //   ],
    // },

    HOME: {
      '': [
        { name: 'Home', link: '/' },
      ],
   
      
    },

    STUDIO: {
      'Fashion Tips': [{ name: 'Fashion Tips', link: '/studio/fashion-tips' }],
      'Live Shows': [{ name: 'Live Shows', link: '/studio/live-shows' }],
      'New Drops': [{ name: 'New Drops', link: '/studio/new-drops' }],
    },
  };

  return (
    <header className="main-header">
      <div className="header-left">
<Link to="/">
  <img src="./Moccabgre.png" alt="Logo" className="logo" />
</Link>
        {/* Hamburger button for mobile */}
        <div
          className="hamburger"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </div>

        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          {Object.keys(dropdownItems).map((key) => (
            <div
              className="nav-item"
              key={key}
              onMouseEnter={() => window.innerWidth > 1024 && setActiveMenu(key)}
              onMouseLeave={() => window.innerWidth > 1024 && setActiveMenu(null)}
              onClick={() =>
                window.innerWidth <= 1024 &&
                setActiveMenu(activeMenu === key ? null : key)
              }
            >
              <a href="#">
                {key}
                {key === 'STUDIO' && <span className="new-badge">NEW</span>}
              </a>

              {(activeMenu === key ||
                (window.innerWidth > 1024 && activeMenu === key)) && (
                <div
                  className={`mega-dropdown ${
                    window.innerWidth <= 1024 ? 'mobile-dropdown' : ''
                  }`}
                >
                  {Object.entries(dropdownItems[key]).map(([category, items]) => (
                    <div key={category} className="dropdown-column">
                      <h4>{category}</h4>
                      <ul>
                        {items.map((item) => (
                          <li key={item.name}>
                            <a href={item.link}>{item.name}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="header-center">
        <input
          type="text"
          placeholder="Search for products, brands and more"
          className="search-input"
        />
      </div>

      {/* ✅ Added links to Profile, Wishlist, Bag */}
      <div className="header-right">
  <Link to="/Register" className="icon-block">
    <span className="icon">&#128100;</span>
    <span className="label">Profile</span>
  </Link>
  <Link to="/" className="icon-block">
    <span className="icon">&#10084;</span>
    <span className="label">Wishlist</span>
  </Link>
  <Link to="/" className="icon-block">
    <span className="icon">&#128717;</span>
    <span className="label">Bag</span>
  </Link>
</div>
    </header>
  );
};

export default Header;
