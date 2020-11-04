import requests
from bs4 import BeautifulSoup

r = requests.get('https://www.analogouscolors.com/cn/')
soup = BeautifulSoup(r.text, 'html.parser')
colorInfo = soup.find_all('img')
colorSet = set()	# 用于去重
for color in colorInfo:
	try:
		colorStr = color['title']
		colorStr = colorStr.split(',')
		if colorStr[0] in colorSet:
			continue
		else:
			colorSet.add(colorStr[0])
			print('"'+ colorStr[0] + '"' + ' : ' + '"Color",')
	except:
		continue