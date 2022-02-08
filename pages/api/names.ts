import { NextApiRequest, NextApiResponse } from "next"
import { ErrorResponse } from "../../typings/middleSchool"

export default async function namesHandler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | any[]>
) {
  res.setHeader("Content-Type", "application/json")
  const { name } = req.query
  const apiRes = await fetch(
    `https://open.neis.go.kr/hub/schoolInfo?type=JSON&key=${
      process.env.API_KEY
    }${name ? `&SCHUL_NM=${name}` : ""}`
  )
  const json = await apiRes.json()
  if (json.RESULT)
    return res.status(400).json({
      statusCode: 400,
      message: json.RESULT.MESSAGE ?? "error",
    })
  const schools: any[] = json.schoolInfo[1].row
  return res.status(200).json(schools.map((v) => v.SCHUL_NM))
}
