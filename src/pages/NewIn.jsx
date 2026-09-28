import { Link, useSearchParams } from "react-router";
import { assetPath } from "../assetPath";
import { SHOP_CATEGORIES, SORT_OPTIONS, buildCatalogSearch, sortProducts, toSlug } from "../catalog";
import { products } from "../data";
import { ProductCard } from "../components/ProductCard";
import { ServiceStrip } from "../components/Layout";

export function NewIn() {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = SORT_OPTIONS.some((option) => option.value === searchParams.get("sort")) ? searchParams.get("sort") : "newest";
  const newInProducts = sortProducts(products, sort).slice(0, 8);

  return (
    <main>
      <section className="listing-hero" aria-labelledby="new-in-title">
        <div className="listing-hero__copy">
          <p className="eyebrow">New In</p>
          <h1 id="new-in-title">Fresh arrivals, quietly refined.</h1>
          <p>Discover the newest Houmaah pieces, designed for modern femininity and everyday elegance.</p>
        </div>
        <div className="listing-hero__note" aria-label="New In summary">
          <span>{products.length.toString().padStart(2, "0")}</span>
          <p>new silhouettes selected for the current Houmaah wardrobe.</p>
        </div>
      </section>

      <section className="shop-controls" aria-label="New In shopping controls">
        <nav className="filter-pills" aria-label="New In categories">
          {SHOP_CATEGORIES.filter((item) => item !== "Occasion").map((item, index) => (
            <Link to={index === 0 ? "/new-in" : `/shop?category=${toSlug(item)}`} aria-current={index === 0 ? "page" : undefined} key={item}>
              {item}
            </Link>
          ))}
        </nav>
        <div className="sort-controls">
          <label htmlFor="new-in-sort">Sort</label>
          <select id="new-in-sort" value={sort} onChange={(event) => setSearchParams(buildCatalogSearch(searchParams, { sort: event.target.value === "newest" ? "" : event.target.value }), { replace: true })}>
            {SORT_OPTIONS.filter((option) => option.value !== "featured").map((option) => (
              <option value={option.value} key={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="new-in-products" aria-labelledby="new-in-products-title">
        <div className="section-header section-header--split">
          <div>
            <p className="eyebrow">Latest edit</p>
            <h2 id="new-in-products-title">New arrivals</h2>
          </div>
          <p>{newInProducts.length} pieces</p>
        </div>
        <div className="product-grid">
          {newInProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="new-in-editorial" aria-labelledby="new-in-editorial-title">
        <img src={assetPath("assets/houmaah-timeless-essentials-banner.png")} alt="Houmaah Timeless Essentials editorial banner" />
        <div>
          <p className="eyebrow">The new mood</p>
          <h2 id="new-in-editorial-title">Timeless Essentials</h2>
          <Link className="button button--light" to="/collections">
            Shop the Edit
          </Link>
        </div>
      </section>

      <ServiceStrip />
    </main>
  );
}
