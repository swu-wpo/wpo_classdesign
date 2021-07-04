import { requestByGet } from '@/utils/request'

const abnormalApi = {
  eatAbnormalInfoGet: (param) => requestByGet('/eatingAbnormal/list', param),
  earAbnormalInfoGet: (param) => requestByGet('/earLoseAbnormal/list', param),
  tempAbnormalInfoGet: (param) => requestByGet('/physicalDailyCheck/abnormalList', param)
}
export default abnormalApi
