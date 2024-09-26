import { requestByGet, requestByPost } from '@/utils/request'

const pigTransApi = {
  pigInfoList: (param) => requestByGet('/pig/list', param),
  pigStyInfoUpdate: (param) => requestByPost('/pig/sty/update', param),
  pigHouseSelector: (param) => requestByGet('/pigHouse/selector', param),
  pigVarietySelector: (param) => requestByGet('/pigVariety/selector', param),
  feedingStationSelector: (param) => requestByGet('/feedingStation/selector', param)
}
export default pigTransApi
