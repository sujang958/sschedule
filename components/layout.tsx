import { FC } from "react"

const Layout: FC = ({ children }) => {
  return (
    <div className="min-h-screen min-w-full">
      <div>{children}</div>
    </div>
  )
}

export default Layout
