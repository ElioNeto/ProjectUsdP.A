import React, { useEffect, useState } from 'react';
import api from './Services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import IncidentesForm from './Components/IncForm'
import IncidentesView from './Components/IncView'

function App() {

  const [dados, setDados] = useState([]);

  useEffect(() => {
    async function loadDados(){
      const response = await api.get('/incidente');
      setDados(response.data);
    }
    loadDados();
  }, []);

  async function handleAddData(data){

    await api.post('/incidente', data)
    //o response estava retornando null, então precisei chamar a API de novo, no método GET
    const response = await api.get('/incidente')
    setDados(response.data); 
  }

  async function handleDeleteData(data){

    await api.delete('/incidente/'+data.numero)
    const response = await api.get('/incidente')
    setDados(response.data); 
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <IncidentesForm onSubmit={handleAddData} />
      </aside>

      <main>
        <ul>
          {dados.map(dado => (
            <IncidentesView key={dado._id} dado={dado} onSubmit={handleDeleteData}/>
          ))}
        </ul>
      </main> 
    </div>
  );
}

export default App;
