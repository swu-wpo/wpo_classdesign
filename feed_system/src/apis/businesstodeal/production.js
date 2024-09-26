import { requestByGet, requestByPost } from '@/utils/request'

const productionApi = {
  pigInfoList: (param) => requestByGet('/pig/list', param),
  pigStyInfoUpdate: (param) => requestByPost('/pig/production/update', param),
  pigHouseSelector: (param) => requestByGet('/pigHouse/selector', param),
  pigVarietySelector: (param) => requestByGet('/pigVariety/selector', param),
  productionPhaseSelector: (param) => requestByGet('/productionPhase/selector', param),
  feedingStationSelector: (param) => requestByGet('/feedingStation/selector', param)
}
export default productionApi
