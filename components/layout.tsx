import { FC, useEffect } from "react"
import Header from "./header"

const Layout: FC = ({ children }) => {
  useEffect(() => {
    const theme = localStorage.getItem("theme")
    if (theme && theme.toLowerCase() == "dark") {
      localStorage.setItem("theme", "dark")
      document.documentElement.classList.add("dark")
    } else {
      localStorage.setItem("theme", "light")
      document.documentElement.classList.remove("dark")
    }
  }, [])

  return (
    <div className="relative flex flex-col min-h-screen min-w-full font-noto-sans">
      <header className="fixed top-0 left-0 right-0">
        <Header />
      </header>
      <div>{children}</div>
    </div>
  )
}

export default Layout
