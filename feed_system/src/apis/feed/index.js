import { requestByGet, requestByPost } from '../../utils/request'

const feedApi = {
  getKind: (param) => requestByGet('/pigVariety/selector', param),
  add: (param) => requestByPost('/feedingPlan/add', param),
  getList: (param) => requestByGet('/feedingPlan/list', param),
  dosubmit: (param) => requestByPost('/feedingPlan/update', param),
  delete: (param) => requestByPost('/feedingPlan/delete', param),
  getDetail: (param) => requestByGet('/feedingPlanDetail/listByPhaseID', param),
  update: (param) => requestByPost('/feedingPlanDetail/phaseUpdate', param)
}
export default feedApi
