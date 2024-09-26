import { requestByGet, requestByPost } from '../../utils/request'

const enterpriseApi = {
  getEnterpriseList: (param) => requestByGet('/remote/enterprise/lists', param),
  changeFreezStatus: (id, param) => requestByPost(`/remote/enterprise/${id}/freeze/?frozen=${param.frozen}&operator=${param.operator}`, null),
  getEnterpriseNamesByKey: (param) => requestByGet('/remote/enterpriseNames', param),
  getUsersByEnterpriseId: (param) => requestByGet('/remote/userByEnterpriseId', param),
  getEnterpriseByTenantId: (param) => requestByGet(`/remote/getEnterpriseByTenantId/${param}`, null),
  getEnterpriseById: (param) => requestByGet(`/remote/enterprise/${param}`, null),
  getEnterpriseUserInfoByopenId: (param) => requestByGet(`/remote/enterpriseUser/${param}`, null),
  changeUserFreezStatus: (param) => requestByPost(`/remote/enterpriseUser/${param.id}/freeze?systemId=${param.systemId}&frozen=${param.frozen}&operator=${param.operator}`, null),
  getEnterprisesUserByOrgCode: (param) => requestByGet('/remote/enterpriseUserByCode', param),
  /** 养殖中心根据openId查询用户信息接口 */
  getCenterUserInfoByOpenId: (param) => requestByGet(`/getUserInfoByOpenId/${param}`, null),
  getCenterUserInfoByUid: (uid) => requestByGet('/user-info/' + uid, null),
  /** 获取企业组织机构 */
  getOrgs: (param) => requestByGet(`/remote/org/${param.code}/hierarchy`, param)
}
export default enterpriseApi
