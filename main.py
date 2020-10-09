import requests
from fastapi import FastAPI
from fastapi.responses import JSONResponse

app = FastAPI()


@app.get("/")
def get_headers():
	postData = {
		"defaultQuery.0": "هذا الرجل هو سعيد.",
		"defaultQuery.1": "猴子喜欢吃香蕉。",
		"defaultQuery.2": "My dog also likes eating sausage.",
		"defaultQuery.3": "Au fond, les choses sont assez simples.",
		"defaultQuery.4": "El reino canta muy bien.",
		"chineseParseButton": "剖析 (Parse)",
		"query": "红色小熊",
		"parserSelect": "Chinese",
		"parse": "剖析 (Parse)"
	}

	r = requests.post('http://nlp.stanford.edu:8080/parser/index.jsp', data = postData)

	content = {'data': r.text}

	headers = {"Access-Control-Allow-Origin": "*"}
	return JSONResponse(content=content, headers=headers)

