FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .


CMD [ "npm", "run", "start:dev" ]

# for production
# ENV PORT=8000
# EXPOSE 8000
# RUN npm run build
# CMD ["npm", "run", "start:prod"]