### API para o projeto da disciplina EAD

##### Descrição do professor:
 - Tela de acesso para aluno, professor e tutor, bem como com cada funcionalidade e restrição que devem existir. 

 - Professor: capaz de hospedar conteúdos, módulos e aulas; abrir ferramentas existentes no AVA, avaliação (escolher uma forma de avaliar), colocar notas, inserir aluno e tutor

 - Tutor: conteúdo (visualizar), avaliação e ferramentas de interação (poderá ser chat ou forúm).

 - Aluno: conteúdo (visualizar), atividades avaliativas a serem desenvolvidas, ferramentas de interação, acesso as notas.
 
 #### Para testar a aplicação:
 
  - Com HTTP:
 ```
 $ git clone https://github.com/diegomunizdev/ead-back.git
 ``` 
 
  - Com SSH:
 ```
 $ git clone git@github.com:diegomunizdev/ead-back.git
 ```
 
 - No entre no diretório do projeto e execute
 
 ```
 $ npm i ou $ npm install
 ```
 
 #### Variáveis de ambiente:
 
 1 - Faça uma copia do arquivo `.env.example` e renomeie para `.env`
 
 2 - Na variável `CONNECTION_DB` informe a URL do Banco de Dados MongoDB
 
 Ex:
 ```
 mongodb+srv://<user>:<password>@ead-back.y1gqz.mongodb.net/<dbname>?retryWrites=true&w=majority
 ```
 
 Preencha o `user` e `password` com seus dados de acesso do MongoDB
 
 ### Rodando a aplicação:
 
 `$ npm run dev`
