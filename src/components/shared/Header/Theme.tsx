import { useState } from 'react'

import { THEMES } from '@/constants'
import { cn } from '@/utils'
import { useTheme } from '@/context/ThemeProvider'
import { Floating } from '@/components/shared/Floating'
import { PrimaryButton } from '@/components/shared/Button'

export default function Theme() {
  const [isOpenFloating, setIsOpenFloating] = useState(false)

  const { theme, setTheme } = useTheme()

  return (
    <Floating.Root
      isOpen={isOpenFloating}
      setIsOpen={setIsOpenFloating}
      placement="bottom-end"
      mainAxis={15}
      crossAxis={15}
    >
      <Floating.Reference
        as={PrimaryButton}
        className="background-light1_dark2 relative rounded-lg p-3.5 hover:bg-light-2/60 dark:hover:bg-dark-3/5"
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
      </Floating.Reference>

      <Floating
        arrowImg="/assets/images/dropdown-arrow.png"
        wrapperClassName="shadow-light20_dark20 w-32 rounded-lg bg-light-1 py-1.5 dark:bg-dark-2"
        arrowWidth={32}
        arrowClassName="-top-2.5"
      >
        <ul>
          {THEMES.map((item) => (
            <li key={item.value} className="hover:bg-light-2/60 dark:hover:bg-dark-3/5">
              <PrimaryButton
                className="flex w-full gap-2 px-2.5 py-2 flex-center"
                onClick={() => {
                  setTheme(item.value)
                  setIsOpenFloating(false)
                }}
              >
                <img
                  src={item.icon}
                  alt={item.label}
                  width={18}
                  height={18}
                  className={cn({ 'active-theme': theme === item.value })}
                />
                <span
                  className={cn('medium-15 text-secondary1_light1', {
                    'text-[#38bdf8]': theme === item.value,
                  })}
                >
                  {item.label}
                </span>
              </PrimaryButton>
            </li>
          ))}
        </ul>
      </Floating>
    </Floating.Root>
  )
}
