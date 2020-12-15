import requests
import copy
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from bs4 import BeautifulSoup  # HTML解析库
from imgSpider import *
import os
from fastapi.responses import FileResponse

''' 利用fastapi建立本地服务器 '''
app = FastAPI()



@app.get("/")
def get_headers(query: str):
    postData = {
        "defaultQuery.0": "هذا الرجل هو سعيد.",
        "defaultQuery.1": "猴子喜欢吃香蕉。",
        "defaultQuery.2": "My dog also likes eating sausage.",
        "defaultQuery.3": "Au fond, les choses sont assez simples.",
        "defaultQuery.4": "El reino canta muy bien.",
        "chineseParseButton": "剖析 (Parse)",
        "query": query,
        "parserSelect": "Chinese",
        "parse": "剖析 (Parse)"
    }

    ''' 利用requests向stanford NLP发送POST请求 '''
    r = requests.post(
        'http://nlp.stanford.edu:8080/parser/index.jsp', data=postData)

    ''' 利用BeautifulSoup HTML解析器 '''
    soup = BeautifulSoup(r.text, 'html.parser')

    ''' 
		find_all 返回的是符合标准的列表
    	res 是stanford NLP 分词后的结果 
	'''
    res = soup.find_all("div", class_="parserOutputMonospace")[
        1].get_text().replace('\n', '')

    res = res.split()   # 去除长空格
    resList = copy.deepcopy(res)    # 深拷贝，必须另起炉灶

    ''' 首先把词语和词性分开 '''
    for i in range(len(resList)):
        resList[i] = resList[i].split('/')

    cachedList = []  # 缓存过的词语，防止重复下载
    ''' 获取cache中已有图片 '''
    cachePath = './_image_cache_/'
    allFiles = list(enumerate(os.walk(cachePath)))[0][1][2]
    for filename in allFiles:
        temp = filename.split('.')  # 去掉后缀
        cachedList.append(temp[0])

    ''' 下载图片到缓存 '''
    for wordList in resList:
        keyword = wordList[0]   # 只取词语，不取词性
        if keyword in cachedList:
            continue
        else:
            url = getUrl(keyword)
            pullImage(keyword, getImageUrl(url))
            cachedList.append(keyword)

    content = {
        'data': res
    }

    ''' 允许跨域访问 '''
    headers = {"Access-Control-Allow-Origin": "*"}
    return JSONResponse(content=content, headers=headers)


@app.get("/_image_cache_/{imgName}")
async def Image(imgName: str):
    headers = {"Access-Control-Allow-Origin": "*"}
    # 需要先load到服务器
    path = os.path.join("./_image_cache_", imgName)
    if not os.path.exists(path):
        return {'Load' : False, 'msg': '文件不存在'}
    return FileResponse(path, headers=headers)