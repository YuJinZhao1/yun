//路由模块
import VueRouter from 'vue-router'

//导入对应的路由组件
import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopCarContainer from './components/tabbar/ShopCarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import PhotoList from './components/photos/PhotoList.vue'
import PhotoInfo from './components/photos/PhotoInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'
import GoodsComment from './components/goods/GoodsComment.vue'
import GoodsDesc from './components/goods/GoodsDesc.vue'

// 3. 创建路由对象
var router = new VueRouter({
	routes:[ //匹配路由规则
	{ path: '', redirect: '/home'},
	{ path: '/home', component: HomeContainer},
	{ path: '/member', component: MemberContainer},
	{ path: '/shopcar', component: ShopCarContainer},
	{ path: '/search', component: SearchContainer},
	{ path: '/home/newsList', component: NewsList},
	{ path: '/home/newsinfo/:id', component: NewsInfo},
	{ path: '/home/photolist', component: PhotoList},
	{ path: '/home/photoinfo/:id', component: PhotoInfo},
	{ path: '/home/goodslist', component: GoodsList},
	{ path: '/home/goodsinfo/:id', component: GoodsInfo},
	{ path: '/home/goodsdesc/:id', component: GoodsDesc },
	{ path: '/home/goodsomment/:id', component: GoodsComment,name: 'goodscomment'},
	],
	linkActiveClass: 'mui-active'//覆盖默认的路由高亮的类router-link-active
})

// 把路由对象暴露出去
export default router