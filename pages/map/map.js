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

  /**
   * 页面的初始数据
   */
  data: {
    polyline: [],
    longitude: "120.39121",
    latitude:"31.33614"
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    let positionListUrl = url.api.positionListUrl + "863716040748763";
    showBusyLoading("获取数据中");
    app.get(positionListUrl).then(function (res) {
      if (res.code == 200) {
        var arr = new Array();
        for (var item in res.datas) {
          var data = res.datas[item];
          arr[item] = {
            "longitude": data.longitude,
            "latitude": data.latitude
          };
        }
        that.setData({
          polyline: [{
            points: arr,
            color: "#FF0000DD",
            width: 3,
            dottedLine: true
          }],
          longitude: res.datas[0].longitude,
          latitude: res.datas[0].latitude
        })
        wx.hideToast();
      } else {
        wx.showToast({
          title: '获取定位失败',
          icon: 'none',
          duration: 1000
        })
      }
    }).catch(function (error) {
      console.log("获取定位出现异常" + error)
      wx.hideToast();
    });
  }
})