import '../../../../cliente-style.css'
import profile from '../../../../profile.png'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Table, Alert } from "reactstrap"

import { api } from '../../../../config'

export const PedidosCliente = (props) => {
    // console.log(props.match.params.id)

    const [data, setData] = useState([])
    const [cInfo, setInfoC] = useState([])
    const [id] = useState(props.match.params.id)
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getCliente = async () => {
        await axios.get(`${api}/cliente/${id}`)
            .then((response) => {
                setInfoC(response.data.cliente)
            })
            .catch(() => {
                setStatus({
                    type: 'error',
                    message: "Erro: sem conexão com a API."
                })
            })
    }

    const getPedidos = async () => {
        await axios.get(`${api}/listaclientes/${id}/pedidos`).then(
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
        getCliente()
        getPedidos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <div>
            <Container>
                <div className="d-grid p-2 c-col">
                    <div>
                        <h1>Pedidos do cliente</h1>
                        <div>
                            <Link to='/listar-pedidos'
                                className="btn btn-outline-success btn-sm">
                                Pedidos</Link>
                        </div>
                    </div>

                    {status.type === 'error' ?
                        <Alert color="danger">
                            {status.message}
                        </Alert> : ""}

                    <div id="profile-c" className="d-flex c-place end">
                        <table className="m-0 fit">
                            <tbody id="info" className="d-grid p-2 fit">
                                <tr>{cInfo.nome}</tr>
                                <tr>{cInfo.endereco}</tr>
                                <tr>{cInfo.cidade}</tr>
                                <tr>{cInfo.uf}</tr>
                                <tr>{cInfo.nascimento}</tr>
                            </tbody>
                        </table>
                        <div className="p-4 pt-2">
                            <img id="pic" alt='profile' src={profile} />
                        </div>
                    </div>
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>ClienteId</th>
                            <th>Data do Pedido</th>
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
                                    <Link to={'/editar-pedido/' + item.id}
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