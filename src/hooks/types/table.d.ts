export interface PageDataReq<T = any> {
  pageNum?: number
  pageSize?: number
  param: T
}

export interface Pageable {
  pageNum: number
  pageSize: number
  total: number
}
export interface PageDataResp<T = any> extends Pageable {
  list: T[]
}
export interface StateProps {
  tableData: any[]
  pageable: Pageable
  searchParam: {
    [key: string]: any
  }
  searchInitParam: {
    [key: string]: any
  }
  totalParam: PageDataReq
  icon?: {
    [key: string]: any
  }
}

export interface PageConfig {
  layout?: string
  pageSizes?: number[]
  pageSize?: number
}