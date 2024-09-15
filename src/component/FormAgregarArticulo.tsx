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