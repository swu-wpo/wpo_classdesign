import { requestByGet, requestByPost } from '../../utils/request'

const logoutApi = {
  logout: () => requestByPost('/sys/logout'),
  getResource: () => requestByGet('/resource/authorization')
}
export default logoutApi
