import Vue from 'vue'
import {addClass} from './utils.js'


const getDom = () => {
	if (Vue.prototype.$isServer) return;
	let Dom = LightboxManager.Dom
	if (Dom) {

	}else{
		Dom = document.body.createElement("div")
		addClass(Dom,"light-box-mask")
		LightboxManager.Dom = Dom
	}
	return Dom
}