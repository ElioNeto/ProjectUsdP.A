import React, { useEffect, useState } from 'react';
import api from './Services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import IncidentesForm from './Components/IncForm'
import IncidentesView from './Components/IncView'
import IncidentesUpdate from './Components/IncUpdate'
import SearchGroup from './Components/searchGroup'

function App() {

  const [dados, setDados] = useState([]);
  const [flg, setFlg] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    async function loadDados(){
      const response = await api.get('/incidente');
      setDados(response.data);
    }
    loadDados();
  }, []);

  async function handleAddData(data){
    const response = await api.get('/incidente/one/'+data.numero)

    if(response.data.length<=0){

      await api.post('/incidente', data)

      const response = await api.get('/incidente')
      setDados(response.data); 
      setMsg("")
    }else{
      setMsg("Incidente já cadastrado")
    }
  }

  async function handleDeleteData(data){

    await api.delete('/incidente/'+data.numero)
    const response = await api.get('/incidente')
    setDados(response.data); 
  }

  async function handleUpdateDataPre(data){
    setDados([]);
    const response = await api.get('/incidente/one/'+data.numero)
    setDados(response.data);
    if(dados)
      setFlg(true)
  }

  async function handleUpdateData(data){

    await api.get('/incidente/'+data.numero)
    await api.put('/incidente/'+data.numero, data)
    const response = await api.get('/incidente');
    setDados(response.data);
    setFlg(false)
  }

  async function handleBack(e){
    const response = await api.get('/incidente');
      setDados(response.data);
    setFlg(false)
  }

  async function handleSearchByGroup(data){
    const response = await api.get('/incidente/'+data.grupo)
    setDados(response.data);
  }
  async function handleSearchByGroupAlternative(data){
    const response = await api.get('/incidente/'+data)
    setDados(response.data);
  }

  if(!flg)
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <IncidentesForm onSubmit={handleAddData} />
        <strong>{msg}</strong>
        <SearchGroup onSubmit={handleSearchByGroup}/>
        <button className='btnSearchGroup' onClick={() => {handleSearchByGroupAlternative('CANAIS INTERNET BANKING MOBI - SERVICE SUPPORT')}} >CANAIS INTERNET BANKING MOBI - SERVICE SUPPORT</button>
        <button className='btnSearchGroup' onClick={() => {handleSearchByGroupAlternative('CANAIS INTERNET BANKING PJ-SERVICE SUPPORT IBM')}} >CANAIS INTERNET BANKING PJ-SERVICE SUPPORT IBM</button>
      </aside>
      
      <main>
        <ul>
          
          {dados.map(dado => (
            <IncidentesView 
              key={dado._id}
              dado={dado} 
              onSubmit={handleDeleteData}
              onClick={handleUpdateDataPre}/>
          ))}
        </ul>
      </main> 
    </div>
  );
  else
  return(
    <div id="app">
    <aside>
      <strong>Atualizar</strong>
      {dados.map(dado => (
        <IncidentesUpdate 
        data={dado}
        onSubmit={handleUpdateData}
        onClick={handleBack}/>
      ))}
     </aside>
     <main>
        <ul>
          {dados.map(dado => (
            <IncidentesView 
              key={dado._id} 
              dado={dado} 
              onSubmit={handleDeleteData}
              onClick={handleUpdateDataPre}/>
          ))}
        </ul>
      </main> 
    </div>
  ) 
}

export default App;
