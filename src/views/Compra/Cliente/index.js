import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Table, Alert } from "reactstrap"

import { api } from '../../../config'

export const ComprasCliente = (props) => {

    const [data, setData] = useState([])
    const [id] = useState(props.match.params.id)
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getPedidos = async () => {
        await axios.get(`${api}/compras-cliente/${id}`).then(
            (response) => {
                console.log(response.data)
                setData(response.data)
            }
        ).catch(() => {
            setStatus({
                type: 'error',
                message: "Erro: sem conexão com a API."
            })
        })
    }

    useEffect(() => {
        getPedidos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <div>
            <Container>
                <div>
                    <div>
                        <h1>Compras do cliente</h1>
                    </div>
                    <div className="p-2">
                    <Link to='/listar-compras'
                        className="btn btn-outline-success btn-sm">
                        Compras</Link>
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
                            <th>Id do cliente</th>
                            <th>Data da compra</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.ClienteId}</td>
                                <td>{item.data}</td>
                                <td className="text-center">
                                    <Link to={'/editar-compra/'+item.id}
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