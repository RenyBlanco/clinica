Bienvenidos a la aplicación Odontologica,

El objetivo principal del desarrollo, es lograr agendar las citas de los (posibles) pacientes, y administrar la historia y evolución del mismo desde su primera consulta.
Para lograr tal objetivo, partimos con una página web estática, donde los visitantes logren revisar los servicios que presta la clinica, así como resultados de tratamientos ya realizados, (las imagenes son reales de tratamientos de la clinica).

Para el manejo, administración y gestión de los pacientes, se debe ingresar desde de la página index, en la opción "ingreso", que llevará al administrador del sistema, o a los usuarios registrados con funciones de operarios al manejo de las opciones antes mencionadas.

Descripción de los aspectos técnicos dentro del desarrollo web.

Consulta de Bases de Datos.

Para los modulos de pacientes, usuarios, roles, permisos y modulos, especificamente en el archivo API.JS, se hace uso de selección, uniones, predicados (WHERE, GROUP BY) y ordenamiento.

Algoritmo de cálculo y manipulación de archivos texto.

Se utilizan en los módulos antes mencionado al mostrar los registros de las tablas , y la manipulación en el listado de usuarios, en donde permite exportar a archivos PDF, CSV EXCEL.

Página Web y HTML.

Todas las páginas de la aplicación tienen su desarrollo Front end en HTML, con su respectiva responsividad, manejo general de las páginas con estilos CSS y utilización del framework Bootstrap.

Lenguaje Node.

Desde la partida del servidor de la aplicación y de la API, se inicia con Node JS, el uso del motor de plantilla EJS, es otro ejemplo de su uso, el uso de las funciones asincronas se evidencia en la carpeta routes, donde se encuentran las rutas de cada modulo y consumo de la API, al igual que la lectura de parámetros se evidencia en el mismo directorio en cualquiera de los archivos.

Conexión de Base de datos.

El manejo se puede evidenciar en la carpeta "database", en el archivo db.js o db2.js, y en cuanto a las consultas en el archivo API.JS, antes mencionado cumpliendo con la premisa de seguridad, que todo contacto con la base de datos deb ser a través de este servicio.

Uso Express.

Se evidencia en el archivo api.js en la dentro de la carpeta API, en el archivo api.js, en este caso para levantar el servicio API, y en el index.js en la raiz, para levantar el servidor de la aplicación.

Para utilizar la aplicación deberá descargarla y en el directorio seleccionado, deberá crear las bases de datos a partir del archivo clinica.sql, y correr el comando de linea npm install, para poder instalar los paquetes necesarios para correr la aplicación.
