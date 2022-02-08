// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next"
import Ajv, { JSONSchemaType } from "ajv"
import {
  APIRowItem,
  ErrorResponse,
  RequestQuery,
  SuccessResponse,
} from "../../typings/middleSchool"

const ajv = new Ajv()

const schema: JSONSchemaType<RequestQuery> = {
  type: "object",
  properties: {
    code: { type: "string" },
    scCode: { type: "string" },
    year: { type: "string" },
    grade: { type: "string" },
    class: { type: "string" },
    period: { type: "string", nullable: true },
    date: { type: "string" },
  },
  required: ["code", "scCode", "year", "grade", "class", "date"],
  additionalProperties: true,
}
const requestQueryValidate = ajv.compile(schema)

export default async function middleScheduleHandler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  res.setHeader("Content-Type", "application/json")
  if (!requestQueryValidate(req.query))
    return res.status(400).json({
      statusCode: 400,
      message:
        requestQueryValidate.errors?.map((v) => v.message).join(" ") ??
        "Not validated query data",
    })
  const {
    code,
    scCode,
    year,
    grade,
    class: classNumber,
    period,
    date,
  } = req.query
  const fetchRes = await fetch(
    `https://open.neis.go.kr/hub/misTimetable?KEY=${
      process.env.API_KEY
    }&type=JSON&ATPT_OFCDC_SC_CODE=${scCode}&SD_SCHUL_CODE=${code}&AY=${year}&ALL_TI_YMD=${date}&GRADE=${grade}&CLASS_NM=1${
      period ? `&PERIO=${period}` : ""
    }`
  )

  const json = await fetchRes.json()
  if (json.RESULT)
    return res.status(400).send({
      statusCode: 400,
      message: json.RESULT.MESSAGE,
    })
  const schedules: APIRowItem[] = json.misTimetable[1].row
  if (schedules.length <= 0)
    return res.status(404).send({
      statusCode: 404,
      message: "Not found",
    })
  res.status(200).json({
    schoolName: schedules[0].SCHUL_NM,
    year: schedules[0].AY,
    grade: schedules[0].GRADE,
    classNumber: schedules[0].CLASS_NM,
    date: schedules[0].ALL_TI_YMD,
    schedules: schedules.map((v) => ({
      name: v.ITRT_CNTNT,
      period: v.PERIO,
      date: v.ALL_TI_YMD,
      modifiedDate: v.LOAD_DTM,
    })),
  })
}
