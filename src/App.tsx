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
