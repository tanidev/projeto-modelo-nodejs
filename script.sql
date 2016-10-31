BEGIN;

-- DROP SEQUENCE usuarios_seq;
CREATE SEQUENCE usuarios_seq;

-- Table: usuarios

-- DROP TABLE usuarios;

CREATE TABLE usuarios
(
  id integer NOT NULL DEFAULT nextval('usuarios_seq'),
  nome character varying(255) NOT NULL,
  email character varying(255) NOT NULL,
  site character varying(255),
  dataCadastro TIMESTAMP DEFAULT NOW(),
  senha character varying(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO usuarios (nome, email, site, dataCadastro, senha)
  VALUES('Estanislau Araújo', 'tani.webdesigner@gmail.com', 'https://github.com/tanidev', now(), '$2a$08$AyPxzp5Q6yvu6r9ecWSiKuqMUWMyPjxzX9PwXQhB5FCtDov/ZylNS');

CREATE SEQUENCE contatos_seq;

CREATE TABLE contatos
(
  id INTEGER NOT NULL DEFAULT nextval('contatos_seq'),
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  dataCadastro TIMESTAMP DEFAULT NOW(),
  aniversario DATE,
  telefoneFixo VARCHAR(15),
  telefoneCelular VARCHAR(15),
  telefoneComercial VARCHAR(15),
  usuario_id INTEGER NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(usuario_id) REFERENCES usuarios(id)
);

INSERT INTO contatos (nome, email, aniversario, telefoneCelular, usuario_id)
  VALUES('Aline Rocha', 'alinerochaa2@hotmail.com', '1996-03-08','11 99930-9374', CURRVAL('usuarios_seq'));

COMMIT;
