# NodeJS-De-cero-a-experto

-- instalar node
node -v
--> v21.7.2
-- establecer informacion en git

git config --global user.name "Braian-92"
git config --global user.email "zamudiobraianhernan@gmail.com"

-- instalar en docker

docker pull mongo:6.0.6
docker pull postgres:153

-- node version manager
https://github.com/nvm-sh/nvm
https://github.com/coreybutler/nvm-windows/releases
--> nvm-setup.exe
 - ejemplo -
nvm install 10
nvm use 10

-- utilizar node desde la consola (ejemplo shell)
node
--> luego permite escribir js
salir terminal = ctrl + c 

-- ejecutar archivos js desde consola den visual studio code
node app.js / node app
-> sale el log

----------- 02 BASES -----------
npm init

-- instalar nodemon 
https://www.npmjs.com/package/nodemon
-- version que no es total para toda la pc 2da
npm install -D nodemon 
-D = dependencias de desarrollo

-- instalar terminal hyper
https://github.com/vercel/hyper/releases/download/v3.4.1/Hyper-Setup-3.4.1.exe

https://www.npmjs.com/package/uuid
npm i uuid
https://www.npmjs.com/package/get-age
npm i get-age

-- AXIOS request http
https://www.npmjs.com/package/axios
npm i axios

-- winston api logs en el ftp
https://www.npmjs.com/package/winston
npm i winston

-- typescript
npm init -y

npx nodemon src/app

-- instalar ts
https://gist.github.com/Klerith/47af527da090043f604b972b22dd4c01

Node con TypeScript - Recomendado
1. Instalar TypeScript y demás dependencias
npm i -D typescript @types/node ts-node nodemon rimraf
2. Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto)
npx tsc --init --outDir dist/ --rootDir src
3. Crear archivo de configuración Nodemon - nodemon.json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "npx ts-node ./src/app.ts"
}
4. Crear scripts para dev, build y start
  "dev": "nodemon",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"

-- seguimiento de archivo compilado
npx nodemon dist/app

ctrl + . = para importar dependencias utilizadas pero no integradas

-- TESTING --
-- instalar jest
https://gist.github.com/Klerith/98d7b1bc0f1525e892f260813cad1007
https://jestjs.io/docs/getting-started
-- Instalaciones de desarrollo (super test es útil para probar Express)
npm install -D jest @types/jest ts-jest supertest
## ERROR ##
por algun motivo reinstale esto para que funciona 
npm install ts-node typescript --save-dev
## FIN ERROR ##
-- Crear archivo de configuración de Jest
npx jest --init
-- En el archivo jest.config.js configurar
### inicio archivo
preset: 'ts-jest',
testEnvironment: "jest-environment-node",

// Opcional - The paths to modules that run some code to configure or set up the testing environment before each test
// setupFiles: ['dotenv/config'],
### FIN inicio archivo
-- Crear scripts en el package.json
"test": "jest",
"test:watch": "jest --watch",
"test:coverage": "jest --coverage",

-- verificar test completo
npm run test:coverage

-- incluciones y excluciones en build del tsconfig.json
## cod fragmento##
"include":["src/**/*"],
  "exclude":["node_modules", "**/*.spec.ts", "**/*.test.ts"],
## FIN cod fragmento##

-- instalar rimraf
npm i --save-dev rimraf


################# MULTIPLICATION #################
npm init -y
-- instalar dependencias
* 1 Instalar TypeScript y demás dependencias
npm i -D typescript @types/node ts-node nodemon rimraf
* 2 Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto)
npx tsc --init --outDir dist/ --rootDir src       (lo ejecute 2 veces para que me cree tsconfig.json)
* 3 Crear archivo de configuración Nodemon - nodemon.json
{
  "watch": ["src"],
  "ext": ".ts,.js",
  "ignore": [],
  "exec": "npx ts-node ./src/app.ts"
}
* 4 Crear scripts para dev, build y start
"dev": "nodemon",
"build": "rimraf ./dist && tsc",
"start": "npm run build && node dist/app.js"

---------
cd {proyecto directorio}
npm run dev -- ejecuta "dev": "nodemon",

-- envio de variables 
node dist/app.js -cantidad=100
recibidas en 
process.argv
## SALIDA ##
'C:\\Program Files\\nodejs\\node.exe',
'C:\\xampp\\htdocs\\GITHUB\\NodeJS-De-cero-a-experto\\04-multiplication\\dist\\app.js',
'-cantidad=100'
## FIN SALIDA ##

-- instalación yargs
https://www.npmjs.com/package/yargs
npm i --save-dev @types/yargs