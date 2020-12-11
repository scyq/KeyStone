/*
    @Yuqing Chen
    @Shengqi Cao
    利用前端词库处理自然语言处理后的带有词性标注的词语
 */

class WordsHandler {

    getThis () {
        return this;
    }

    /* 
        @function colorAnalysis
        颜色分析功能
    */

    /*
        @function funcAnalysis
        功能分析功能
        @param {Array} words 词语和词性分开后的词语
        @param {JSON} thesaurus 本地获取到的JSON对象
    */
    funcAnalysis (words, thesaurus) {
        let res = {
            "layout" : [],
            "navigate" : []
        };
        for (let word of words) {
            let content = word[0];  /* 词语 */
            let speech = word[1];   /* 词性 */

            if (thesaurus["Layout"][content]) {     /* 词库是否存在该词 */
                res["layout"].push(thesaurus["Layout"][content]);
            }
            if (thesaurus["Navigate"][content]) {
                res["navigate"].push(thesaurus["Navigate"][content]);
            }
        }

        return res;
    }

    /*
        @function Analysis
        词义提取核心代码 在词库中提取对应的词语 并映射
        @param {Array} words 需要分析的List，这个Array一定是二维数组，分词完成的数组。
        @param {function} func 功能码 0->提取对应架构层信息
    */
    Analysis(words, func) {
        let res = undefined;
        /* 异步发送请求读取本地JSON库 */
        let thesaurusURL = './Thesaurus.json';  /* 注意：./是指和index.html同级目录，必须放在public文件夹下 */
        let request = new XMLHttpRequest();
        request.open("get", thesaurusURL);
        request.send(null);     /* 没有服务器，不发送内容 */
        let obj = this.getThis(); /* 进入到request.onload后this指针会丢失，在这里重新拷贝 */

        /* 当获取到JSON对象后，异步地执行下面这个函数 */
        request.onload = function () {
            /* 200 就是成功获取 */
            if (request.status === 200) {
                let jsonFile = JSON.parse(request.responseText);    /* 把读到的json字符串转换为对象 */
                switch(func) {
                    case 0:
                        res = obj.funcAnalysis(words, jsonFile);
                        break;
                    default:
                        break;
                }
            }
        }.then((result) => {
            return res;
        }).catch((err) => {
            return undefined;
        });

    }


}

export default WordsHandler