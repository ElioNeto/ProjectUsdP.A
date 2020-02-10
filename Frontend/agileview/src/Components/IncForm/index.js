import React, { useState } from 'react';

import './style.css'

function IncidentesForm({ onSubmit }){

  const [numero, setNumero] = useState('');
  const [grupo, setGrupo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [comentario, setComentario] = useState('');

  async function handleSubmit(e){
    e.preventDefault();
    await onSubmit({
      numero,
      grupo,
      descricao,
      comentario
    });
    setNumero('');
    setGrupo('');
    setDescricao('');
    setComentario('');
    
  }

  return(
    <form onSubmit={handleSubmit} > 
      <div className="input-group">
        <div className='input-block'>
          <label htmlFor="numero">Número</label>
          <input 
            type='number' 
            name='numero' 
            id='numero' 
            required
            value={numero}
            onChange={e => setNumero(e.target.value)} />
        </div>
        <div className='input-block'>
          <label htmlFor="grupo">Grupo</label>
          <input 
            name='grupo' 
            id='grupo' 
            required
            value={grupo}
            onChange={e => setGrupo(e.target.value)} />
        </div>
      </div>
      <div className='input-block'>
        <label htmlFor="descricao">Descricao</label>
        <input 
          name='descricao' 
          id='descricao' 
          required 
          value={descricao}
          onChange = { e => setDescricao(e.target.value) }/>
      </div>
      <div className='input-block'>
        <label htmlFor="comentario">Comentário</label>
        <input 
          name='comentario' 
          id='comentario' 
          required 
          value={comentario}
          onChange = { e => setComentario(e.target.value) }/>
      </div>
      <button type="submit">Salvar</button>
    </form>
  )
}

export default IncidentesForm