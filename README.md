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

# Agregar un Nuevo Artículo
Para implementar la funcionalidad de agregar un nuevo artículo, al hacer clic al notón Agregar Artículo del formulario, debes seguir estos pasos:

1. Dentro de la carpeta `component`, crea un nuevo archivo nombrado `FormAgregarArticulo.tsx`, el cual contendrá el formulario donde se registrarán los datos del nuevo artículo.
2. En el archivo `ArticuloService.tsx`, crear el código que permitirá agregar el nuevo registro.

## Paso 1: Crea el código del archivo `FormAgregarArticulo.tsx`
```JavaScript
import React, { useState } from 'react';
import { AgregarArticulo as agregarArticuloAPI } from '../services/articuloService'; // Importamos la función AgregarArticulo

// FUNCIÓN PARA AGREGAR UN ARTÍCULO
const AgregarArticulo = ({ onArticleAdded }) => {

    //Usamos useState para manejar el estado de los inputs
    const [titulo, setTitulo] = useState(""); // Declaramos el estado titulo y la función setTitulo
    const [contenido, setContenido] = useState(""); // Declaramos el estado contenido y la función setContenido
    const [fecha, setFecha] = useState(""); // Declaramos el estado fecha y la función setFecha
    const [autor, setAutor] = useState(""); // Declaramos el estado autor y la función setAutor

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => { // Recibimos el evento como argumento
        e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario


        if (!titulo || !contenido || !fecha || !autor) {
            alert("Por favor complete todos los campos");
            return;
        }

        // Creamos un objeto con los datos del artículo 
        // que fueron seteados dinámicamente en el formulario con el evento onChange
        const nuevoArticulo = {
            titulo,
            contenido,
            fecha,
            autor
        };

        try {

            // Llamamos a la función AgregarArticulo y le pasamos el nuevo artículo
            const response = await agregarArticuloAPI(nuevoArticulo);

            if (response) {
                alert("Artículo agregado correctamente");
                onArticleAdded(); // Llamamos a la función onArticleAdded para refrescar la lista de artículos
            } else {

                alert("Error al agregar artículo");
            }
        } catch (error) {
            console.error("Error al agregar el artículo:", error);
        }

    // Limpiar el formulario después de agregar el artículo
    setTitulo("");
    setContenido("");
    setFecha("");
    setAutor("");
};
    return (
        // Formulario para agregar un artículo
        <form onSubmit={handleSubmit}>
            <div>
                <label>Título</label>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)} //Actualizamos el estado titulo con el valor del input y lo pasamos al objeto nuevoArticulo;
                    placeholder='Ingrese el título del artículo'
                    required
                />
            </div>
            <div>
                <label>Contenido</label>
                <textarea
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)} //Actualizamos el estado contenido con el valor del input y lo pasamos al objeto nuevoArticulo;
                    placeholder='Contenido del artículo'
                    required
                />
            </div>
            <div>
                <label>Fecha</label>
                <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)} //Actualizamos el estado fecha con el valor del input y lo pasamos al objeto nuevoArticulo;
                    placeholder='Fecha del artículo'
                    required
                />
            </div>
            <div>
                <label>Autor</label>
                <input
                    type="text"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}//Actualizamos el estado autor con el valor del input y lo pasamos al objeto nuevoArticulo;
                    placeholder='Nombre del Autor'
                    required
                />
            </div>

            <button className="agregar-articulo-btn" type='submit'>Agregar Artículo</button>
        </form>
    );
}; //FIN DE LA FUNCIÓN AgregarArticulo

export default AgregarArticulo;

```

## Paso 2: Agrega una nueva función llamada "AgregarArticulo" dentro del archivo `ArticuloService.tsx`

```JavaScript
/**
   * FUNCIÓN PARA AGREGAR UN ARTÍCULO
   */ 
  export const AgregarArticulo = async (articulo) => {
    try {
      const response = await axios.post(API_URL, articulo); // Llamada a la API
      return response.data; // Obtenemos la respuesta en JSON

    } catch (error) {
      console.error("Error al agregar el artículo:", error);
      return null;
    }
  };

```

## Paso 3: Integración del formulario y código de ordenamiento de lista de artículos `App.tsx`

