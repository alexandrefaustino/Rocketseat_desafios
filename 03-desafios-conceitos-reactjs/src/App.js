import React, { useState, useEffect } from "react";

import "./styles.css";

import api from "./services/api";

function App() {
  const [projects, setProjets]= useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjets(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('projects',{
    title: `Novo projeto ${Date.now()}`,
    owner: "Alexandre Faustino"
    });

    const project = response.data;
    setProjets([...projects, project]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`projects/${id}`);

    api.get('projects').then(response =>{
      const project = response.data;
      setProjets(project);
    });
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => <li key={project.id}> {project.title} <button onClick={
          () => handleRemoveRepository(project.id)}> Remover </button> </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
