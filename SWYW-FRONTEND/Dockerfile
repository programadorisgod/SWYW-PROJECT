# 1. Construcción de la app
FROM node:24-alpine AS build

# Establecer directorio de trabajo
WORKDIR /app

# Copiar package.json e instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el código y generar el build
# Declarar los argumentos de build
ARG VITE_API_AUTH
ARG VITE_API_NOTES
RUN echo "Auth API: $VITE_API_AUTH" && echo "Notes API: $VITE_API_NOTES"

# Pasarlos como variables de entorno para que Vite los detecte ya que trabajamos con Nginix
ENV VITE_API_AUTH=${VITE_API_AUTH}
ENV VITE_API_NOTES=${VITE_API_NOTES}

COPY . .
RUN npm run build

# 2. Servir con Nginx
FROM nginx:alpine

# Copiar los archivos de build al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/default.conf /etc/nginx/conf.d/

# Exponer puerto 80
EXPOSE 80

# Arrancar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
