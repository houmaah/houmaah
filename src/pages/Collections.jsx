import { Link } from "react-router";
import { assetPath } from "../assetPath";
import { toSlug } from "../catalog";
import { collections } from "../data";
import { ServiceStrip } from "../components/Layout";

export function Collections() {
  function getCollectionLink(collection) {
    if (collection.season) return "/new-in";
    if (collection.title === "Everyday") return "/shop?category=essentials";
    if (collection.title === "Soft Detail") return "/search?q=soft%20detail";
    return `/shop?category=${toSlug(collection.title)}`;
  }

  return (
    <main>
      <section className="listing-hero" aria-labelledby="collections-title">
        <div className="listing-hero__copy">
          <p className="eyebrow">Collections</p>
          <h1 id="collections-title">Choose the edit that fits your day.</h1>
          <p>Explore Houmaah by wardrobe intention, from everyday refinement to occasion-ready silhouettes.</p>
        </div>
        <div className="listing-hero__note" aria-label="Collections summary">
          <span>06</span>
          <p>curated paths designed to make discovery feel considered.</p>
        </div>
      </section>

      <section className="collections-feature" aria-labelledby="featured-collection-title">
        <div className="collections-feature__image">
          <img src={assetPath("assets/houmaah-timeless-essentials-banner.png")} alt="Houmaah Timeless Essentials collection editorial" />
        </div>
        <div className="collections-feature__copy">
          <p className="eyebrow">Featured collection</p>
          <h2 id="featured-collection-title">Timeless Essentials</h2>
          <p>Clean silhouettes, softened details, and pieces made to carry you from weekday polish into evening ease.</p>
          <Link className="button button--outline" to="/shop?category=essentials">
            Shop Collection
          </Link>
        </div>
      </section>

      <section className="collection-index" aria-labelledby="collection-index-title">
        <div className="section-header section-header--split">
          <div>
            <p className="eyebrow">Collection index</p>
            <h2 id="collection-index-title">Shop by intention</h2>
          </div>
          <Link className="text-link" to="/shop">
            Shop all
          </Link>
        </div>
        <div className="collection-catalog-grid">
          {collections.map((collection, index) => (
            <Link
              className={`collection-card collection-card--catalog${index === 0 ? " collection-card--wide" : ""}${collection.season ? " collection-card--season" : ""}`}
              to={getCollectionLink(collection)}
              key={collection.title}
            >
              <img src={collection.image} alt={collection.alt} />
              <span>{collection.title}</span>
              <p>{collection.text}</p>
              <small>{collection.count}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="collection-season" aria-labelledby="season-title">
        <p className="eyebrow">Current focus</p>
        <h2 id="season-title">A considered wardrobe begins with fewer, better choices.</h2>
        <div className="collection-season__links" aria-label="Current collection actions">
          <Link className="button button--outline" to="/new-in">
            View New In
          </Link>
          <Link className="button button--outline" to="/shop?category=essentials">
            Shop All
          </Link>
        </div>
      </section>

      <ServiceStrip />
    </main>
  );
}
