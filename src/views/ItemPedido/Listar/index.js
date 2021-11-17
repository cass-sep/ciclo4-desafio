import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Table, Alert } from "reactstrap"

import { api } from '../../../config'

export const ListarItens = () => {

    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getItem = async () => {
        await axios.get(api + '/lista-itens-pedidos').then(
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

    const delItem = async (idServ, idPed) =>{
        console.log(idServ, idPed)

        const headers = {
            'Content-type':'application/json'
        }

        await axios.delete(`${api}/excluir-item-pedidos/${idServ}/${idPed}`, {headers})
        .then((response)=>{
            console.log(response.data.type)
            console.log(response.data.message)
            getItem()
        }).catch(()=>{
            setStatus({
                type:'error',
                message:'Erro: Não foi possível conexão com API'
            })
        })
    }

    useEffect(() => {
        getItem();
    }, [])

    return (
        <div>
            <Container>
                <div>
                    <div>
                        <h1>Visualizar informações dos itens pedidos</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrar-item-pedidos"
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
                            <th>Id do serviço</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.PedidoId}>
                                <td>{item.PedidoId}</td>
                                <td>{item.ServicoId}</td>
                                <td>{item.quantidade}</td>
                                <td>{item.valor}</td>
                                <td className="text-center">
                                    <Link to={`/editar-itempedido/${item.ServicoId}/${item.PedidoId}`}
                                        className="btn btn-outline-warning btn-sm">
                                        Editar
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                    onClick={()=>delItem(item.ServicoId, item.PedidoId)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}