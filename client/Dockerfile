# Stage 1: build Vite app
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
# Nhận VITE_BACKEND_URL từ build args
ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
RUN npm run build

# Stage 2: serve bằng nginx
FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

# Copy build Vite (dist) vào thư mục static
COPY --from=build /app/dist /usr/share/nginx/html

# Copy config nginx cho client
COPY nginx.client.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]