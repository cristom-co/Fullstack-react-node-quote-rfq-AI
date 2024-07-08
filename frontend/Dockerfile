# Etapa 1: Construcción de la aplicación React
FROM node:14 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Etapa 2: Servir la aplicación con nginx
FROM nginx:alpine

# Copia los archivos construidos de React a la carpeta html de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto de nginx
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
