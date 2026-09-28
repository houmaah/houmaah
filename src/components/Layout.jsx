import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { assetPath } from "../assetPath";
import { routes, services } from "../data";
import { formatPrice } from "./cartUtils";
import { ArrowIcon, BagIcon, HeartIcon, SearchIcon, ServiceIcon } from "./Icons";
import { useCart } from "./useCart";

export function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState(null);
  const location = useLocation();
  const {
    addItem,
    delivery,
    itemCount,
    items,
    removeItem,
    removeWishlistItem,
    subtotal,
    total,
    updateQuantity,
    wishlistCount,
    wishlistItems,
  } = useCart();

  function closeDrawer() {
    setActiveDrawer(null);
  }

  useEffect(() => {
    document.body.style.overflow = activeDrawer ? "hidden" : "";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        closeDrawer();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeDrawer]);

  useEffect(() => {
    setActiveDrawer(null);
    const timeout = window.setTimeout(() => window.scrollTo(0, 0), 180);

    return () => window.clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      <header className="site-header">
        <div className="announcement" aria-label="Store announcement">
          <p>Discover the latest Houmaah collection</p>
        </div>

        <div className="header-shell">
          <button
            className="menu-toggle"
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span className="sr-only">Open menu</span>
          </button>

          <Link className="logo" to="/" aria-label="Houmaah home">
            <img src={assetPath("assets/houmaah-logo-black.png")} alt="Houmaah" />
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {routes.map((route) => (
              <NavLink key={route.to} to={route.to}>
                {route.label}
              </NavLink>
            ))}
          </nav>

          <nav className="header-actions" aria-label="Shop utilities">
            <Link to="/search" aria-label="Search">
              <SearchIcon />
            </Link>
            <button className="wishlist-action" type="button" aria-label={`Wishlist, ${wishlistCount} ${wishlistCount === 1 ? "item" : "items"}`} onClick={() => setActiveDrawer("wishlist")}>
              <HeartIcon />
              {wishlistCount ? <span>{wishlistCount}</span> : null}
            </button>
            <button className="bag-button" type="button" aria-label={`Bag, ${itemCount} ${itemCount === 1 ? "item" : "items"}`} onClick={() => setActiveDrawer("bag")}>
              <BagIcon />
              <span>{itemCount}</span>
            </button>
          </nav>
        </div>

        <nav className={`mobile-nav${isMenuOpen ? " is-open" : ""}`} id="mobile-nav" aria-label="Mobile navigation" hidden={!isMenuOpen}>
          {routes.map((route) => (
            <NavLink key={route.to} to={route.to} onClick={() => setIsMenuOpen(false)}>
              {route.label}
            </NavLink>
          ))}
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
        </nav>
      </header>

      {children}

      <Footer />

      <div className={`drawer-layer${activeDrawer ? " is-open" : ""}`} aria-hidden={!activeDrawer}>
        <button className="drawer-backdrop" type="button" aria-label="Close drawer" onClick={closeDrawer}></button>
        <aside className="commerce-drawer" role="dialog" aria-modal="true" aria-labelledby="commerce-drawer-title">
          <div className="commerce-drawer__header">
            <div>
              <p className="eyebrow">{activeDrawer === "wishlist" ? "Saved pieces" : "Shopping bag"}</p>
              <h2 id="commerce-drawer-title">{activeDrawer === "wishlist" ? "Wishlist" : "Your Bag"}</h2>
            </div>
            <button type="button" onClick={closeDrawer}>Close</button>
          </div>

          {activeDrawer === "wishlist" ? (
            <WishlistDrawer items={wishlistItems} addItem={addItem} removeItem={removeWishlistItem} closeDrawer={closeDrawer} />
          ) : (
            <BagDrawer items={items} delivery={delivery} removeItem={removeItem} subtotal={subtotal} total={total} updateQuantity={updateQuantity} closeDrawer={closeDrawer} />
          )}
        </aside>
      </div>
    </>
  );
}

