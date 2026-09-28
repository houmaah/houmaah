import { useState } from "react";
import { Link, Navigate, useNavigate, useParams, useSearchParams } from "react-router";
import { assetPath } from "../assetPath";
import {
  SHOP_CATEGORIES,
  SORT_OPTIONS,
  buildCatalogSearch,
  getCatalogProducts,
  readCategories,
  toSlug,
} from "../catalog";
import { journalPosts, products } from "../data";
import { formatPrice, priceToNumber } from "../components/cartUtils";
import { HeartIcon } from "../components/Icons";
import { ProductCard } from "../components/ProductCard";
import { useCart } from "../components/useCart";

function UtilityHero({ eyebrow, title, text }) {
  return (
    <section className="utility-hero" aria-labelledby={`${eyebrow.toLowerCase().replaceAll(" ", "-")}-title`}>
      <p className="eyebrow">{eyebrow}</p>
      <h1 id={`${eyebrow.toLowerCase().replaceAll(" ", "-")}-title`}>{title}</h1>
      <p>{text}</p>
    </section>
  );
}

function InfoGrid({ children }) {
  return <section className="info-grid">{children}</section>;
}

function InfoCard({ title, children }) {
  return (
    <article className="info-card">
      <h2>{title}</h2>
      <div>{children}</div>
    </article>
  );
}

