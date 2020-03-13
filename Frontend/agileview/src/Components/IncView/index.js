import React from 'react';

import './style.css'

function IncidenteView({ dado, onSubmit, onClick, view }){

  /* Definição de datas */
  let data = timestampToGregorian(dado.dataAbertura)
  if(data === 'NaN undefined NaN NaN:NaN:NaN')
    data = timestampToGregorian(dado.dta)
  let dta = dado.dataAbertura

  let ultimaModificacao = timestampToGregorian(dado.ultimaModificacao)
  if(ultimaModificacao === 'NaN undefined NaN NaN:NaN:NaN')
  ultimaModificacao = timestampToGregorian(dado.dtaUpd)
  let dtaUpd = dado.ultimaModificacao

  /* Ajuste para formatação do texto */
  let des = dado.des 
  if(!des)
    des = dado.descricao
  let descricao = ''
  if(des)
    descricao = replaceString(des)

  /* Definição de atributo resumo */
  let res = dado.res
  if(!res)
    res = dado.resumo
  let resumo = ''
  if(res)
    resumo = replaceString(res)
  
  /* Definição do número de incidente */
  let numero = dado.incidente
  if(!numero)
    numero = dado.numero
  const migrado = dado.numero

  /* Declaração de status */
  const status = dado.status

  /* Declaração de RDM */
  const rdm = dado.rdm

  /* Declaração de responsável */
  const responsavel = dado.responsavel

  /* Tratamento de Grupos */
  const grupo = dado.grupo
  let grupoName = ''//precisa ser LET pq trata-se de uma variável (pode ser VAR tb)
  if(grupo === 'DAED9CD6F98B9540A1648A01B710DA8D'){
    grupoName = 'CANAIS INTERNET BANKING - SERVICE SUPPORT'
  }else if(grupo === 'C7892D4E060BA944A92D7D49A9CB3E14'){
    grupoName = 'OUVIDORIA-DIGITAL–N3'
  }else if(grupo === '349D9CF7B7206641B75C80D231DC6BCA'){
    grupoName = 'AGRUPAMENTO IBM'
  }

  /* Funções */
  async function handleDelete(e){
    e.preventDefault();
    await onSubmit({
      numero,
      migrado,
    });
  }
  
  async function handleUpdate(e){
    e.preventDefault();
    await onClick({
      numero,
      migrado,
      grupoName,
      grupo,
      dta,
      dtaUpd,
      des,
      res,
      rdm,
      status,
      responsavel,
    });
  }

  function replaceString(txt) {
    let step01 = txt.replace(/&#xE1;/g, 'á')
    let step02 = step01.replace(/&#xE3;/g,'ã')
    let step03 = step02.replace(/&#xF5;/g,'õ')
    let step04 = step03.replace(/&#xEA;/g,'ê')
    let step05 = step04.replace(/&#xFA;/g,'ú')
    let step06 = step05.replace(/&#xED;/g,'í')
    let step07 = step06.replace(/&#xF3;/g,'ó')
    let step08 = step07.replace(/&#xE7;/g,'ç')
    let step09 = step08.replace(/&#xE9;/g,'é')
    let step10 = step09.replace(/&amp;/g,'>')
    let step11 = step10.replace(/gt;/g,'')
    let step12 = step11.replace(/&#x201C;/g,'"')
    let step13 = step12.replace(/&#x201D;/g,'"')
    let step14 = step13.replace(/&#xD4;/g,'Ô')
    let step15 = step14.replace(/&#xF4;/g,'ô')
    let step16 = step15.replace(/&#xE9;/g,'é')
    let step17 = step16.replace(/&#xE9;/g,'é')

    let corrigido = step17
    return corrigido
  }

  function timestampToGregorian(time){
    var a = new Date(time * 1000);
    var months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var gregorian = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    
    return gregorian
  }

  return(
    <li  className='dev-item'>
      <header>
        <h5>{ numero }</h5>
        <div className='user-info'>
          <strong>{ grupoName }</strong>
          <br/>
          Status: <span>{ status }</span><br/>
          {dado.rdm ? <> RDM: <span>{ rdm }</span><br/> </>: <></>}
          {dado.responsavel ? <> Responsável: <span>{ responsavel }</span><br/></> : <></>}
          Data de Abertura: <span>{ data }</span>
          {ultimaModificacao ? <> <br/>Última atualização: <span>{ ultimaModificacao}</span><br/></> : <></>}
        </div>
      </header>
      <br/>
      <p><b><u>Resumo:</u></b> { resumo }</p>
      <p><b><u>Descrição:</u></b> { descricao}</p>
      {dado.comentario ? <p><b><u>Comentário:</u></b> { dado.comentario }</p> : <></>}
      <form onSubmit={handleDelete}>
        {view === 'notAccess' ? 
          <>
           
          </>
          :
          <>
            <button onClick={handleUpdate}>Acessar</button>
            <button type='submit'>Delete</button>
          </>
        }
      
        
      </form>  
    </li>
  );
}
export default IncidenteView;