npm init -y


DOCU: https://gist.github.com/Klerith/3ba17e86dc4fabd8301a59699b9ffc0b


* Instalar TypeScript y demás dependencias
npm i -D typescript @types/node ts-node-dev rimraf

* Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto)

npx tsc --init --outDir dist/ --rootDir src

* Crear scripts para dev, build y start

  "dev": "tsnd --respawn --clear src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"

######## EJECUTAR ########
npm run dev

abrir el servidor en 
http://localhost:8080/

## crear certificados openssl
//! recordar poner la consola en el directorio donde esta el proyecto ya que generara los archivos donde se encuentre alojado el actual CD

en powershel al tenes instalado git colocar "openssl"
si no aparece nada como si no estuviera activado buscar en inicio env
INICIO -> buscar 'env' -> variables de entorno
-> editar el que dice 'path'

buscar el archivo en donde esta instalado el openssl de git en mi caso:

C:\Program Files\Git\usr\bin\openssl.exe
y agregar en path el siguiente directorio
C:\Program Files\Git\usr\bin\

--> guardar cambios, cerrar el powershel y volverlo a abrir y ejecutar "openssl" para verificar que ya este funcionando

## ahora pegar el siguiente comando

openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt

nos pregunta el pais: AR
cual es el estado: BUENOS AIRES
etc. etc.

ahora se puede ingresar al sitio por
https://localhost:8080/

############## INSTALAR EXPRESS ##############
https://expressjs.com/
npm install express


### instalar tipado de expres en ts ###
npm i --save-dev @types/express

el servidor correra sobre
http://localhost:3000/


######### opcional instalar htt-server GLOBAL #####
//! abrir la consola como admin
npm i -g http-server


ya que los .env no se guardan en el repo cambiar el 

.env.templete por el .env

######### INSTALAR dotenv ######### (interpretador de variables de entorno)
npm i dotenv env-var