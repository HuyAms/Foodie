import React from 'react'
import Dialog, { DialogProps } from '@reach/dialog'
import VisuallyHidden from '@reach/visually-hidden'
import '@reach/dialog/styles.css'

type ModalContextType = [isOpen: boolean, setIsOpen: (isOpen: boolean) => void]

const ModalContext = React.createContext<ModalContextType | null>(null)

function Modal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <ModalContext.Provider value={[isOpen, setIsOpen]}>
      {children}
    </ModalContext.Provider>
  )
}

function useModalState() {
  const context = React.useContext(ModalContext)

  if (!context) {
    throw new Error('No provider for ModalContext given')
  }

  return context
}

function ModalDismissButton({
  children: child,
}: {
  children: React.ReactElement
}) {
  const [, setIsOpen] = useModalState()

  return React.cloneElement(child, {
    onClick: () => setIsOpen(false),
  })
}

function ModalOpenButton({
  children: child,
}: {
  children: React.ReactElement
}) {
  const [, setIsOpen] = useModalState()

  return React.cloneElement(child, {
    onClick: () => setIsOpen(true),
  })
}

function ModalContentsBase(props: DialogProps) {
  const [isOpen, setIsOpen] = useModalState()

  return (
    <Dialog isOpen={isOpen} onDismiss={() => setIsOpen(false)} {...props}>
      {props.children}
    </Dialog>
  )
}

interface ModalProps extends DialogProps {
  title: string
}

function ModalContents({ title, ...props }: ModalProps) {
  return (
    <ModalContentsBase {...props}>
      <ModalDismissButton>
        <button>
          <VisuallyHidden>Close</VisuallyHidden>
          <span aria-hidden>×</span>
        </button>
      </ModalDismissButton>
      <h3>{title}</h3>
      {props.children}
    </ModalContentsBase>
  )
}

export { Modal, ModalDismissButton, ModalOpenButton, ModalContents }
