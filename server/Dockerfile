FROM node:18-alpine

WORKDIR /app

# Cài đặt build dependencies cho bcrypt
RUN apk add --no-cache python3 make g++

COPY package*.json ./
RUN npm install --production

COPY . .

# Rebuild bcrypt để đảm bảo tương thích với kiến trúc container
RUN npm rebuild bcrypt --build-from-source

# Cổng backend lắng nghe trong container
ENV PORT=4000
EXPOSE 4000

# Chạy server ở chế độ production
CMD ["npm", "start"]