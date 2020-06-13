const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;  
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则 捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 匹配属性的
const startTagClose = /^\s*(\/?)>/; // 匹配标签结束的 >
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

export function parseHTML(html) {

    function start(tagName, attrs) {
        console.log(tagName, attrs);
    }
    function end(tagName) {
        console.log(tagName);
    }
    function chars(text) {
        console.log(text);
    }

    // 根据html解析成树结构
    // <div id="app"><span style="color: red">hello world {{msg}}</span></div>
    while(html) {
        let textEnd = html.indexOf('<');
        if(textEnd == 0) {
            const startTageMatch = parseStartTag();

            if(startTageMatch) {
                // 开始标签
                start(startTageMatch.tagName, startTageMatch.attrs);
            }

            const endTagMatch = html.match(endTag);
            if(endTagMatch) {
                advance(endTagMatch[0].length);
                end(endTagMatch[1]);
            }
            // 结束标签
        }

        // 如果不是0，说明是文本
        let text;
        if(textEnd >= 0) {
            text = html.substring(0, textEnd); // 是文本，就把文本内容截取
            chars(text);
        }
        if(text) {
            advance(text.length); // 删除文本内容
        }
    }

    // 解析完之后，截取标签
    // n 要去掉标签部分的长度
    // 原先："<div id="app"></div>"，解析了第一个div标签之后
    // 变成：" id="app"></div>"
    function advance(n) {
        html = html.substring(n);
    }

    function parseStartTag() {
        const start = html.match(startTagOpen); // 匹配开始标签
        if(start) {
            const match = {
                tagName: start[1], // 匹配到的标签名
                attrs: [] // 匹配到的属性
            }
            advance(start[0].length);
            let end, attr;
            while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                advance(attr[0].length);
                match.attrs.push({ name: attr[1], value: attr[3] || attr[4] || attr[5] });
            }
            if(end) {
                advance(end[0].length);
                return match;
            }
        }
    }
}