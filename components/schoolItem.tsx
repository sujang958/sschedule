import { FC } from "react"
import { motion } from "framer-motion"

const SchoolItem: FC<{
  schoolName: string
  schoolSite: string
  schoolAdress: string
}> = ({ schoolAdress, schoolName, schoolSite }) => {
  return (
    <div className="px-2 py-4 flex flex-col rounded shadow-xl">
      <div className="px-0.5">
        <p className="font-bold text-lg break-all underline cursor-pointer">
          <a href={schoolSite} target="_blank">
            {schoolName}
          </a>
        </p>
      </div>
      <div className="px-1.5 pt-0.5">
        <p className="text-base break-all">{schoolAdress}</p>
      </div>
      <div className="pt-2">
        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ y: -12 }}
          className="px-3.5 py-1.5 text-base bg-black text-white"
        >
          추가
        </motion.button>
      </div>
    </div>
  )
}

export default SchoolItem
