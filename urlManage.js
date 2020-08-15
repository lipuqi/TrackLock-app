const host = 'https://test.box-china.com';

var urlConfig = {
  host,
  /**
   * 开发接口
   */
  api: {
    host,
    //登录
    loginUrl: `${host}/tk/login`,
    //开锁
    unlockUrl: `${host}/tk/strokeManage/unLock/`,
    //设备定位列表
    positionListUrl: `${host}/tk/strokeManage/pointList`
  }

};

module.exports = urlConfig;