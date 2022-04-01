FROM node
WORKDIR /root/software/serve
COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD  ["node" ,"app.js"]