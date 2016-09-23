import os
from os import listdir
import argparse
import re
import pprint
import json
import hashlib

from slugify import slugify

parser = argparse.ArgumentParser()
parser.add_argument('--root-path',
                    help="root folder where doc is hosted",
                    required=False,
                    default="."
)
parser.add_argument('--base-url', default="https://doc.bon-coin.net")
parser.add_argument('--exclude', default=[], nargs='*')

args = parser.parse_args()

doclist = {}


def listDirs(path):
    dirs = []
    retkey = "children"
    for item in os.listdir(path):
        if os.path.isdir(os.path.join(path, item)) and item[0:1] != ".":
            dirs.append(item)
            m = re.search('\d+\.\d+\.\d+', item)
            if item == "master" or m:
                retkey = "versions"
    return retkey, dirs


def recurse(path, idx, basejson):
    dirtype, dirs = listDirs(path)

    if idx != 0:
        basejson[dirtype] = {}
        json = basejson[dirtype]
    else:
        json = basejson
    i = 0
    for d in dirs:
        if (idx == 0 and d in args.exclude):
            continue
        md5 = hashlib.md5()
        md5.update(d)
        baseHex = md5.digest().encode("hex")
        r = (int("0x"+baseHex[1:3], 16) + 255) / 2
        v = (int("0x"+baseHex[3:5], 16) + 255) / 2
        b = (int("0x"+baseHex[5:7], 16) + 255) / 2
        if dirtype == "children":
            json[slugify(d)] = {
                "key": str(idx)+""+str(i),
                "firstLetter": d[0:1].upper(),
                "fullName": d,
                "color": "#"+str(hex(r)+hex(v)+hex(b)).replace('0x', ''),

            }
            recurse(os.path.join(path, d), idx+1, json[slugify(d)])
        else:
            json[slugify(d)] = {
                "name": d,
                "url": args.base_url+"/"+os.path.join(path, d),
                "color": "#"+str(hex(r)+hex(v)+hex(b)).replace('0x', ''),
                }
        i += 1

    return


if __name__ == '__main__':
    recurse(args.root_path, 0, doclist)

    print(json.dumps(doclist))
