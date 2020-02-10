import React from 'react';

import './style.css'

function IncidenteView({ dado, onSubmit }){

  const numero = dado.numero

  async function handleDelete(e){
    e.preventDefault();
    await onSubmit({
      numero,
    });
  }

  return(
    <li  className='dev-item'>
      <header>
        <h5>{ dado.numero }</h5>
        <div className='user-info'>
          <strong>Grupo: { dado.grupo }</strong>
          Comentário: <span>{ dado.comentario }</span>
        </div>
      </header>
      <p>Descrição: { dado.descricao }</p>
      <form onSubmit={handleDelete}>
        <button type='submit'>Delete</button>
      </form>
      
    </li>
  );
}
export default IncidenteView;