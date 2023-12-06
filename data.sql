-- Adicionando constraints à tabela "cliente"
ALTER TABLE "public"."cliente"
  ADD CONSTRAINT "fk_cliente_pedido_1" FOREIGN KEY ("cliente_id") REFERENCES "public"."pedido" ("cliente_id") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "fk_cliente_clientepfisica_1" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientepfisica" ("cliente_id") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "fk_cliente_clientepjuridica_1" FOREIGN KEY ("cliente_id") REFERENCES "public"."clientepjuridica" ("cliente_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Adicionando constraints à tabela "pedido"
ALTER TABLE "public"."pedido"
  ADD CONSTRAINT "fk_pedido_itens_pedido_1" FOREIGN KEY ("cod_pedido") REFERENCES "public"."itens_pedido" ("cod_pedido") ON DELETE CASCADE ON UPDATE CASCADE;

-- Adicionando constraints à tabela "itens_pedido"
ALTER TABLE "public"."itens_pedido"
  ADD CONSTRAINT "fk_itens_pedido_fabricacao_pedido_1" FOREIGN KEY ("itens_pedido_id") REFERENCES "public"."fabricacao_pedido" ("itens_pedido_id") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "fk_itens_pedido_elementosArte_1" FOREIGN KEY ("itens_pedido_id") REFERENCES "public"."elementosArte" ("itens_pedido_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Adicionando constraints à tabela "etapas_fabricacao"
ALTER TABLE "public"."etapas_fabricacao"
  ADD CONSTRAINT "fk_etapas_fabricacao_fabricacao_pedido_1" FOREIGN KEY ("etapas_fabricacao_id") REFERENCES "public"."fabricacao_pedido" ("etapas_fabricacao_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Adicionando constraints à tabela "status_fabricacao"
ALTER TABLE "public"."status_fabricacao"
  ADD CONSTRAINT "fk_status_fabricacao_fabricacao_pedido_1" FOREIGN KEY ("status_fabricacao_id") REFERENCES "public"."fabricacao_pedido" ("status_fabricacao_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Adicionando constraints à tabela "terceirizado"
ALTER TABLE "public"."terceirizado"
  ADD CONSTRAINT "fk_terceirizado_terceirizacao_1" FOREIGN KEY ("terceirizado_id") REFERENCES "public"."terceirizacao" ("terceirizado_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Adicionando constraints à tabela "fabricacao_pedido"
ALTER TABLE "public"."fabricacao_pedido"
  ADD CONSTRAINT "fk_fabricacao_pedido_graficafabricacao_pedido_1" FOREIGN KEY ("fabricacao_pedido_id") REFERENCES "public"."terceirizacao" ("fabricacao_pedido_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Adicionando constraints à tabela "categoria_elemento_arte"
ALTER TABLE "public"."categoria_elemento_arte"
  ADD CONSTRAINT "fk_categoria_elemento_arte_elementosArte_1" FOREIGN KEY ("categoria_elemento_id") REFERENCES "public"."elementosArte" ("categoria_elemento_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Adicionando constraints à tabela "usuario"
ALTER TABLE "public"."usuario"
  ADD CONSTRAINT "fk_usuario_funcionario_1" FOREIGN KEY ("funcionario_id") REFERENCES "public"."funcionario" ("funcionario_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Adicionando constraints à tabela "funcionario"
ALTER TABLE "public"."funcionario"
  ADD CONSTRAINT "fk_funcionario_fabricacao_pedido_1" FOREIGN KEY ("funcionario_id") REFERENCES "public"."fabricacao_pedido" ("funcionario_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Adicionando constraints à tabela "status_pedido"
ALTER TABLE "public"."status_pedido"
  ADD CONSTRAINT "fk_status_pedido_pedido_1" FOREIGN KEY ("status_pedido_id") REFERENCES "public"."pedido" ("status_pedido_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Adicionando constraints à tabela "produto"
ALTER TABLE "public"."produto"
  ADD CONSTRAINT "fk_produto_itens_pedido_1" FOREIGN KEY ("cod_produto") REFERENCES "public"."itens_pedido" ("cod_produto") ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT "fk_produto_tamanho_produto_1" FOREIGN KEY ("cod_produto") REFERENCES "public"."tamanho_produto" ("cod_produto") ON DELETE CASCADE ON UPDATE CASCADE;

-- Adicionando constraints à tabela "perfil_acesso"
ALTER TABLE "public"."perfil_acesso"
  ADD CONSTRAINT "fk_perfil_acesso_usuario_1" FOREIGN KEY ("perfil_acesso_id") REFERENCES "public"."usuario" ("perfil_acesso_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Adicionando constraints à tabela "tamanho_produto"
ALTER TABLE "public"."tamanho_produto"
  ADD CONSTRAINT "fk_tamanho_produto_demandadopproduto_1" FOREIGN KEY ("tamanho_produto_id") REFERENCES "public"."demandadopproduto" ("tamanho_produto_id") ON DELETE CASCADE ON UPDATE CASCADE;


-- Inserção de perfis de acesso padrões
INSERT INTO perfil_acesso (nome_perfil_acesso) VALUES ('ROLE_ADMIN');
INSERT INTO perfil_acesso (nome_perfil_acesso) VALUES ('ROLE_VENDEDOR');
INSERT INTO perfil_acesso (nome_perfil_acesso) VALUES ('ROLE_DESIGNER');


-- Inserção de usuario padrão
INSERT INTO usuario (perfil_acesso_id, funcionario_id, login, senha, ativo)
VALUES (2, 1, 'judah', '$2a$12$yi4tvcbIS5RsNkt8qQ07luEw3eGjmiVu6s8CyEteVzgFBSWRYUjeK', 1);
