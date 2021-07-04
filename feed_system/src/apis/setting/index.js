import { requestByGet, requestByPost, requestByDelete } from '../../utils/request'

const settingApi = {
  getAllRoles: (param) => requestByGet('/sys/role/list', param),
  // 根据roleId获取树形菜单
  getMenus: (roleId) => requestByGet('/sys/menu/getMenuByRoleId', roleId),
  getAllMenus: (param) => requestByGet('/sys/menu/getAllMenu', param),
  // 更新角色（包含权限）
  updateRole: (param) => requestByPost('/sys/role/update', param),
  // 更新角色（不包含权限）
  updateRoleBasic: (param) => requestByPost('/sys/role/updateBasic', param),
  // 添加角色
  addRole: (param) => requestByPost('/sys/role/save', param),
  // 删除角色
  deleteRole: (param) => requestByDelete('/sys/role/delete', param),
  // 管理员列表
  getAdminList: (param) => requestByGet('/sys/user/list', param),
  // 禁用启用
  lockedAdmin: (param) => requestByPost('/sys/user/lockedAdmin', param),
  // 删除管理员
  deleteAdmin: (param) => requestByPost('/sys/user/delete', param),
  // 创建管理员
  addSysUser: (param) => requestByPost('/sys/user/save', param),
  // 根据id查询
  getSysUserById: (id) => requestByGet('/sys/user/info/' + id),
  // 更新管理员
  updateSysUser: (param) => requestByPost('/sys/user/update', param),
  // 超级租户相关 查询 增加 修改
  getLogs: (param) => requestByGet('/sys/log/list', param)
}
export default settingApi
