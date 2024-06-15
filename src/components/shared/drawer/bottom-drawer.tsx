import { Drawer } from 'vaul'

interface Props {
  trigger: React.ReactNode
  title: React.ReactNode
  children: React.ReactNode
  isOpenDrawer?: boolean
  setIsOpenDrawer?: React.Dispatch<React.SetStateAction<boolean>>
}

export default function BottomDrawer({ trigger, title, children, isOpenDrawer, setIsOpenDrawer }: Props) {
  return (
    <Drawer.Root onOpenChange={setIsOpenDrawer} open={isOpenDrawer}>
      <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-40 bg-dark-1/40 backdrop-blur-sm" />
        <Drawer.Content className="focus-primary fixed inset-x-0 bottom-0 z-50 mt-24 flex flex-col rounded-t-[20px] bg-zinc-100 dark:bg-zinc-800">
          <div className="background-light1_dark2 flex-1 rounded-t-[20px] p-4 shadow-popover">
            <div className="mx-auto mb-5 h-1.5 w-12 shrink-0 rounded-full bg-zinc-300" />
            <div className="mx-auto max-w-sm">
              <Drawer.Title asChild>{title}</Drawer.Title>
              {children}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
