import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import styles from "../Canil.module.css"
import { Link } from 'react-router-dom';

const URL = 'http://localhost:3003/api/canils'



export default function Tabela(){
  
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
      </tr>
    )
  }


  

  return (
    <div className={styles.canil}>
            <br></br>

      <h1><strong>Página da Tabela</strong></h1>
      <br></br>
      
      <br></br>


<br></br>


 
  <Table striped bordered hover className="table-light">
    <thead>
      {renderizarHead()}
    </thead>
    <tbody>
      {renderizarApi()}
    </tbody>
  </Table>


    <h4><Link to="/">Voltar</Link></h4>


    </div>
  );
};

