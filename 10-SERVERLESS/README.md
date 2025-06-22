# iniciar proyecto

npm init -y

https://gist.github.com/Klerith/3ba17e86dc4fabd8301a59699b9ffc0b

# Typescrip conf

1. Instalar TypeScript y demás dependencias
npm i -D typescript @types/node ts-node-dev rimraf

2. Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto)
npx tsc --init --outDir dist/ --rootDir src

3. Crear scripts para dev, build y start

"dev": "tsnd --respawn --clear src/app.ts",
"build": "rimraf ./dist && tsc",
"start": "npm run build && node dist/app.js"


# utilizar netlify para ejecutar funciones sin tener que tener un servidor corriendo por hora

https://www.netlify.com/ (registrarse)
https://docs.netlify.com/cli/get-started/

npm install -g netlify-cli (-g de instalación global, como es global lo realizo desde el cmd como administrador)

# validar instalación (cmd)
netlify --version

# loguearse - te redirige al navegador y valida tu cuenta (cmd)
netlify login 


# instalar funciones (consola editor)

npm install @netlify/functions

##########################################
# fix version nueva rota
npm install netlify-cli@17.35.0
##########################################


# crear el siguiente archivo para la FN

netlify/functions/hello/hello.mts //! "m"ts es de "modulo" typescript


# ejecutar
npm run netlify:dev


# tendria que funcionar es este link

http://localhost:8888/.netlify/functions/hello