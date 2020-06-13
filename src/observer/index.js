import { isObject } from '../utils.js';
import { arrayMethods } from './array.js';

class Observer {
    constructor(data) {
        // 对数组索引进行拦截，因为性能差（1万条数据）而且直接更改索引的方式并不多

        // 用这个方法方式递归时陷入死循环
        Object.defineProperty(data, '__ob__', { // __ob__也是一个响应式的标识，有这个属性的对象说明被观测过
            enumerable: false,
            configurable: false,
            value: this
        });
        // data.__ob__ = this; // 相当于在数据上可以获取到__ob__这个属性，指代的是Observer的实例（用这个方法放到对象属性里去，会造成死循环，会在walk不断遍历）
        if(Array.isArray(data)) {
            // vue对数组用的是重写数组的方法（仅含会改变原数组的7个方法）做函数劫持
            // 改变数组本身的方法就可以监控到
            data.__proto__ = arrayMethods; // 通过原型链，向上查找的方式
            this.observeArray(data); // 数组里面的元素也有可能是对象，也需要被观测到
        } else {
            this.walk(data); // 可以对数据一步一步的处理
        }
    }
    // 遍历数组，把数组的每个元素都放到observe方法里，判断是否要被观测
    observeArray(data) {
        for (let i = 0; i < data.length; i++) {
            observe(data[i]); // 检测数组的对象类型
        }
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
    
    // 递归中止判断
    if(!isObject(data)) {
        // 如果这个数据不是对象，或者是null，那就不监控
        return;
    }

    if(data.__ob__ instanceof Observer) { // 防止对象被重复观测
        return;
    }
    
    // 对数据进行defineProperty
    // 每观测一个对象，都new一个Observer实例出来，可以用这个来判断如果是Observer的实例，即表示已经被观测过
    return new Observer(data); // 可以看到当前数据是否被观测过
}