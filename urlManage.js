const host = 'http://test.szntzhwl.net:8810';

var urlConfig = {
  host,
  /**
   * 开发接口
   */
  api: {
    host,
    //开锁
    unlockUrl: `${host}/strokeManage/unLock/`,
    //设备定位列表
    positionListUrl: `${host}/strokeManage/currentPointList/`
  }

};

module.exports = urlConfig;