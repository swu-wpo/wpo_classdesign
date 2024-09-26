import { requestByGet, requestByPost } from '@/utils/request'

const sowRegApi = {
  pigInfoList: (param) => requestByGet('/pig/list', param),
  pigVarietySelector: (param) => requestByGet('/pigVariety/selector', param),
  pigHouseSelector: (param) => requestByGet('/pigHouse/selector', param),
  feedingStationSelector: (param) => requestByGet('/feedingStation/selector', param),
  productionPlanSelector: (param) => requestByGet('/productionPlan/selector', param),
  feedingPlanSelector: (param) => requestByGet('/feedingPlan/selector', param),
  bodyStateSelector: (param) => requestByGet('/bodyState/selector', param),
  productionPhaseSelector: (param) => requestByGet('/productionPhase/selector', param),
  pigUpdate: (param) => requestByPost('/pig/update', param),
  pigSave: (param) => requestByPost('/pig/save', param)
}
export default sowRegApi
