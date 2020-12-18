import re
import urllib
import requests

'''
@func getUrl 获得百度图片的地址
@param keyword 要搜索的关键词
@return url 当前搜索关键词的百度图片地址
'''


def getUrl(keyword: str) -> str:
    keyword = urllib.parse.quote(keyword, safe='/')
    url_base = "https://image.baidu.com/search/index?tn=baiduimage&ipn=r&cl=2&lm=-1&st=-1&fm=index&fr=&hs=0&xthttps=111111&sf=1&fmq=&pv=&ic=0&nc=1&z=&se=1&showtab=0&fb=0&width=&height=&face=0&istype=2&ie=utf-8&word="
    ''' 
        pn 是百度图片的页数
        gsm 是页数的十六进制
        这里直接写死，有需要可以扩展该方法
    '''
    url = url_base + keyword
    return url


'''
@func getImageUrl 获取一张图片的url
@param url 当前百度图片的url
@return url 第一张图片的地址（目前我们只提取第一张图片的）
'''


def getImageUrl(url: str) -> str:
    head = {"User-Agent" : "User-Agent:Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0;"}
    try:
        for i in range(7):
            html = requests.get(url, headers=head).text
    except Exception as e:
        print("Get Image URL ERR: ")
        print(e)
        return []
    print(html)
    imageUrl = re.findall('"objURL":"(.*?)",', html, re.S)
    ''' 爬取为空，换匹配项 '''
    if len(imageUrl) < 1 :
        imageUrl = re.findall('"ObjURL":"(.*?)",', html, re.S)
    ''' 如果还是小于1，则只好返回空 '''
    
    return imageUrl[0]


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