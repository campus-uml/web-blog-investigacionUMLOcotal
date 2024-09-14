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