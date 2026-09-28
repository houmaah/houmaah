import { Link, useSearchParams } from "react-router";
import {
  SHOP_CATEGORIES,
  SHOP_COLORS,
  SORT_OPTIONS,
  buildCatalogSearch,
  getCatalogProducts,
  readCategories,
  readColors,
} from "../catalog";
import { products } from "../data";
import { ProductCard } from "../components/ProductCard";

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategories = readCategories(searchParams);
  const selectedColors = readColors(searchParams);
  const availability = searchParams.get("availability") === "in-stock" ? "in-stock" : "all";
  const sort = SORT_OPTIONS.some((option) => option.value === searchParams.get("sort")) ? searchParams.get("sort") : "featured";
  const visibleProducts = getCatalogProducts(products, {
    categories: selectedCategories,
    colors: selectedColors,
    availability,
    sort,
  });
  const hasActiveFilters = selectedCategories.length || selectedColors.length || availability !== "all" || sort !== "featured";
  const currentQuery = searchParams.toString();

  function updateCatalog(updates) {
    setSearchParams(buildCatalogSearch(searchParams, updates), { replace: true });
  }

  function toggleValue(values, value) {
    return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
  }

  function getCategoryHref(category) {
    if (category === "All") return "/shop";
    const nextSearch = buildCatalogSearch(searchParams, { category: [category] });
    return `/shop?${nextSearch}`;
  }

  return (
    <main>
      <section className="listing-hero" aria-labelledby="shop-title">
        <div className="listing-hero__copy">
          <p className="eyebrow">Shop</p>
          <h1 id="shop-title">The complete Houmaah wardrobe.</h1>
          <p>Browse refined dresses, co-ords, kurtas, occasionwear, and essentials designed with effortless luxury in mind.</p>
        </div>
        <div className="listing-hero__note" aria-label="Shop summary">
          <span>{products.length}</span>
          <p>pieces available in the Houmaah catalog.</p>
        </div>
      </section>

      <section className="shop-category-strip" aria-label="Shop categories">
        {SHOP_CATEGORIES.map((item) => (
          <Link to={getCategoryHref(item)} aria-current={(item === "All" && !selectedCategories.length) || selectedCategories.includes(item) ? "page" : undefined} key={item}>
            {item}
          </Link>
        ))}
      </section>

      <section className="shop-catalog" aria-labelledby="shop-products-title">
        <aside className="shop-sidebar" aria-label="Product filters">
          <div className="shop-sidebar__header">
            <p className="eyebrow">Filter</p>
            <h2>Refine</h2>
            {hasActiveFilters ? (
              <Link to="/shop">Clear</Link>
            ) : null}
          </div>
          <fieldset className="shop-filter-group">
            <legend>Category</legend>
            {SHOP_CATEGORIES.filter((item) => item !== "All").map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(item)}
                  onChange={() => updateCatalog({ category: toggleValue(selectedCategories, item) })}
                />
                <span>{item}</span>
              </label>
            ))}
          </fieldset>
          <fieldset className="shop-filter-group">
            <legend>Color</legend>
            {SHOP_COLORS.map((item) => (
              <label key={item}>
                <input
                  type="checkbox"
                  checked={selectedColors.includes(item)}
                  onChange={() => updateCatalog({ color: toggleValue(selectedColors, item) })}
                />
                <span>{item}</span>
              </label>
            ))}
          </fieldset>
          <fieldset className="shop-filter-group">
            <legend>Availability</legend>
            <label>
              <input type="radio" name="availability" checked={availability === "all"} onChange={() => updateCatalog({ availability: "" })} />
              <span>All</span>
            </label>
            <label>
              <input type="radio" name="availability" checked={availability === "in-stock"} onChange={() => updateCatalog({ availability: "in-stock" })} />
              <span>In stock</span>
            </label>
          </fieldset>
        </aside>

        <div className="shop-results">
          <div className="shop-toolbar">
            <div>
              <p className="eyebrow">Catalog</p>
              <h2 id="shop-products-title">{selectedCategories.length === 1 ? selectedCategories[0] : "Shop all"}</h2>
              <p role="status">{visibleProducts.length} of {products.length} products</p>
            </div>
            <div className="shop-toolbar__actions">
              <label htmlFor="shop-sort">Sort</label>
              <select id="shop-sort" value={sort} onChange={(event) => updateCatalog({ sort: event.target.value === "featured" ? "" : event.target.value })}>
                {SORT_OPTIONS.map((option) => (
                  <option value={option.value} key={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
          {visibleProducts.length ? (
            <div className="shop-product-grid">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="commerce-empty catalog-empty" role="status">
              <p>No pieces match this refinement. Adjust the filters or return to the complete Houmaah wardrobe.</p>
              <div className="catalog-empty__actions">
                <Link className="button button--outline" to="/shop">Clear Filters</Link>
                <Link className="text-link" to={currentQuery ? `/search?${currentQuery}` : "/search"}>Search instead</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
