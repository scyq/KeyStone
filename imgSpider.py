import re
import urllib  
import requests
from urllib.request import urlopen


'''
    爬虫失败，百度反爬机制！！！！！
'''

'''
@func getUrl 获得百度图片的地址
@param keyword 要搜索的关键词
@return url 当前搜索关键词的百度图片地址
'''


def getUrl(keyword: str) -> str:
    keyword = urllib.parse.quote(keyword, safe='/')
    url_base = 'https://image.baidu.com/search/index?tn=baiduimage&ipn=r&ct=201326592&cl=2&lm=-1&st=-1&fm=result&fr=&sf=1&fmq=1612625823033_R&pv=&ic=&nc=1&z=&hd=&latest=&copyright=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&sid=&word='


    url = url_base + keyword
    return url


'''
@func getImageUrl 获取一张图片的url
@param url 当前百度图片的url
@return url 第一张图片的地址（目前我们只提取第一张图片的）
'''


def getImageUrl(url: str) -> str:
    headers = {
    "Accept":"image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    "User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.16 Safari/537.36",
    }
    try:
        html = requests.get(url, headers=headers)
        html.encoding = html.apparent_encoding
        html = html.text
    except Exception as e:
        print("Get Image URL ERR: ")
        print(e)
        return []
    print(html)
    urls = re.findall('"ObjURL":"(.*?)"',html,re.S)
    print('11213123123')
    print(urls)
    
    
    return []


'''
@func pullImage 下载图片
@param word 当前图片对应的词语名
@param url 当前图片的url
'''


def pullImage(word: str, url: str):
    try:
        img = requests.get(url, timeout=20)
        name = './_image_cache_/' + word + '.jpg'
        with open(name, 'wb') as f:
            f.write(img.content)
    except Exception as e:
        print("PULL Image ERR: ")
        print(e)