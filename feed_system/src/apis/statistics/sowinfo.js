import { requestByGet, requestByPost } from '@/utils/request'

const sowInfoApi = {
  pigVarietySelector: (param) => requestByGet('/pigVariety/selector', param),
  pigHouseSelector: (param) => requestByGet('/pigHouse/selector', param),
  feedingStationSelector: (param) => requestByGet('/feedingStation/selector', param),
  productionPlanSelector: (param) => requestByGet('/productionPlan/selector', param),
  feedingPlanSelector: (param) => requestByGet('/feedingPlan/selector', param),
  bodyStateSelector: (param) => requestByGet('/bodyState/selector', param),
  productionPhaseSelector: (param) => requestByGet('/productionPhase/selector', param),
  pigInfoList: (param) => requestByGet('/pig/list', param),
  pigPhysicalCheckInfoList: (param) => requestByGet('/physicalDailyCheck/list', param),
  pigUpdate: (param) => requestByPost('/pig/update', param),
  pigDeleteByIds: (param) => requestByPost('/pig/delete', param)
}
export default sowInfoApi
