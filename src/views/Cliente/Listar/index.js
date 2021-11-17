import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Table, Alert } from "reactstrap"

import { api } from '../../../config'

export const ListarClientes = () => {

    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getClientes = async () => {
        await axios.get(api + '/listaclientes').then(
            (response) => {
                // console.log(response.data)
                setData(response.data)
            }
        ).catch(() => {
            setStatus({
                type: 'error',
                message: "Erro: sem conexão com a API."
            })
            // console.log("Erro: sem conexão com a API.")
        })
    }

    const delCliente = async (idCliente) =>{
        console.log(idCliente)

        const headers = {
            'Content-type':'application/json'
        }

        await axios.delete(`${api}/excluirclientes/${idCliente}`, {headers})
        .then((response)=>{
            console.log(response.data.type)
            console.log(response.data.message)
            getClientes()
        }).catch(()=>{
            setStatus({
                type:'error',
                message:'Erro: Não foi possível conexão com API'
            })
        })
    }

    useEffect(() => {
        getClientes();
    }, [])

    return (
        <div>
            <Container>
                <div>
                    <div>
                        <h1>Visualizar informações dos serviços</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrar-clientes"
                            className="btn btn-outline-primary btn-sm">Cadastrar</Link>
                    </div>
                    {status.type === 'error' ?
                        <Alert color="danger">
                            {status.message}
                        </Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Endereço</th>
                            <th>Cidade</th>
                            <th>UF</th>
                            <th>Nascimento</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.endereco}</td>
                                <td>{item.cidade}</td>
                                <td>{item.uf}</td>
                                <td>{item.nascimento}</td>
                                <td className="text-center">
                                    <Link to={"/editar-cliente/" + item.id}
                                        className="btn btn-outline-warning btn-sm">
                                        Editar
                                    </Link>
                                    <Link to={"/pedidos-cliente/" + item.id}
                                        className="btn btn-outline-primary btn-sm">
                                        Pedidos
                                    </Link>
                                    <Link to={"/compras-cliente/" + item.id}
                                        className="btn btn-outline-primary btn-sm">
                                        Compras
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                    onClick={()=>delCliente(item.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}