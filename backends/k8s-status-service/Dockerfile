FROM node:12.0.0-alpine

WORKDIR /app

RUN mkdir /root/.aws

# Install AWS CLI
ENV AWSCLI_VERSION "1.14.10"
RUN apk add --update \
    python \
    python-dev \
    py-pip \
    build-base \
    && pip install awscli==$AWSCLI_VERSION --upgrade \
    && apk --purge -v del py-pip \
    && rm -rf /var/cache/apk/*

RUN apk add curl

# Install Kubernetes CLI (AKA Kubectl)
RUN curl -Lo kubectl https://storage.googleapis.com/kubernetes-release/release/$(curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt)/bin/linux/amd64/kubectl
RUN chmod +x ./kubectl
RUN mv ./kubectl /usr/local/bin/kubectl

# run npm install before copying code directory for more efficient image caching
COPY package.json package.json
RUN npm install

COPY . .

ENTRYPOINT [ "./docker-entrypoint.sh" ]
