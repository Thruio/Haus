FROM node:5.5

RUN apt-get update -qq && \
    apt-get -yq install \
        build-essential && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN mkdir /src

WORKDIR /src
ADD . /src

RUN cd /src; npm install

EXPOSE 80

RUN node -v

CMD ["npm", "start"]
