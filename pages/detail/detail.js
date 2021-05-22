// pages/detail/detail.js
Page({

   /**
    * 页面的初始数据
    */
   data: {

   },

   getData: async function(id){
      let db = wx.cloud.database()
      let res = await db.collection("reader").where({_id:id}).get()
      console.log(68, res)

      res.data[0].content = res.data[0].content.replace(/\<img/gi, '<img style="width:100%;height:auto" ')

      //展示在前端
      this.setData({
          article:res.data[0]
      })
  },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
      console.log(123, options.id)
      this.getData(options.id)

   },

   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {

   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {

   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function () {

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function () {

   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {

   }
})