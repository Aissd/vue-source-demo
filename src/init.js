import { initState } from './state.js';
import { compileToFunctions } from './compiler/index.js';
import { mountComponent } from './lifecycle.js';

export function initMixin(Vue) {
    Vue.prototype._init = function(options) {
        const vm = this; // this就是vue的实例
        vm.$options = options; // 用户传入的参数

        initState(vm); // 初始化状态方法 - 传vm，可初始化data，methods，watch...
        
        // 需要通过模板进行渲染
        if(vm.$options.el) { // 用户传入了el属性
            vm.$mount(vm.$options.el);
        }
    }

    Vue.prototype.$mount = function(el) {
        const vm = this; // this就是vue的实例
        // el 可能是字符串，或dom对象
        el = vm.$el = document.querySelector(el);

        // 如果同时传入template 和 render，默认会采用render
        // 若都没传，就使用id="app"中的模板
        const opts = vm.$options;

        if(!opts.render) {
            let template = opts.template;
            if(!template && el) {
                // 应该使用外部的模板 - <div id="app"></div>
                template = el.outerHTML; // 火狐不兼容
            }

            const render = compileToFunctions(template);
            opts.render = render;
        }
        console.log(opts.render);
        // 走到这里，说明不需要编译了，因为用户传入的就是render函数
        
        // vm有render方法，渲染完之后，赋值到el上
        mountComponent(vm, el); // 组件的初始化挂载流程
    }
}