FROM node

WORKDIR /developer

RUN apt-get update && apt-get install -y git

RUN git clone https://github.com/Kuldeep12e/Notification-Service.git

WORKDIR /developer/Notification-Service

RUN npm ci

ENV PORT=3002

EXPOSE 3002

CMD ["npm" , "run" , "dev"]
