const url = require('./urlManage.js');
//app.js
var token = "";

App({
  onLaunch: function () {
    wx.request({
      url: url.api.loginUrl,
      method:"POST",
      data: {username:"13126535315",password:"123456"},
      success: function (res) {
        if (res.data.code == 200) {
          token = res.data.datas.token
        } else {
          wx.showToast({
            title: '登录失败',
            icon: 'none',
            duration: 1000
          })
        }
      },
      error: function (e) {
        reject('网络出现异常' + e);
      }
    })
  },
  /**
 * get请求
 */
  get: function (url) {
    var that = this;
    const promise = new Promise((resolve, reject) => {
      wx.request({
        url: url,
        header:{
          "token":token
        },
        success: function (res) {
          if (res.data.code == 200) {
            resolve(res.data);
          } else {
            reject(res.data.code + "--" + res.data.message);
          }
        },
        error: function (e) {
          reject('网络出现异常' + e);
        }
      })
    });
    return promise;
  },

  /**
 * post请求
 */
  post: function (url, data) {
    var that = this;
    const promise = new Promise((resolve, reject) => {
      var postData = data || {};
      wx.request({
        url: url,
        method:"POST",
        data: postData,
        header:{
          "token":token
        },
        success: function (res) {
          if (res.data.code == 200) {
            resolve(res.data);
          } else {
            reject(res.data.code + "--" + res.data.message);
          }
        },
        error: function (e) {
          reject('网络出现异常' + e);
        }
      })
    });
    return promise;
  }
})