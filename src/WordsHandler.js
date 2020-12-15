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
            "navigate": [],
            "template": []
        };
        for (let word of words) {
            if (thesaurus["Layout"][word]) {     /* 词库是否存在该词 */
                res["layout"].push(thesaurus["Layout"][word]);
            }
            if (thesaurus["Navigate"][word]) {
                res["navigate"].push(thesaurus["Navigate"][word]);
            }
            if (thesaurus["Template"][word]) {
                res["template"].push(thesaurus["Template"][word]);
            }
        }

        return res;
    }

    /*
        @function Analysis
        词义提取核心代码 在词库中提取对应的词语 并映射
        @param {Array} words 需要分析的List，分词完成的一维数组。
        @param {function} func 功能码 0->提取对应架构层信息
    */
    Analysis(words, func) {
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