function BagDrawer({ closeDrawer, delivery, items, removeItem, subtotal, total, updateQuantity }) {
  if (!items.length) {
    return (
      <div className="drawer-empty">
        <p>Your bag is empty. Add a piece from the latest edit to begin checkout.</p>
        <Link className="button button--outline" to="/shop" onClick={closeDrawer}>Browse Pieces</Link>
      </div>
    );
  }

  return (
    <div className="drawer-body">
      <div className="drawer-items">
        {items.map((item) => (
          <article className="drawer-item" key={item.id}>
            <img src={item.image} alt={item.alt} />
            <div>
              <h3>{item.name}</h3>
              <p>Size {item.size}</p>
              <strong>{formatPrice(item.unitPrice * item.quantity)}</strong>
              <div className="drawer-item__controls">
                <label htmlFor={`drawer-qty-${item.id}`}>Qty</label>
                <select id={`drawer-qty-${item.id}`} value={item.quantity} onChange={(event) => updateQuantity(item.id, Number(event.target.value))}>
                  {[1, 2, 3, 4, 5].map((quantity) => (
                    <option key={quantity} value={quantity}>{quantity}</option>
                  ))}
                </select>
                <button type="button" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="drawer-summary">
        <dl>
          <div>
            <dt>Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div>
            <dt>Delivery</dt>
            <dd>{delivery === 0 ? "Complimentary" : formatPrice(delivery)}</dd>
          </div>
          <div>
            <dt>Total</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
        </dl>
        <Link className="button button--outline" to="/checkout" onClick={closeDrawer}>Checkout</Link>
        <Link className="text-link" to="/bag" onClick={closeDrawer}>View bag</Link>
      </div>
    </div>
  );
}

function WishlistDrawer({ addItem, closeDrawer, items, removeItem }) {
  if (!items.length) {
    return (
      <div className="drawer-empty">
        <p>No saved pieces yet. Use the heart on product cards to keep favorites close.</p>
        <Link className="button button--outline" to="/shop" onClick={closeDrawer}>Explore Products</Link>
      </div>
    );
  }

  return (
    <div className="drawer-body">
      <div className="drawer-items">
        {items.map((item) => (
          <article className="drawer-item" key={item.id}>
            <img src={item.image} alt={item.alt} />
            <div>
              <h3>{item.name}</h3>
              <p>{item.label}</p>
              <strong>{item.price}</strong>
              <div className="drawer-item__controls drawer-item__controls--wishlist">
                <button type="button" onClick={() => addItem(item)}>Add to Bag</button>
                <button type="button" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          </article>
        ))}
      </div>
      <Link className="text-link" to="/wishlist" onClick={closeDrawer}>View wishlist</Link>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <Link to="/" aria-label="Houmaah home">
          Houmaah
        </Link>
        <p className="footer-tagline">Timeless. Refined. For Her.</p>
        <p>Effortless luxury shaped through clean silhouettes, quiet detail, and pieces made to move with you.</p>
      </div>

      <nav className="footer-column" aria-label="Explore">
        <h2>Explore</h2>
        {routes.map((route) => (
          <NavLink key={route.to} to={route.to}>
            {route.label}
          </NavLink>
        ))}
        <NavLink to="/sale">Sale</NavLink>
        <NavLink to="/journal">Journal</NavLink>
      </nav>

      <nav className="footer-column" aria-label="Customer care">
        <h2>Customer Care</h2>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/faqs">FAQs</NavLink>
        <NavLink to="/size-guide">Size Guide</NavLink>
        <NavLink to="/shipping-returns">Shipping &amp; Returns</NavLink>
        <NavLink to="/track-order">Track Order</NavLink>
      </nav>

      <nav className="footer-column" aria-label="Follow">
        <h2>Follow</h2>
        <Link to="/lookbook">Instagram</Link>
        <Link to="/lookbook">Facebook</Link>
        <Link to="/lookbook">Pinterest</Link>
      </nav>

      <Newsletter className="footer-newsletter" id="footer-email" heading="Join the Houmaah world" />

      <div className="footer-bottom">
        <p>© 2026 Houmaah</p>
        <nav aria-label="Policies">
          <NavLink to="/privacy">Privacy</NavLink>
          <NavLink to="/terms">Terms</NavLink>
        </nav>
      </div>
    </footer>
  );
}

export function Newsletter({ className = "newsletter-section", id = "newsletter-email", heading = "Join the Houmaah world." }) {
  const Tag = className === "newsletter-section" ? "section" : "div";
  const titleId = `${id}-title`;

  return (
    <Tag className={className} aria-labelledby={className === "newsletter-section" ? titleId : undefined}>
      <div>
        <h2 id={className === "newsletter-section" ? titleId : undefined}>{heading}</h2>
        <p>Be the first to discover new collections, stories and releases.</p>
      </div>
      <form action="#" aria-label="Newsletter signup">
        <label className="sr-only" htmlFor={id}>
          Email address
        </label>
        <input id={id} type="email" placeholder="Email address" />
        <button type="submit">
          <span>Subscribe</span>
          <ArrowIcon />
        </button>
      </form>
    </Tag>
  );
}

export function ServiceStrip() {
  return (
    <section className="service-strip" aria-label="Houmaah customer services">
      {services.map((service) => (
        <article key={service.title}>
          <ServiceIcon type={service.icon} />
          <h2>{service.title}</h2>
          <p>{service.text}</p>
        </article>
      ))}
    </section>
  );
}
