import { priceToNumber } from "./components/cartUtils.js";

export const SHOP_CATEGORIES = ["All", "Dresses", "Co-ords", "Kurtas", "Occasion", "Essentials"];
export const SHOP_COLORS = ["Ivory", "Sand", "Noir", "Pearl"];
export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price low to high" },
  { value: "price-high", label: "Price high to low" },
];

const categoryAliases = {
  all: "All",
  co: "Co-ords",
  coords: "Co-ords",
  "co-ords": "Co-ords",
  sets: "Co-ords",
  set: "Co-ords",
  dresses: "Dresses",
  dress: "Dresses",
  kurtas: "Kurtas",
  kurta: "Kurtas",
  occasion: "Occasion",
  occasionwear: "Occasion",
  essentials: "Essentials",
  everyday: "Essentials",
};

export function toSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-");
}

export function normalizeCategory(value) {
  const key = toSlug(value);
  return categoryAliases[key] || SHOP_CATEGORIES.find((category) => toSlug(category) === key) || "";
}

export function readMultiParam(searchParams, key) {
  return searchParams
    .getAll(key)
    .flatMap((value) => value.split(","))
    .map((value) => value.trim())
    .filter(Boolean);
}

export function readCategories(searchParams) {
  return readMultiParam(searchParams, "category")
    .map(normalizeCategory)
    .filter((category) => category && category !== "All");
}

export function readColors(searchParams) {
  return readMultiParam(searchParams, "color")
    .map((color) => SHOP_COLORS.find((item) => toSlug(item) === toSlug(color)))
    .filter(Boolean);
}

export function buildCatalogSearch(searchParams, updates = {}) {
  const next = new URLSearchParams(searchParams);

  Object.entries(updates).forEach(([key, value]) => {
    next.delete(key);

    if (Array.isArray(value)) {
      if (value.length) next.set(key, value.map(toSlug).join(","));
      return;
    }

    if (value) next.set(key, String(value));
  });

  return next.toString();
}

export function getProductColors(product) {
  const haystack = `${product.name} ${product.descriptor} ${product.label} ${product.category} ${product.alt}`.toLowerCase();
  return SHOP_COLORS.filter((color) => haystack.includes(color.toLowerCase()));
}

export function getProductSearchText(product) {
  return [product.name, product.category, product.label, product.descriptor, product.alt, ...getProductColors(product)].join(" ").toLowerCase();
}

export function filterProducts(products, filters = {}) {
  const categories = filters.categories || [];
  const colors = filters.colors || [];
  const query = String(filters.query || "").trim().toLowerCase();
  const inStockOnly = filters.availability === "in-stock";

  return products.filter((product) => {
    const categoryMatches = !categories.length || categories.includes(product.category);
    const colorMatches = !colors.length || colors.some((color) => getProductColors(product).includes(color));
    const availabilityMatches = !inStockOnly || product.available !== false;
    const queryMatches = !query || getProductSearchText(product).includes(query);

    return categoryMatches && colorMatches && availabilityMatches && queryMatches;
  });
}

export function sortProducts(products, sort = "featured") {
  const indexed = products.map((product, index) => ({ product, index }));

  const sorted = [...indexed].sort((a, b) => {
    if (sort === "price-low") return priceToNumber(a.product.price) - priceToNumber(b.product.price);
    if (sort === "price-high") return priceToNumber(b.product.price) - priceToNumber(a.product.price);
    if (sort === "newest") {
      const aNew = a.product.label === "New" ? 0 : 1;
      const bNew = b.product.label === "New" ? 0 : 1;
      return aNew - bNew || a.index - b.index;
    }
    return a.index - b.index;
  });

  return sorted.map(({ product }) => product);
}

export function getCatalogProducts(products, filters = {}) {
  return sortProducts(filterProducts(products, filters), filters.sort);
}
