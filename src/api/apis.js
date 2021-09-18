import axios from 'axios'

//设置服务器地址
axios.defaults.baseURL = 'http://127.0.0.1:5000'

//接口封装
//获取商家接口
export var getmerchant = () => axios.get('/shop/seller')

//获取店铺商品数据接口
export var getgoodslist = () => axios.get('/goods/goods_list')
