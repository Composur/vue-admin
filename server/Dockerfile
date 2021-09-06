FROM node
RUN rm -rf /app
RUN mkdir /app
WORKDIR /app
COPY package.json /app/
RUN npm install
COPY . /app/
RUN npm install
EXPOSE 8084
CMD npm run start