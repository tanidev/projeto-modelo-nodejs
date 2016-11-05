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

COMMIT;
