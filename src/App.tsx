import { useState, useEffect } from 'react'; // Importamos useState y useEffect
import ArticuloCard from './component/ArticuloCard'; // Importamos el componente ArticuloCard
import AgregarArticulo from './component/AgregarArticulo'; // Importamos el componente AgregarArticulo
import { fetchArticles } from './services/articuloService'; // Importamos la función getArticulos
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const App = () => {
  const [articulos, setArticulos] = useState([]); // Declaramos el estado articulos y la función setArticulos
  const [mostrarForm, setMostrarForm] = useState(false); // Declaramos el estado mostrarForm y la función setMostrarForm

  // useEffect es un hook que se ejecuta después de que el componente se renderiza
  useEffect(() => {
    const getArticulos = async () => {
      const response = await fetchArticles(); // Llamamos a la función fetchgrticles
      setArticulos(response); // Actualizamos el estado articulos con los articulos obtenidos
    };

    getArticulos(); // Llamamos a la función getArticulos

  }, []); // El segundo argumento de useEffect es un array vacío, lo que significa que se ejecutará solo una vez


  // Función para refrescar la lista de los articulos
const refrescarArticulos = async () =>{
  const response = await fetchArticles(); // Llamamos a la función fetchArticles
  setArticulos(response); // Actualizamos el estado articulos con los articulos obtenidos
}



  return (

    <div className="container">
      <div className="tituloPpal">
      <h1>Blog Informativo: Universidad Martín Lutero</h1>

            {/* Botón para mostrar/ocultar el formulario */}
            <button onClick={() => setMostrarForm(!mostrarForm)}>
        {mostrarForm ? "Ocultar formulario" : "Agregar nuevo artículo"}
      </button>

      {/* Mostrar el formulario cuando el estado 'mostrarFormulario' sea true */}
      {mostrarForm && <AgregarArticulo onArticleAdded={refrescarArticulos} />}
        
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
