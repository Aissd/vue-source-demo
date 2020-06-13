import { initMixin } from './init.js';

// options - 用户传递的所有参数
function Vue(options) {
    // 内部要进行初始化的操作
    this._init(options); // 初始化操作
}

initMixin(Vue);

export default Vue;
