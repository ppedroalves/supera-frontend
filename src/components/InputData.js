import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import { InputNumber } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import ExtratoService from '../service/ExtratoService'

function InputData({setExtrato}) {
  const [numeroConta, setNumeroConta] = useState(null);
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setDataFim] = useState(null);
  const [nomeOperador, setNomeOperador] = useState('');



  const handleSubmit = async (event) => {
    event.preventDefault();

    if(numeroConta == null){
        window.alert("Digite um numero de conta.")
    }else{
        const extrato = await ExtratoService.getExtrato(numeroConta, formatarData(dataInicio), formatarData(dataFim), nomeOperador);
        setExtrato(extrato)
        setDataInicio(null);
        setDataFim(null);
        setNomeOperador('');
    }
   

  

  };

  const formatarData = (data) => {
    if(data == null){
        return null;
    }

    const dataFormatada = new Date(data);
    const ano = dataFormatada.getFullYear();
    const mes = String(dataFormatada.getMonth() + 1).padStart(2, '0');
    const dia = String(dataFormatada.getDate()).padStart(2, '0');
    const hora = String(dataFormatada.getHours()).padStart(2, '0');
    const minutos = String(dataFormatada.getMinutes()).padStart(2, '0');
    const segundos = String(dataFormatada.getSeconds()).padStart(2, '0');
  
    return `${ano}-${mes}-${dia}T${hora}:${minutos}:${segundos}`;
  }

  return (
      <div className="grid">
              <div className="field col-12 md:col-3">
                  <label htmlFor="numeroConta">Número da Conta:</label>
                  <InputNumber id="numeroConta" value={numeroConta} onValueChange={(e) => setNumeroConta(e.value)} useGrouping={false} />
              </div>
              <div  className="field col-12 md:col-3">
                  <label htmlFor="dataInicio">Data de Início:</label>
                  <Calendar id="dataInicio" dateFormat="dd/mm/yy" value={dataInicio} onChange={(event) => setDataInicio(event.value)} />
              </div>
              <div  className="field col-12 md:col-3">
                  <label htmlFor="dataFim">Data do Fim:</label>
                  <Calendar id="dataFim" dateFormat="dd/mm/yy" value={dataFim} onChange={(event) => setDataFim(event.value)} />
              </div>
              <div  className="field col-12 md:col-3">
                  <label htmlFor="nomeOperador">Nome do Operador:</label>
                  <InputText id="nomeOperador" value={nomeOperador} onChange={(e) => setNomeOperador(e.target.value)} />
              </div>
              <div className="col-12 md:col-12 align-items-center">
                <Button label="Pesquisar" type='submit' onClick={handleSubmit} />
              </div>
           
      </div>

  );
}

export default InputData;