import {ADD_COUNTE,ADD_TO_CART} from './mutations-type'

export default{
  [ADD_COUNTE](state,payload){
    payload.count++
  },
  [ADD_TO_CART](state,payload){
    payload.count=1
    payload.checked=true
    state.cartList.push(payload)
  }

}