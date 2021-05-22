var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Page({
    data: {
        tabs: ["全部", "设计", "区块链", "文学"],
        activeIndex: 0,
        sliderOffset: 0,
        sliderLeft: 0
    },
    
    abstractFn(res){
        if(!res){
          return ''
        }else{
          let str=res.replace(/(\*\*|__)(.*?)(\*\*|__)/g,'')          //全局匹配内粗体
                  .replace(/\!\[[\s\S]*?\]\([\s\S]*?\)/g,'')           //全局匹配图片
                  .replace(/\([\s\S]*?\)/g,'')                         //全局匹配连接
                  .replace(/<\/?.+?\/?>/g,'')                          //全局匹配内html标签
                  .replace(/(\*)(.*?)(\*)/g,'')                        //全局匹配内联代码块
                  .replace(/`{1,2}[^`](.*?)`{1,2}/g,'')                //全局匹配内联代码块
                  .replace(/```([\s\S]*?)```[\s]*/g,'')                //全局匹配代码块
                  .replace(/\~\~(.*?)\~\~/g,'')                        //全局匹配删除线
                  .replace(/[\s]*[-\*\+]+(.*)/g,'')                    //全局匹配无序列表
                  .replace(/[\s]*[0-9]+\.(.*)/g,'')                    //全局匹配有序列表
                  .replace(/(#+)(.*)/g,'')                             //全局匹配标题
                  .replace(/(>+)(.*)/g,'')                             //全局匹配摘要
                  .replace(/\r\n/g,"")                                 //全局匹配换行
                  .replace(/\n/g,"")                                   //全局匹配换行
                  .replace(/\s/g,"")                                   //全局匹配空字符;
          return str.slice(0,100)+"......"
        }
      },

    getData: async function(){
        let db = wx.cloud.database()
        let res = await db.collection("reader").get() //整个集合
        console.log(68, res)

        //提取摘要
        res.data.forEach(item => {
            item.content = this.abstractFn(item.content)
        })

        //展示在前端
        this.setData({
            reader:res.data.reverse()
        })
    },

    onLoad: function () {
        this.getData()
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
                    sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
                });
            }
        });




    },
    tabClick: async function (e) {
        console.log(688, e, e.currentTarget.id)
        let id = e.currentTarget.id
        this.setData({
            sliderOffset: e.currentTarget.offsetLeft,
            activeIndex: e.currentTarget.id
        });

        let db = wx.cloud.database()
        if(id == 0){
            let res = await db.collection("reader").get()
            console.log(899, res)
            //提取摘要
            res.data.forEach(item => {
                item.content = this.abstractFn(item.content)
            })
            //展示在前端
            this.setData({
                reader:res.data.reverse()
            })
        }else if(id == 1){
            let res = await db.collection("reader").where({type:"1"}).get()
            console.log(899, res)
            //提取摘要
            res.data.forEach(item => {
                item.content = this.abstractFn(item.content)
            })
            //展示在前端
            this.setData({
                reader:res.data.reverse()
            })
        }else if(id == 2){
            let res = await db.collection("reader").where({type:"2"}).get()
            console.log(899, res)
            //提取摘要
            res.data.forEach(item => {
                item.content = this.abstractFn(item.content)
            })
            //展示在前端
            this.setData({
                reader:res.data.reverse()
            })
        }else{
            let res = await db.collection("reader").where({type:"3"}).get()
            console.log(899, res)
            //提取摘要
            res.data.forEach(item => {
                item.content = this.abstractFn(item.content)
            })
            //展示在前端
            this.setData({
                reader:res.data.reverse()
            })
        }
    }
});