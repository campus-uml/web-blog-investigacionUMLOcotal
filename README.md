# Inicio de proyecto de Web App para consumir datos de la API de articulos académicos.

## Descripción

Este proyecto tiene como objetivo desarrollar una API para gestionar una base de datos de artículos académicos. La API facilitará la creación, edición, eliminación y consulta de tareas relacionadas con dichos artículos.

## Tecnologías
- React
- TypeScript
- Vite

## Crear el Proyecto para la Web App
Crea una carpeta nueva en cualquier lugar de tu PC, renombrarla con el nombre del proyecto, luego ingresa a ella y abre una consola, luego ejecuta el siguiente comando:
```CreatingProyect
npm create vite@latest web-app-para-notas -- --template react-ts

```
### Si todo va bien, aparecerá el siguiente código en tu consola:
```DoneCode
Done. Now run:

cd web-app-blog
npm install
npm run dev

```

- Si todo va bien este es el resultado. En caso de solicitar la instalación de vite@latest presionar la letra `y` o `Enter`. Luego el proceso continuará.
- Ejecutar luego los dos primeros comandos que salen sugeridos en la consola

```SuggestCode

cd web-app-blog
npm install

```

## Agregar TailwindCSS como framework de diseño css

```AddTaiwindcss
npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p

```

## Abrir el proyecto en Visual Studio Code y modificar el archivo `tailwind.config.js` reemplazando el codigo existente con el siguiente:

```JavaScript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```

## Añadir las directivas de TailwindCSS al fichero `/src/index.css` reemplazando todo el código con el siguiente:
```CSS
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Reemplazar el contenido del archivo `index.html` con el siguiente
```HTML
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link
      rel="icon"
      type="image/svg+xml"
      href="/vite.svg" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0" />
    <title>CRUD para gestion de tareas</title>
  </head>
  <body class="flex items-start justify-center h-screen mt-2 bg-slate-900">
    <div
      id="root"
      class="w-full"></div>
    <script
      type="module"
      src="/src/main.tsx"></script>
  </body>
</html>

```



Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
