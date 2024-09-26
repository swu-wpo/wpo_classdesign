import { requestByGet, requestByPost } from '@/utils/request'

const pigVarietyApi = {
  pigVarietyList: (param) => requestByGet('/pigVariety/list', param),
  pigVarietyAdd: (param) => requestByPost('/pigVariety/save', param),
  pigVarietyUpdate: (param) => requestByPost('/pigVariety/update', param)
}
export default pigVarietyApi
