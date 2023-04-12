"use client"

import { useContext, useEffect } from "react"
import { AiOutlineCheck, AiFillWarning } from "react-icons/ai"
import { BiErrorCircle } from "react-icons/bi"

import { AppContext } from "context"

let toastTimeout: NodeJS.Timeout

export default function Toast() {
  const { main, mainDispatch } = useContext(AppContext)

  const onClose = () => mainDispatch({ type: "CLOSE_TOAST" })

  useEffect(() => {
    clearTimeout(toastTimeout)
    setTimeout(() => {
      if (main.toast.isOpen) {
        mainDispatch({ type: "CLOSE_TOAST" })
      }
    }, 3000)
  }, [main.toast.isOpen, mainDispatch])

  const renderToastIcon = () => {
    switch (main.toast.type) {
      case "SUCCESS":
        return (
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8  rounded-lg bg-green-800 text-white">
            <AiOutlineCheck />
          </div>
        )

      case "ERROR":
        return (
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-rose-600 text-white">
            <BiErrorCircle />
          </div>
        )

      case "WARNING":
        return (
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg bg-yellow-600 text-white">
            <AiFillWarning />
          </div>
        )

      default:
        return <></>
    }
  }

  return (
    <div
      className={`${
        main.toast.isOpen ? "flex" : "hidden"
      } items-center fixed bottom-2 right-2 w-full max-w-xs p-4 mb-4 text-white  rounded-lg shadow bg-gray-800`}
      role="alert"
    >
      {renderToastIcon()}
      <div className="ml-3 text-sm font-normal">{main.toast.message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
        data-dismiss-target="#toast-success"
        aria-label="Close"
        onClick={onClose}
      >
        <span className="sr-only">Close</span>
        <svg
          aria-hidden="true"
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  )
}
