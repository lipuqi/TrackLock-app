const app = getApp();
const url = require('../../urlManage.js');

var showBusyLoading = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 5000
});

var showBusySuccess = text => wx.showToast({
  title: text,
  icon: 'success',
  duration: 2000
});

Page({
  data: {
    lock: 0,
    isDisable:0
  },

  onShow() {

  },

    /**
   * 对灯的操作
   */
  unlock(e) {
    var that = this;
    if (that.data.isDisable == 1){
      wx.showToast({
        title: '设备未就绪请稍等',
        icon: 'none',
        duration: 1000
      })
      return;
    }
    let value = Number(e.currentTarget.dataset.value)
    let unlockUrl = url.api.unlockUrl + "19d5d725-bd09-4e7e-b72c-0c0fbea051ff";
    that.setData({
      isDisable: 1
    })
    showBusyLoading("下发中");
    app.get(unlockUrl).then(function (res) {
      if (res.code == 200){
        that.setData({
          lock: value,
        }, function () {
          wx.hideToast();
          showBusySuccess("下发成功")
          setTimeout(this.cancelDisable, 10000);
        })
      } else {
        wx.showToast({
          title: '下发失败',
          icon: 'none',
          duration: 1000
        })
        that.setData({
          isDisable: 0
        })
      }
    }).catch(function (error) {
      console.log("锁操作出现异常" + error)
      wx.hideToast();
      that.setData({
        isDisable: 0
      })
    });
  },
  cancelDisable() {
    var that = this;
    that.setData({
      isDisable: 0
    })
  }

})