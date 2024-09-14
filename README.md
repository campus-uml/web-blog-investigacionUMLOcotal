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

## Añadir axios y sweetalert (axios para conectar a la API y sweetalert para mostrar ventanas de alertas)

```Bash
npm install axios sweetalert2
```

## Instalar una libreria de iconos para añadir interactividad en la app.
```Bash
npm install react-icons
```
# Creando archivos necesarios para mostrar lista de artículos académicos.
## Archivos que se necesitarán:
1. `App.js` o `App.tsx` (Archivo principal)
2. `src/components/ArticleCard.js` (Componente que representa cada "Card" de un artículo)
3. `src/services/articleService.js` (Para hacer la llamada a la API que trae los artículos) 

## 1. Archivo `src/App.tsx`
Este archivo es el punto de entrada y manejará la lógica de obtención de los artículos y su presentación en la interfaz.

```tsx

import { useState, useEffect } from 'react'; // Importamos useState y useEffect
import ArticuloCard from './component/ArticuloCard'; // Importamos el componente ArticuloCard
import { fetchArticles } from './services/articuloService'; // Importamos la función getArticulos
import './App.css'

const App = () => {
  const [articulos, setArticulos] = useState([]); // Declaramos el estado articulos y la función setArticulos

  // useEffect es un hook que se ejecuta después de que el componente se renderiza
  useEffect(() => {
    const getArticulos = async () => {
      const response = await fetchArticles(); // Llamamos a la función fetchgrticles
      setArticulos(response); // Actualizamos el estado articulos con los articulos obtenidos
    };

    getArticulos(); // Llamamos a la función getArticulos

  }, []); // El segundo argumento de useEffect es un array vacío, lo que significa que se ejecutará solo una vez


  return (

    <div className="container">
      <div className="tituloPpal">
        <h1>Blog Informativo: Universidad Martín Lutero</h1>
      </div>
      <div className="articulos-list">
        {articulos.map((articulo) =>( // Recorremos el array articulos y por cada articulo llamamos al componente ArticuloCard
          <ArticuloCard key={articulo.id} articulo={articulo} /> // Pasamos el articulo como prop al componente ArticuloCard
        ))}
      </div>
    </div>
  );
};

export default App

```

## 2. Archivo `src/components/ArticleCard.js`
Aquí definimos el componente "Card" que representa cada artículo. Este componente recibirá la información de cada artículo como props y la mostrará.

```tsx
import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md'; // Importamos los iconos de edición y eliminación

const ArticuloCard = ({ articulo }) => {
    const { titulo, contenido, fecha, autor } = articulo; // destructuramos el objeto articulo

    return (
        <>
            <div className="article-card">
                <div className="article-card-header">
                        <h2>{titulo}</h2>
                    <span className="article-date">{new Date(fecha).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                    })}</span>
                </div>

                <div className="article-card-description">
                    <p>{contenido}</p>
                </div>

                <div className="article-card-footer">
                    <div className="article-actions">
                        <button className="edit">
                            <MdEdit />
                        </button>
                        <button className="delete">
                            <MdDelete />
                        </button>
                    </div>
                    <span className="article-author">Autor: {autor}</span>
                </div>
            </div>
        </>
    );
};

export default ArticuloCard;

```


## 3. Archivo `src/services/articleService.js`
Este archivo contendrá la lógica para hacer la llamada a la API para obtener los artículos. Suponiendo que ya tienes una API que devuelve un array de artículos desde la base de datos.

```tsx
export const fetchArticles = async () => {
    try {
      const response = await fetch("http://localhost:3000/blogs"); // Llamada a la API
      const data = await response.json(); // Obtenemos la respuesta en JSON
      return data;
    } catch (error) {
      console.error("Error al obtener los artículos:", error);
      return [];
    }
  };
  
```