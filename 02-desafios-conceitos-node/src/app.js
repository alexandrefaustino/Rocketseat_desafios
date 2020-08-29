const express = require("express");
const { uuid } = require("uuidv4");
const cors = require("cors");

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


app.get("/repositories", (request, response) => {  
  return response.json(repositories);
});


app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;

  const repository ={id: uuid(), title,  url, techs, likes: 0};

  repositories.push(repository);

  return response.json(repository);
});


app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body;

  const repositoryIdex = repositories.findIndex(rep => rep.id === id);
  
  if (repositoryIdex < 0){
    return response.status(400).json({error: 'repository not found'});
  }

  likes = repositories[repositoryIdex].likes;
  id2 = repositories[repositoryIdex].id;

  const repository = { 
    id: id2,   
    title,
    url, 
    techs,    
    likes,
  };

  repositories[repositoryIdex] = repository;

  return response.json(repository);

});


app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  
  const repositoryIdex = repositories.findIndex(rep => rep.id === id);
  
  if (repositoryIdex < 0){
    return response.status(400).json({error: 'repository not found'})  
  }

  repositories.splice(repositoryIdex,1);

  return response.status(204).send();
});


app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;

    const repositoryIdex = repositories.findIndex(rep => rep.id===id);

    if (repositoryIdex < 0){
      return response.status(400).json({error: 'repository not found'});
    }

    repositories[repositoryIdex].likes += 1;

    return response.json(repositories[repositoryIdex]);
});

module.exports = app;