export function ContactPage() {
  return (
    <main>
      <UtilityHero eyebrow="Contact" title="We are here to help." text="For orders, sizing, care, or styling questions, reach the Houmaah team through the form below." />
      <section className="contact-page" aria-labelledby="contact-form-title">
        <div>
          <p className="eyebrow">Customer Care</p>
          <h2 id="contact-form-title">Send a note</h2>
          <p>We usually reply during business hours. For urgent order questions, include your order number.</p>
        </div>
        <form className="contact-form" action="#" aria-label="Contact form">
          <label htmlFor="contact-name">Name</label>
          <input id="contact-name" type="text" placeholder="Your name" />
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" type="email" placeholder="Email address" />
          <label htmlFor="contact-message">Message</label>
          <textarea id="contact-message" rows="5" placeholder="How can we help?" />
          <button className="button button--outline" type="submit">
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}

export function FaqsPage() {
  const faqs = [
    ["How do I choose my size?", "Use the size guide as a starting point, then check each product description for fit notes when available."],
    ["Can I return an item?", "Returns are currently described as a simple 14-day return window until final policy language is confirmed."],
    ["Where do I track my order?", "Use the Track Order page with your order number and email address."],
    ["Do products restock?", "Selected pieces may return, but limited edits are intended to stay focused."],
  ];

  return (
    <main>
      <UtilityHero eyebrow="FAQs" title="Answers before you ask." text="Quick guidance for shopping, sizing, returns, and the Houmaah order experience." />
      <InfoGrid>
        {faqs.map(([question, answer]) => (
          <InfoCard key={question} title={question}>
            <p>{answer}</p>
          </InfoCard>
        ))}
      </InfoGrid>
    </main>
  );
}

export function SizeGuidePage() {
  return (
    <main>
      <UtilityHero eyebrow="Size Guide" title="Find your closest fit." text="A simple reference for placeholder sizing. Final garment measurements should be added once product production details are confirmed." />
      <section className="size-guide" aria-labelledby="size-table-title">
        <h2 id="size-table-title">General size reference</h2>
        <table>
          <thead>
            <tr>
              <th>Size</th>
              <th>Bust</th>
              <th>Waist</th>
              <th>Hip</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["XS", "32 in", "25 in", "35 in"],
              ["S", "34 in", "27 in", "37 in"],
              ["M", "36 in", "29 in", "39 in"],
              ["L", "38 in", "31 in", "41 in"],
              ["XL", "40 in", "33 in", "43 in"],
            ].map((row) => (
              <tr key={row[0]}>
                {row.map((cell) => (
                  <td key={cell}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export function ShippingReturnsPage() {
  return (
    <main>
      <UtilityHero eyebrow="Shipping and Returns" title="Clear, considered service." text="A placeholder policy page for delivery and return guidance until final Houmaah operations are confirmed." />
      <InfoGrid>
        <InfoCard title="Delivery">
          <p>Complimentary delivery may apply on qualifying orders. Exact thresholds should be confirmed before launch.</p>
        </InfoCard>
        <InfoCard title="Returns">
          <p>Items are currently presented with a simple 14-day return policy. Final conditions should be confirmed by the brand.</p>
        </InfoCard>
        <InfoCard title="Care">
          <p>Keep packaging, tags, and proof of purchase until you are sure the fit and styling are right for you.</p>
        </InfoCard>
      </InfoGrid>
    </main>
  );
}

export function TrackOrderPage() {
  return (
    <main>
      <UtilityHero eyebrow="Track Order" title="Follow your Houmaah order." text="Use your order number and email address to check progress once order tracking is connected." />
      <section className="track-order" aria-labelledby="order-lookup-title">
        <h2 id="order-lookup-title">Order lookup</h2>
        <form className="contact-form" action="#" aria-label="Track order form">
          <label htmlFor="order-number">Order number</label>
          <input id="order-number" type="text" placeholder="HM-0000" />
          <label htmlFor="order-email">Email address</label>
          <input id="order-email" type="email" placeholder="Email address" />
          <button className="button button--outline" type="submit">
            Track Order
          </button>
        </form>
      </section>
    </main>
  );
}

export function LegalPage({ type }) {
  const isPrivacy = type === "privacy";
  return (
    <main>
      <UtilityHero
        eyebrow={isPrivacy ? "Privacy" : "Terms"}
        title={isPrivacy ? "Privacy, handled with care." : "Terms of use."}
        text={isPrivacy ? "A placeholder privacy page for the Houmaah site experience." : "A placeholder terms page for the Houmaah site experience."}
      />
      <InfoGrid>
        <InfoCard title={isPrivacy ? "Information we collect" : "Shopping with Houmaah"}>
          <p>{isPrivacy ? "Newsletter and contact forms may collect the details you submit. Final policy language should be reviewed before launch." : "Product details, prices, and policies are placeholders until confirmed by the brand."}</p>
        </InfoCard>
        <InfoCard title={isPrivacy ? "How it is used" : "Orders and returns"}>
          <p>{isPrivacy ? "Submitted information should be used only to provide service, communication, and order support." : "Order, delivery, and return conditions should be confirmed before the site is connected to commerce."}</p>
        </InfoCard>
      </InfoGrid>
    </main>
  );
}

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q")?.trim() || "";
  const selectedCategories = readCategories(searchParams);
  const sort = SORT_OPTIONS.some((option) => option.value === searchParams.get("sort")) ? searchParams.get("sort") : "featured";
  const hasSearchContext = query || selectedCategories.length;
  const visibleProducts = hasSearchContext
    ? getCatalogProducts(products, { categories: selectedCategories, query, sort })
    : products.slice(0, 4);

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextQuery = String(formData.get("site-search") || "").trim();

    setSearchParams(buildCatalogSearch(searchParams, { q: nextQuery }), { replace: true });
  }

  function getSearchCategoryHref(category) {
    const nextSearch = buildCatalogSearch(searchParams, { category: category === "All" ? [] : [category] });
    return nextSearch ? `/search?${nextSearch}` : "/search";
  }

  return (
    <main>
      <UtilityHero eyebrow="Search" title="Find a piece by mood, form, or name." text="Search is currently presented as a curated product discovery page until full search indexing is connected." />
      <section className="search-page" aria-labelledby="search-results-title">
        <form className="search-page__form" action="#" aria-label="Search products" onSubmit={handleSubmit}>
          <label className="sr-only" htmlFor="site-search">Search products</label>
          <input id="site-search" name="site-search" type="search" placeholder="Search dresses, sets, kurtas..." defaultValue={query} />
          <button className="button button--outline" type="submit">
            Search
          </button>
        </form>
        <div className="search-page__controls" aria-label="Search refinement">
          <nav className="filter-pills" aria-label="Search categories">
            {SHOP_CATEGORIES.map((item) => (
              <Link
                to={getSearchCategoryHref(item)}
                aria-current={(item === "All" && !selectedCategories.length) || selectedCategories.includes(item) ? "page" : undefined}
                key={item}
              >
                {item}
              </Link>
            ))}
          </nav>
          <div className="sort-controls">
            <label htmlFor="search-sort">Sort</label>
            <select
              id="search-sort"
              value={sort}
              onChange={(event) => setSearchParams(buildCatalogSearch(searchParams, { sort: event.target.value === "featured" ? "" : event.target.value }), { replace: true })}
            >
              {SORT_OPTIONS.map((option) => (
                <option value={option.value} key={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="section-header section-header--split">
          <div>
            <p className="eyebrow">{hasSearchContext ? "Search results" : "Suggested"}</p>
            <h2 id="search-results-title">{query ? `Results for "${query}"` : selectedCategories.length === 1 ? selectedCategories[0] : "Pieces to begin with"}</h2>
            <p role="status">{visibleProducts.length} {visibleProducts.length === 1 ? "piece" : "pieces"} {hasSearchContext ? "found" : "suggested"}</p>
          </div>
          <Link className="text-link" to={hasSearchContext ? "/search" : "/shop"}>{hasSearchContext ? "Clear search" : "Shop all"}</Link>
        </div>
        {visibleProducts.length ? (
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="commerce-empty catalog-empty" role="status">
            <p>No Houmaah pieces match that search. Try a product name, category, color, or styling mood such as ivory, occasion, kurta, or pearl.</p>
            <div className="catalog-empty__actions">
              <Link className="button button--outline" to="/search">Reset Search</Link>
              <Link className="text-link" to={`/shop${selectedCategories.length ? `?category=${selectedCategories.map(toSlug).join(",")}` : ""}`}>Browse catalog</Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

export function BagPage() {
  const { delivery, items, removeItem, subtotal, total, updateQuantity } = useCart();
  const isEmpty = items.length === 0;

  return (
    <main>
      <UtilityHero eyebrow="Bag" title="Review your selection." text="Confirm your pieces, sizes, and quantities before placing a Cash on Delivery order." />
      <section className={`bag-page${isEmpty ? " bag-page--empty" : ""}`} aria-labelledby="bag-summary-title">
        <div className="section-header section-header--split bag-page__header">
          <div>
            <p className="eyebrow">Order summary</p>
            <h2 id="bag-summary-title">{isEmpty ? "Your bag is empty" : "Bag summary"}</h2>
          </div>
          <Link className="text-link" to="/shop">Continue Shopping</Link>
        </div>

        {isEmpty ? (
          <div className="commerce-empty" role="status">
            <p>Your selected pieces will appear here. Begin with the latest edit or return to a product you loved.</p>
            <Link className="button button--outline" to="/shop">Browse Pieces</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items" aria-label="Bag items">
              {items.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.alt} />
                  <div className="cart-item__details">
                    <div>
                      <h3>{item.name}</h3>
                      <p>Size {item.size}</p>
                    </div>
                    <p>{formatPrice(item.unitPrice * item.quantity)}</p>
                  </div>
                  <div className="cart-item__controls">
                    <label htmlFor={`quantity-${item.id}`}>Quantity</label>
                    <select id={`quantity-${item.id}`} value={item.quantity} onChange={(event) => updateQuantity(item.id, Number(event.target.value))}>
                      {[1, 2, 3, 4, 5].map((quantity) => (
                        <option key={quantity} value={quantity}>{quantity}</option>
                      ))}
                    </select>
                    <button type="button" onClick={() => removeItem(item.id)}>Remove</button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="order-summary" aria-label="Order totals">
              <h3>Order Total</h3>
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
              <Link className="button button--outline" to="/checkout">Checkout</Link>
              <p>Payment method: Cash on Delivery only.</p>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

export function CheckoutPage() {
  const { clearCart, delivery, items, subtotal, total } = useCart();
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [order, setOrder] = useState(null);
  const isEmpty = items.length === 0 && !order;

  function handleSubmit(event) {
    event.preventDefault();
    setHasSubmitted(true);

    if (!event.currentTarget.checkValidity()) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const orderNumber = `HM-${Math.floor(1000 + Math.random() * 9000)}`;

    setOrder({
      name: formData.get("checkout-name"),
      phone: formData.get("checkout-phone"),
      city: formData.get("checkout-city"),
      orderNumber,
      total,
    });
    clearCart();
    event.currentTarget.reset();
    setHasSubmitted(false);
  }

  if (order) {
    return (
      <main>
        <UtilityHero eyebrow="Order Placed" title="Your Houmaah order is confirmed." text="Your Cash on Delivery order has been received. Our team will contact you before dispatch." />
      <section className="checkout-page checkout-page--success" aria-labelledby="order-success-title">
          <p className="eyebrow">Confirmation</p>
          <h2 id="order-success-title">Thank you, {order.name}</h2>
          <dl className="confirmation-list">
            <div>
              <dt>Order number</dt>
              <dd>{order.orderNumber}</dd>
            </div>
            <div>
              <dt>Payment</dt>
              <dd>Cash on Delivery</dd>
            </div>
            <div>
              <dt>Total</dt>
              <dd>{formatPrice(order.total)}</dd>
            </div>
            <div>
              <dt>Delivery city</dt>
              <dd>{order.city}</dd>
            </div>
          </dl>
          <div className="checkout-actions">
            <Link className="button button--outline" to="/shop">Continue Shopping</Link>
            <Link className="text-link" to="/track-order">Track Order</Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <UtilityHero eyebrow="Checkout" title="Complete your order." text="Cash on Delivery is the only available payment method for this Houmaah checkout." />
      <section className={`checkout-page${isEmpty ? " checkout-page--empty" : ""}`} aria-labelledby="checkout-details-title">
        {isEmpty ? (
          <div className="commerce-empty" role="status">
            <h2 id="checkout-details-title">Your bag is empty</h2>
            <p>Add at least one piece before checkout.</p>
            <Link className="button button--outline" to="/shop">Browse Pieces</Link>
          </div>
        ) : (
          <div className="checkout-layout">
            <form className={`checkout-form${hasSubmitted ? " was-submitted" : ""}`} onSubmit={handleSubmit} noValidate aria-labelledby="checkout-details-title">
              <div>
                <p className="eyebrow">Delivery Details</p>
                <h2 id="checkout-details-title">Where should we send it?</h2>
              </div>

              <label htmlFor="checkout-name">Full name</label>
              <input id="checkout-name" name="checkout-name" type="text" placeholder="Your name" required />
              <span className="field-error">Please enter your full name.</span>

              <label htmlFor="checkout-phone">Phone number</label>
              <input id="checkout-phone" name="checkout-phone" type="tel" placeholder="03XX XXXXXXX" required />
              <span className="field-error">Please enter a phone number for order confirmation.</span>

              <label htmlFor="checkout-email">Email address</label>
              <input id="checkout-email" name="checkout-email" type="email" placeholder="Email address" />

              <label htmlFor="checkout-address">Delivery address</label>
              <textarea id="checkout-address" name="checkout-address" rows="4" placeholder="House, street, area" required />
              <span className="field-error">Please enter a delivery address.</span>

              <label htmlFor="checkout-city">City</label>
              <input id="checkout-city" name="checkout-city" type="text" placeholder="City" required />
              <span className="field-error">Please enter your city.</span>

              <label htmlFor="checkout-notes">Order notes</label>
              <textarea id="checkout-notes" name="checkout-notes" rows="3" placeholder="Optional delivery instructions" />

              <fieldset className="payment-method" aria-label="Payment method">
                <legend>Payment Method</legend>
                <label>
                  <input type="radio" name="payment" value="cod" checked readOnly />
                  <span>
                    <strong>Cash on Delivery</strong>
                    Pay in cash when your order arrives.
                  </span>
                </label>
              </fieldset>

              <button className="button button--outline" type="submit">Place COD Order</button>
            </form>

            <aside className="order-summary checkout-summary" aria-label="Checkout order summary">
              <h3>Your Order</h3>
              <div className="checkout-summary__items">
                {items.map((item) => (
                  <div key={item.id}>
                    <span>{item.name} · Size {item.size} × {item.quantity}</span>
                    <strong>{formatPrice(item.unitPrice * item.quantity)}</strong>
                  </div>
                ))}
              </div>
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
              <p>Only Cash on Delivery is available at checkout.</p>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}

export function WishlistPage() {
  const { addItem, removeWishlistItem, wishlistItems } = useCart();

  return (
    <main>
      <UtilityHero eyebrow="Wishlist" title="Save pieces for later." text="Wishlist is ready as a simple saved-pieces surface and can be connected to persistence when needed." />
      <section className="bag-page" aria-labelledby="wishlist-empty-title">
        <div className="section-header section-header--split bag-page__header">
          <div>
            <p className="eyebrow">Saved pieces</p>
            <h2 id="wishlist-empty-title">{wishlistItems.length ? "Your wishlist" : "Your wishlist is empty"}</h2>
          </div>
          <Link className="text-link" to="/shop">Browse Pieces</Link>
        </div>
        {wishlistItems.length ? (
          <div className="cart-items wishlist-list">
            {wishlistItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.alt} />
                <div className="cart-item__details">
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.label}</p>
                  </div>
                  <p>{item.price}</p>
                </div>
                <div className="cart-item__controls">
                  <button type="button" onClick={() => addItem(item)}>Add to Bag</button>
                  <button type="button" onClick={() => removeWishlistItem(item.id)}>Remove</button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="commerce-empty" role="status">
            <p>Use the heart control on product cards to save pieces you want to revisit.</p>
            <Link className="button button--outline" to="/shop">Browse Pieces</Link>
          </div>
        )}
      </section>
    </main>
  );
}

export function SalePage() {
  const saleProducts = products.filter((product) => product.oldPrice).slice(0, 8);

  return (
    <main>
      <UtilityHero eyebrow="Sale" title="Considered pieces, special pricing." text="A focused edit of Houmaah styles with placeholder promotional pricing." />
      <section className="new-in-products" aria-labelledby="sale-edit-title">
        <div className="section-header section-header--split">
          <div>
            <p className="eyebrow">Limited offers</p>
            <h2 id="sale-edit-title">Sale edit</h2>
          </div>
          <Link className="text-link" to="/shop">Shop all</Link>
        </div>
        <div className="product-grid">
          {saleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}

export function JournalPage() {
  return (
    <main>
      <UtilityHero eyebrow="Journal" title="Notes from the Houmaah wardrobe." text="Styling ideas, fabric care, and editorial thoughts for dressing with quiet refinement." />
      <section className="journal-page" aria-labelledby="journal-list-title">
        <div className="section-header section-header--split">
          <div>
            <p className="eyebrow">Latest notes</p>
            <h2 id="journal-list-title">From the journal</h2>
          </div>
          <Link className="text-link" to="/lookbook">View lookbook</Link>
        </div>
        <div className="journal-grid">
          {journalPosts.map((post) => (
            <article className="journal-card" key={post.title}>
              <p>{post.date}</p>
              <h3>{post.title}</h3>
              <span>{post.excerpt}</span>
              <Link className="text-link" to="/lookbook">Read note</Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export function ProductDetailPage() {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);
  const { addItem, isInWishlist, toggleWishlist } = useCart();
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedImage, setSelectedImage] = useState(product?.image);

  if (!product) return <Navigate to="/shop" replace />;

  const productDescriptor = product.descriptor.trim();
  const productCategory = product.category.trim().toLowerCase();
  const productIntro = `${productDescriptor}, designed with the Houmaah language of refined femininity, soft detail, and easy styling.`;
  const productDetails = `${product.name} is a refined ${productCategory} piece with a polished silhouette, quiet finishing, and easy styling potential.`;
  const isSaved = isInWishlist(product.id);
  const currentPrice = priceToNumber(product.price);
  const oldPrice = product.oldPrice ? priceToNumber(product.oldPrice) : 0;
  const savings = oldPrice > currentPrice ? oldPrice - currentPrice : 0;
  const discount = savings ? Math.round((savings / oldPrice) * 100) : 0;
  const detailChips = [product.category, product.label, "COD available"];
  const galleryImages = [
    { src: product.image, alt: product.alt },
    { src: assetPath("assets/houmaah-hero-banner.png"), alt: `${product.name} campaign styling` },
    { src: assetPath("assets/houmaah-timeless-essentials-banner.png"), alt: `${product.name} editorial detail` },
  ];
  const relatedProducts = products.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4);
  const displayedRelated = relatedProducts.length ? relatedProducts : products.filter((item) => item.id !== product.id).slice(0, 4);

  function handleAddToBag() {
    addItem(product, selectedSize);
  }

  function handleBuyNow() {
    addItem(product, selectedSize);
    navigate("/checkout");
  }

  return (
    <main>
      <section className="product-detail" aria-labelledby="product-title">
        <div className="product-detail__gallery">
          <div className="product-detail__media">
            <img src={selectedImage || product.image} alt={product.alt} />
          </div>
          <div className="product-thumbs" aria-label={`${product.name} image gallery`}>
            {galleryImages.map((image) => (
              <button type="button" key={image.src} aria-pressed={(selectedImage || product.image) === image.src} onClick={() => setSelectedImage(image.src)}>
                <img src={image.src} alt={image.alt} />
              </button>
            ))}
          </div>
        </div>
        <div className="product-detail__copy">
          <div className="product-kicker">
            <p className="eyebrow">{product.label}</p>
            <a href="#reviews-title" aria-label={`Read reviews for ${product.name}`}>
              <span aria-hidden="true">★★★★★</span>
              <span>4.8 · 24 reviews</span>
            </a>
          </div>
          <h1 id="product-title">{product.name}</h1>
          <div className="product-detail__price">
            <span>{product.price}</span>
            {product.oldPrice ? <s>{product.oldPrice}</s> : null}
            {discount ? <strong>{discount}% off</strong> : null}
          </div>
          <div className="product-stock-row" aria-label="Product availability and savings">
            <p className="product-stock">In stock</p>
            {savings ? <p>Save {formatPrice(savings)}</p> : null}
            <p>Ships in 2-3 business days</p>
          </div>
          <p className="product-intro">{productIntro}</p>
          <div className="product-detail-chips" aria-label="Product highlights">
            {detailChips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
          <fieldset className="product-size-picker">
            <div className="product-size-picker__header">
              <legend>Choose your size</legend>
              <Link className="text-link" to="/size-guide">Size guide</Link>
            </div>
            <div>
              {["S", "M", "L"].map((size) => (
                <button type="button" key={size} aria-pressed={selectedSize === size} onClick={() => setSelectedSize(size)}>
                  {size}
                </button>
              ))}
            </div>
            <p>Selected: {selectedSize}. Regular fit; choose your usual size for a composed drape.</p>
          </fieldset>
          <div className="product-detail__actions">
            <button className="button button--outline" type="button" onClick={handleAddToBag}>
              Add to Bag
            </button>
            <button className="button button--outline" type="button" onClick={handleBuyNow}>Buy Now</button>
            <button className="product-wishlist-link" type="button" aria-label={`${isSaved ? "Remove" : "Save"} ${product.name} ${isSaved ? "from" : "to"} wishlist`} aria-pressed={isSaved} onClick={() => toggleWishlist(product)}>
              <HeartIcon />
            </button>
          </div>
          <div className="product-service-notes" aria-label="Product service notes">
            <article>
              <span>01</span>
              <strong>Delivery</strong>
              <p>Across Pakistan in 2-3 business days.</p>
            </article>
            <article>
              <span>02</span>
              <strong>Returns</strong>
              <p>14-day returns when unworn and tagged.</p>
            </article>
            <article>
              <span>03</span>
              <strong>Payment</strong>
              <p>Cash on Delivery available at checkout.</p>
            </article>
          </div>
          <div className="product-accordions">
            <details open>
              <summary>Product Details</summary>
              <p>{productDetails}</p>
              <ul>
                <li>Color story: ivory, sand, pearl, or noir depending on edit</li>
                <li>Style: minimal and feminine</li>
                <li>Best worn for: daily polish, dinners, and composed occasions</li>
              </ul>
            </details>
            <details>
              <summary>Care Instructions</summary>
              <ul>
                <li>Gentle hand wash or delicate cycle</li>
                <li>Do not bleach</li>
                <li>Iron on low heat</li>
                <li>Dry in shade</li>
              </ul>
            </details>
            <details>
              <summary>Size Chart</summary>
              <div className="product-size-chart">
                <table>
                  <thead>
                    <tr>
                      <th>Size</th>
                      <th>Bust</th>
                      <th>Waist</th>
                      <th>Hip</th>
                      <th>Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["S", "34 in", "27 in", "37 in", "52 in"],
                      ["M", "36 in", "29 in", "39 in", "52 in"],
                      ["L", "38 in", "31 in", "41 in", "53 in"],
                    ].map((row) => (
                      <tr key={row[0]}>
                        {row.map((cell) => (
                          <td key={cell}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
            <details>
              <summary>Shipping and Returns</summary>
              <p>Orders are prepared within 2-3 business days. Returns may be requested within 14 days when items are unworn, unwashed, and in original condition.</p>
              <Link className="text-link" to="/shipping-returns">Read full policy</Link>
            </details>
          </div>
        </div>
      </section>

      <section className="product-reviews" aria-labelledby="reviews-title">
        <div>
          <p className="eyebrow">Customer notes</p>
          <h2 id="reviews-title">Product Reviews</h2>
          <p>No reviews yet. Be the first to share your experience.</p>
        </div>
        <form className="review-form" action="#" aria-label={`Write a review for ${product.name}`}>
          <h3>Write a Review</h3>
          <label htmlFor="review-name">Your name</label>
          <input id="review-name" type="text" placeholder="Your name" />
          <fieldset>
            <legend>Rating</legend>
            <div className="rating-picker" aria-label="Select product rating">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button type="button" key={rating} aria-label={`${rating} star${rating > 1 ? "s" : ""}`}>
                  ★
                </button>
              ))}
            </div>
          </fieldset>
          <label htmlFor="review-comment">Your review</label>
          <textarea id="review-comment" rows="4" placeholder="Share fit, fabric, and styling notes" />
          <button className="button button--outline" type="submit">Submit Review</button>
        </form>
      </section>

      <section className="related-products" aria-labelledby="related-title">
        <div className="section-header section-header--split">
          <div>
            <p className="eyebrow">You may also like</p>
            <h2 id="related-title">Related Pieces</h2>
          </div>
          <Link className="text-link" to="/shop">Shop all</Link>
        </div>
        <div className="product-grid">
          {displayedRelated.map((related) => (
            <ProductCard key={related.id} product={related} />
          ))}
        </div>
      </section>
    </main>
  );
}
