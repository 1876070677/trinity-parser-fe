export interface SubjectInfoResponse {
  sbjtKorNm: string;
  sujtNo: string;
  classNo: string;
  tlsnAplyRcnt: string;
  tlsnLmtRcnt: string;
  sustCd: string;
  extraCnt: string;
}

export interface SubjectInfoParams {
  sujtNo: string;
  classNo: string;
  campFg: string;
  shtm: string;
  yyyy: string;
}

export interface GradeParams {
  campFg: string;
  shtmYyyy: string;
  shtmFg: string;
  stdNo: string;
}

export interface CurrentGradeInfo {
  sbjtNo?: string;
  sbjtKorNm?: string;
  centesScorAdm?: string;
  estiYn?: string;
  grdAdm?: string;
  details: string[];
}