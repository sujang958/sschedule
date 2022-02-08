import { FC, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const Header: FC = () => {
  const [theme, setTheme] = useState("light")

  return (
    <div className="bg-white flex flex-col items-center shadow-lg py-4">
      <div className="max-w-3xl w-full flex flex-row items-center justify-between">
        <div className="cursor-pointer">
          <p className="text-2xl font-bold">시간표</p>
        </div>
        <div className="flex flex-row space-x-3.5 mt-0.5 items-center">
          <div
            className="flex flex-row cursor-pointer pr-2.5"
            onClick={() => {
              const theme = localStorage.getItem("theme")
              if (theme && theme.toLowerCase() == "dark") {
                localStorage.setItem("theme", "light")
                setTheme("light")
                document.documentElement.classList.remove("dark")
              } else {
                localStorage.setItem("theme", "dark")
                setTheme("dark")
                document.documentElement.classList.add("dark")
              }
            }}
          >
            <AnimatePresence>
              {theme === "light" ? (
                <motion.svg
                  key="night"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  whileHover={{ scale: 1.25 }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <motion.path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </motion.svg>
              ) : (
                <motion.svg
                  key="sun"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  whileHover={{ scale: 1.25 }}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <motion.path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </div>
          <div className="cursor-pointer">
            <motion.svg
              whileHover={{ scale: 1.25 }}
              whileTap={{ y: -6 }}
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <motion.path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </motion.svg>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
