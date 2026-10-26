/** The flask-and-seedling logo. A light-outlined copy is swapped in by CSS for the dark theme. */
export function BrandMark({ size = 40 }: { size?: number }) {
  const width = Math.round(size * 0.486);
  return (
    <span className="brand-mark" style={{ height: size, width }} aria-hidden="true">
      <img className="brand-mark-light" src="/logo.png" alt="" width={width} height={size} />
      <img className="brand-mark-dark" src="/logo-dark.png" alt="" width={width} height={size} />
    </span>
  );
}
