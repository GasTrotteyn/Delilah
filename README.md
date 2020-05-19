API DELILAH

DOCUMENTACION: https://app.swaggerhub.com/apis-docs/GasTrotteyn/DelilahAPI/1.0.0

INSTALACIÓN DE LA API:

INSTRUCCIONES PARA INICIAR EL PROYECTO:
para arrancar la base de datos: 
1.- ejecutar script crearTablasyForeingKey
2.- ejecutar insertsIniciales
3.- ejecutar el bulk, descomentando las dos líneas de ejecución (líneas 39 y 40).
4.- Ubicar la carpeta config y en su interior, los dos archivos .json. Introducir algún valor en la firma y la url de conexión a la base de datos.
5.- Instalar el proyecto DELILAH con todas sus dependencias según package.json.
6.- Ejecutar nodemon server.js
7.- Utilizar las request de Postman para testear la API.(DELILAH.postman_collection.json)

NOTAS SOBRE EL USO DE LA API:

Los roles se establecen de la siguiente manera:
La base de datos se inicia con un solo usuario, el dueño. Solamente él puede darle roles a los demás usuarios, que ingresan con el rol de clientes por defecto. Luego el Dueño, puede darle roles de mozo, administrador o inactivo (equivalente a eliminar usuario).
Si el usuario decide darse de baja, se le asigna el rol 5 (inactivo), operación que también puede ejecutar el dueño.
En estas condiciones, el usuario no pasa el middleware de login.
Los token caducan en 2 horas.
Para eliminar un producto hay un endpoint específico. Para dejarlo no-disponible, en cambio, hay que usar el endpoint: put('/admin/productos/:id')
Cuando el usuario común postea un pedido, este ingresa con el estado "nuevo". Luego, el admin a cargo va cambiando el estado del pedido.
Si en un pedido se solicita un producto con Id inexistente, ese renglón no se registra, pero los demás renglones sí. Lo mismo ocurre si se piden productos no disponibles. Ambos errores deberían evitarse en el frontend, usando el endpoint de productos disponibles.





