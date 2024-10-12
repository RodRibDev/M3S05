# Use uma imagem base oficial do Node.js
FROM node:18

# Instala dependências do sistema necessárias
RUN apk add --no-cache make gcc g++ python3 postgresql-dev

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia o arquivo package.json e package-lock.json
COPY package*.json ./

# Instala todas as dependências (incluindo as dev)
RUN npm install

# Copia todos os arquivos da aplicação para dentro do container
COPY . .

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para rodar o nodemon em desenvolvimento
CMD ["npm", "run", "start:dev"]
