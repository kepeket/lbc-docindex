import os
from os import listdir
import argparse
import re
import pprint
import json

from slugify import slugify

parser = argparse.ArgumentParser()
parser.add_argument('--root-path',
                    help="root folder where doc is hosted",
                    required=False,
                    default="."
)
parser.add_argument('--base-url', default="https://doc.bon-coin.net")

args = parser.parse_args();

doclist = {}


def listDirs(path):
    dirs = []
    retkey = "children"
    for item in os.listdir(path):
        if os.path.isdir(os.path.join(path, item)):
            dirs.append(item)
            m = re.search('\d+\.\d+\.\d+', item)
            if item == "master" or m:
                retkey = "versions"
    return (retkey, dirs)

def recurse(path, idx, basejson):
    dirtype, dirs = listDirs(path)

    if idx != 0:
        basejson[dirtype] = {}
        json = basejson[dirtype]
    else:
        json = basejson
    i = 0
    for d in dirs:
        if dirtype == "children":
            json[slugify(d)] = {
                "key": str(idx)+""+str(i),
                "firstLetter": d[0:1].upper(),
                "fullName": d,
                "color": "red",

            }
            recurse(os.path.join(path, d), idx+1, json[slugify(d)])
        else:
            json[slugify(d)] = {
                "name": d,
                "url": args.base_url+"/"+os.path.join(path, d)
                }
        i += 1

    return


if __name__ == '__main__':
    recurse(args.root_path, 0, doclist)

    print(json.dumps(doclist))
