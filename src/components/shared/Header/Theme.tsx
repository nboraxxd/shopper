import { useRef, useState, useEffect } from 'react'
import {
  useFloating,
  useInteractions,
  arrow,
  shift,
  flip,
  offset,
  useClick,
  useTransitionStyles,
} from '@floating-ui/react'

import { THEMES } from '@/constants'
import { cn } from '@/utils'
import { useTheme } from '@/context/ThemeProvider'
import { PrimaryButton } from '@/components/shared/Button'

export default function Theme() {
  const arrowRef = useRef<HTMLImageElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const { refs, context, floatingStyles, elements, x, y, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: 'bottom-end',
    middleware: [offset({ crossAxis: 15, mainAxis: 15 }), shift(), flip(), arrow({ element: arrowRef })],
  })

  const click = useClick(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([click])

  const { styles, isMounted } = useTransitionStyles(context, {
    duration: 300,
    initial: {
      opacity: 0,
      transform: 'scale(0)',
    },
  })

  useEffect(() => {
    function handler(ev: MouseEvent) {
      const target = ev.target
      const reference = elements.domReference
      const floating = elements.floating

      if (target instanceof HTMLElement && !reference?.contains(target) && !floating?.contains(target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handler)

    return () => {
      document.removeEventListener('click', handler)
    }
  }, [elements.domReference, elements.floating])

  return (
    <>
      {/* Theme button */}
      <PrimaryButton
        className="background-light1_dark2 relative rounded-lg p-3.5 shadow-1 hover:bg-light-2/60 dark:shadow-none dark:hover:bg-dark-3/5"
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        <img
          src="/assets/icons/sun.svg"
          alt="Sun"
          width={24}
          height={24}
          className="active-theme rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
        />
        <img
          src="/assets/icons/moon.svg"
          alt="Moon"
          width={24}
          height={24}
          className="active-theme absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
      </PrimaryButton>

      {/* Popover */}
      {isMounted && (
        <div
          className="background-light1_dark2 relative z-30 w-32 rounded-lg py-1.5 shadow-1 dark:shadow-2"
          ref={refs.setFloating}
          style={{
            ...floatingStyles,
            ...styles,
            // Phải set lại left và top vì nó bị ghi đè bởi styles
            left: x,
            top: y,
            // 72 là khoảng cách từ góc trên bên trái của floating đến góc trên bên trái của arrow
            // 15.5 là nửa chiều rộng của arrow
            transformOrigin: `${(middlewareData.arrow?.x || 72) + 15.5}px top`,
          }}
          {...getFloatingProps()}
        >
          {/* Arrow */}
          <img
            ref={arrowRef}
            src="/assets/images/arrow-up.png"
            className="dropdown-arrow absolute -top-2.5 right-6 z-0 h-3"
          />

          {/* Themes */}
          <ul>
            {THEMES.map((item) => (
              <li key={item.value} className="hover:bg-light-2/60 dark:hover:bg-dark-3/5">
                <PrimaryButton
                  className="flex-center flex w-full gap-2 px-2.5 py-2"
                  onClick={() => {
                    setTheme(item.value)
                    setIsOpen(false)
                  }}
                >
                  <img
                    src={item.icon}
                    alt={item.label}
                    width={18}
                    height={18}
                    className={cn({ 'active-theme': theme === item.value })}
                  />
                  <span className={cn('medium-15 text-secondary1_light1', { 'text-[#38bdf8]': theme === item.value })}>
                    {item.label}
                  </span>
                </PrimaryButton>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}
