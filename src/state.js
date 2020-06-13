import { observe } from './observer/index.js';

export function initState(vm) {
    const opts = vm.$options;
    if(opts.props) {
        initProps(vm);
    }
    if(opts.metods) {
        initMethods(vm);
    }
    if(opts.data) {
        initData(vm);
    }
}

function initProps(vm) {}
function initMethods(vm) {}
function initData(vm) {
    let data = vm.$options.data; // 用户传入的数据
    data = typeof data === 'function' ? data.call(vm) : data; // 若是函数，则执行（data是函数封装，return一个对象，即获取到了数据）
    // 观测数据，给get，set方法
    observe(data);
}