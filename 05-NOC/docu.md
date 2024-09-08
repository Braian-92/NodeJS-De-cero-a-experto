npm init -y

https://gist.github.com/Klerith/3ba17e86dc4fabd8301a59699b9ffc0b


Instalar TypeScript y demás dependencias
npm i -D typescript @types/node ts-node-dev rimraf

Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto)
npx tsc --init --outDir dist/ --rootDir src

Crear scripts para dev, build y start (Más sobre TS-Node-dev aquí)
  "dev": "tsnd --respawn --clear src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"

En el archivo tsconfig.json

"exclude": [
  "node_modules",
  "dist"
],
"include": [
  "src"
]


https://www.npmjs.com/package/cron

npm i cron

## se ejecuta el cron desde 
npm run dev 



## instalar dotenv

https://www.npmjs.com/package/dotenv
npm i dotenv

## instalar env-var (validador de .env)
https://www.npmjs.com/package/env-var
npm i env-var


## configurar mail de gmail
https://myaccount.google.com/security
https://myaccount.google.com/u/0/apppasswords

## instalar nodemailer
https://www.npmjs.com/package/nodemailer
npm i nodemailer
docu: https://nodemailer.com/about/

## como nodemailer no esta echo en ts se bajas las definiciones
npm i --save-dev @types/nodemailer

## enviar adjuntos en nodemailer docu
https://nodemailer.com/message/attachments/


## dockerhub mongo
https://hub.docker.com/_/mongo

# ejecutar
docker compose up
docker compose up -d (sin impreciones del contenedor)

# para conectarse a la BD utilizar por ejemplo

https://www.mongodb.com/products/tools/compass

para poner las credenciales ir a advanced conection options y al apartado de Authentication para poner usuario y contraseña admin-admin

# tambien se puede tomar la cadena de conexion desde la parte superior
mongodb://admin:admin@localhost:27017/

# instalar mongoose
https://mongoosejs.com/docs/index.html

npm install mongoose --save

CTRL + R = recargar MongoDB Compass

# instalar postgres
https://hub.docker.com/_/postgres

# instalar prisma (integrar bd postgres en node)
https://www.prisma.io/docs/orm/tools/prisma-cli#installation

npm install prisma --save-dev

npx prisma init --datasource-provider PostgreSQL


se va a generar el ejemplo del env en el .env
y se va a generar la carpeta prosma y hay que colocar el nombre que elejimos con en link de la conexion y las credenciales
05-NOC\prisma\schema.prisma

POSTGRES_URL="postgresql://postgres:123456@localhost:5432/NOC"


npx prisma migrate dev --name init

####### IMPORTANTE PRISMA ###### 
para inicializarlo si se borra 
npx prisma generate
npm prisma migrate dev

## TESTING 

npm install -D jest @types/jest ts-jest supertest

npx jest --init
colcar cuando consulte: yes, yes, nodes, yes, v8, no

el archivo tendria que quedar tal cual de esta manera

jest.config.ts

###################
import type {Config} from 'jest';

const config: Config = {
  collectCoverage: true,
  coverageProvider: "v8",
  testEnvironment: 'node',  
  preset: 'ts-jest'
};

export default config;

###################

agregar los scripts

"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage",
