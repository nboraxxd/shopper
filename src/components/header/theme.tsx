import { useState } from 'react'

import { cn } from '@/utils'
import { THEMES } from '@/constants'
import { useTheme } from '@/context/theme-provider'
import { Floating } from '@/components/shared/floating'
import { PrimaryButton } from '@/components/shared/button'
import { MoonIcon, SunIcon } from '@/components/icons'

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
        <SunIcon className="size-6 rotate-0 scale-100 fill-[#38bdf8] transition-transform dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute left-1/2 top-1/2 inline-block size-6 -translate-x-1/2 -translate-y-1/2 rotate-90 scale-0 fill-[#38bdf8] transition-transform dark:rotate-0 dark:scale-100" />
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
                <item.icon className={cn('size-5 fill-[#7B8EC8]', { 'fill-[#38bdf8]': theme === item.value })} />
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
