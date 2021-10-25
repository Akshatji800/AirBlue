#!/bin/sh
nginx -g "daemon off;" &
sleep 3
python3 manage.py runserver 0.0.0.0:5000
