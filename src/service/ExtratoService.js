export const ExtratoService = {
    
  async getExtrato(idConta, dataInicio, dataFim, operadorTransacionado = null) {
    try {
       const params = new URLSearchParams({
           ...dataInicio !== null  && {dataInicio},
            ... dataFim !== null  && { dataFim },
            ...((operadorTransacionado !== null && operadorTransacionado !== "") && { operadorTransacionado }),
        });
      const response = await fetch(`http://localhost:8080/api/v1/conta/${idConta}/extrato?${params}`);
      const data = await response.json();
      return data;
    } catch (error) {
      window.alert('Erro ao obter o extrato da conta');
     
    }
  }



}



export default ExtratoService;