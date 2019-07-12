FROM python:3-stretch
MAINTAINER ops@amida.com
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
RUN cp .base.env .env
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8
ENTRYPOINT python -m flask run --host 0.0.0.0
