import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Table, Alert } from "reactstrap"

import { api } from '../../../config'

export const ListarPedidos = () => {

    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getPedidos = async () => {
        await axios.get(api + '/listapedidos').then(
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

    const delPedido = async (idPedido) =>{
        console.log(idPedido)

        const headers = {
            'Content-type':'application/json'
        }

        await axios.delete(`${api}/excluir-pedido/${idPedido}`, {headers})
        .then((response)=>{
            console.log(response.data.type)
            console.log(response.data.message)
            getPedidos()
        }).catch(()=>{
            setStatus({
                type:'error',
                message:'Erro: Não foi possível conexão com API'
            })
        })
    }

    useEffect(() => {
        getPedidos();
    }, [])

    return (
        <div>
            <Container>
                <div>
                    <div>
                        <h1>Visualizar informações dos pedidos</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrar-pedidos"
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
                            <th>Id do pedido</th>
                            <th>ClienteId</th>
                            <th>Data do pedido</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.ClienteId}</td>
                                <td>{item.dataPedido}</td>
                                <td className="text-center">
                                    <Link to={"/editar-pedido/" + item.id}
                                        className="btn btn-outline-warning btn-sm">
                                        Editar
                                    </Link>
                                    <Link to={"/itens-pedido/" + item.id}
                                        className="btn btn-outline-primary btn-sm">
                                        Itens
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                    onClick={()=>delPedido(item.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}