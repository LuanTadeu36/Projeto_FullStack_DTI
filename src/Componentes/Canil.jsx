import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { parse, isWeekend } from 'date-fns';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import styles from "../Canil.module.css"
import { Link } from 'react-router-dom';

const URL = 'http://localhost:3003/api/canils'


export default function Canil(){
  
  const [data, setData] = useState("");
  const [cachorroPequeno, setCachorroPequeno] = useState("");
  const [cachorroGrande, setCachorroGrande] = useState("");
  const [resultado, setResultado] = useState("");
  const [_id,set_Id] = useState("")


  const [api,setApi] = useState([])


  useEffect(()=>{
    fetch(URL)
    .then((res) => res.json())
    .then((resultado) =>{
      setApi(resultado)
    })
  },[])

  
  function renderizarApi(){
    return(
      api.map((api) =>(
        <tr key={api._id}>
          <td>{api.data}</td>
          <td>{api.cachorroPequeno}</td>
          <td>{api.cachorroGrande}</td>
          <td> <Button variant="danger" onClick={() => apagarApi(api._id)}>Apagar</Button>{' '}</td>
          

        </tr>
      ))
    )
  }

  function renderizarHead(){
    return(
      <tr>
        <th>Data</th>
        <th>Cachorro Pequeno</th>
        <th>Cachorro Grande</th>
        <th>Ação</th>
      </tr>
    )
  }

 function apagarApi(_id){
  fetch(URL + "/" +_id,{method:'DELETE'})
  .then(res =>{
    if(res.ok){
      setApi(prevstate =>prevstate.filter(item =>item._id !== _id))
    }
  })
 }

 function cadastrarApi(){
  const novoItem ={
    data:data,
    cachorroPequeno:cachorroPequeno,
    cachorroGrande:cachorroGrande
  }

  fetch(URL ,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(novoItem)
  })

  .then((res) => res.json())
  .then((resultado) => {
    setApi((prevstate) => [...prevstate,resultado])
    setData("")
    setCachorroPequeno("")
    setCachorroGrande("")
  })

 }

  const calculaPreco = () => {
    const dataParcial = parse(data, 'dd/MM/yyyy', new Date());
    const diaDeSemana = isWeekend(dataParcial);

    const meuCaninoFelizPreco = diaDeSemana
      ? (20 * 1.2 * cachorroPequeno) + (40 * 1.2 * cachorroGrande)
      : (20 * cachorroPequeno) + (40 * cachorroGrande);

    const vaiRexPreco = diaDeSemana
      ? (20 * cachorroPequeno) + (55 * cachorroGrande)
      : (15 * cachorroPequeno) + (50 * cachorroGrande);

    const chowChawgasPreco = (30 * cachorroPequeno) + (45 * cachorroGrande);

    let melhorPreco = Math.min(meuCaninoFelizPreco, vaiRexPreco, chowChawgasPreco);
    let melhorPetshop = '';

    if (melhorPreco === meuCaninoFelizPreco) {
      melhorPetshop = 'Meu Canino Feliz';
    } else if (melhorPreco === vaiRexPreco) {
      melhorPetshop = 'Vai Rex';
    } else {
      melhorPetshop = 'ChowChawgas';
    }

    setResultado(`Melhor petshop: ${melhorPetshop}, Preço total: R$ ${melhorPreco.toFixed(2)}`);
    
    if(!data || !cachorroPequeno || !cachorroGrande){
      alert("Preencha todos os campos")
      return
    }

    cadastrarApi()
    
  };


  return (
    <div className={styles.canil}>
            <br></br>

      <h1><strong>Página de Cadastro dos Cachorros</strong></h1>
      <br></br>
      <br></br>     

      <Form>
      <Row>
        <Col>
        <h2>Data</h2>
          <Form.Control placeholder="Qual a data" type="text" 
          value={data} 
          onChange={(e) => setData(e.target.value)}/>
        </Col>
        <Col>
        <h2>Cachorros Pequenos</h2>
          <Form.Control placeholder="Quantos cachorros pequenos"
           type="number"
           value={cachorroPequeno} 
           onChange={(e) => setCachorroPequeno(parseInt(e.target.value))} />
        </Col>
       
        <Col>
        <h2>Cachorros grandes</h2>
          <Form.Control placeholder="Quantos cachorros grandes" 
          type="number" 
          value={cachorroGrande} 
          onChange={(e) => setCachorroGrande(parseInt(e.target.value))} />
        </Col>

      </Row>
    </Form>
    <br></br>
    <Button variant="success" onClick={calculaPreco}>Cadastrar</Button>{' '}
    <br></br>

    <h3>{resultado}</h3>

<br></br>


 
  <Table striped bordered hover className="table-light">
    <thead>
      {renderizarHead()}
    </thead>
    <tbody>
      {renderizarApi()}
    </tbody>
  </Table>


    <h4>Deseja acessar a página somente da Tabela? <Link to="/Tabela"> Clique aqui</Link></h4>


    </div>
  );
};

