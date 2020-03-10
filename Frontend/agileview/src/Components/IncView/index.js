import React from 'react';

import './style.css'

function IncidenteView({ dado, onSubmit, onClick }){

  /* Ajuste para exibir data */
  const data = dado.dataAbertura
  var a = new Date(data * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;

  /* Ajuste para formatação do texto */
  const forReplace = dado.descricao
  let step01 = forReplace.replace(/&#xE1;/g, 'á')
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

  let comentario = step17

  /* Definição do número de incidente */
  const numero = dado.incidente
  
  /* Funções de passagem */
  async function handleDelete(e){
    e.preventDefault();
    await onSubmit({
      numero,
    });
  }
  
  async function handleUpdate(e){
    e.preventDefault();
    await onClick({
      numero,
    });
  }

  return(
    <li  className='dev-item'>
      <header>
        <h5>{ dado.incidente }</h5>
        <div className='user-info'>
          <strong>{ dado.grupo }</strong>
          <br/>
          Status: <span>{ dado.status }</span><br/>
          {dado.rdm ? <> RDM: <span>{ dado.rdm }</span><br/> </>: <></>}
          {dado.responsavel ? <> Responsável: <span>{ dado.responsavel }</span><br/></> : <></>}
          Data de Abertura: <span>{ time }</span>
          {dado.atualizacao ? <> <br/>Última atualização: <span>{ dado.atualizacao }</span><br/></> : <></>}
        </div>
      </header>
      <br/>
      <p><b><u>Resumo:</u></b> { dado.resumo }</p>
      <p><b><u>Descrição:</u></b> { comentario}</p>
      {dado.comentario ? <p><b><u>Comentário:</u></b> { dado.comentario }</p> : <></>}
      <form onSubmit={handleDelete}>
      <button onClick={handleUpdate}>Atualizar</button>
        <button type='submit'>Delete</button>
      </form>  
    </li>
  );
}
export default IncidenteView;