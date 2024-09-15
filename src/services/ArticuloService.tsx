/** 
 * FUNCIÓN PARA OBTENER LOS ARTÍCULOS
 */

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
  
  /**
   * FUNCIÓN PARA AGREGAR UN ARTÍCULO
   */ 
  export const AgregarArticulo = async (articulo) => {

    try {
      const response = await fetch("http://localhost:3000/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articulo),
      });

      if(!response.ok){
        throw new Error("Error al agregar el artículo");
      }

      const data = await response.json();
      return data;

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