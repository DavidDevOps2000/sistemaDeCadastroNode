DROP DATABASE bd_sistema_cadastro;
USE bd_sistema_cadastro;
describe tbl_depars;
select * from tbl_funcs;

select nome_func from tbl_funcs LEFT join tbl_depars ON tbl_funcs.tblDeparId = tbl_depars.id where nome_depar='Broooklyn';


select nome_func from tbl_depars where id=1;
describe tbl_funcs;
show tables;
select * from respostas;
DELETE FROM tvl;



INSERT INTO tbl_funcs (nome_func, cpf_func, tel_func, email_func, createdAt, updateAt) 
VALUES('david', '4442', '4654564', 'fdfsdffs', now(), now()); 

select * from tbl_funcs;