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
function proxy(target, property, key) {
    Object.defineProperty(target, key, {
        get() {
            return target[property][key];
        },
        set(newValue) {
            target[property][key] = newValue;
        }
    });
}
function initData(vm) {
    let data = vm.$options.data; // 用户传入的数据
    // vm._data 就是观测后的数据（都有get和set标识），暴露到实例上
    data = vm._data = typeof data === 'function' ? data.call(vm) : data; // 若是函数，则执行（data是函数封装，return一个对象，即获取到了数据）
    // 观测数据，给get，set方法

    // 将数组全部代理到vm的实例上
    for(let key in data) {
        proxy(vm, '_data', key);
    }
    observe(data);
}