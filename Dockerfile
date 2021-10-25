FROM node:alpine as builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY AirBlue_Frontend .
RUN npm run build

FROM alpine
RUN apk add nginx python3 curl
RUN curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py && python3.9 get-pip.py && rm get-pip.py
RUN apk add postgresql-dev gcc
RUN apk add python3-dev py-configobj libusb linux-headers musl-dev
COPY --from=builder /app/build /usr/share/nginx/html
COPY confs/nginx.conf /etc/nginx/nginx.conf
WORKDIR /app
COPY backend .
RUN pip install -r requirements.txt
RUN python3 manage.py makemigrations
RUN python3 manage.py migrate
RUN python3 manage.py createsuperuser --username adminuser --email admin@admin.com --noinput
COPY confs/run.sh /
CMD /run.sh
