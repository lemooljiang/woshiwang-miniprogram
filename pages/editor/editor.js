// pages/editor/editor.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      title: "",
      author: "",
      time: "",
      content: "",
      type: "3",
      coverURL: "",

      items: [
         {value: 1, name: '设计',},
         {value: 2, name: '区块链',},
         {value: 3, name: '文学'}
       ],

       saveFlag: true

   },

   radioChange(e) {
      console.log(111, 'radio发生change事件，携带value值为：', e.detail.value)
  
      const items = this.data.items
      for (let i = 0, len = items.length; i < len; ++i) {
        items[i].checked = items[i].value === e.detail.value
      }
  
      this.setData({
        items,
        type: e.detail.value
      })
    },

   uploadCover: async function(){
       //第一步，选择图片
      let res = await wx.chooseImage({
         count: 1,
         sizeType: ['original', 'compressed'],
         sourceType: ['album', 'camera']
      })
      console.log(11, res)
      //第二步，上传到云端
      let res2 = await wx.cloud.uploadFile({
         filePath: res.tempFilePaths[0], // 小程序临时文件路径
         cloudPath:'images/'+new Date().getTime() 
         // 上传至云端的路径
         //new Date().getTime() 获取当前时间戳
      })
      console.log(22, res2)
      //第三步，展示在前端
      this.setData({
      coverURL:res2.fileID
      })
    },

 
   //上传函数
   get_content: async function(e){
      // console.log(11, this.data.title)
      // console.log(22, this.data.author)
      // console.log(33, this.data.time)
      // console.log(44, this.data.type)
      // console.log(55, this.data.coverURL)
      // console.log(88, e.detail.html) 
      
      let db = wx.cloud.database()
      let res = await db.collection('reader').add({
         data: {
            title:this.data.title,
            author:this.data.author,
            time: this.data.time,
            type: this.data.type, 
            coverURL: this.data.coverURL,
            content: e.detail.html
            }
         })
       console.log(567, res)
       wx.switchTab({
         url: '../reader/reader',
       })

   },


   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
   

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