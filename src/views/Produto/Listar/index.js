import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Table, Alert, Form, FormGroup, Label, Input, Button } from "reactstrap"

import { api } from '../../../config'

export const ListarProdutos = () => {

    let [alo, setAlo] = useState()
    let [cadAtivado, setCadAtivado] = useState()
    let [editAtivado, setEditAtivado] = useState()
    let [idEdit, setIdEdit] = useState()
    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    const [produto, setProduto] = useState({
        id: '',
        nome: '',
        descricao: ''
    })

    let [descricao, setDescricao] = useState()
    let [nome, setNome] = useState()

    const valorInput = e => setProduto({
        ...produto, [e.target.name]: e.target.value
    })

    const cadOn = (alerto) => {
        if (cadAtivado !== true) {
            setCadAtivado(cadAtivado = true)
        } else {
            setCadAtivado(cadAtivado = false)
            setAlo(alo = alerto)
        }
    }

    const getProdutos = async () => {
        await axios.get(api + '/listaprodutos').then(
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


    const getDataProdutos = async (id) => {
        await axios.get(`${api}/produto/${id}`).then(
            (response) => {

                setDescricao(response.data.descricao)
                setNome(response.data.nome)

            }
        ).catch(() => {
            setStatus({
                type: 'error',
                message: "Erro: sem conexão com a API."
            })
            console.log("Erro: sem conexão com a API.")
        })
    }


    const delProduto = async (idProduto) => {
        console.log(idProduto)
        const headers = {
            'Content-type': 'application/json'
        }

        if (window.confirm('Tem certeza que quer excluir esse produto?')) {
            console.log('confirmado')
            await axios.delete(`${api}/excluir-produto/${idProduto}`, { headers })
                .then((response) => {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    })
                    getProdutos()
                    setAlo(true)
                }).catch(() => {
                    setStatus({
                        type: 'error',
                        message: 'Erro: Não foi possível conexão com API'
                    })
                })
        }
    }

    const cadProduto = async e => {
        e.preventDefault()

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(`${api}/novoprodutos`, produto, { headers })
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
        getProdutos()
        cadOn(true)
        setProduto({
            id: '',
            nome: '',
            descricao: ''
        })
    }

    editAtivado = false

    const editOn = (editId) => {
        getEData(editId)
        // getDataCompra(editId)
        setEditAtivado(editAtivado = true)
        setIdEdit(idEdit = editId)
        // setDaco(comData)
        console.log(editAtivado)
        console.log(descricao)
        console.log(nome)
        // console.log(editId)
        // console.log(daCo)
    }

    const editOff = ()=>{
        setEditAtivado(false)
        setIdEdit(0)
    }

    const getEData = async (id) => {
        await axios(`${api}/produto/${id}`)
            .then((response) => {
                setNome(response.data.produtos.nome)
                setDescricao(response.data.produtos.descricao)
            })
            .catch(() => {
                console.log("Erro: não foi possível acessar API.")
            })
        setIdEdit(id)
        console.log(idEdit)
    }

    const editProduto = async (e, id, nome, descricao) => {
        e.preventDefault()
        setEditAtivado(false)
        setIdEdit(0)

        const headers = {
            'Content-Type': "application/json"
        }

        await axios.put(`${api}/editar-produto/${id}`, { nome, descricao }, { headers }).then(response => {
            setStatus({
                type: 'success',
                message: 'Alteração feita com sucesso.'
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

    const alerta = () => {
        let alerto = false
        cadOn(alerto)
    }

    useEffect(() => {
        getProdutos();
        getDataProdutos(idEdit)
    }, [idEdit])

    return (
        <div>
            <Container>
                <div>
                    <div>
                        <h1>Visualizar informações dos produtos</h1>
                    </div>
                    <div className="m-auto p-2">
                        <span onClick={() => alerta()}
                            className="btn btn-outline-primary btn-sm">Cadastrar</span>


                        {cadAtivado === true ?
                            <Form className="d-flex flex-row mt-2 bg-light border-top border-primary" onSubmit={cadProduto}>
                                <FormGroup className='d-flex flex-row'>

                                    <FormGroup className="w-70 p-2">
                                        <Label>
                                            Nome do produto
                                        </Label>
                                        <Input
                                            name="nome"
                                            placeholder="Nome"
                                            type="text"
                                            onChange={valorInput}
                                            required
                                        />
                                    </FormGroup>
                                    <FormGroup className="w-70 p-2">
                                        <Label>
                                            Descrição do Produto
                                        </Label>
                                        <Input
                                            name="descricao"
                                            placeholder="Descrição"
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
                            <th>Id</th>
                            <th>Nome do produto</th>
                            <th>Descrição</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>

                                {item.id !== idEdit ?
                                    <td>{item.nome}</td> :
                                    <td>
                                        <Form className="w-70 p-2">
                                            <Input
                                                name="nome"
                                                placeholder="Nome"
                                                type="text"
                                                value={nome}
                                                onChange={e => setNome(e.target.value)}
                                            />
                                        </Form>
                                    </td>
                                }

                                {item.id !== idEdit ?
                                    <td>{item.descricao}</td> :
                                    <td>
                                        <Form className="w-70 p-2">
                                            <Input
                                                name="descricao"
                                                placeholder="Descrição"
                                                type="text"
                                                value={descricao}
                                                onChange={e => setDescricao(e.target.value)}
                                            />
                                        </Form>
                                    </td>
                                }
                                {item.id !== idEdit && editAtivado !== true ?
                                    <td className="text-center">
                                        <Link to={"/itens-produto/" + item.id}
                                            className="btn btn-outline-primary btn-sm">
                                            Compras
                                        </Link>
                                        <span onClick={() => editOn(item.id)}
                                            className="btn btn-outline-warning btn-sm">
                                            Editar
                                        </span>

                                        <span className="btn btn-outline-danger btn-sm"
                                            onClick={() => delProduto(item.id)}>Excluir</span>
                                    </td>
                                    :
                                    <td className="text-center">
                                        <span onClick={e => editProduto(e, item.id, nome, descricao)}
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