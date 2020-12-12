/*
    @Yuqing Chen
    @Shengqi Cao
    利用前端词库处理自然语言处理后的带有词性标注的词语
 */

import thesaurus from './Thesaurus.json'

class WordsHandler {

    getThis() {
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
    */
    funcAnalysis(words) {
        let res = {
            "layout": [],
            "navigate": []
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
        console.log(thesaurus);
        let res = undefined;
        switch (func) {
            case 0:
                res = this.funcAnalysis(words);
                return res;
            default:
                break;
        }
    }


}

export default WordsHandler