# -*- coding: utf-8 -*-
"""获取图片资源并入库"""
#!/usr/bin/python3
import urllib.request
import datetime
import re

seed = datetime.datetime.utcnow().strftime('%Y-%m-%d+%H%%3A%M%%3A%S++0000')
url = 'https://www.pexels.com/?format=js&page=1&seed='+seed
req = urllib.request.Request(
    url, 
    data=None, 
    headers={
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'
    }
)

f = urllib.request.urlopen(req)
cnt = f.read().decode('utf-8')

all = re.findall("<img width=\\\\\"([0-9]*)\\\\\" height=\\\\\"([0-9]*)\\\\\" style=\\\\\"[^\"]*\\\\\" alt=\\\\\"[^\"]*\\\\\" data-pin-media=\\\\\"[^\"]*\\\\\" src=\\\\\"(https:\/\/images.pexels.com\/photos\/[0-9]*\/[a-zA-Z0-9-]*.jpg)", cnt)

def save(photo):
    if photo[1] == '0':
        return
    data = """mutation {
        addPhoto(url:"%s", ratio:%f) {
            url
        }
    }""" % (photo[2],float(photo[0])/float(photo[1]))
    req =  urllib.request.Request("http://localhost:4000/chromeql", 
    headers={
        'Content-Type': 'application/graphql'
    },
    data=data.encode("utf-8")) # this will make the method "POST"
    resp = urllib.request.urlopen(req)
    resp.read()

for photo in all:
    save(photo)
