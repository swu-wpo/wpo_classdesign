import { requestByGet, requestByPost } from '../../utils/request'

const loginApi = {
  login: (param) => requestByPost('/sys/login', param),
  getResource: (param) => requestByGet('/resource/authorization', param)
}
export default loginApi
