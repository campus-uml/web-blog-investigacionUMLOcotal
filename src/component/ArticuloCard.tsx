import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md'; // Importamos los iconos de edición y eliminación
import Swal from 'sweetalert2'; // Importamos sweetalert2 para mostrar alertas en pantalla

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