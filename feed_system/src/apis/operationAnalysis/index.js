import { requestByGet } from '../../utils/request'

const operationAnalysisApi = {
  getUserIncrementsByTimeBucket: (params) => requestByGet('/getIncrementsByTimeBucket', params),
  getUserChannelStatistics: () => requestByGet('/userChannelStatistics'),
  getUserTypeStatistics: () => requestByGet('/userTypeStatistics'),
  getUserDeadlineStatics: () => requestByGet('/userDeadlineStatics'),
  getAppChannels: () => requestByGet('/app-channels'),
  getTotalActiveAddedNumbers: () => requestByGet('/totalActiveAddedNumbers'),
  getUserAddedStatistics: (params) => requestByGet('/userAddedStatistics', params),
  getUserActiveStatistics: (params) => requestByGet('/userActiveStatistics', params),
  getUserRegisterByPage: (params) => requestByGet('/userRegisterByPage', params)
}

export default operationAnalysisApi
