import React from 'react'

import './style.css'

export default function BtnAtualizar ({onClick}){

  async function chamaApi(e){
    e.preventDefault();
    await onClick({});
  }

  return(
    <>
      <button onClick={chamaApi}>Atualizar</button>
    </>
  )
}