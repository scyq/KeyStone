import WordsHandler from './WordsHandler';
import ColorThief from '../node_modules/colorthief/dist/color-thief';

const wordsHandler = new WordsHandler();
const hostURL = "http://127.0.0.1:9999/";   /* 主机IP */

/* 向本地端口发送get请求 */
/*
  @function nlpSearchFunc 分析用户可能想要的功能，确定原始的布局、导航
  @param {string} funcInput 用户的输入内容
  @param setDesign 回调函数，用于修改用户的设计
  @param analysisDoneCallBack 回调函数，用于更新背景颜色
*/
export default function nlpSearchFunc(funcInput, setDesign, analysisDoneCallBack) {
    if (funcInput.length <= 0) {
        analysisDoneCallBack();
        return;
    }

    fetch(hostURL + 'func?query=' + funcInput)
        .then(res => res.json())
        .then(data => {
            let AnalysisInfo = wordsHandler.Analysis(data, 0);
            setDesign(AnalysisInfo);
            analysisDoneCallBack();
        });
}



/* 向本地端口发送get请求 */
/*
  @function nlpSearchColor 分析颜色并展示用户可能喜欢的颜色
  @param {string} colorStyleInput 用户对颜色的需求
  @param setWishColor 回调函数，用户可能喜欢的颜色
  @param analysisDoneCallBack 回调函数，用于结束分析状态
*/
export function nlpSearchColor (colorStyleInput, setWishColor, analysisDoneCallBack) {
    console.log(colorStyleInput);
    if (colorStyleInput.length <= 0) {
        analysisDoneCallBack();
        setWishColor(["#ffffff"]);
        return;
    }
    fetch(hostURL + 'img?query=' + colorStyleInput)
        .then(res => res.json())
        .then(data => {
            const colorThief = new ColorThief();
            const wordsCounts = data.length;

            /* rgb转十六进制 */
            const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
                const hex = x.toString(16)
                return hex.length === 1 ? '0' + hex : hex
            }).join('');

            let temp = [];
            if (data.length < 1) {
                analysisDoneCallBack()
                setWishColor(["#ffffff"]);
            }
            else {
                for (let word of data) {
                    const img = new Image();
                    /* 这是回调函数，当图片爬完了，就会调用 */
                    // eslint-disable-next-line
                    img.addEventListener('load', function () {
                        let rgb = colorThief.getColor(img);
                        let rgbHex = rgbToHex(rgb[0], rgb[1], rgb[2]);
                        temp.push(rgbHex);
                        if (temp.length >= wordsCounts) {
                            analysisDoneCallBack();
                            /* 去重 */
                            temp = Array.from(new Set(temp));
                            setWishColor(temp);
                        }
                    });
                    img.crossOrigin = 'Anonymous';
                    try {
                        let srcPath = hostURL + "_image_cache_/" + word + ".jpg";
                        img.src = srcPath;
                    }
                    catch
                    {
                        console.log('Fetch' + word + ' img Err');
                        analysisDoneCallBack();
                    }
                }
            }
        });
}
