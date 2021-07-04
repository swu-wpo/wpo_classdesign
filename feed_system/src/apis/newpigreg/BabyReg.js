import { requestByGet, requestByPost } from '@/utils/request'

const babyRegApi = {
  farrowingInfoList: (param) => requestByGet('/farrowing/list', param),
  pigHouseSelector: (param) => requestByGet('/pigHouse/selector', param),
  feedingStationSelector: (param) => requestByGet('/feedingStation/selector', param),
  farrowingUpdate: (param) => requestByPost('/farrowing/update', param),
  farrowingDelete: (param) => requestByPost('/farrowing/delete', param),
  farrowingSave: (param) => requestByPost('/farrowing/save', param)
}
export default babyRegApi
