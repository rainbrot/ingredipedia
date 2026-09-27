export function BrandMark({ size = 32 }: { size?: number }) {
  return (
    <svg className="brand-mark" width={size} height={size} viewBox="0 0 512 512" aria-hidden="true">
      <rect width="512" height="512" rx="116" fill="var(--primary)" />
      <path d="M256 104 387.6 180v152L256 408 124.4 332V180Z" fill="none" stroke="var(--primary-ink)" strokeWidth="30" strokeLinejoin="round" />
      <path d="M256 104v304" stroke="var(--primary-ink)" strokeOpacity=".35" strokeWidth="14" />
      <circle cx="256" cy="256" r="46" fill="var(--primary-ink)" />
      <path d="M168 256h176" stroke="var(--primary-ink)" strokeWidth="18" strokeLinecap="round" />
    </svg>
  );
}
