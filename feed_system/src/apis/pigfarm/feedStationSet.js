import { requestByGet, requestByPost } from '@/utils/request'

const feedStationApi = {
  feedStationParameterInfoGet: (param) => requestByGet('/feedingStationParameters/defaultInfo', param),
  feedStationParameterInfoUpdate: (param) => requestByPost('/feedingStationParameters/update', param),
  locationSelector: (param) => requestByGet('/feedingStation/locationSelectorNotUse', param)
}
export default feedStationApi
