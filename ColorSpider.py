import requests
from bs4 import BeautifulSoup

r = requests.get('https://www.analogouscolors.com/cn/')
soup = BeautifulSoup(r.text, 'html.parser')
colorInfo = soup.find_all('img')
for color in colorInfo:
	try:
		colorStr = color['title']
		colorStr = colorStr.split(',')
		print('"'+ colorStr[0] + '"' + ' : ' + '"#' + colorStr[1] + '",')
		#print(color['title'].replace(',', ' : ') + ',')
	except:
		continue