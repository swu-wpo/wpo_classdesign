import { requestByGet, requestByPost } from '../../utils/request'

const tenantApi = {
  getTenantList: (params) => requestByGet('/internal/tenantInfos/', params),
  changeFreezStatus: (param1, param2) => requestByPost(`/internal/tenantFreez/?tenantId=${param1}&freez=${param2}`, null),
  getTenantUsers: (params) => requestByGet('/tenantUser/listByTenantId/', params),
  getTenantInfo: (param) => requestByGet('/internal/info/' + param, param)
}
export default tenantApi
