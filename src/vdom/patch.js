export function patch(oldVnode, newVnode) {
    const isRealElement = oldVnode.nodeType;

    if(isRealElement) {
        // 真实元素
        const oldElm = oldVnode; // <div id="app"></div>
        const parentElm = oldElm.parentNode;

        let el = createElm(newVnode);
        console.log(el);
        // 把新元素插到老元素下面
        parentElm.insertBefore(el, oldElm.nextSibling);
        // 把老元素移除
        parentElm.removeChild(oldElm);

        return el; // 渲染的真实dom
    } else {
        // dom diff 算法
    }
}

// 需要递归创建
function createElm(vnode) {
    let { tag, data, children, key, text } = vnode;
    if(typeof tag == 'string') {
        // 元素 // 将虚拟节点和真实节点做一个映射关系（后面diff时如果元素相同，直接复用老元素
        vnode.el = document.createElement(tag);
        // 更新元素上的属性
        updateProperties(vnode);

        children.forEach(child => {
            // 递归渲染子节点
            // 将子节点渲染到父节点中
            vnode.el.appendChild(createElm(child));
        });
    } else {
        // 普通的文本
        vnode.el = document.createTextNode(text);
    }
    return vnode.el; // 真实的节点
}

function updateProperties(vnode) {
    let el = vnode.el;
    let newProps = vnode.data || {};
    console.log(el, newProps);
    for(let key in newProps) {
        if(key == 'style') {
            for (const styleName in newProps.style) { // { color: red;background:green }
                el.style[styleName] = newProps.style[styleName];
            }
        } 
        // 还有其他事件，插槽...
        else {
            el.setAttribute(key, newProps[key]);
        }
    }
}