INSERT INTO formasDePago (descripcion) VALUES ("Efectivo");
INSERT INTO formasDePago (descripcion) VALUES ("Crédito");
INSERT INTO formasDePago (descripcion) VALUES ("Débito");
INSERT INTO formasDePago (descripcion) VALUES ("Transferencia");

INSERT INTO estados (descripcion) VALUES ("Nuevo");
INSERT INTO estados (descripcion) VALUES ("Confirmado");
INSERT INTO estados (descripcion) VALUES ("Preparando");
INSERT INTO estados (descripcion) VALUES ("Enviando");
INSERT INTO estados (descripcion) VALUES ("Cancelado");
INSERT INTO estados (descripcion) VALUES ("Entregado");


INSERT INTO roles (descripcion) VALUES ("Cliente");
INSERT INTO roles (descripcion) VALUES ("Mozo");
INSERT INTO roles (descripcion) VALUES ("Administrador");
INSERT INTO roles (descripcion) VALUES ("Dueño");
INSERT INTO roles (descripcion) VALUES ("Inactivo");

INSERT INTO usuarios (idRol, usuario, password, mail, nombre, apellido, telefono, direccion)
VALUES (4, "DonGato", "elCapo", "jefaso@delilah.com", "Alberto", "Bellini", 3514587921, "Nuevo Mundo 1756, Residencial América") 
