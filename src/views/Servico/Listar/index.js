import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Table, Alert } from "reactstrap"

import { api } from '../../../config'

export const ListarServico = () => {

    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const getServicos = async () => {
        await axios.get(api + '/listaservicos').then(
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

    const delServico = async (idServico) =>{
        console.log(idServico)

        const headers = {
            'Content-type':'application/json'
        }

        await axios.delete(`${api}/excluirservicos/${idServico}`, {headers})
        .then((response)=>{
            console.log(response.data.type)
            console.log(response.data.message)
            getServicos()
        }).catch(()=>{
            setStatus({
                type:'error',
                message:'Erro: Não foi possível conexão com API'
            })
        })
    }

    useEffect(() => {
        getServicos();
    }, [])

    return (
        <div>
            <Container>
                <div>
                    <div>
                        <h1>Visualizar informações dos serviços</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to="/cadastrar-servicos"
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
                            <th>Descrição</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nome}</td>
                                <td>{item.descricao}</td>
                                <td className="text-center">
                                    <Link to={"/pedidos-servico/" + item.id}
                                        className="btn btn-outline-primary btn-sm">
                                        Pedidos
                                    </Link>
                                    <span className="btn btn-outline-danger btn-sm"
                                    onClick={()=>delServico(item.id)}>Excluir</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}