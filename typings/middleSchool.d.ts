export type APIRowItem = {
  ATPT_OFCDC_SC_CODE: string
  ATPT_OFCDC_SC_NM: string
  SD_SCHUL_CODE: string
  SCHUL_NM: string
  AY: string
  SEM: string
  ALL_TI_YMD: string
  DGHT_CRSE_SC_NM: string
  GRADE: string
  CLASS_NM: string
  PERIO: string
  ITRT_CNTNT: string
  LOAD_DTM: string
}

export type Schedule = {
  date: string
  period: string
  name: string
  modifiedDate: string
}

export type ErrorResponse = {
  statusCode: number
  message: string
}

export type SuccessResponse = {
  schoolName: string
  year: string
  date: string // yyyymmdd
  grade: string
  classNumber: string
  schedules: Schedule[]
}

export interface RequestQuery {
  code: string
  scCode: string
  year: string
  grade: string
  class: string
  period?: string // 교시
  date: string // yyyymmdd
}
