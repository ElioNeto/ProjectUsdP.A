import React, { useEffect, useState } from 'react';
import apiUsd from './Services/api';
import apiMongo from './Services/apiMongo'

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import IncidentesView from './Components/IncView'
import IncidentesUpdate from './Components/IncUpdate'
//import SearchGroup from './Components/searchGroup'
import BtnAtualizar from './Components/BtnAtualizar'

function App() {

  const [dados, setDados] = useState([]);
  const [flg, setFlg] = useState('Home')
  const [msg, setMsg] = useState('Exibição de incidentes')
  const [cb, setCb] = useState('')

  useEffect(() => {
    async function loadDados(){
      const response = await apiMongo.get('/incidente');
      setDados(response.data);
      //setMsg('cadastrados')
      //console.log(response.data)
    }
    loadDados();
  }, []);

  /* async function handleAddData(data){
    const response = await apiMongo.get('/incidente/one/'+data.numero)

    if(response.data.length<=0){

      await apiMongo.post('/incidente', data)

      const response = await apiMongo.get('/incidente')
      setDados(response.data); 
      setMsg("")
    }else{
      setMsg("Incidente já cadastrado")
    }
  } */

  async function handleDeleteData(data){
    let num = 0
    if(!data.numero){
      num = data.migrado
    }else{
      num = data.numero
    }

    await apiMongo.delete('/incidente/'+num)
    const response = await apiMongo.get('/incidente')
    setDados(response.data); 
    setCb('')
    setMsg('Exibição de incidentes')
  }

  async function handleUpdateDataPre(data){
    //setDados([data]);
    await apiUsd.get('/incidente/'+data.numero)
    await apiMongo.post('/incidente', data)
    const response = await apiMongo.get('/incidente/one/'+data.numero)
    setDados(response.data); 
    setMsg("")
    setFlg('Editar') 
    setCb('')
    //console.log(response.data)
  }

  async function handleUpdateData(data){

    await apiMongo.get('/incidente/'+data.numero)
    await apiMongo.put('/incidente/'+data.numero, data)
    const response = await apiMongo.get('/incidente');
    setDados(response.data);
    setFlg('Home')
    setCb('')
    setMsg('Exibição de incidentes')
  }

  async function handleBack(e){
    const response = await apiMongo.get('/incidente');
    setDados(response.data);
    setFlg('Home')
    setCb('')
    setMsg('Exibição de incidentes')
  }

  /* async function handleSearchByGroup(data){
    const response = await apiMongo.get('/incidente/'+data.grupo)
    setDados(response.data);
  } */

  async function handleSearchByGroupAlternative(data){
    setCb('')
    const response = await apiMongo.get('/incidente/'+data)
    setDados(response.data);
  }

  async function loadData(){
    const response = await apiMongo.get('/incidente')
    setDados(response.data);
    setMsg('Exibição de incidentes')
    setCb('')

  }

  async function handlePostApiUpdate(){

    /* CANAIS INTERNET BANKING - SERVICE SUPPORT */

    var response = await apiUsd.get('/busca/DAED9CD6F98B9540A1648A01B710DA8D')
    let retorno = response.data
    let tamanho = retorno.length
    setMsg("Realizando a busca dos incidentes ativos do grupo: CANAIS INTERNET BANKING - SERVICE SUPPORT")
    setCb('Realizando a busca dos dados e atualização no banco. Por favor, aguarde!')
    retorno.map(async function(dado) {
      setMsg("Aguarde")
      const grupo = dado.grupo
      let grupoName = ''//precisa ser LET pq trata-se de uma variável (pode ser VAR tb)
      if(grupo === 'DAED9CD6F98B9540A1648A01B710DA8D'){
        grupoName = 'CANAIS INTERNET BANKING - SERVICE SUPPORT'
      }else if(grupo === 'C7892D4E060BA944A92D7D49A9CB3E14'){
        grupoName = 'OUVIDORIA-DIGITAL–N3'
      }else if(grupo === '349D9CF7B7206641B75C80D231DC6BCA'){
        grupoName = 'AGRUPAMENTO IBM'
      }
      let salvar = {
        numero: dado.incidente,
        status: dado.status,
        grupoName,
        grupo: dado.grupo,
        dta: dado.dataAbertura,
        dtaUpd: dado.ultimaModificacao,
        des: dado.descricao,
        res: dado.resumo,
        rdm: dado.rdm
      }
      const verificador = await apiMongo.get('/incidente/one/'+salvar.numero)
      if(verificador.data.length<=0){
        apiMongo.post('/incidente', salvar)
      }else{
        await apiMongo.put('/incidente/'+salvar.numero, salvar)
      }
      tamanho = tamanho - 1
      if( tamanho === 0){

        /* OUVIDORIA-DIGITAL–N3 */

        response = await apiUsd.get('/busca/C7892D4E060BA944A92D7D49A9CB3E14')
        retorno = response.data
        tamanho = tamanho + retorno.length
        setMsg("Realizando a busca dos incidentes ativos do grupo: OUVIDORIA-DIGITAL–N3")
        retorno.map(async function(dado) {
          const grupo = dado.grupo
          let grupoName = ''//precisa ser LET pq trata-se de uma variável (pode ser VAR tb)
          if(grupo === 'DAED9CD6F98B9540A1648A01B710DA8D'){
            grupoName = 'CANAIS INTERNET BANKING - SERVICE SUPPORT'
          }else if(grupo === 'C7892D4E060BA944A92D7D49A9CB3E14'){
            grupoName = 'OUVIDORIA-DIGITAL–N3'
          }else if(grupo === '349D9CF7B7206641B75C80D231DC6BCA'){
            grupoName = 'AGRUPAMENTO IBM'
          }
          let salvar = {
            numero: dado.incidente,
            status: dado.status,
            grupoName,
            grupo: dado.grupo,
            dta: dado.dataAbertura,
            dtaUpd: dado.ultimaModificacao,
            des: dado.descricao,
            res: dado.resumo,
            rdm: dado.rdm
          }
          const verificador = await apiMongo.get('/incidente/one/'+salvar.numero)
          if(verificador.data.length<=0){
            apiMongo.post('/incidente', salvar)
          }else{
            await apiMongo.put('/incidente/'+salvar.numero, salvar)
          }
          tamanho = tamanho - 1
          if (tamanho === 0){

            /* AGRUPAMENTO IBM */

            response = await apiUsd.get('/busca/349D9CF7B7206641B75C80D231DC6BCA')
            retorno = response.data
            tamanho = tamanho + retorno.length
            setMsg("Realizando a busca dos incidentes ativos do grupo: AGRUPAMENTO IBM")
            retorno.map(async function(dado) {
              const grupo = dado.grupo
              let grupoName = ''//precisa ser LET pq trata-se de uma variável (pode ser VAR tb)
              if(grupo === 'DAED9CD6F98B9540A1648A01B710DA8D'){
                grupoName = 'CANAIS INTERNET BANKING - SERVICE SUPPORT'
              }else if(grupo === 'C7892D4E060BA944A92D7D49A9CB3E14'){
                grupoName = 'OUVIDORIA-DIGITAL–N3'
              }else if(grupo === '349D9CF7B7206641B75C80D231DC6BCA'){
                grupoName = 'AGRUPAMENTO IBM'
              }
              let salvar = {
                numero: dado.incidente,
                status: dado.status,
                grupoName,
                grupo: dado.grupo,
                dta: dado.dataAbertura,
                dtaUpd: dado.ultimaModificacao,
                des: dado.descricao,
                res: dado.resumo,
                rdm: dado.rdm
              }
              const verificador = await apiMongo.get('/incidente/one/'+salvar.numero)
              if(verificador.data.length<=0){
                apiMongo.post('/incidente', salvar)
              }else{
                await apiMongo.put('/incidente/'+salvar.numero, salvar)
              }
              tamanho = tamanho - 1
              if(tamanho === 0){
                const finalmente = await apiMongo.get('/incidente')
                if(finalmente.statusText === 'OK'){
                  setDados(finalmente.data);
                  setCb('Processo concluído com sucesso!')
                  setMsg('Exibição de incidentes')
                } //if(finalmente.statusText === 'OK')
              }//if(tamanho === 0) terceiro
            })//retorno.map(async function(dado) /busca/349D9CF7B7206641B75C80D231DC6BCA
          }//if (tamanho === 0) segundo
        })//retorno.map(async function(dado) /busca/C7892D4E060BA944A92D7D49A9CB3E14
      }//if( tamanho === 0) primeiro
    })//retorno.map(async function(dado)  /busca/DAED9CD6F98B9540A1648A01B710DA8D
  }
  
  async function caos(){
    var response = await apiMongo.get('/incidente')
    let retorno = response.data
    let tamanho = retorno.length
    if(tamanho <= 0){
      setCb('Nada para excluir!')
      return
    }
    setCb('Realizando a exclusão dos dados pelo método CAOS. Por favor, aguarde!')
    retorno.map(async function (caos){
      console.log('Chamando api [DELETE]: /incidente/' + caos.numero)
      var delet = await apiMongo.delete('/incidente/'+ caos.numero)
      if(delet.status === 200){
        tamanho = tamanho - 1
        setMsg('Incidentes Disponíveis: ' + tamanho)
        if(tamanho === 0){
          console.log('Chamando api [GET]: /incidente')
          response = await apiMongo.get('/incidente')
          if(response.statusText === 'OK'){
          //console.log(response)
          setDados(response.data);
          setCb('Processo concluído com sucesso!')
          setMsg('Exibição de incidentes')
          }
        }
      }
    })
    //console.log(tamanho)
    
  }

  if(flg === 'Home')
  return (
    <div id="app">
      <aside>
        <strong>Home</strong>
        <span> {msg} </span>
        <br/>
        {cb === 'Processo concluído com sucesso!' || cb === '' ? <span>Total: <strong>{dados.length}</strong></span> : <></>}
        <span><strong>{cb}</strong></span>
        <BtnAtualizar onClick={handlePostApiUpdate}/>
        <br/><br/><br/>
        
        {/* <IncidentesForm onSubmit={handleAddData} /> */}
        
        {/* <SearchGroup onSubmit={handleSearchByGroup}/> */}
        <button className='btnSearchGroup' onClick={loadData} >TODOS</button>
        <button className='btnSearchGroup' onClick={() => {handleSearchByGroupAlternative('DAED9CD6F98B9540A1648A01B710DA8D')}} >CANAIS INTERNET BANKING MOBI - SERVICE SUPPORT</button>
        <button className='btnSearchGroup' onClick={() => {handleSearchByGroupAlternative('349D9CF7B7206641B75C80D231DC6BCA')}} >AGRUPAMENTO IBM</button>
        <button className='btnSearchGroup' onClick={() => {handleSearchByGroupAlternative('C7892D4E060BA944A92D7D49A9CB3E14')}} >OUVIDORIA-DIGITAL–N3</button>
        {/* <button className='btnSearchGroup' onClick={() => {handleSearchByGroupAlternative('CANAIS INTERNET BANKING PF - SERVICE SUPPORT')}} >CANAIS INTERNET BANKING PF - SERVICE SUPPORT</button> */}
        <br/><br/><br/>
        <button className='btnSearchGroupCaos' onClick={caos} >Apagar Todos</button>
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
              onClick={handleUpdateDataPre}
              view={'notAccess'}/>
          ))}
        </ul>
      </main> 
    </div>
  ) 
}

export default App;