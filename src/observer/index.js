import { isObject } from '../utils.js';

class Observer {
    constructor(data) {
        this.walk(data); // 可以对数据一步一步的处理
    }
    walk(data) {
        // 循环对象，给对象的每个属性添加观测
        // 对象的循环 data: { msg: 'zf', age: 11 }
        // 这里不建议用forin循环对象，因为会枚举出原型的东西
        Object.keys(data).forEach(key => {
            defineReactive(data, key, data[key]); // 定义响应式的数据变化
        });
    }
}

// 给对象的每个属性添加响应式处理
// data - 被循环的对象
// 循环中当前的key
// 循环中当前的value
// vue2的性能问题，需要递归重写get和set，性能慢，vue3使用proxy就没这个问题
function defineReactive(data, key, value) {
    observe(value); // 若值还是为对象，则用递归，继续观测
    Object.defineProperty(data, key, {
        get() {
            return value;
        }, 
        set(newValue) {
            if(newValue == value) return;
            if(isObject(newValue)) observe(newValue); // 设置的值有可能也是对象，所以需要判断监控
            value = newValue;
        }
    })
}

export function observe(data) {
    // 对象就是使用defineProperty来实现响应式原理
    
    if(!isObject(data)) {
        // 如果这个数据不是对象，或者是null，那就不监控
        return;
    }
    // 对数据进行defineProperty

    // 每观测一个对象，都new一个Observer实例出来，可以用这个来判断如果是Observer的实例，即表示已经被观测过
    return new Observer(data); // 可以看到当前数据是否被观测过
}