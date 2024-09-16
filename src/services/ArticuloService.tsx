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