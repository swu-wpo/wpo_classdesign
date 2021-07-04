import { requestByGet, requestByPost } from '@/utils/request'

const eatRecordApi = {
  pigEatingList: (param) => requestByGet('/eatingRecord/list', param),
  pigEatingUpdate: (param) => requestByPost('/eatingRecord/update', param),
  pigEatingAdd: (param) => requestByPost('/eatingRecord/save', param),
  recordDeleteByIds: (param) => requestByPost('/eatingRecord/delete', param)
}
export default eatRecordApi