```JavaScript
import { useState, useEffect } from 'react'; // Importamos useState y useEffect
import ArticuloCard from './component/ArticuloCard'; // Importamos el componente ArticuloCard
import AgregarArticulo from './component/FormAgregarArticulo'; // Importamos el componente AgregarArticulo
import { fetchArticles, EliminarArticulo } from './services/articuloService'; // Importamos la función getArticulos
import './App.css'

const App = () => {
  const [articulos, setArticulos] = useState([]); // Declaramos el estado articulos y la función setArticulos
  const [mostrarForm, setMostrarForm] = useState(false); // Declaramos el estado mostrarForm y la función setMostrarForm

  //Función para cargar y ordenar los artículos de manera descendente
  const cargarYOrdenarArticuos = async () => {
    const response = await fetchArticles(); // Llamamos a la función fetchArticles  
    //Ordenamos los artículos por fecha de forma descendente
    const articulosOrdenados = response.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
    setArticulos(articulosOrdenados); // Actualizamos el estado articulos con los articulos obten
  };

   // useEffect es un hook que se ejecuta después de que el componente se renderiza
  useEffect(() => {
    cargarYOrdenarArticuos(); // Llamamos a la función cargarYOrdenarArticuos

  }, []); 

  // Función para refrescar la lista de los articulos
  const refrescarArticulos = async () => {
    await cargarYOrdenarArticuos(); // Llamamos a la función cargarYOrdenarArticuos
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
        {mostrarForm && <AgregarArticulo onArticleAdded={refrescarArticulos} />}{/* onArticleAdded es invocada desde FormAgregarArticulos */}



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


# Borrar un Artículo por su Id
Para implementar la funcionalidad de borrar un artículo cuando el usuario toca el botón de borrar en cada tarjeta, debes seguir estos pasos:

1. Crear la función de borrado en el servicio (`ArticuloService.tsx`) que haga una solicitud `DELETE` a la API.
2. Añadir el botón de borrar en cada artículo (`ArticuloCard.tsx`).
3. Actualizar la lista de artículos después de borrar uno en el componente principal (`App.tsx`).

## Paso 1: Función de Borrado en `ArticuloService.tsx`
En tu archivo de `ArticuloServices.tsx`,  añadir la función para enviar una solicitud `DELETE` a la API que borra el artículo.
```JavaScript
import axios from 'axios';

// Constante con la URL de la API
const API_URL = 'http://localhost:3000/blogs';

/** 
 * FUNCIÓN PARA OBTENER LOS ARTÍCULOS
 */

export const fetchArticles = async () => {
    try {
      const response = await axios.get(API_URL); // Llamada a la API
      return response.data; // Obtenemos la respuesta en JSON
    } catch (error) {
      console.error("Error al obtener los artículos:", error);
      return [];
    }
  };
  
  /**
   * FUNCIÓN PARA AGREGAR UN ARTÍCULO
   */ 
  export const AgregarArticulo = async (articulo) => {
    try {
      const response = await axios.post(API_URL, articulo); // Llamada a la API
      return response.data; // Obtenemos la respuesta en JSON

    } catch (error) {
      console.error("Error al agregar el artículo:", error);
      return null;
    }
  };

  /**
   * FUNCIÓN PARA ELIMINAR UN ARTÍCULO
   */

  export const EliminarArticulo = async (id) => {
    try {

      const response = await axios.delete(`${API_URL}/${id}`); // Llamada a la API
      return true;// Retornamos true si se elimina el artículo correctamente
    } catch (error) {
      
      console.error("Error al eliminar el artículo:", error);
      return false; // Retornamos false si hay un error al eliminar el artículo
    }
  };
```

## Paso 2: Añadir la Función de Borrado en el Componente de la Tarjeta de Artículo (`ArticuloCard.tsx`)
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

# Editar un artículo
Creación de funcionalidad para editar un artículo, utilizando el mismo formulario con que se cuenta para agregar un nuevo artículo. Además, se conseguirá que el formulario aparezca flotando en primer plano cuando se abra para editar un artículo.
1. Agregar función de "ActualizarArticulo" en componente `ArticuloService.tsx`
2. Modificar código del componente `-FormAgregarArticulo` para aceptar el artículo a editar.
3. Modificar el componente `ArticuloCard` para incluir al botón Editar, la función correspondiente.
4. Modificar `App.js` para manejar la edición y mostrar el formulario flotante.
5. Código CSS para hacer el formulario flotante.

## 1. Paso 1: Agregar función de "ActualizarArticulo" en componente `ArticuloService.tsx`
```JavaScript
import axios from 'axios';

