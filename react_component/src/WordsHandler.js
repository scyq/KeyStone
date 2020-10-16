/*
    @Yuqing Chen
    @Shengqi Cao
    利用前端词库处理自然语言处理后的带有词性标注的词语
 */

class WordsHandler {
    /*
        @constructor
        构造器
        @param
        {string} words 带有词性标注的词语，词语和词性未分割
    */
    constructor() {
        this.words = [];
    }

    /*
        @function splitSpeech
        更新类中的words并把词语和词性分开
        @param
        {Array{string}} theWords NLP处理后带有词性的词语数组
    */
    splitSpeech(theWords) {
        this.words = theWords.map(
            word => {
                return word.split('/');
            }
        );
    }
}

export default WordsHandler