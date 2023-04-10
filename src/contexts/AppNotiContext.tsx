import { ReactNode, createContext, useContext, useState } from "react"
import { BsFillExclamationCircleFill } from 'react-icons/bs'
import { AiOutlineClose } from 'react-icons/ai'

interface IOpenNotiParams {
  title: string;
  description: string;
}

interface IAppNotiContext {
  open: (params: IOpenNotiParams) => void
}

export const AppNotiContext = createContext<IAppNotiContext>({
	open: () => {}
})

export const useAppNoti = () => useContext(AppNotiContext)

const AppNotiContextProvider = ({ children }: { children: ReactNode }) => {
  const [isShowNoti, setIsShowNoti] = useState(true)
  const [title, setTitle] = useState("title")
  const [description, setDescription] = useState("description")

  const open = ({
    description,
    title
  }: IOpenNotiParams) => {
    setTitle(title)
    setDescription (description)
    setIsShowNoti(true)
    setTimeout(() => setIsShowNoti(false), 3000)
  }
  return (
    <AppNotiContext.Provider value={{
      open
    }}>
      <div style={isShowNoti ? {
        opacity: 100,
        transform: "translate(-50%, 0)",
        top: 4,
        transition: "opacity 1s,transform 500ms"
        }: {
        opacity: 0,
        transform: "translate(-50%, -100%)",
        top: 0,
        transition: "opacity 300ms,transform 500ms"
      }} className="absolute flex justify-center gap-2 p-4 -translate-x-1/2 bg-white left-1/2 w-[80%] rounded-md">
        <div><BsFillExclamationCircleFill className="bg-white text-bcpayment-green-1 text-[25px]"/></div>
        <div>
          <div className="flex items-center justify-between w-full">
          <p className="font-semibold">{title}</p>
          <AiOutlineClose className="cursor-pointer text-bcpayment-gray-1" onClick={() => setIsShowNoti(false)}/>
          </div>
          <p className="text-[14px]">{description}</p>
        </div>
      </div>
      {children}{' '}
    </AppNotiContext.Provider>
  )
}

export default AppNotiContextProvider