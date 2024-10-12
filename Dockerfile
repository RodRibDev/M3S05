# Use uma imagem Node.js baseada no Debian
FROM node:18

# Instala dependências do sistema necessárias
RUN apt-get update && apt-get install -y make gcc g++ python3 libpq-dev

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia o arquivo package.json e package-lock.json
COPY package*.json ./

# Instala todas as dependências, incluindo devDependencies
RUN npm install

# Copia todos os arquivos da aplicação para dentro do container
COPY . .

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para rodar o nodemon em desenvolvimento
CMD ["npm", "run", "start:dev"]
