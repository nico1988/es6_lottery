/**
 * 计算相关
 *  */ 
class Calculate{
  /**
   * [computeCount 计算注数]
   * @param  {number} active    [当前选中的号码]
   * @param  {string} play_name [当前的玩法标识]
   * @return {number}           [注数]
   */
  computeCount(active,play_name){
    let count=0; 
    const exist=this.play_list.has(play_name); // play_list 是一個map
    const arr=new Array(active).fill('0'); // 制定長度默認為0的數組，簡單快捷 數組初始化可以賦值一個常量 就是數組的長度，fill填充數組的元素
    if(exist && play_name.at(0)==='r'){
      count=Calculate.combine(arr,play_name.split('')[1]).length; // combine是一個靜態方法
    }
    return count;
  }
  
  /**
   * [computeBonus 奖金范围预测]
   * @param  {number} active    [当前选中的号码]
   * @param  {string} play_name [当前的玩法标识]
   * @return {array}           [奖金范围]
   */
  computeBonus(active,play_name){
    // 支持任三到任八的计算
    const play=play_name.split('');
    const self=this;
    let arr=new Array(play[1]*1).fill(0); // 形成一个匹配的数组 new Array(play[1]*1).fill(0)
    let min,max; //定义最小值 最大值
    if(play[0]==='r'){ 
      let min_active=5-(11-active); // 最小命中数 就三选择最小命中
      if(min_active>0){ // 如果最小命中数大于0
        if(min_active-play[1]>=0){
          arr=new Array(min_active).fill(0);
          min=Calculate.combine(arr,play[1]).length; // 数组的length
        }else{
          if(play[1]-5>0&&active-play[1]>=0){ // 玩法大于任5 大于0
            arr=new Array(active-5).fill(0);
            min=Calculate.combine(arr,play[1]-5).length; // 重新计算最小值
          }else{
            min=active-play[1]>-1?1:0 // 最小值
          }
        }
      }else{
        min=active-play[1]>-1?1:0;
      }

      let max_active=Math.min(active,5); // 最大命中数
      if(play[1]-5>0){
        if(active-play[1]>=0){
          arr=new Array(active-5).fill(0);
          max=Calculate.combine(arr,play[1]-5).length;
        }else{
          max=0;
        }
      }else if(play[1]-5<0){
        arr=new Array(Math.min(active,5)).fill(0); 
        max=Calculate.combine(arr,play[1]).length;
      }else{
        max=1; // 任5最大值是1
      }
    }
    // 注数转化为金额
    // 最小值 最大值 注数转化为奖金
    return [min,max].map(item=>item*self.play_list.get(play_name).bonus)
  }

  /**
   * [combine 组合运算]
   * @param  {array} arr  [参与组合运算的数组]
   * @param  {number} size [组合运算的基数]
   * @return {number}      [计算注数]
   */
  static combine(arr,size){ // es6中实现静态方法 用static
    // 组合运算 C6 2  6个选2个
    let allResult=[];  // 利用递归实现组合运算
    (function f(arr,size,result){ // 立即执行函数 es6中递归要写一个匿名函数 而且必须有名字
      let arrLen=arr.length;
      if(size>arrLen){
        return;
      }
      if(size===arrLen){
        allResult.push([].concat(result,arr))
      }else{
        for(let i=0;i<arrLen;i++){
          let newResult=[].concat(result);
          newResult.push(arr[i]);
          if(size===1){
            allResult.push(newResult)
          }else{
            let newArr=[].concat(arr);
            newArr.splice(0,i+1);
            f(newArr,size-1,newResult) // 递归
          }
        }
      }

    })(arr,size,[])
    return allResult // 返回组合
  }

}

export default Calculate
