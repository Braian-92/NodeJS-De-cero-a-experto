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