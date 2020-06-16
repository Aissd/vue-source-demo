// 匹配动态变量的  +? 尽可能少匹配
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

function genProps(attrs) { // { id: 'app', style: { color: red } }
    let str = '';
    for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i]; // 取到每一个属性
        if(attr.name == 'style') {
            let obj = {};
            attr.value.split(';').forEach(item => { // 有可能有多个属性：color:red;background:green
                let [key, value] = item.split(':');
                obj[key] = value;
            });

            attr.value = obj; // 将原来的字符串换成了格式化后的对象
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},`;
    }
    return `{${str.slice(0, -1)}}`; // 这里的splice是去掉最后的逗号
}

function gen(node) { // <div><span></span>hello</div>
    if(node.type === 1) {
        // 1的话，说明是元素
        return generate(node);    
    } else {
        // 文本的处理
        let text = node.text;
        if(!defaultTagRE.test(text)) {
            // 文本里没有变量
            return `_v(${JSON.stringify(text)})`;
        } else {
            // 文本里有变量，例如
            // helloworld {{msg}} aa {{bb}} => _v('helloworld' + _s(msg) + 'aa' + _s(bb))
            let tokens = []; // 每次正则使用过后，都需要重新制定lastIndex
            let lastIndex = defaultTagRE.lastIndex = 0;
            let match, index; // 匹配后的结果
            while(match = defaultTagRE.exec(text)) {
                index = match.index;
                // 通过lastIndex,index
                tokens.push(JSON.stringify(text.slice(lastIndex, index)));

                tokens.push(`_s(${match[1].trim()})`);

                lastIndex = index + match[0].length;
            }

            if(lastIndex < text.length) {
                tokens.push(JSON.stringify(text.slice(lastIndex)));
            }
            return `_v(${tokens.join('+')})`;
        }
    }
}

function genChildren(el) {
    const children = el.children;
    // 判断是否有后台
    if(children) {
        return children.map(c => gen(c)).join(',') // 生成后代拼接的字符串
    } else {
        return false;
    }
}

export function generate(el) {
    let code = `_c("${el.tag}", ${ // 标签
            el.attrs.length ? `${genProps(el.attrs)}` : undefined // 属性
        }${
            el.children ? `,${genChildren(el)}` : '' // 子
        })`;
    return code;
}