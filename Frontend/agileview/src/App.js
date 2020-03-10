import React, { useEffect, useState } from 'react';
import apiUsd from './Services/api';
import apiMongo from './Services/apiMongo'

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import IncidentesForm from './Components/IncForm'
import IncidentesView from './Components/IncView'
import IncidentesUpdate from './Components/IncUpdate'
import SearchGroup from './Components/searchGroup'
import BtnAtualizar from './Components/BtnAtualizar'

function App() {

  const [dados, setDados] = useState([]);
  const [flg, setFlg] = useState('Cadastrar')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    async function loadDados(){
      const response = await apiMongo.get('/incidente');
      setDados(response.data);
    }
    loadDados();
  }, []);

  async function handleAddData(data){
    const response = await apiUsd.get('/incidente/one/'+data.numero)

    if(response.data.length<=0){

      await apiUsd.post('/incidente', data)

      const response = await apiUsd.get('/incidente')
      setDados(response.data); 
      setMsg("")
    }else{
      setMsg("Incidente já cadastrado")
    }
  }

  async function handleDeleteData(data){

    await apiUsd.delete('/incidente/'+data.numero)
    const response = await apiMongo.get('/incidente')
    setDados(response.data); 
  }

  async function handleUpdateDataPre(data){
   /*  setDados([]);
    const response = await apiUsd.get('/incidente/one/'+data.numero)
    setDados(response.data);
    if(dados)
      setFlg('Editar') */
      console.log(data.numero)
  }

  async function handleUpdateData(data){

    await apiUsd.get('/incidente/'+data.numero)
    await apiUsd.put('/incidente/'+data.numero, data)
    const response = await apiUsd.get('/incidente');
    setDados(response.data);
    setFlg('Cadastrar')
  }

  async function handleBack(e){
    const response = await apiUsd.get('/incidente');
    setDados(response.data);
    setFlg('Cadastrar')
  }

  async function handleSearchByGroup(data){
    const response = await apiUsd.get('/incidente/'+data.grupo)
    setDados(response.data);
  }
  async function handleSearchByGroupAlternative(data){
    const response = await apiUsd.get('/incidente/'+data)
    setDados(response.data);
  }
  async function loadData(){
    const response = await apiUsd.get('/incidente')
    setDados(response.data);
  }

  async function handlePostApiUpdate(){
    const response = await apiUsd.get('/busca')
    setDados(response.data);
  }

  if(flg === 'Cadastrar')
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <span>Total de incidentes cadastrados: </span><strong>{dados.length}</strong>
        <BtnAtualizar onClick={handlePostApiUpdate}/>
        <IncidentesForm onSubmit={handleAddData} />
        <strong>{msg}</strong>
        <SearchGroup onSubmit={handleSearchByGroup}/>
        <button className='btnSearchGroup' onClick={loadData} >TODOS</button>
        <button className='btnSearchGroup' onClick={() => {handleSearchByGroupAlternative('CANAIS INTERNET BANKING MOBI - SERVICE SUPPORT')}} >CANAIS INTERNET BANKING MOBI - SERVICE SUPPORT</button>
        <button className='btnSearchGroup' onClick={() => {handleSearchByGroupAlternative('CANAIS INTERNET BANKING PJ-SERVICE SUPPORT IBM')}} >CANAIS INTERNET BANKING PJ-SERVICE SUPPORT IBM</button>
        <button className='btnSearchGroup' onClick={() => {handleSearchByGroupAlternative('CAN - CANAIS DIGITAIS')}} >CAN - CANAIS DIGITAIS</button>
        <button className='btnSearchGroup' onClick={() => {handleSearchByGroupAlternative('CANAIS INTERNET BANKING PF - SERVICE SUPPORT')}} >CANAIS INTERNET BANKING PF - SERVICE SUPPORT</button>
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
  else if(flg === 'Editar')
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