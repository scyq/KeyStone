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
    url_base = "http://image.baidu.com/search/flip?tn=baiduimage&ie=utf-8&word="
    ''' 
        pn 是百度图片的页数
        gsm 是页数的十六进制
        这里直接写死，有需要可以扩展该方法
    '''
    url = url_base + keyword + "&pn=0&gsm=0" + "&ct=&ic=0&lm=-1&width=0&height=0"
    return url


'''
@func getImageUrl 获取一张图片的url
@param url 当前百度图片的url
@return url 第一张图片的地址（目前我们只提取第一张图片的）
'''


def getImageUrl(url: str) -> str:
    head = {"User-Agent" : "User-Agent:Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0;"}
    try:
        html = requests.get(url, headers=head).text
    except Exception as e:
        print("Get Image URL ERR: ")
        print(e)
        return []
    imageUrl = re.findall('"objURL":"(.*?)",', html, re.S)
    imageUrl = list(enumerate(imageUrl))    # 转成列表，是一个二维列表，(index, url)
    return imageUrl[0][1]


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