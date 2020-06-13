import { parseHTML } from './parser.js';
export function compileToFunctions(template) {
    // 实现模板的编译

    let ast = parseHTML(template);

    // 模板编译原理
    // 1、先把我们的代码转化成ast语法树
    //  1.1）parser解析 - 通过正则
    // 2、标记静态树 - 不会变的<span>123</span> - 对比时，是静态树就会忽略，有利于提高性能
    //  2.1）树得遍历标记 markup
    // 3、通过ast产生的语法树，生成代码 => render函数
    //  3.1）codegen
}