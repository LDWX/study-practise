import requests

# url = 'https://tjj.sh.gov.cn/tjnj/nj21.htm?d1=2021tjnj/C0205.htm'
url = 'https://tjj.sh.gov.cn/tjnj/2021tjnj/C0205.htm'

response = requests.get(url)

print(response)