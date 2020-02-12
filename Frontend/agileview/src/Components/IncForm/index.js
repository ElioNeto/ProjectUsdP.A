import React, { useState } from 'react';

import './style.css'

function IncidentesForm({ onSubmit }){

  const [numero, setNumero] = useState('');
  const [grupo, setGrupo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [comentario, setComentario] = useState('');
  const [responsavel, setResponsavel] = useState('');
  const [rdm, setRdm] = useState('');
  const [status, setStatus] = useState('');
  const [resumo, setResumo] = useState('');
  const [abertura, setAbertura] = useState('');

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
      resumo,
      abertura
    });
    setNumero('');
    setGrupo('');
    setDescricao('');
    setComentario('');
    setResponsavel('');
    setRdm('');
    setStatus('');
    setResumo('');
    setAbertura('');
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
        <label htmlFor="responsavel">Responsável</label>
        <input 
          name='responsavel' 
          id='responsavel'
          value={responsavel}
          onChange = { e => setResponsavel(e.target.value) }/>
      </div>
      <div className='input-block'>
        <label htmlFor="abertura">Data de Abertura</label>
        <input 
          name='abertura' 
          id='abertura' 
          required 
          value={abertura}
          onChange = { e => setAbertura(e.target.value) }/>
      </div>
      <div className="input-group">
        <div className='input-block'>
          <label htmlFor="status">Status</label>
          <input 
            name='status' 
            id='status' 
            required
            value={status}
            onChange={e => setStatus(e.target.value)} />
        </div>
        <div className='input-block'>
          <label htmlFor="rdm">RDM</label>
          <input 
            name='rdm' 
            id='rdm' 
            value={rdm}
            onChange={e => setRdm(e.target.value)} />
        </div>
      </div>
      <div className='input-block'>
        <label htmlFor="resumo">Resumo</label>
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
          value={comentario}
          onChange = { e => setComentario(e.target.value) }/>
      </div>
      <button type="submit">Salvar</button>
    </form>
  )
}

export default IncidentesForm