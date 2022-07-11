import {ADD_COUNTE,ADD_TO_CART} from './mutations-type'
export default{
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
        let oldProduct=null
        for (let item of context.state.cartList)
        {
          if(item.iid===payload.iid)
          {
            oldProduct=item
          }
        }
        //判断当前添加商品是否有了
        if(oldProduct){
          context.commit(ADD_COUNTE,oldProduct)
          resolve('该商品已添加至购物车')
        }
        else{
          payload.count=1
          context.commit(ADD_TO_CART,payload)
          resolve('已添加新商品')
        }
    })
  }
}