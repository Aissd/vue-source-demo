let oldArrayMethods = Array.prototype; // 获取数组原型上的方法

// 拷贝一个数组原型，创建一个全新的对象，且修改对象时不会影响原数组的原型方法
export let arrayMethods = Object.create(oldArrayMethods);

// 会改变原数组的才劫持
// 这七个方法都可以改变原数组
let methdos = [
    'push',
    'pop',
    'shift',
    'unshift',
    'sort',
    'reverse',
    'splice'
];

// 函数劫持（APO）
methdos.forEach(method => {
    arrayMethods[method] = function(...args) {
        const ob = this.__ob__;
        // 当用户调用数组方法时，会先执行我自己改造的逻辑，在执行数组默认的逻辑
        let result = oldArrayMethods[method].apply(this, args);

        let inserted; // 这个是存储可能要被观测的对象
        // push，unshift，splice 都可以新增属性（新增的属性也有可能是对象）
        // 内部还对数组中引用类型也做了一次劫持
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                // splice 可以新增，修改，删除
                // [].splice(arr, 1, 'div') - div就是新增的部分，所以splice(2)，取第二个参数以及后面的
                inserted = args.splice(2); // 取新增的部分
                break;
            default:
                break;
        }
        inserted && ob.observeArray(inserted);
        return result; // 数组的方法都有返回值，比如push方法，会返回push之后数组的长度
    }
})