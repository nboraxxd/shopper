import { createContext, useRef, useEffect, useContext, MutableRefObject } from 'react'
import { To } from 'react-router-dom'
import {
  useFloating,
  useInteractions,
  arrow,
  shift,
  flip,
  offset,
  useClick,
  useTransitionStyles,
  ReferenceType,
  MiddlewareData,
  Placement,
} from '@floating-ui/react'

import { cn } from '@/utils'

interface IFloatingContext {
  getReferenceProps: (userProps?: React.HTMLProps<Element> | undefined) => Record<string, unknown>
  getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>
  styles: React.CSSProperties
  isMounted: boolean
  setReference: ((node: ReferenceType | null) => void) & ((node: ReferenceType | null) => void)
  setFloating: ((node: HTMLElement | null) => void) & ((node: HTMLElement | null) => void)
  floatingStyles: React.CSSProperties
  x: number
  y: number
  middlewareData: MiddlewareData
  arrowRef: MutableRefObject<HTMLImageElement | null>
}

interface IRootPops {
  children: React.ReactNode
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  placement?: Placement
}

interface IReferenceProps {
  children?: React.ReactNode
  as?: React.ElementType
  to?: To
  className?: string
}

interface IFloatingProps {
  children: React.ReactNode
  arrowImg: string
  arrowWidth: number
  wrapperClassName?: string
  arrowClassName?: string
  arrowYOffsetKeyword?: 'top' | 'bottom'
}

const INITIAL_STATE: IFloatingContext = {
  getReferenceProps: () => ({}),
  getFloatingProps: () => ({}),
  styles: {},
  isMounted: false,
  setReference: () => {},
  setFloating: () => {},
  floatingStyles: {},
  x: 0,
  y: 0,
  middlewareData: {},
  arrowRef: { current: null },
}

const PopoverContext = createContext<IFloatingContext>(INITIAL_STATE)

function Root({ children, isOpen, setIsOpen, placement }: IRootPops) {
  const arrowRef = useRef<HTMLImageElement>(null)

  const { refs, context, floatingStyles, elements, x, y, middlewareData } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    // crossAxis là chiều ngang từ trái qua phải, mainAxis là chiều dọc từ trên xuống dưới
    middleware: [offset({ crossAxis: 15, mainAxis: 15 }), shift(), flip(), arrow({ element: arrowRef })],
  })

  const { setReference, setFloating } = refs

  const click = useClick(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([click])

  const { styles, isMounted } = useTransitionStyles(context, {
    duration: 300,
    initial: {
      opacity: 0,
      transform: 'scale(0)',
    },
  })

  // Close floating when click outside
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
  }, [elements.domReference, elements.floating, setIsOpen])

  // Close floating when resize
  useEffect(() => {
    function handler() {
      setIsOpen(false)
    }

    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [setIsOpen])

  const value = {
    getReferenceProps,
    getFloatingProps,
    styles,
    isMounted,
    setReference,
    setFloating,
    floatingStyles,
    x,
    y,
    middlewareData,
    arrowRef,
  }

  return <PopoverContext.Provider value={value}>{children}</PopoverContext.Provider>
}

function Reference(props: IReferenceProps) {
  const { children, className, to, as: Element = 'button' } = props

  const { getReferenceProps, setReference } = useContext(PopoverContext)

  return (
    <Element to={to} className={className} ref={setReference} {...getReferenceProps()}>
      {children}
    </Element>
  )
}

function Floating(props: IFloatingProps) {
  const { children, wrapperClassName, arrowImg, arrowClassName, arrowWidth, arrowYOffsetKeyword = 'top' } = props

  const { getFloatingProps, styles, isMounted, setFloating, floatingStyles, x, y, middlewareData, arrowRef } =
    useContext(PopoverContext)

  return isMounted ? (
    <div
      className={cn(
        'relative z-30 w-32 rounded-lg bg-light-1 py-1.5 shadow-1 dark:bg-dark-2 dark:shadow-2',
        wrapperClassName
      )}
      ref={setFloating}
      style={{
        ...floatingStyles,
        ...styles,
        // Phải set lại left và top vì nó bị ghi đè bởi styles.
        // Nếu đặt floatingStyles ở sau styles thì sẽ không có animation
        left: x,
        top: y,
        transformOrigin: `${(middlewareData.arrow?.x ?? 0) + arrowWidth / 2}px ${arrowYOffsetKeyword}`,
      }}
      {...getFloatingProps()}
    >
      {/* Arrow */}
      <img
        ref={arrowRef}
        src={arrowImg}
        width={arrowWidth}
        className={cn('dropdown-arrow absolute -z-10', arrowClassName)}
        style={{ left: `${middlewareData.arrow?.x ?? 0}px` }}
      />

      {/* Floating content */}
      {children}
    </div>
  ) : null
}

Floating.Root = Root
Floating.Reference = Reference

export default Floating
