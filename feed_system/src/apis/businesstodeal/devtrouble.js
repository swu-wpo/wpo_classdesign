import { requestByGet } from '../../utils/request'

const devTroubleApi = {
  devTroubleInfo: (param) => requestByGet('/stationFaultLog/deviceErrorInfo', param)
}
export default devTroubleApi
