# WebNovelEditor
React + Express.js + MySQL - Docker + Gitlab
Trata-se de um site para escrever, salvar e organizar WebNovels e seus capítulos, sendo perfeito para escritores que querem ter um ambiente próprio de escrita.


# Configurações necessárias:

-Ter um repositório Gitlab conectado no Visual Studio Code + Docker instalado na máquina

-Colocar sua senha MYSQL root nas seguintes variáveis:

  No docker composer: MYSQL_ROOT_PASSWORD, no healthcheck-test do service mysql e DB_PASSWORD no backend

  Na pasta backend em .env alterar o campo senha

-No gitlab-ci.yml colocar o REGISTRY do repositório e a Path completa do Init.sql que está na pasta db-init

-Com isso, o projeto irá rodar na máquina ao fazer um commit qualquer e rodar o script gitlab-ci.yml




