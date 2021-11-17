import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Table, Alert } from "reactstrap"

import { api } from '../../../../config'

export const ItensPedido = (props) => {
    // console.log(props.match.params.id)

    const [data, setData] = useState([])
    const [id] = useState(props.match.params.id)
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getItens = async () => {
        await axios.get(`${api}/listaitenspedido/${id}`).then(
            (response) => {
                console.log(response.data)
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

    useEffect(() => {
        getItens();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <div>
            <Container>
                <div>
                    <div>
                        <h1>Itens do Pedido</h1>
                    </div>
                    <div className="p-2">
                    <Link to='/listar-pedidos'
                        className="btn btn-outline-success btn-sm">
                        Pedidos</Link>
                    </div>
                    
                    {status.type === 'error' ?
                        <Alert color="danger">
                            {status.message}
                        </Alert> : ""}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id do Pedido</th>
                            <th>Id do Serviço</th>
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
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}