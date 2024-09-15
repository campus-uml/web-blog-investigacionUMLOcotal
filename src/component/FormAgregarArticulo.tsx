import React from 'react';
import { useState } from 'react'; // Importamos useState
/* import { AgregarArticulo } from '../services/articuloService'; */// Importamos la función AgregarArticulo

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
        const nuevoArticulo = {
            titulo,
            contenido,
            fecha,
            autor
        };

        try {

            // Llamamos a la función AgregarArticulo y le pasamos el nuevo artículo
            const response = await AgregarArticulo(nuevoArticulo);

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
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder='Ingrese el título del artículo'
                    required
                />
            </div>
            <div>
                <label>Contenido</label>
                <textarea
                    value={contenido}
                    onChange={(e) => setContenido(e.target.value)}
                    placeholder='Contenido del artículo'
                    required
                />
            </div>
            <div>
                <label>Fecha</label>
                <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    placeholder='Fecha del artículo'
                    required
                />
            </div>
            <div>
                <label>Autor</label>
                <input
                    type="text"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                    placeholder='Nombre del Autor'
                    required
                />
            </div>

            <button className="agregar-articulo-btn" type='submit'>Agregar Artículo</button>
        </form>
    );
}; //FIN DE LA FUNCIÓN AgregarArticulo

export default AgregarArticulo;