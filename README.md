API DELILAH

This API regulates the operation of a restaurant. It allows customers to register, enter the system, modify their data, check the available products (and their favorites according to consumption history) and place an order. They can also check the status of their order and eventually cancel it. It enables employees to view orders and change their status as production progresses. Higher roles can create new dishes and price each one. And only the owner of the establishment has permissions to assign roles to others.

It is built with Node.js, Express.js, JWT, and a mySQL relational database.

DOCUMENTATION: https://app.swaggerhub.com/apis-docs/GasTrotteyn/DelilahAPI/1.0.0

API INSTALLATION:

INSTRUCTIONS TO START THE PROJECT:
to start the database:
1.- execute createTablesyForeingKey script
2.- execute initial inserts
3.- execute the bulk, uncommenting the two execution lines (lines 39 and 40).
4.- Locate the config folder and inside it, the two .json files. Enter some value in the signature and the url of connection to the database.
5.- Install the DELILAH project with all its dependencies according to package.json.
6.- Run nodemon server.js
7.- Use Postman's requests to test the API. (DELILAH.postman_collection.json)

NOTES ON USING THE API:

The roles are established as follows:
The database is started with a single user, the owner. Only he can give roles to the other users, who enter with the role of customers by default. Then the Owner can give him the roles of waiter, administrator or inactive (equivalent to deleting user).
If the user decides to unsubscribe, they are assigned role 5 (inactive), an operation that can also be performed by the owner.
Under these conditions, the user does not pass the login middleware.
Tokens expire in 2 hours.
To remove a product there is a specific endpoint. To make it unavailable, instead, use the endpoint: put ('/ admin / products /: id')
When the common user posts an order, it enters with the status "new". Then, the admin in charge changes the status of the order.
If a product with a non-existent ID is requested in an order, that line is not recorded, but the other lines are. The same happens if unavailable products are ordered. Both errors should be avoided on the frontend, using the available products endpoint.



API DELILAH

Esta API regula el funcionamiento de un restaurant. Permite a los clientes registrarse, ingresar al sistema, modificar sus datos, consultar los productos disponibles (y sus favoritos según el historial de consumo) y hacer un pedido. También pueden consultar el estado de su pedido y eventualmente, cancelarlo. A los empleados los habilita a consultar los pedidos y cambiar su estado en la medida que avanza su producción. Los roles más altos pueden crear nuevos platos y asignarle precio a cada uno. y solo el dueño del establecimiento tiene permisos para asignarle roles a los demás.

Está construida con Node.js, Express.js, JWT y una base de datos relacional mySQL.

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





