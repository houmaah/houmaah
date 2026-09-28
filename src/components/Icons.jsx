export function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </svg>
  );
}

export function BagIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6.5 8h11l1 12h-13l1-12Z" />
      <path d="M9 8a3 3 0 0 1 6 0" />
    </svg>
  );
}

export function HeartIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z" />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function ServiceIcon({ type }) {
  if (type === "delivery") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M3 7h11v10H3z" />
        <path d="M14 11h4l3 3v3h-7z" />
        <circle cx="7" cy="19" r="1.5" />
        <circle cx="18" cy="19" r="1.5" />
      </svg>
    );
  }

  if (type === "returns") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24">
        <path d="M5 12a7 7 0 0 1 12-5l2 2" />
        <path d="M19 5v4h-4" />
        <path d="M19 12a7 7 0 0 1-12 5l-2-2" />
        <path d="M5 19v-4h4" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 12a8 8 0 0 1 16 0v5a3 3 0 0 1-3 3h-2" />
      <path d="M6 13v4" />
      <path d="M18 13v4" />
      <path d="M10 20h5" />
    </svg>
  );
}
