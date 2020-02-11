import React, { useState } from 'react';

import './style.css'

function SearchGroup({ onSubmit }){

  const [grupo, setGrupo] = useState('');

  async function handleSubmit(e){
    e.preventDefault();
    await onSubmit({
      grupo,
    });
    setGrupo('');
  }

  return(
    <form onSubmit={handleSubmit} >
        <center><h5>Ou</h5></center> <br/>
        <div className='input-block'>
          <label htmlFor="grupo">Buscar por Grupo</label>
          <input 
            name='grupo' 
            id='grupo' 
            required
            value={grupo}
            onChange={e => setGrupo(e.target.value)} />
            <button type="submit">Buscar</button>
        </div>
    </form>
  )
}

export default SearchGroup