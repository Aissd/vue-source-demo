import { parseHTML } from './parser.js';
import { generate } from './generator.js';
export function compileToFunctions(template) {
    // 实现模板的编译

    let ast = parseHTML(template);
    
    // 代码生成 - template => render函数

    /**
     * 把这种ast 转换成下面的形式 ： <div id="app" style="color:red"><span>helloworld {{msg}}</span></div>
     * render() {
     *  with(this._data) {
     *      return _c('div', { id: 'app', style: {color: red}}, _c('span', undefined, _v('helloworld' + _s(msg) ) ) );
     *  }
     * }
     */

    // 核心就是字符串拼接
    let code = generate(ast); // 代码生成 => 拼接字符串

    code = `with(this){return ${code}}`;

    let render = new Function(code); // 相当于给字符串变成了函数

    // 注释节点，自闭和标签，事件绑定，@click，class，slot插槽也是在render这里实现的

    return render;

    // 模板编译原理
    // 1、先把我们的代码转化成ast语法树
    //  1.1）parser解析 - 通过正则
    // 2、标记静态树 - 不会变的<span>123</span> - 对比时，是静态树就会忽略，有利于提高性能（优化）
    //  2.1）树得遍历标记 markup
    // 3、通过ast产生的语法树，生成代码 => render函数
    //  3.1）codegen
}