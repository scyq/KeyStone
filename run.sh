#!/bin/bash

# main.py 利用fastapi爬取StanFordAPI，获取处理完的数据，端口9999
# index.html 利用http.server直接建立本地服务器，作为代理，端口8000

uvicorn main:app --reload --port 9999 & 
python3 -m http.server