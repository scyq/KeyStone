from fastapi import FastAPI
from fastapi.responses import JSONResponse
from imgSpider import *
import os
from fastapi.responses import FileResponse
import jieba
import re
import string

''' 利用fastapi建立本地服务器 '''
app = FastAPI()

''' 用jieba库进行分词 '''
def split_words(text: str) -> str:

    ''' 去除所有标点符号以及空格 '''
    punc = '~`!#$%^&*()_+-=|\';":/.,?><~·！@#￥%……&*（）——+-=“：’；、。，？》《{} '
    query = re.sub(r"[%s]+" %punc, "", text)

    ''' 精确模式 '''
    seg_list = list(jieba.cut(text))

    return seg_list


@app.get("/func")
def get_headers(query: str):

    res = split_words(query)

    ''' 允许跨域访问 '''
    headers = {"Access-Control-Allow-Origin": "*"}
    return JSONResponse(content=res, headers=headers)



@app.get("/img")
def get_headers(query: str):

    res = split_words(query)

    cachedList = []  # 缓存过的词语，防止重复下载

    ''' 获取cache中已有图片 '''
    cachePath = './_image_cache_/'
    allFiles = list(enumerate(os.walk(cachePath)))[0][1][2]
    for filename in allFiles:
        temp = filename.split('.')  # 去掉后缀
        cachedList.append(temp[0])

    ''' 下载图片到缓存 '''
    for keyword in res:
        if keyword in cachedList:
            continue
        else:
            url = getUrl(keyword)
            pullImage(keyword, getImageUrl(url))
            cachedList.append(keyword)

    ''' 允许跨域访问 '''
    headers = {"Access-Control-Allow-Origin": "*"}
    return JSONResponse(content=res, headers=headers)


@app.get("/_image_cache_/{imgName}")
async def Image(imgName: str):
    headers = {"Access-Control-Allow-Origin": "*"}
    # 需要先load到服务器
    path = os.path.join("./_image_cache_", imgName)
    if not os.path.exists(path):
        return {'Load' : False, 'msg': '文件不存在'}
    return FileResponse(path, headers=headers)