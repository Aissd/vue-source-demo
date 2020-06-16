import Watcher from './observer/watcher.js';

export function lifeCyckeMixin(Vue) {
    Vue.prototype._update = function(vnode) {
        console.log(vnode);
        console.log(vnode, '_update');
    }
}

export function mountComponent(vm, el) {
    // vue在渲染的过程中，会创建一个所谓的“渲染watcher” => 只用来渲染的
    // vue 并不是完全的响应式框架，但遵循这响应式规则，即数据变了，视图刷新
    // watcher就是一个回调，每次数据变化，都会重新执行watcher

    // vue不是一个MVVM框架，并未完全遵循MVVM模型，但vue的设计收到它的启发，因此文档中使用vm表示vue实例

    const updateComponent = () => {
        // 内部会调用刚才我们解析后的render方法=> vnode

        // _render => options.render 方法 - 创建虚拟节点
        // _update => 将虚拟dom变成真实dom来执行 - 创建真实节点
        vm._update(vm._render()); // 先执行vm._render，再执行vm._update
    }

    // 每次数据变化，就执行updateComponent方法，进行更新操作
    new Watcher(vm, updateComponent, ()=> {}, true); // true标识它是一个渲染过程
}