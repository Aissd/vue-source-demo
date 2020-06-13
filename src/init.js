import { initState } from './state.js';

export function initMixin(Vue) {
    Vue.prototype._init = function(options) {
        const vm = this; // this就是vue的实例
        vm.$options = options; // 用户传入的参数

        initState(vm); // 初始化状态方法 - 传vm，可初始化data，methods，watch...
    }
}