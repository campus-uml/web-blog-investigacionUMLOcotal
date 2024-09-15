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

# Borrar un Artículo por su Id
Para implementar la funcionalidad de borrar un artículo cuando el usuario toca el botón de borrar en cada tarjeta, debes seguir estos pasos:

1. Crear la función de borrado en el servicio (`ArticuloService.tsx`) que haga una solicitud `DELETE` a la API.
2. Añadir el botón de borrar en cada artículo (`ArticleCard.tsx`).
3. Actualizar la lista de artículos después de borrar uno en el componente principal (`App.tsx`).

## Paso 1: Función de Borrado en `ArticuloService.tsx`
En tu archivo de `ArticuloServices.tsx`,  añadir la función para enviar una solicitud `DELETE` a la API que borra el artículo.
```JavaScript
/**
   * FUNCIÓN PARA ELIMINAR UN ARTÍCULO
   */

  export const EliminarArticulo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/blogs/${id}`, {
        method: "DELETE",
      });

      if(!response.ok){
        throw new Error("Error al eliminar el artículo"); // Lanzamos un error si la respuesta no es correcta
      }

      return true; // Retornamos true si se elimina el artículo correctamente

    } catch (error) {
      
      console.error("Error al eliminar el artículo:", error);
      return false; // Retornamos false si hay un error al eliminar el artículo
    }
  };
```

## Paso 2: Añadir la Función de Borrado en el Componente de la Tarjeta de Artículo (`ArticleCard.tsx`)
Ahora, en el componente donde está creada la tarjeta del artículo, pasar una función `onDelete` que recibirá el ID del artículo a eliminar.

```JavaScript
import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md'; // Importamos los iconos de edición y eliminación

const ArticuloCard = ({ articulo, onDelete }) => {
    const { titulo, contenido, fecha, autor } = articulo; // destructuramos el objeto articulo

    // HandleDelete para manejar el borrado del artículo
    const handleDelete = () => {
        // Mostramos un mensaje de confirmación antes de eliminar el artículo
        Swal.fire({
            title: "Estás seguro de eliminar este artículo?",
            text: "No podrás revertir esta acción",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if(result.isConfirmed){
                //Si el usuario confirma la eliminación, llamamos a la función onDelete
                const success = await onDelete(articulo.id); // Llamamos a la función onDelete y le pasamos el id del artículo

                if(success){
                    Swal.fire("Artículo eliminado", "El artículo ha sido eliminado.", "success");
                }else{
                    Swal.fire("Error", "Ha ocurrido un error al eliminar el artículo", "error");
                }//Fin del if anidado
            }//Fin del if principal
        });//Fin del método then
    };// Fin de la función handleDelete

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

                        {/* Agregamos el evento onClick para llamar a la función handleDelete  */}
                        <button className="delete" onClick = {handleDelete}>
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

## Paso 3: Gestionar el Borrado en el Componente Principal (`App.tsx`)
En tu componente principal (`App.tsx`), implementa la función para borrar el artículo usando la función borrarArticulo que creamos en el servicio y luego refrescar la lista de artículos.
```JavaScript
import { useState, useEffect } from 'react'; // Importamos useState y useEffect
import ArticuloCard from './component/ArticuloCard'; // Importamos el componente ArticuloCard
import AgregarArticulo from './component/FormAgregarArticulo'; // Importamos el componente AgregarArticulo
import { fetchArticles, EliminarArticulo } from './services/articuloService'; // Importamos la función getArticulos
import './App.css'

const App = () => {
  const [articulos, setArticulos] = useState([]); // Declaramos el estado articulos y la función setArticulos
  const [mostrarForm, setMostrarForm] = useState(false); // Declaramos el estado mostrarForm y la función setMostrarForm

  // useEffect es un hook que se ejecuta después de que el componente se renderiza
  useEffect(() => {
    const getArticulos = async () => {
      const response = await fetchArticles(); // Llamamos a la función fetchArticles
      setArticulos(response); // Actualizamos el estado articulos con los articulos obtenidos
    };

    getArticulos(); // Llamamos a la función getArticulos

  }, []); // El segundo argumento de useEffect es un array vacío, lo que significa que se ejecutará solo una vez


  // Función para refrescar la lista de los articulos
  const refrescarArticulos = async () => {
    const response = await fetchArticles(); // Llamamos a la función fetchArticles
    setArticulos(response); // Actualizamos el estado articulos con los articulos obtenidos
  }
  
  // Función para eliminar un artículo
  const handleDelete = async (id) =>{
    const success = await EliminarArticulo(id); // Llamamos a la función EliminarArticulo y le pasamos el id del artículo
    if(success){
      await refrescarArticulos(); 
    }

    return success;
  };



  return (

    <div className="container">
      <div className="tituloPpal">
        <h1>Blog Informativo: Universidad Martín Lutero</h1>
      </div>

      <div className="ocultar-formulario-container">

        {/* Botón para mostrar/ocultar el formulario */}
        <button className='ocultar-formulario-btn' onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? "Ocultar formulario" : "Agregar nuevo artículo"}
        </button>


      </div>
        {/* Mostrar el formulario cuando el estado 'mostrarFormulario' sea true */}
        {mostrarForm && <AgregarArticulo onArticleAdded={refrescarArticulos} />}



      <div className="articulos-list">
        {articulos.map((articulo) => ( // Recorremos el array articulos y por cada articulo llamamos al componente ArticuloCard
          <ArticuloCard key={articulo.id} articulo={articulo} onDelete={handleDelete} /> // Pasamos el articulo como prop al componente ArticuloCard
        ))}
      </div>
    </div>
  );
};

export default App
```