import { isObject } from '../utils.js';

class Observer {
    constructor(data) {
        console.log(data);
    }
}

export function observe(data) {
    // 对象就是使用defineProperty来实现响应式原理
    
    if(!isObject) {
        // 如果这个数据不是对象，或者是null，那就不监控
        return;
    }
    // 对数据进行defineProperty

    // 每观测一个对象，都new一个Observer实例出来，可以用这个来判断如果是Observer的实例，即表示已经被观测过
    return new Observer(data); // 可以看到当前数据是否被观测过
}