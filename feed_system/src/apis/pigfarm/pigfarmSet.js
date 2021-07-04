import { requestByGet, requestByPost } from '@/utils/request'

const pigHouseApi = {
  pigHouseList: (param) => requestByGet('/pigHouse/list', param),
  pigHouseStationList: (param) => requestByGet('/feedingStation/list', param),
  houseInfoAdd: (param) => requestByPost('/pigHouse/save', param),
  houseInfoUpdate: (param) => requestByPost('/pigHouse/update', param),
  getHouseSelector: (param) => requestByGet('/pigHouse/selector', param),
  stationInfoAdd: (param) => requestByPost('/feedingStation/save', param),
  stationInfoUpdate: (param) => requestByPost('/feedingStation/update', param),
  getPartSelector: (param) => requestByGet('/partStatus/selector', param)
}
export default pigHouseApi
