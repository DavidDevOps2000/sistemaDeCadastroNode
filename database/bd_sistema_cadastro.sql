CREATE DATABASE bd_sistema_cadastro;
USE bd_sistema_cadastro;
DROP TABLE tbl_depar;


CREATE TABLE tbl_depar(# Tabela departamento
id_depar INT AUTO_INCREMENT,
nomes_depar VARCHAR(30) NOT NULL,
id_func_to_depar INT,
PRIMARY KEY(id_depar)
);

CREATE TABLE tbl_func( # Tabela funcionário
id_func INT NOT NULL,
nome_func varchar(90),
cpf_func varchar (14) UNIQUE,#inclusvos os ponto e hifes e nao pode se repetir
tel VARCHAR(15) NOT NULL,
email VARCHAR(46),
PRIMARY KEY (id_func),
CONSTRAINT FOREIGN KEY (id_func) REFERENCES tbl_depar (id_func_to_depar)
);

CREATE DATABASE bd_sistema_cadastro;

show tables;
