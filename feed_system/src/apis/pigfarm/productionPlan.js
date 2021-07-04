import { requestByGet, requestByPost } from '@/utils/request'

const productionPlanApi = {
  productionPlanGet: (param) => requestByGet('/productionPlan/list', param),
  productionPlanUpdate: (param) => requestByPost('/productionPlan/update', param),
  productionPlanAdd: (param) => requestByPost('/productionPlan/save', param),
  getVarietySelector: (param) => requestByGet('/pigVariety/selector', param)
}
export default productionPlanApi
