import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import InputData from './components/InputData'




function App() {
  const [transfers, setTranfers] = useState([]);
  const [saldoTotal, setSaldoTotal] = useState(0.0);
  const [saldoPeriodo, setSaldoPeriodo] = useState(0.0);


  const formatCurrency = (value) => {
    return value.toLocaleString('PT-BR', { style: 'currency', currency: 'BRL' });
};

const priceBodyTemplate = (transfer) => {
  return formatCurrency(transfer.valor);
};

const setExtrato = (data) => {
  setTranfers(data.transferencias)
  setSaldoTotal(formatCurrency(data.saldo_total))
  setSaldoPeriodo(formatCurrency(data.saldo_periodo))
}


  const headerGroup = (
    <ColumnGroup>
      <Row>
        <Column header="Saldo no período:" colSpan={1} rowSpan={2}  />
        <Column header={saldoPeriodo} colSpan={1}  rowSpan={2} footerStyle={{ textAlign: 'left' }} />
        <Column header="Saldo Total:" colSpan={1} rowSpan={2}  />
        <Column header={saldoTotal} colSpan={1}  rowSpan={2} footerStyle={{ textAlign: 'left' }} />
      </Row>
      <Row>
      </Row>
      <Row>
        <Column field="name" header="Data Transferencia" />
        <Column field="country.name" header="Valencia" />
        <Column field="company" header="Tipo" />
        <Column field="representative.name" header="Nome do Operador Transacionado" />
      </Row>
    </ColumnGroup>
  );



  return (
    <div style={{width: 80 + '%', margin: '10% auto'}} className="card">
      <InputData setExtrato={setExtrato}/>
      <DataTable value={transfers} headerColumnGroup={headerGroup} tableStyle={{ minWidth: '50rem' }}>
        <Column field="dataTransferencia" header="Data Transferencia"  style={{ width: '25%' }}></Column>
        <Column field="valor" header="Valencia" style={{ width: '25%' }}  body={priceBodyTemplate}></Column>
        <Column field="tipo" header="Tipo" style={{ width: '25%' }}></Column>
        <Column field="nomeOperadorTransacao" header="Nome do Operador Transacionado" style={{ width: '25%' }}></Column>
      </DataTable>
    </div>
  );
}

export default App;
