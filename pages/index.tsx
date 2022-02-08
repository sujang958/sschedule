import { motion } from "framer-motion"
import type { NextPage } from "next"
import { useCallback, useEffect, useState } from "react"
import SchoolItem from "../components/schoolItem"

const Home: NextPage = () => {
  const [inputName, setInputName] = useState("")
  const [alikeNames, setAlikeNames] = useState<string[]>([])
  const [schools, setSchools] = useState<
    {
      scCode: string
      code: string
      name: string
      address: string
      link: string
    }[]
  >([])
  const getSchools = useCallback(async () => {
    const APIRes = await fetch(`/api/names?name=${inputName}`)
    const json: any[] = await APIRes.json()
    setSchools(
      json.map((v) => ({
        scCode: v.ATPT_OFCDC_SC_CODE,
        code: v.SD_SCHUL_CODE,
        name: v.SCHUL_NM,
        address: v.ORG_RDNMA,
        link: v.HMPG_ADRES,
      }))
    )
  }, [schools])
  useEffect(() => {
    const getSchoolNames = async () => {
      const names = await fetch(`/api/names?name=${inputName}&onlyName=1`)
      const json = await names.json()
      if (json.statusCode) return
      setAlikeNames(json)
    }
    console.log("fetched")
    getSchoolNames()
  }, [inputName])

  return (
    <div className="pt-20 flex flex-col items-center w-full min-h-screen">
      <div className="flex flex-col max-w-3xl w-full">
        <div className="py-6 flex flex-col items-center border-b border-black">
          <div className="px-2 flex flex-row">
            <input
              type="text"
              placeholder="학교를 검색하세요"
              className="text-lg font-bold border border-black px-2 py-1 rounded-l"
              list="school-names"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            <datalist id="school-names">
              {alikeNames.map((v, i) => (
                <option key={i} value={v} />
              ))}
            </datalist>
            <button
              className="p-3 -ml-1 bg-black rounded-r"
              onClick={getSchools}
            >
              <motion.svg
                whileTap={{ scale: 1.25, rotate: 360 }}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-white"
                viewBox="0 0 20 20"
              >
                <motion.path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </motion.svg>
            </button>
          </div>
        </div>
        <div className="py-5 px-3 flex flex-col">
          <div className="grid grid-cols-3 gap-2">
            {schools.map((school) => (
              <SchoolItem
                schoolAddress={school.address}
                schoolName={school.name}
                schoolSite={school.link}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
