import { Link } from "react-router";
import { assetPath } from "../assetPath";
import { ServiceStrip } from "../components/Layout";

export function Lookbook() {
  return (
    <main>
      <section className="editorial-hero" aria-labelledby="lookbook-title">
        <p className="eyebrow">Lookbook</p>
        <h1 id="lookbook-title">The art of everyday refinement.</h1>
        <p>Editorial stories for the Houmaah woman: composed silhouettes, soft details, and pieces made to move through the day with ease.</p>
      </section>

      <section className="lookbook-feature" aria-labelledby="lookbook-feature-title">
        <div className="lookbook-feature__media">
          <img src={assetPath("assets/houmaah-hero-banner.png")} alt="Houmaah lookbook models styled in soft tailored pastel suits" />
        </div>
        <div className="lookbook-feature__copy">
          <p className="eyebrow">Current mood</p>
          <h2 id="lookbook-feature-title">Soft tailoring, quiet confidence.</h2>
          <p>Clean jackets, fluid trousers, and gentle color stories create a wardrobe that feels polished without feeling formal.</p>
          <Link className="button button--outline" to="/shop">
            Shop the Looks
          </Link>
        </div>
      </section>

      <section className="lookbook-chapters" aria-labelledby="chapters-title">
        <div className="section-header section-header--split">
          <div>
            <p className="eyebrow">Editorial chapters</p>
            <h2 id="chapters-title">Three ways to wear Houmaah.</h2>
          </div>
          <Link className="text-link" to="/collections">
            Explore collections
          </Link>
        </div>
        <div className="lookbook-chapter-grid">
          {[
            ["Evening Ease", "Soft occasion pieces that carry presence through proportion, fabric, and restraint.", "https://images.pexels.com/photos/19401640/pexels-photo-19401640/free-photo-of-studio-shot-of-model-in-beige-dress.jpeg?auto=compress&cs=tinysrgb&w=900", "Neutral occasionwear lookbook styling in a beige studio setting"],
            ["Daily Poise", "Refined everyday dressing with room to move, layer, and repeat.", "https://images.pexels.com/photos/28895909/pexels-photo-28895909/free-photo-of-elegant-woman-in-beige-dress-outdoors.jpeg?auto=compress&cs=tinysrgb&w=900", "Warm everyday Houmaah styling in a neutral outdoor setting"],
            ["Print and Light", "Feminine color and delicate pattern, balanced by clean lines and warm texture.", assetPath("assets/houmaah-timeless-essentials-banner.png"), "Timeless Essentials lookbook portrait with warm neutral styling"],
          ].map(([title, text, image, alt], index) => (
            <article className="lookbook-chapter" key={title}>
              <img src={image} alt={alt} />
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="styling-notes" aria-labelledby="styling-title">
        <p className="eyebrow">Styling notes</p>
        <h2 id="styling-title">Build around one calm silhouette, then let one detail speak.</h2>
        <div className="styling-notes__grid">
          <p>Choose one tonal base.</p>
          <p>Keep accessories quiet.</p>
          <p>Let fabric movement soften the structure.</p>
        </div>
      </section>

      <section className="lookbook-gallery" aria-labelledby="gallery-title">
        <div className="section-header">
          <p className="eyebrow">Campaign gallery</p>
          <h2 id="gallery-title">Moments from the Houmaah wardrobe.</h2>
        </div>
        <div className="lookbook-gallery__grid">
          <img src="https://images.pexels.com/photos/13776795/pexels-photo-13776795.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Ivory fashion lookbook moment in soft studio light" />
          <img src="https://images.pexels.com/photos/31649583/pexels-photo-31649583.jpeg?auto=compress&cs=tinysrgb&w=900" alt="Soft feminine styling with floral detail" />
          <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=85" alt="Warm garment detail for Houmaah lookbook styling" />
          <img src="https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85" alt="Refined accessory and fabric styling detail" />
        </div>
      </section>

      <ServiceStrip />
    </main>
  );
}
