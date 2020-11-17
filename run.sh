#!/bin/bash

# main.py 利用fastapi爬取StanFordAPI，获取处理完的数据，端口9999

uvicorn main:app --reload --port 9999