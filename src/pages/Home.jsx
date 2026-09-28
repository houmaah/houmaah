import { Link } from "react-router";
import { toSlug } from "../catalog";
import { collections, products } from "../data";
import { Newsletter, ServiceStrip } from "../components/Layout";
import { ProductCard } from "../components/ProductCard";

export function Home() {
  function getCollectionLink(collection) {
    if (collection.season) return "/new-in";
    if (collection.title === "Everyday") return "/shop?category=essentials";
    return `/shop?category=${toSlug(collection.title)}`;
  }

  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <img className="hero__image" src="/assets/houmaah-hero-banner.png" alt="Houmaah campaign with three women styled in soft tailored pastel suits" />
        <div className="hero__content">
          <p className="eyebrow">Houmaah</p>
          <h1 id="hero-title">
            Timeless
            <br />
            Elegance.
          </h1>
          <p>Minimal. Refined. Yours.</p>
          <Link className="button button--light" to="/collections">
            Shop Collection
          </Link>
        </div>
      </section>

      <section className="new-arrivals" aria-labelledby="new-arrivals-title">
        <div className="section-header section-header--split">
          <div>
            <p className="eyebrow">Just arrived</p>
            <h2 id="new-arrivals-title">New Arrivals</h2>
            <p>Discover our latest pieces, thoughtfully designed.</p>
          </div>
          <Link className="text-link" to="/new-in">
            View all
          </Link>
        </div>
        <div className="product-row" aria-label="New arrival products">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      </section>

      <section className="philosophy" aria-labelledby="philosophy-title">
        <div className="philosophy__copy">
          <p className="eyebrow">The Houmaah philosophy</p>
          <h2 id="philosophy-title">
            Effortless luxury,
            <br />
            designed with intention.
          </h2>
          <p>Every Houmaah piece is designed around the philosophy of effortless luxury - clean silhouettes, delicate detailing, and fabrics made to move with you.</p>
          <Link className="button button--outline" to="/our-story">
            Discover Our Story
          </Link>
        </div>
        <div className="philosophy__image">
          <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1300&q=85" alt="Warm neutral fabric and refined garment detail" />
        </div>
      </section>

      <section className="collections" aria-labelledby="collections-title">
        <div className="section-header">
          <p className="eyebrow">Shop by collection</p>
          <h2 id="collections-title">Pieces for the way she moves.</h2>
        </div>
        <div className="collection-grid">
          {collections.slice(0, 3).map((collection, index) => (
            <Link className={`collection-card${index === 0 ? " collection-card--large" : ""}`} to={getCollectionLink(collection)} key={collection.title}>
              <img src={collection.image} alt={collection.alt} />
              <span>{collection.title}</span>
              <small>Explore Collection</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="campaign" aria-labelledby="campaign-title">
        <img className="campaign__image" src="/assets/houmaah-timeless-essentials-banner.png" alt="Houmaah Timeless Essentials model seated in a floral outfit with warm neutral styling" />
        <div>
          <p className="eyebrow">New arrivals</p>
          <h2 id="campaign-title">Timeless Essentials</h2>
          <Link className="button button--light" to="/new-in">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="craft" aria-labelledby="craft-title">
        <div className="section-header section-header--center">
          <p className="eyebrow">Craft and detail</p>
          <h2 id="craft-title">Made to be felt. Designed to be remembered.</h2>
        </div>
        <div className="craft-grid">
          {[
            ["Fabric", "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=760&q=85", "Refined fabric and accessory detail"],
            ["Detail", "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=760&q=85", "Close editorial detail of refined clothing texture"],
            ["Silhouette", "https://images.pexels.com/photos/13816069/pexels-photo-13816069.jpeg?auto=compress&cs=tinysrgb&w=760", "Garment silhouette with soft beige studio movement"],
          ].map(([title, image, alt], index) => (
            <article key={title}>
              <img src={image} alt={alt} />
              <p>{String(index + 1).padStart(2, "0")}</p>
              <h3>{title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="lookbook" aria-labelledby="lookbook-title">
        <div className="lookbook__intro">
          <p className="eyebrow">Lookbook</p>
          <h2 id="lookbook-title">The Houmaah Woman</h2>
          <Link className="text-link" to="/lookbook">
            Explore lookbook
          </Link>
        </div>
        <div className="lookbook__grid">
          <img className="lookbook__lead" src="https://images.pexels.com/photos/13816069/pexels-photo-13816069.jpeg?auto=compress&cs=tinysrgb&w=1100" alt="Editorial portrait for the Houmaah lookbook in beige studio light" />
          <img src="https://images.pexels.com/photos/19401640/pexels-photo-19401640/free-photo-of-studio-shot-of-model-in-beige-dress.jpeg?auto=compress&cs=tinysrgb&w=760" alt="Soft neutral lookbook styling in beige dress" />
          <img src="https://images.pexels.com/photos/13776795/pexels-photo-13776795.jpeg?auto=compress&cs=tinysrgb&w=760" alt="Modern refined ivory fashion styling" />
        </div>
      </section>

      <section className="quote" aria-labelledby="quote-title">
        <h2 id="quote-title">"Simplicity is the keynote of all true elegance."</h2>
        <span>Houmaah</span>
      </section>

      <ServiceStrip />
      <Newsletter id="home-email" />
    </main>
  );
}
