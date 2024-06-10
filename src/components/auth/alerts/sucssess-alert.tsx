import { cn } from '@/utils'

export default function SucssessAlert({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'text-secondary1_light1 medium-14 w-full rounded-xl border border-primary-green bg-secondary-green/20 p-3.5 text-left',
        className
      )}
    >
      {children}
    </div>
  )
}
