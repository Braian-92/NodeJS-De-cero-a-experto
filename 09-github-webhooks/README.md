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


# EJECUTAR 
npm run dev