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

    /* 防止太快 */
    window.setTimeout(() => {
        fetch(hostURL + 'func?query=' + funcInput)
            .then(res => res.json())
            .then(data => {
                let AnalysisInfo = wordsHandler.Analysis(data, 0);
                setDesign(AnalysisInfo);
                analysisDoneCallBack();
            });
    }, 1000);

}



/* 向本地端口发送get请求 */
/*
  @function nlpSearchColor 分析颜色并展示用户可能喜欢的颜色
  @param {string} colorStyleInput 用户对颜色的需求
  @param setWishColor 回调函数，用户可能喜欢的颜色
  @param analysisDoneCallBack 回调函数，用于结束分析状态
*/
export function nlpSearchColor(colorStyleInput, setWishColor, analysisDoneCallBack) {
    if (colorStyleInput.length <= 0) {
        analysisDoneCallBack();
        setWishColor(["#ffffff"]);
        return;
    }
    fetch(hostURL + 'img?query=' + colorStyleInput)
        .then(res => res.json())
        .then(data => {
            const colorThief = new ColorThief();

            /* 十六进制转rgb */
            const hexToRgb = hex => {
                let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
            }


            /* rgb转十六进制 */
            const rgbToHex = (r, g, b) => '#' + [r, g, b].map(x => {
                const hex = x.toString(16)
                return hex.length === 1 ? '0' + hex : hex
            }).join('');

            /* 计算颜色的欧式距离 */
            const colorDistance = (rgb, _rgb) => {
                let rMean = (rgb[0] + _rgb[1]) / 2;
                let deltaR = rgb[0] - _rgb[0];
                let deltaG = rgb[1] - _rgb[1];
                let deltaB = rgb[2] - _rgb[2];
                let diff = Math.sqrt(
                    (2 + (rMean / 256)) * Math.pow(deltaR, 2) + 4 * Math.pow(deltaG, 2) + (2 + (255 - rMean) / 256) * Math.pow(deltaB, 2)
                );

                return diff;
            }

            /* 临时存放颜色 */
            let temp = [];
            /* 颜色欧式距离阈值 */
            const minDiff = 150;

            if (data.length < 1) {
                analysisDoneCallBack()
                setWishColor(["#ffffff"]);
            }
            else {
                for (let word of data) {
                    let possibleColor = wordsHandler.Analysis(word, 1);
                    console.log(possibleColor);
                    /* 在词库 */
                    if (possibleColor !== null) {
                        temp.push(hexToRgb(possibleColor));
                    }
                    /* 不在词库 */
                    else {
                        const img = new Image();
                        /* 这是回调函数，当图片爬完了，就会调用 */
                        // eslint-disable-next-line
                        img.addEventListener('load', function () {
                            /* 会返回一堆颜色 */
                            let rgbs = colorThief.getPalette(img);
                            if (rgbs !== null) {
                                for (let rgb of rgbs) {
                                    /* 是否可以添加 */
                                    let ok = true;
                                    /* 计算相似度 */
                                    for (let _rgb of temp) {
                                        let distance = colorDistance(rgb, _rgb);
                                        /* 颜色过于相近 */
                                        if (distance < minDiff) {
                                            ok = false;
                                            break;
                                        }
                                    }
                                    /* 如果数量已经大于7 则不再添加 */
                                    if (ok && temp.length < 7) temp.push(rgb);
                                }
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
                            return;
                        }
                    }

                }

                window.setTimeout(() => {
                    /* 所有词语都遍历完 */
                    temp = temp.map((color) => {
                        return rgbToHex(color[0], color[1], color[2]);
                    });
                    setWishColor(temp);
                    analysisDoneCallBack();
                }, 2000);

            }
        });
}