// Constante con la URL de la API
const API_URL = 'http://localhost:3000/blogs';

/** 
 * FUNCIÓN PARA OBTENER LOS ARTÍCULOS
 */

export const fetchArticles = async () => {
    try {
      const response = await axios.get(API_URL); // Llamada a la API
      return response.data; // Obtenemos la respuesta en JSON
    } catch (error) {
      console.error("Error al obtener los artículos:", error);
      return [];
    }
  };
  
  /**
   * FUNCIÓN PARA AGREGAR UN ARTÍCULO
   */ 
  export const AgregarArticulo = async (articulo) => {
    try {
      const response = await axios.post(API_URL, articulo); // Llamada a la API
      return response.data; // Obtenemos la respuesta en JSON

    } catch (error) {
      console.error("Error al agregar el artículo:", error);
      return null;
    }
  };

/** 
 * FUNCION PARA ACTUALIZAR UN ARTÍCULO
 */
  export const ActualizarArticulo = async (id, articulo) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, articulo); // Llamada a la API
      return response.data; // Obtenemos la respuesta en JSON
    } catch (error) {
      console.log("Error al actualizar el artículo:", error);
      return null;
    }
  }

  /**
   * FUNCIÓN PARA ELIMINAR UN ARTÍCULO
   */

  export const EliminarArticulo = async (id) => {
    try {

      const response = await axios.delete(`${API_URL}/${id}`); // Llamada a la API
      return true;// Retornamos true si se elimina el artículo correctamente
    } catch (error) {
      
      console.error("Error al eliminar el artículo:", error);
      return false; // Retornamos false si hay un error al eliminar el artículo
    }
  };
```
## 2. Paso 2: Modificar el formulario para aceptar el artículo a editar
Vamos a modificar el componente `FormAgregarArticulo` para que acepte un prop llamado "articuloEditar". Si este prop está presente, el formulario rellenará sus campos con los datos del artículo que se va a editar.

`FormAgregarArticulo.js`:
```JavaScript
import React, { useState, useEffect } from 'react';
import { AgregarArticulo as agregarArticuloAPI, ActualizarArticulo as ActualizarArticuloAPI } from '../services/articuloService'; // Importamos la función AgregarArticulo

