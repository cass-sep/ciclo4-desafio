import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Table, Alert, Form, Input } from "reactstrap"

import { api } from '../../../config'

export const ProdutoItens = (props) => {

    const [id] = useState(props.match.params.id)
    let [alo, setAlo] = useState()
    let [editAtivado, setEditAtivado] = useState()
    // let [idEdit, setIdEdit] = useState()
    let [cId, setcId] = useState()
    let [pId, setpId] = useState()
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    /* const [item, setItem] = useState({
        CompraId: '',
        ProdutoId: '',
        quantidade: '',
        valor: ''
    }) */

    let [quantidade, setQuantidade] = useState()
    let [valor, setValor] = useState()


    const getItens = async (id) => {
        await axios.get(`${api}/item-produto/${id}`).then(
            (response) => {
                setData(response.data.ito)
                setQuantidade(response.data.ito.quantidade)
                setValor(response.data.ito.valor)
            }
        ).catch(() => {
            setStatus({
                type: 'error',
                message: "Erro: sem conexão com a API."
            })
            console.log("Erro: sem conexão com a API.")
        })
    }

    const getDataItem = async (cId, pId) => {
        if (editAtivado !== false) {
            await axios.get(`${api}/item-compra-produto/${cId}/${pId}`).then(
                (response) => {

                    setQuantidade(response.data.ito[0].quantidade)
                    setValor(response.data.ito[0].valor)
                    console.log(response.data.ito[0])
                }
            ).catch(() => {
                setStatus({
                    type: 'error',
                    message: "Erro: sem conexão com a API."
                })
                console.log("Erro: sem conexão com a API.")
            })
        }
    }


    const delItem = async (idItemC, idItemP) => {
        console.log(idItemC, idItemP)
        const headers = {
            'Content-type': 'application/json'
        }

        if (window.confirm('Tem certeza que quer excluir esse item?')) {
            console.log('confirmado')
            await axios.delete(`${api}/excluir-item-compra/${idItemC}/${idItemP}`, { headers })
                .then((response) => {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    })
                    /* getItens(comId, cliId)
                    setAlo(true) */
                }).catch(() => {
                    setStatus({
                        type: 'error',
                        message: 'Erro: Não foi possível conexão com API'
                    })
                })
            getItens(id)
            setAlo(true)
        }
    }

    editAtivado = false


    const editOn = (CompId, ProId) => {
        getEData(CompId, ProId)
        setEditAtivado(true)
        setcId(CompId)
        setpId(ProId)
    }

    const editOff = () => {
        setEditAtivado(false)
        setcId(0)
        setpId(0)
    }

    const getEData = async (CompId, ProId) => {
        console.log(CompId, ProId)
        await axios.get(`${api}/item-compra-produto/${CompId}/${ProId}`)
            .then((response) => {
                setQuantidade(response.data.ito[0].quantidade)
                setValor(response.data.ito[0].valor)
            })
            .catch(() => {
                console.log("Erro: não foi possível acessar API.")
            })
        setcId(CompId)
        setpId(ProId)
    }

    const editItem = async (e, CompId, ProId, quantidade, valor) => {
        e.preventDefault()
        setEditAtivado(false)
        setcId(0)
        setpId(0)

        const headers = {
            'Content-Type': "application/json"
        }

        await axios.put(`${api}/editar-item-compra/${CompId}/${ProId}`, { quantidade, valor }, { headers }).then(response => {
            setStatus({
                type: 'success',
                message: response.data.message
            })
            // console.log(response.data.type)
            console.log(response.data.message)
        }).catch(() => {
            setStatus({
                type: 'error',
                message: 'Não foi possível acessar API.'
            })
        })
    }


    useEffect(() => {
        getItens(id);
        getDataItem(id, pId)// eslint-disable-next-line
    }, [id, pId])

    return (
        <div>
            <Container>
                <div>
                    <div>
                        <h1>Visualizar informações dos itens</h1>
                    </div>
                    <div className="m-auto p-2">
                        <Link to={"/listar-compras/"}
                            className="btn btn-outline-success btn-sm">
                            Compras
                        </Link>
                    </div>
                    {status.type === 'error' && alo === true ?
                        <Alert color="danger">
                            {status.message}
                        </Alert>
                        : ''}
                    {status.type === 'success' && alo === true ?
                        <Alert color="success">
                            {status.message}
                        </Alert> : ''}
                </div>
                <Table striped>
                    <thead>
                        <tr>
                            <th>Id da compra</th>
                            <th>Id do produto</th>
                            <th>Quantidade</th>
                            <th>Valor</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.ProdutoId}>
                                <td>{item.CompraId}</td>
                                <td>{item.ProdutoId}</td>

                                {item.CompraId !== cId ?
                                    <td>{item.quantidade}</td> : /* console.log(`id produto clicado: ${pId}. id do item da fila: ${item.ProdutoId}`) */
                                    <td>
                                        <Form className="w-70 p-2">
                                            <Input
                                                name="quantidade"
                                                placeholder="Quantidade"
                                                type="text"
                                                value={quantidade}
                                                onChange={e => setQuantidade(e.target.value)}
                                            />
                                        </Form>
                                    </td>
                                }

                                {item.CompraId !== cId ?
                                    <td>{item.valor}</td> :
                                    <td>
                                        <Form className="w-70 p-2">
                                            <Input
                                                name="valor"
                                                placeholder="Valor"
                                                type="text"
                                                value={valor}
                                                onChange={e => setValor(e.target.value)}
                                            />
                                        </Form>
                                    </td>
                                }
                                {item.CompraId !== cId && editAtivado !== true ?
                                    <td className="text-center">
                                        <span onClick={() => editOn(item.CompraId, item.ProdutoId)}
                                            className="btn btn-outline-warning btn-sm">
                                            Editar
                                        </span>

                                        <span className="btn btn-outline-danger btn-sm"
                                            onClick={() => delItem(item.CompraId, item.ProdutoId)}>Excluir</span>
                                    </td>
                                    :
                                    <td className="text-center">
                                        <span onClick={e => editItem(e, item.CompraId, item.ProdutoId, quantidade, valor)}
                                            className="btn btn-outline-success btn-sm">
                                            Confirmar
                                        </span>

                                        <span onClick={e => editOff()}
                                            className="btn btn-outline-danger btn-sm">
                                            Cancelar
                                        </span>
                                    </td>}
                            </tr>

                        ))}

                    </tbody>
                </Table>
            </Container>
        </div>
    )
}