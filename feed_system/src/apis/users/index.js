import { requestByGet, requestByPut, requestBydownload } from '@/utils/request'

const usersApi = {
  personList: (param) => requestByGet('/user-info', param),
  freeze: (userName) => requestByPut('/user/freeze/' + userName, null),
  unfreeze: (userName) => requestByPut('/user/unfreeze/' + userName, null),
  personDetails: (uid) => requestByGet('/user-info/' + uid, null),
  listDeliveryAddress: (uid) => requestByGet('/user-delivery-address/' + uid, null),
  excelTemplate: () => requestBydownload('/user-info/excel/template', null),
  appChannelsMap: () => requestByGet('/app-channels/map', null),
  appChannelsList: () => requestByGet('/app-channels/list', null),
  getCodeByPhone: (phone) => requestByGet('/user-code/' + phone, null)
}
export default usersApi