// FUNCIÓN PARA EDITAR O AGREGAR UN ARTÍCULO
const AgregarArticulo = ({ onArticleAdded, articuloEditar, onCancel }) => {// onCancel sirve para cancelar la edición de un artículo

    //Usamos useState para manejar el estado de los inputs
    const [titulo, setTitulo] = useState(""); // Declaramos el estado titulo y la función setTitulo
    const [contenido, setContenido] = useState(""); // Declaramos el estado contenido y la función setContenido
    const [fecha, setFecha] = useState(""); // Declaramos el estado fecha y la función setFecha
    const [autor, setAutor] = useState(""); // Declaramos el estado autor y la función setAutor


    //Usaremos useEffect para rellenar los campos del formulario cuando se edite un artículo
    useEffect(() => {
        if (articuloEditar) {
            setTitulo(articuloEditar.titulo);
            setContenido(articuloEditar.contenido);
            setFecha(articuloEditar.fecha);
            setAutor(articuloEditar.autor);
        }
    }, [articuloEditar]);//El arreglo articuloEditar es una dependencia que se ejecuta cuando cambia el estado articuloEditar



    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => { // Recibimos el evento como argumento
        e.preventDefault(); // Prevenimos el comportamiento por defecto del formulario


        if (!titulo || !contenido || !fecha || !autor) {
            alert("Por favor complete todos los campos");
            return;
        }

        // Creamos un objeto con los datos del artículo 
        // que fueron seteados dinámicamente en el formulario con el evento onChange
        const nuevoArticulo = {
            titulo,
            contenido,
            fecha,
            autor
        };

        try {

            if (articuloEditar) {
                // Si hay un artículo para editar, actualizamos el artículo
                const response = await ActualizarArticuloAPI(articuloEditar.id, nuevoArticulo);
                if (response) {
                    alert("Artículo actualizado correctamente");
                    onArticleAdded(); // Llamamos a la función onArticleAdded para refrescar la lista de artículos
                } else {
                    alert("Error al actualizar el artículo");
                }
            } else {
                // Llamamos a la función AgregarArticulo y le pasamos el nuevo artículo
                const response = await agregarArticuloAPI(nuevoArticulo);
                if (response) {
                    alert("Artículo agregado correctamente");
                    onArticleAdded(); // Llamamos a la función onArticleAdded para refrescar la lista de artículos
                } else {

                    alert("Error al agregar artículo");
                }
            }
        } catch (error) {
            console.error("Error al agregar o actualizar el artículo:", error);
        }

        // Limpiar el formulario después de agregar el artículo
        setTitulo("");
        setContenido("");
        setFecha("");
        setAutor("");
        onCancel(); // Llamamos a la función onCancel para ocultar el formulario
    };
    return (
        // Formulario para agregar un artículo
        <div className="form-flotante">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Título</label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)} //Actualizamos el estado titulo con el valor del input y lo pasamos al objeto nuevoArticulo;
                        placeholder='Ingrese el título del artículo'
                        required
                    />
                </div>
                <div>
                    <label>Contenido</label>
                    <textarea
                        value={contenido}
                        onChange={(e) => setContenido(e.target.value)} //Actualizamos el estado contenido con el valor del input y lo pasamos al objeto nuevoArticulo;
                        placeholder='Contenido del artículo'
                        required
                    />
                </div>
                <div>
                    <label>Fecha</label>
                    <input
                        type="date"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)} //Actualizamos el estado fecha con el valor del input y lo pasamos al objeto nuevoArticulo;
                        placeholder='Fecha del artículo'
                        required
                    />
                </div>
                <div>
                    <label>Autor</label>
                    <input
                        type="text"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}//Actualizamos el estado autor con el valor del input y lo pasamos al objeto nuevoArticulo;
                        placeholder='Nombre del Autor'
                        required
                    />
                </div>

                <button className="agregar-articulo-btn" type='submit'>{articuloEditar ? 'Actualizar Artículo' : 'Agregar Articulo'}</button>
                <button className="cancelar-articulo-btn" type='button' onClick={onCancel}>Cancelar</button>
            </form>
        </div>
    );
}; //FIN DE LA FUNCIÓN AgregarArticulo

export default AgregarArticulo;

```
## 3. Paso 3: Modificar el componente `ArticuloCard` para incluir al botón Editar, la función correspondiente.
```JavaScript
import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md'; // Importamos los iconos de edición y eliminación
import Swal from 'sweetalert2'; // Importamos sweetalert2 para mostrar alertas en pantalla

