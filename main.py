import requests
from fastapi import FastAPI
from fastapi.responses import JSONResponse

from bs4 import BeautifulSoup

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
	r = requests.post('http://nlp.stanford.edu:8080/parser/index.jsp', data = postData)

	# 利用BeautifulSoup HTML解析器
	soup = BeautifulSoup(r.text, 'html.parser')
	# find_all 返回的是符合标准的列表
	res = soup.find_all("div", class_="parserOutputMonospace")[1].get_text().replace('\n', '')
	# print(res)

	content = {'data': res}

	''' 允许跨域访问 '''
	headers = {"Access-Control-Allow-Origin": "*"}
	return JSONResponse(content=content, headers=headers)

