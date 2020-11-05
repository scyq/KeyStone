/*
    @Yuqing Chen
    @Shengqi Cao
    利用前端词库处理自然语言处理后的带有词性标注的词语
 */

import React from 'react';
import { Button, TextField } from '@material-ui/core';

class WordsHandler {
    /*
        @constructor
        构造器
        @param
        {string} words 带有词性标注的词语，词语和词性未分割
        {Array{React.Component}} renderQueue 渲染队列
        {string} colorStyle 背景颜色，16进制
    */
    constructor() {
        this.words = [];
        this.renderQueue = [];
        this.colorStyle = "White";
    }

    /*
        @function getThis
        获取指向该对象的指针
    */
    getThis() {
        return this;
    }

    /*
        @function reRender
        清空renderQueue
    */
    reRender() {
        this.renderQueue = [];
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

    /*
        @function wordAnalysis
        词义提取核心代码 在词库中提取对应的词语 并映射
        @param
        {function} bgColorCallBack 回调函数，改变背景颜色
    */
    wordAnalysis(bgColorCallBack) {
        /* 异步发送读取词库json请求 */
        let thesaurusURL = './Thesaurus.json';  /* 注意：./是指和index.html同级目录，必须放在public文件夹下 */
        let request = new XMLHttpRequest();
        request.open("get", thesaurusURL);
        request.send(null);     /* 没有服务器，不发送内容 */
        let obj = this.getThis(); /* 进入到request后this指针会丢失，在这里重新拷贝 */

        const widgetSelector = (widgetType) => {
            let res = undefined;
            switch (widgetType) {
                case "Button":
                    res = (<Button variant="contained">一个按钮</Button>);
                    break;
                case "TextField":
                    res = (<TextField id="standard-basic" label="输入点什么吧"> </TextField>);
                    break;
                default:
                    res = (<h2>对不起，我们什么也没Get到</h2>);
            }
            return res;
        }

        /* 获取到json对象后执行, 这是一个异步方法 */
        request.onload = function () {
            if (request.status === 200) {   /* 200就是获取成功 */
                let jsonFile = JSON.parse(request.responseText);    /* 把读到的json字符串转换为对象 */
                for (let wordArr of obj.words) {
                    let word = wordArr[0];      /* 词汇 */
                    // let speech = wordArr[1];    /* 词性 */

                    if (jsonFile["Words"][word]) {           /* 词库是否存在该词 */
                        let wordType = jsonFile["Words"][word];  /* 这个词汇是一个什么东西？ 组件？颜色？布局？ */
                        switch (wordType) {
                            case "Widget":     /* 如果是组件，渲染队列中添加需要渲染的组件 */
                                obj.renderQueue.push(widgetSelector(jsonFile[wordType][word]));
                                break;
                            case "Color":      /* 如果是颜色，改变渲染的背景颜色 */
                                obj.colorStyle = jsonFile["Color"][word];
                                break;
                            default:
                                obj.renderQueue.push((<h1>对不起，我们什么也没Get到</h1>));
                        }

                    }
                }
                bgColorCallBack(obj.colorStyle);
            }
        };
    }
}

export default WordsHandler