const ArticuloCard = ({ articulo, onDelete, onEdit }) => {
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

    //HandleEdit para manejar la edición del artículo
    const handleEdit = () => {
        onEdit(articulo); // Llamamos a la función onEdit y le pasamos el artículo
    }

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
                        <button className="edit" onClick={handleEdit}>
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
## 4. Paso 4: Modificar `App.js` para manejar la edición y mostrar el formulario flotante.
En el componente `App.js`, vamos a añadir un estado para controlar qué artículo está siendo editado y mostrar el formulario flotando cuando se presione Editar.
```JavaScript
import { useState, useEffect } from 'react'; // Importamos useState y useEffect
import ArticuloCard from './component/ArticuloCard'; // Importamos el componente ArticuloCard
import AgregarArticulo from './component/FormAgregarArticulo'; // Importamos el componente AgregarArticulo
import { fetchArticles, EliminarArticulo } from './services/articuloService'; // Importamos la función getArticulos
import './App.css'

const App = () => {
  const [articulos, setArticulos] = useState([]); // Declaramos el estado articulos y la función setArticulos
  const [mostrarForm, setMostrarForm] = useState(false); // Declaramos el estado mostrarForm y la función setMostrarForm
  const [articuloEditar, setArticuloEditar] = useState(null); // Declaramos el estado articuloEditar y la función setArticuloEditar

  //Función para cargar y ordenar los artículos de manera descendente
  const cargarYOrdenarArticuos = async () => {
    const response = await fetchArticles(); // Llamamos a la función fetchArticles  
    //Ordenamos los artículos por fecha de forma descendente
    const articulosOrdenados = response.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); //sort(a, b) significa que si el resultado es negativo, a va antes que b, si es positivo, b va antes que a
    setArticulos(articulosOrdenados); // Actualizamos el estado articulos con los articulos obten
  };

  // useEffect es un hook que se ejecuta después de que el componente se renderiza
  useEffect(() => {
    cargarYOrdenarArticuos(); // Llamamos a la función cargarYOrdenarArticuos para cargar y ordenar los artículos

  }, []);

  // Función para refrescar la lista de los articulos
  const refrescarArticulos = async () => {
    await cargarYOrdenarArticuos(); // Llamamos a la función cargarYOrdenarArticuos
  }

  // Función para eliminar un artículo
  const handleDelete = async (id) => {
    const success = await EliminarArticulo(id); // Llamamos a la función EliminarArticulo y le pasamos el id del artículo
    if (success) {
      await refrescarArticulos();
    }

    return success;
  };

  /* AGREGAMOS HANDLEEDIT Y HANDLECANCEL PARA EDITAR Y CANCELAR EL FORMULARIO. */
  const handleEdit = (articulo) => { // El prop articulo es el artículo que se va a editar y viene del componente ArticuloCard
    setArticuloEditar(articulo); // Actualizamos el estado articuloEditar con el artículo a editar
    setMostrarForm(true); // Mostramos el formulario
  };

  const handleCancel = () => {
    setMostrarForm(false); // Ocultamos el formulario
    setArticuloEditar(null); // Reseteamos el estado articuloEditar
  }

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

      {mostrarForm && (
        <AgregarArticulo
          onArticleAdded={refrescarArticulos} //onArticleAdded es invocada desde FormAgregarArticulos
          articuloEditar={articuloEditar} // Pasamos el artículo a editar como prop al componente AgregarArticulo
          onCancel={handleCancel} // Pasamos la función handleCancel como prop al componente AgregarArticulo
        />
      )}

      <div className="articulos-list">
        {articulos.map((articulo) => ( // Recorremos el array articulos y por cada articulo llamamos al componente ArticuloCard
          <ArticuloCard key={articulo.id} articulo={articulo} onDelete={handleDelete} onEdit={handleEdit} /> // Pasamos el articulo como prop al componente ArticuloCard
        ))}
      </div>
    </div>
  );
};

export default App
```
## 5. Paso 5: Código CSS del archivo `App.css` para todo el proyecto.
```CSS
/* General card styling */
.article-card {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.articulos-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 50%;
  margin: auto;
}

/* Header of the card */
.article-card-header {
  display: flex;
  justify-content: space-between; /* Alinea el título a la izquierda y la fecha a la derecha */
  align-items: center;
  margin-bottom: 10px;
}

/* Título principal */
.container .tituloPpal{
  font-size: 1.5em;
  gap: 20px;
  color: #007bff;
  font-weight: 600;
  text-align: center;
  padding: 10px;
  margin: auto;
  background-color: aqua;
  border-radius: 10px;
  width: 50%;
  margin-bottom: 20px;
}

.article-card-header h2 {
  color: #007bff;
  font-size: 1.2em;
  font-weight: 600;
  margin: 0;
}
.article-card-header img {
border-radius: 50px;
margin: 10px;
}

/* Fecha al lado derecho */
.article-date {
  font-size: 1.2em;
  color: #474646cb;
  white-space: nowrap; /* Evita que se divida la fecha en dos líneas */
}

/* Description styling */
.article-card-description p {
  font-size: 1em;
  color: #333;
  line-height: 1.5em;
}

/* Footer section */
.article-card-footer {
  display: flex;
  justify-content: space-between; /* Alinea los botones a la izquierda y el autor a la derecha */
  align-items: center;
  margin-top: 10px;
}


/* Buttons for edit/delete */
.article-actions {
  display: flex;
  gap: 10px;
}

.article-actions button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5em;
  color: #007bff;
  transition: color 0.3s ease;
}

/* Botón Editar */
.article-actions button.edit {
  color: orange; /* Color naranja para el botón de editar */
}

.article-actions button.edit:hover {
  color: rgb(124, 72, 8); /* Cambia el color al pasar el mouse */
}

/* Botón Borrar */
.article-actions button.delete {
  color: red; /* Color rojo para el botón de borrar */
}

.article-actions button.delete:hover {
  color: darkred; /* Cambia el color al pasar el mouse */
}

.article-actions button:hover {
  color: #0056b3;
}

/* Autor al lado derecho */
.article-author {
  font-size: 1.2em;
  color: #666;
  white-space: nowrap; /* Evita que se divida el autor en dos líneas */
}

/* Estilo general del formulario */
form {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Espaciado entre los elementos del formulario */
}

/* Estilos para los labels */
form label {
  font-weight: bold;
  margin-bottom: 5px; /* Espacio entre el label y el input */
  display: block;
  color: #333;
}

/* Estilo para los campos de input */
form input, form textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  margin-bottom: 10px;
  box-sizing: border-box; /* Asegura que el padding no afecte el ancho del input */
  transition: border-color 0.3s ease;
}

/* Estilos para los campos al hacer foco */
form input:focus, form textarea:focus {
  border-color: #007bff; /* Cambia el color del borde al hacer foco */
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5); /* Sombra suave al hacer foco */
}

/* Estilo para el textarea (campo de contenido) */
form textarea {
  height: 150px;
  resize: vertical; /* Permite ajustar el tamaño vertical del textarea */
}

/* Botón de enviar */
form button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

form button:hover {
  background-color: #218838;
}

form button:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(40, 167, 69, 0.5);
}

/* Estilos para centrar el botón */
.ocultar-formulario-container {
  display: flex;
  justify-content: center; /* Centra el botón horizontalmente */
  margin-bottom: 20px; /* Espacio debajo del botón */
}

/* Botón de Ocultar Formulario */
.ocultar-formulario-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.ocultar-formulario-btn:hover {
  background-color: #0056b3;
}

.ocultar-formulario-btn:focus {
  outline: none;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Botón de Agregar Artículo */
.agregar-articulo-btn {
  background-color: #28a745; /* Color de fondo verde */
  color: white; /* Color del texto blanco */
  border: none; /* Elimina el borde predeterminado */
  padding: 10px 20px; /* Espaciado interno del botón */
  border-radius: 5px; /* Bordes redondeados */
  font-size: 16px; /* Tamaño de la fuente */
  cursor: pointer; /* Cursor cambia a pointer cuando se pasa sobre el botón */
  transition: background-color 0.3s ease; /* Transición suave cuando cambia de color */
  margin-top: 20px; /* Espacio superior */
}
/* Botón de Cancelar Artículo */
.cancelar-articulo-btn {
  background-color: #d60700; /* Color de fondo verde */
  
  color: white; /* Color del texto blanco */
  border: none; /* Elimina el borde predeterminado */
  padding: 10px 20px; /* Espaciado interno del botón */
  border-radius: 5px; /* Bordes redondeados */
  font-size: 16px; /* Tamaño de la fuente */
  cursor: pointer; /* Cursor cambia a pointer cuando se pasa sobre el botón */
  transition: background-color 0.3s ease; /* Transición suave cuando cambia de color */
  margin-top: 20px; /* Espacio superior */
}

.agregar-articulo-btn:hover {
  background-color: #218838; /* Color más oscuro al pasar el mouse */
}

.agregar-articulo-btn:focus {
  outline: none; /* Elimina el borde de enfoque predeterminado */
  box-shadow: 0 0 5px rgba(40, 167, 69, 0.5); /* Sombra cuando está en foco */
}

.cancelar-articulo-btn:hover {
  outline: none; /* Elimina el borde de enfoque predeterminado */
  box-shadow: 0 0 5px rgba(145, 4, 4, 0.5); /* Sombra cuando está en foco */
}

/* Estilos para el formulario flotante */
.form-flotante {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index: 1000;
  width: 90%; /* Ajustamos el ancho a 90% para pantallas pequeñas */
  max-width: 600px; /* Máximo ancho para pantallas grandes */
  min-width: 300px; /* Establecemos un ancho mínimo */
  max-height: 90vh; /* Limita la altura del formulario */
  overflow-y: auto; /* Habilita el scroll dentro del formulario si es necesario */
}


/* Ajustamos los botones en el formulario */
.form-flotante button {
  margin-right: 10px;
  padding: 8px 16px;
}

```

### Imágenes de las Card

![](./assets/VistasCard.png)