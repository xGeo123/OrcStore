function cargarPagina(pagina){

    fetch(pagina)
    .then(response => response.text())
    .then(data => {
        document.getElementById("contenido").innerHTML = data;
    })
    .catch(error => {
        document.getElementById("contenido").innerHTML = "Error al cargar la página";
    });
    

}
document.addEventListener('DOMContentLoaded', function() {  
        cargarPagina('inicio.html');
        });