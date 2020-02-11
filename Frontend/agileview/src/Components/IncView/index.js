import React from 'react';

import './style.css'

function IncidenteView({ dado, onSubmit, onClick }){

  const numero = dado.numero

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
        <h5>{ dado.numero }</h5>
        <div className='user-info'>
          <strong>{ dado.grupo }</strong>
          <br/>
          Comentário: <span>{ dado.comentario }</span>
        </div>
      </header>
      <br/>
      <p><b><u>Descrição:</u></b> { dado.descricao }</p>
      <form onSubmit={handleDelete}>
      <button onClick={handleUpdate}>Atualizar</button>
        <button type='submit'>Delete</button>
      </form>
        
    </li>
  );
}
export default IncidenteView;