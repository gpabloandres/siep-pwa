FROM node:alpine
ADD ./webpack /siep-pwa/
WORKDIR /siep-pwa/

RUN npm install
CMD ["sh","/siep-pwa/docker_init.sh"]

