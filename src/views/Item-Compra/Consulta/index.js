import axios from 'axios'
import '../../../style.css'
import { useEffect, useState } from 'react'
import { Container, Table, Alert, Form, FormGroup, Label, Input, Button } from "reactstrap"

import { api } from '../../../config'

export const ListarItensCompra = () => {

    let [alo, setAlo] = useState()
    let [cadAtivado, setCadAtivado] = useState()
    let [editAtivado, setEditAtivado] = useState()
    // let [idEdit, setIdEdit] = useState()
    let [cId, setcId] = useState()
    let [pId, setpId] = useState()
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    const [item, setItem] = useState({
        CompraId: '',
        ProdutoId: '',
        quantidade: '',
        valor: ''
    })

    let [quantidade, setQuantidade] = useState()
    let [valor, setValor] = useState()
    if (editAtivado === false){
        valor = 0
    }

    const valorInput = e => setItem({
        ...item, [e.target.name]: e.target.value
    })

    const cadOn = (alerto) => {
        if (cadAtivado !== true) {
            setCadAtivado(cadAtivado = true)
        } else {
            setCadAtivado(cadAtivado = false)
            setAlo(alo = alerto)
        }
    }

    const getItens = async () => {
        await axios.get(`${api}/listaitenscompras/`).then(
            (response) => {
                setData(response.data)
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
        if(editAtivado !== false)
        {await axios.get(`${api}/item-compra-produto/${cId}/${pId}`).then(
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
        })}
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
            getItens()
            setAlo(true)
        }
    }

    const cadItem = async e => {
        e.preventDefault()
        // setItem(item.CompraId = id)

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(`${api}/novoitemcompras`, item, { headers })
            .then((response) => {
                if (response.data.error) {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    })
                    console.log(status.message)
                } else {
                    setStatus({
                        type: 'success',
                        message: response.data.message
                    })
                }
            })
            .catch(() => {
                console.log('Erro! Sem conexão.')
            })

        console.log(status.type)
        getItens()
        cadOn(true)
        setItem({
            ProdutoId: '',
            CompraId: '',
            quantidade: '',
            valor: '',
        })
    }

    editAtivado = false
    

    const editOn = (CompId, ProId) => {
        getEData(CompId, ProId)
        setEditAtivado(true)
        setcId(CompId)
        setpId(ProId)
        // console.log(editAtivado)
        // console.log(CompId)
        // console.log(ProId)
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
        console.log(CompId, ProId, quantidade, valor)
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
        setAlo(true)
    }


    const alerta = () => {
        let alerto = false
        cadOn(alerto)
    }

    useEffect(() => {
        getItens();
        getDataItem(cId, pId)
        // eslint-disable-next-line
    }, [cId, pId])

    return (
        <div>
            <Container>
                <div>
                    <div>
                        <h1>Visualizar informações dos itens</h1>
                    </div>
                    <div className="m-auto p-2">
                        <span onClick={() => alerta()}
                            className="btn btn-outline-primary btn-sm">Cadastrar</span>


                        {cadAtivado === true ?
                            <Form className="d-flex flex-row mt-2 bg-light border-top border-primary" onSubmit={cadItem}>
                                <FormGroup className='d-flex flex-row'>

                                    <FormGroup className="w-70 p-2">
                                        <Label>
                                            Compra
                                        </Label>
                                        <Input
                                            name="CompraId"
                                            placeholder="Id da compra"
                                            type="text"
                                            onChange={valorInput}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup className="w-70 p-2">
                                        <Label>
                                            Produto
                                        </Label>
                                        <Input
                                            name="ProdutoId"
                                            placeholder="Id do produto"
                                            type="text"
                                            onChange={valorInput}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup className="w-70 p-2">
                                        <Label>
                                            Quantidade
                                        </Label>
                                        <Input
                                            name="quantidade"
                                            placeholder="Quantidade"
                                            type="text"
                                            onChange={valorInput}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup className="w-70 p-2">
                                        <Label>
                                            Valor do produto
                                        </Label>
                                        <Input
                                            name="valor"
                                            placeholder="Valor do produto"
                                            type="text"
                                            onChange={valorInput}
                                            required
                                        />
                                    </FormGroup>
                                </FormGroup>
                                <FormGroup className="h-50 d-flex my-auto mb-auto">
                                    <Button type="submit" outline color="primary">
                                        Cadastrar
                                    </Button>
                                    <Button type="reset" outline color="primary">
                                        Limpar
                                    </Button>
                                </FormGroup>
                            </Form> : ""}
                    </div>
                    {status.type === 'error' && cadAtivado !== true && alo === true ?
                        <Alert color="danger">
                            {status.message}
                        </Alert>
                        : ''}
                    {status.type === 'success' && cadAtivado !== true && alo === true ?
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
                            <tr key={item.ProdutoId+item.CompraId+item.valor}>
                                <td>{item.CompraId}</td>
                                <td>{item.ProdutoId}</td>

                                {item.ProdutoId !== pId || item.CompraId !== cId ?
                                    <td>{item.quantidade}</td> : /* console.log(`id produto clicado: ${pId}. id do item da fila: ${item.ProdutoId}`) */
                                    <td>
                                        <Form >
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

                                {item.ProdutoId !== pId || item.CompraId !== cId?
                                    <td>{item.valor}</td> : 
                                    <td className="fit">
                                        <Form>
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
                                {(item.ProdutoId !== pId || item.CompraId !== cId) && editAtivado !== true ?
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