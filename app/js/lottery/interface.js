import $ from 'jquery';

/**
 * 服务获取相关
 */
class Interface{
  /**
   * [getOmit 获取遗漏数据]
   * @param  {string} issue [当前期号]
   * @return {[type]}       [description]
   */
  getOmit(issue){
    let self=this; // this的指向
    return new Promise((resolve,reject)=>{
      // 箭头函数的this指向是定义时，而不是运行时
      $.ajax({ // jq ajax請求
        url:'/get/omit',
        data:{
          issue:issue
        },
        dataType:'json',
        success:function(res){
          self.setOmit(res.data); // 這裡是是实例对象的继承的方法
          resolve.call(self,res)
        },
        error:function(err){
          reject.call(err);
        }
      })
    });
  }
  /**
   * [getOpenCode 获取开奖号码]
   * @param  {string} issue [期号]
   * @return {[type]}       [description]
   */
  getOpenCode(issue){
    let self=this;
    return new Promise((resolve,rejet)=>{ // 返回一个promise 可以用.then 没必要用回调函数
      $.ajax({
        url:'/get/opencode',
        data:{
          issue:issue
        },
        dataType:'json',
        success:function(res){
          self.setOpenCode(res.data); // 這裡是真正調用的時候實例對象的方法 实例对象需要实现这个方法
          resolve.call(self,res);
        },
        error:function(err){
          reject.call(err); // 发生错误
        }
      })
    });
  }

  /**
   * [getState 获取当前状态]
   * @param  {string} issue [当前期号]
   * @return {[type]}       [description]
   */
  getState(issue){
    let self=this;
    return new Promise((resolve,rejet)=>{
      $.ajax({
        url:'/get/state',
        data:{
          issue:issue
        },
        dataType:'json',
        success:function(res){
          resolve.call(self,res);
        },
        error:function(err){
          reject.call(err);
        }
      })
    });
  }

}

export default Interface
