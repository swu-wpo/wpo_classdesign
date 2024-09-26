import { requestByGet, requestByPost } from '@/utils/request'

const pigWashApi = {
  pigWashList: (param) => requestByGet('/pig/pigwash/list', param),
  pigWashAdd: (param) => requestByPost('/pig/pigwash/save', param),
  pigWashUpdate: (param) => requestByPost('/pig/pigwash/update', param)
}
export default pigWashApi
