import { ReactNode, createContext, useContext, useState } from "react"
import { AiOutlineClose } from "react-icons/ai"

interface IAppModalContext {
  open: (modalContent: ReactNode) => void
}

export const AppModalContext = createContext<IAppModalContext>({
	open: () => {}
})

export const useAppModal = () => useContext(AppModalContext)

const AppModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [isShow, setIsShow] = useState(false)
  const [modalContent, setModalContent] = useState<ReactNode>()

  const open = (
    modalContent
  : ReactNode) => {
    setModalContent(modalContent)
    setIsShow(true)
  }
  return (
    <AppModalContext.Provider value={{
      open
    }}>
      <div style={isShow ? {
					zIndex: 10,
				}: {
          zIndex: -5,
          transition: "z-index 0.3s step-end"
        }}
				className='absolute w-screen h-screen'>
      <div style={{
						opacity: isShow ? 100 : 0,
					}} className='absolute inset-0 transition-opacity duration-300 bg-slate-900/25 backdrop-blur-sm'></div>
      <div style={{
						opacity: isShow ? 100 : 0,
					}} className="absolute p-4 left-1/2 -translate-x-1/2 bg-white top-1/2 -translate-y-1/2 w-[95%] rounded-2xl transition-opacity duration-300 h-[90%]">
        <AiOutlineClose className="cursor-pointer text-bcpayment-gray-1 ml-auto text-[25px]" onClick={() => setIsShow(false)}/>
        <div className="max-h-[95%] overflow-y-scroll">
        {modalContent}
        </div>
      </div>
      </div>
      {children}{' '}
    </AppModalContext.Provider>
  )
}

export default AppModalContextProvider