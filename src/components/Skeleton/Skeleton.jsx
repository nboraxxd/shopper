import { twMerge } from 'tailwind-merge'

export default function Skeleton({ shap = 'rectangle', width, height, className, children }) {
  return (
    <span
      className={`bg-skeleton ${twMerge(
        'inline-block w-full animate-shine rounded bg-[length:200%_400%]',
        shap === 'circle' && 'rounded-full',
        className && className,
      )}`}
      style={{ width, height }}
    >
      {children}
    </span>
  )
}
