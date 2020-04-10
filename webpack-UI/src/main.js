//入口文件
import Vue from 'vue'
//导入MUI的样式
import './lib/mui/css/mui.min.css'
//导入扩展图标的样式
import './lib/mui/css/icons-extra.css'

//1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)
//1.3导入自己的router.js路由模块
import router from './router.js'

//2.1导入vue-resource的包
import VueResource from 'vue-resource'
//2.2安装vue-resource
Vue.use(VueResource)

//导入图片预览插件
import VuePreview from 'vue-preview'
//安装图片预览插件
Vue.use(VuePreview)

//设置请求的根路径
Vue.http.options.root = "http://www.liulongbin.top:3005"

//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dataFornat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
	return moment(dataStr).format(pattern)
})

//按需求导入顶部Mint-UI中的组件
/*import {Header,Swipe,SwipeItem,Button,Lazyload} from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
Vue.component(Button.name, Button)
Vue.use(Lazyload)*/
import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'

//全局设置post提交以表单格式提交
Vue.http.options.emulateJSON = true;

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

//每次刚进入网站时先从本地调取购物车数据
var car = JSON.parse(localStorage.getItem('car') || '[]')

//创建Vuex实例
var store = new Vuex.Store({
	state: {
		car: car //将购物车的商品的数据，用一组数据存储起来，存储商品的对象
	},
	mutations: {
		addToCar(state, goodsinfo) {
			//点击加入购物车，把商信息保存到store中的car
			//1.如果购物车中之前有s对应的商品，那么只更新数量
			//2.如果没有，则直接把对象push到car中

			//假设在购物车没有找到对应的商品
			var flag = false

			state.car.some(item => {
				if(item.id == goodsinfo.id) {
					item.count += parseInt(goodsinfo.count)
					flag = true
					return true

				}
			})

			if(!flag) {
				state.car.push(goodsinfo)
			}
			//当更新car之后，把car数组，持久存储到本地的localStorage中
			localStorage.setItem('car', JSON.stringify(state.car))
		},
		updateGoodsInfo(state,goodsinfo){
			//修改购物车中的商品的数量
			state.car.some(item=>{
				  if(item.id == goodsinfo.id){
				  	item.count = parseInt(goodsinfo.count);
				  	return true
				  }
				  //当修改完商品数量，把最新的购物车数据保存到本地储存中
				  localStorage.setItem('car', JSON.stringify(state.car))
			})
		},
		removeFormCar(state,id){
			//根据id，从store中的购物车中删除对应的那条商品数据
			state.car.some((item,i)=>{
				if(item.id == id){
					state.car.splice(i,1)
				return true;
				}
				
			})
//			将删除完,最新的购物车数据同步到本地储
				  localStorage.setItem('car', JSON.stringify(state.car))    
		},
		updateGoodsSelected(state,obj){
			state.car.some(item=>{
				if(item.id==obj.id){
					item.selected = obj.selected
					return true
				}
			})
			//把数据保存到本地储存
			 localStorage.setItem('car', JSON.stringify(state.car))
		}
	},
	getters: {
		getAllCount(state) {
			var c = 0;
			state.car.forEach(item => {
				c += item.count
			})
			return c
		},
		getGoodsCount(state) {
			var o = {}
			state.car.forEach(item => {
				o[item.id] = item.count
			})
			return o
		},
		getGoodsSelected(state){
			var o = {}
			state.car.forEach(item=>{
				o[item.id] = item.selected
			})
			return o
		},
		getGoodsCountAndAmount(state){
			var o = {
				count: 0,//勾选的数量
				amount: 0//勾选的总价
			}
			state.car.forEach(item=>{
				if(item.selected){
					o.count += item.count
					o.amount += item.price * item.count
				}
			})
			return o
		}
	}
})

//导入App根组件
import app from './App.vue'
var vm = new Vue({
	el: '#app',
	render: c => c(app),
	router, // 1.4挂载路由对象到vm实例上
	store //将vuex实例store挂在到vm实例上
})