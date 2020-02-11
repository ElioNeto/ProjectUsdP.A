import React, { useState } from 'react';

import './style.css'

function IncidentesUpdate({ onSubmit, data, onClick }){

  const [numero, setNumero] = useState(data.numero);
  const [grupo, setGrupo] = useState(data.grupo);
  const [descricao, setDescricao] = useState(data.descricao);
  const [comentario, setComentario] = useState(data.comentario);
  const [responsavel, setResponsavel] = useState(data.responsavel);
  const [rdm, setRdm] = useState(data.rdm);
  const [status, setStatus] = useState(data.status);
  const [resumo, setResumo] = useState(data.resumo);

  async function handleSubmit(e){
    e.preventDefault();
    await onSubmit({
      numero,
      grupo,
      descricao,
      comentario,
      responsavel,
      rdm,
      status,
      resumo
    });
    setNumero('');
    setGrupo('');
    setDescricao('');
    setComentario('');
    setResponsavel('');
    setRdm('');
    setStatus('');
    setResumo('');
  }

  async function back(e){
    await onClick({});
   
  }

  return(
    <>
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
        <label htmlFor="descricao">Responsável</label>
        <input 
          name='responsavel' 
          id='responsavel' 
          required 
          value={responsavel}
          onChange = { e => setResponsavel(e.target.value) }/>
      </div>
      <div className="input-group">
        <div className='input-block'>
          <label htmlFor="numero">Status</label>
          <input 
            name='status' 
            id='status' 
            required
            value={status}
            onChange={e => setStatus(e.target.value)} />
        </div>
        <div className='input-block'>
          <label htmlFor="grupo">RDM</label>
          <input 
            name='rdm' 
            id='rdm' 
            value={rdm}
            onChange={e => setRdm(e.target.value)} />
        </div>
      </div>
      <div className='input-block'>
        <label htmlFor="descricao">Resumo</label>
        <input 
          name='resumo' 
          id='resumo' 
          required 
          value={resumo}
          onChange = { e => setResumo(e.target.value) }/>
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
      <button onClick={back}>Voltar</button>
    </form>
    
    </>
  )
}

export default IncidentesUpdate