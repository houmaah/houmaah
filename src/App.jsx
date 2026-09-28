import { useLayoutEffect } from "react";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import { Layout } from "./components/Layout";
import { Collections } from "./pages/Collections";
import { Home } from "./pages/Home";
import {
  BagPage,
  CheckoutPage,
  ContactPage,
  FaqsPage,
  JournalPage,
  LegalPage,
  ProductDetailPage,
  SalePage,
  SearchPage,
  ShippingReturnsPage,
  SizeGuidePage,
  TrackOrderPage,
  WishlistPage,
} from "./pages/InfoPages";
import { Lookbook } from "./pages/Lookbook";
import { NewIn } from "./pages/NewIn";
import { OurStory } from "./pages/OurStory";
import { Shop } from "./pages/Shop";

const routeAliases = [
  ["/new-in", "/new-in.html", <NewIn />],
  ["/shop", "/shop.html", <Shop />],
  ["/collections", "/collections.html", <Collections />],
  ["/lookbook", "/lookbook.html", <Lookbook />],
  ["/our-story", "/our-story.html", <OurStory />],
  ["/contact", "/contact.html", <ContactPage />],
  ["/faqs", "/faqs.html", <FaqsPage />],
  ["/size-guide", "/size-guide.html", <SizeGuidePage />],
  ["/shipping-returns", "/shipping-returns.html", <ShippingReturnsPage />],
  ["/track-order", "/track-order.html", <TrackOrderPage />],
  ["/privacy", "/privacy.html", <LegalPage type="privacy" />],
  ["/terms", "/terms.html", <LegalPage type="terms" />],
  ["/search", "/search.html", <SearchPage />],
  ["/bag", "/bag.html", <BagPage />],
  ["/checkout", "/checkout.html", <CheckoutPage />],
  ["/wishlist", "/wishlist.html", <WishlistPage />],
  ["/sale", "/sale.html", <SalePage />],
  ["/journal", "/journal.html", <JournalPage />],
];

function ProductLegacyRedirect() {
  const { productId } = useParams();
  return <Navigate to={`/products/${productId}`} replace />;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    function forceScrollTop() {
      const root = document.documentElement;
      const previousBehavior = root.style.scrollBehavior;

      root.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      root.style.scrollBehavior = previousBehavior;
    }

    forceScrollTop();
    const frame = window.requestAnimationFrame(forceScrollTop);
    const timeout = window.setTimeout(forceScrollTop, 120);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timeout);
    };
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Layout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/index.html" element={<Navigate to="/" replace />} />
        <Route path="/products/:productId" element={<ProductDetailPage />} />
        <Route path="/product/:productId" element={<ProductLegacyRedirect />} />
        <Route path="/faq" element={<Navigate to="/faqs" replace />} />
        <Route path="/shipping" element={<Navigate to="/shipping-returns" replace />} />
        <Route path="/returns" element={<Navigate to="/shipping-returns" replace />} />
        <Route path="/blog" element={<Navigate to="/journal" replace />} />
        <Route path="/policies/privacy-policy" element={<Navigate to="/privacy" replace />} />
        <Route path="/policies/terms-of-service" element={<Navigate to="/terms" replace />} />
        {routeAliases.flatMap(([path, alias, element]) => [
          <Route key={path} path={path} element={element} />,
          <Route key={alias} path={alias} element={element} />,
        ])}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}
