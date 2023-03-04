CREATE SCHEMA igti;

CREATE TABLE igti.proprietarios (
proprietario_id SERIAL PRIMARY KEY,
nome VARCHAR NOT NULL,
telefone VARCHAR NOT NULL
);

CREATE TABLE igti.animais (
animal_id SERIAL PRIMARY KEY,
nome VARCHAR NOT NULL,
tipo VARCHAR NOT NULL,
proprietario_id INT NOT NULL,
CONSTRAINT fk_proprietarios FOREIGN KEY (proprietario_id) REFERENCES igti.proprietarios (proprietario_id)
);

CREATE TABLE igti.servicos (
    servico_id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    valor NUMERIC NOT NULL,
    animal_id INT NOT NULL,
    FOREIGN KEY (animal_id) REFERENCES igti.animais(animal_id)
);

INSERT INTO igti.proprietarios (nome, telefone) VALUES ('Alda Valentim', '(39) 98566-1222');
INSERT INTO igti.proprietarios (nome, telefone) VALUES ('Nicolas Avelar', '(28) 97432-0379');
INSERT INTO igti.proprietarios (nome, telefone) VALUES ('Emilly Baptista', '(31) 99545-2457');
INSERT INTO igti.proprietarios (nome, telefone) VALUES ('Beatriz Bonilha', '(35) 98054-4724');
INSERT INTO igti.proprietarios (nome, telefone) VALUES ('Nataniel Faleiro', '(33) 99594-3315');
INSERT INTO igti.proprietarios (nome, telefone) VALUES ('Richard Santos', '(27) 99597-9170');

INSERT INTO igti.animais (nome, tipo, proprietario_id) VALUES ('Billy', 'Cachorro', 1);
INSERT INTO igti.animais (nome, tipo, proprietario_id) VALUES ('Nala', 'Cachorro', 2);
INSERT INTO igti.animais (nome, tipo, proprietario_id) VALUES ('Mimi', 'Gato', 2);
INSERT INTO igti.animais (nome, tipo, proprietario_id) VALUES ('Dory', 'Cachorro', 3);
INSERT INTO igti.animais (nome, tipo, proprietario_id) VALUES ('Lulu', 'Cachorro', 4);
INSERT INTO igti.animais (nome, tipo, proprietario_id) VALUES ('Bob', 'Cachorro', 5);
INSERT INTO igti.animais (nome, tipo, proprietario_id) VALUES ('Milu', 'Cachorro', 5);
INSERT INTO igti.animais (nome, tipo, proprietario_id) VALUES ('Emmy', 'Gato', 5);
INSERT INTO igti.animais (nome, tipo, proprietario_id) VALUES ('Amora', 'Cachorro', 6);

INSERT INTO igti.servicos (descricao, valor, animal_id) VALUES ('Banho', 30, 1);
INSERT INTO igti.servicos (descricao, valor, animal_id) VALUES ('Banho', 30, 5);
INSERT INTO igti.servicos (descricao, valor, animal_id) VALUES ('Banho', 30, 6);
INSERT INTO igti.servicos (descricao, valor, animal_id) VALUES ('Banho', 30, 9);
INSERT INTO igti.servicos (descricao, valor, animal_id) VALUES ('Banho e Tosa', 60, 2);
INSERT INTO igti.servicos (descricao, valor, animal_id) VALUES ('Banho e Tosa', 60, 7);
INSERT INTO igti.servicos (descricao, valor, animal_id) VALUES ('Consulta', 200, 3);
INSERT INTO igti.servicos (descricao, valor, animal_id) VALUES ('Consulta', 200, 8);
INSERT INTO igti.servicos (descricao, valor, animal_id) VALUES ('Consulta', 200, 2);