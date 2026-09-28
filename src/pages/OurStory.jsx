import { Link } from "react-router";
import { Newsletter } from "../components/Layout";

export function OurStory() {
  return (
    <main>
      <section className="story-hero" aria-labelledby="story-title">
        <p className="eyebrow">Our Story</p>
        <h1 id="story-title">Effortless luxury, made for her rhythm.</h1>
        <p>Houmaah is shaped around refined femininity: pieces that feel considered, calm, and beautiful without asking for attention.</p>
      </section>

      <section className="story-origin" aria-labelledby="origin-title">
        <div className="story-origin__copy">
          <p className="eyebrow">Philosophy</p>
          <h2 id="origin-title">Every piece begins with the idea of ease.</h2>
          <p>Every Houmaah piece is designed around the philosophy of effortless luxury: clean silhouettes, delicate detailing, and fabrics made to move with you.</p>
          <p>The wardrobe is intentionally quiet. It is built for women who value refinement in the smallest decisions, from how a sleeve falls to how a fabric catches light.</p>
          <Link className="button button--outline" to="/collections">
            Explore Collections
          </Link>
        </div>
        <div className="story-origin__image">
          <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1300&q=85" alt="Warm neutral garment detail representing Houmaah fabric and craft" />
        </div>
      </section>

      <section className="story-values" aria-labelledby="values-title">
        <div className="section-header section-header--center">
          <p className="eyebrow">What guides us</p>
          <h2 id="values-title">The Houmaah language is quiet, precise, and feminine.</h2>
        </div>
        <div className="story-value-grid">
          {[
            ["Timeless Form", "Silhouettes are designed to outlast the moment and remain easy to return to."],
            ["Refined Detail", "Texture, trim, and proportion are kept intentional, never ornamental for its own sake."],
            ["Everyday Grace", "Each piece should support the day, moving between home, work, and occasion with ease."],
          ].map(([title, text], index) => (
            <article key={title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="story-process" aria-labelledby="process-title">
        <div>
          <p className="eyebrow">Process</p>
          <h2 id="process-title">From first line to final fit.</h2>
        </div>
        <ol className="story-process__list">
          {[
            ["Sketch", "Begin with the silhouette, the mood, and the moment the piece should belong to."],
            ["Refine", "Edit the details until the garment feels balanced, wearable, and unmistakably Houmaah."],
            ["Release", "Present pieces in small, focused edits so discovery feels considered instead of crowded."],
          ].map(([title, text]) => (
            <li key={title}>
              <span>{title}</span>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="brand-note" aria-labelledby="brand-note-title">
        <p className="eyebrow">A note from Houmaah</p>
        <h2 id="brand-note-title">We believe elegance should feel natural before it feels noticed.</h2>
        <p>Our work is to create pieces that become part of how she carries herself: composed, comfortable, and deeply her own.</p>
        <Link className="text-link" to="/lookbook">
          View the lookbook
        </Link>
      </section>

      <Newsletter id="story-email" heading="Join the Houmaah world." />
    </main>
  );
}
