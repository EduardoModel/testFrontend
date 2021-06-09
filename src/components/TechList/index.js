import React, { useEffect, useState } from 'react';

// import { Container } from './styles';

function TechList() {
  const [techs, setTechs] = useState([]);
  const [newTech, setNewTech] = useState('');

  useEffect(() => {
    const savedTechs = localStorage.getItem('techs');
    if (savedTechs) {
      setTechs(JSON.parse(savedTechs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs));
  }, [techs]);

  function handleAddTech() {
    setTechs([...techs, newTech]);
    setNewTech('');
  }

  return (
    <form data-testid="tech-form" onSubmit={handleAddTech}>
      <ul data-testid="tech-list">
        {techs.map(tech => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <label htmlFor="tech">Tech</label>
      <input
        id="tech"
        type="text"
        value={newTech}
        onChange={e => setNewTech(e.target.value)}
      />
      <button type="button" onClick={() => handleAddTech()}>
        Add
      </button>
    </form>
  );
}

export default TechList;
