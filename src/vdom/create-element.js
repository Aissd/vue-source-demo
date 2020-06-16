export function createTextVNode(text) {
    return vnode(undefined, undefined, undefined, undefined, text);
}

// 属性可能是undefined
export function createElement(tag, data={}, ...children) {
    
    // let key = data.key;
    // if(key) {
    //     delete data.key; // 递归算法会用到
    // }
    
    // vue中的key不会作为属性传递给组件
    return vnode(tag, data, data.key, children);
}

// 虚拟节点是产生一个对象，用来描述dom结构
// ast 是描述dom语法的
function vnode(tag, data, key, children, text) {
    return {
        tag, 
        data, 
        key, 
        children, 
        text
    }
}