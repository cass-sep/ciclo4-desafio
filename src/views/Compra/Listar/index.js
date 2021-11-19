import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Container, Table, Alert, Form, FormGroup, Label, Input, Button, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap"
import { dropClientes, getCliente } from '../../../Components/get-cliente'
import profile from '../../../profile.png'
import '../../../cliente-style.css'

import { api } from '../../../config'

export const ListarCompras = () => {

    let [alo, setAlo] = useState()
    let [cadAtivado, setCadAtivado] = useState()
    let [editAtivado, setEditAtivado] = useState()
    let [idEdit, setIdEdit] = useState()
    let empty

    const [infoC, setInfoC] = useState([])

    // variavel para ativar e desativar informacoes
    let [tOn, setTog] = useState()

    // variavel pra saber qual botao foi apertado
    let [oldId, setOldId] = useState()

    const [listaClientes, setListaClientes] = useState([])

    const [data, setData] = useState([])
    const [status, setStatus] = useState({
        type: '',
        message: ''
    })
    const [compra, setCompra] = useState({
        id: '',
        ClienteId: '',
        data: ''
    })

    let [daCo, setDaco] = useState()

    const valorInput = e => setCompra({
        ...compra, [e.target.name]: e.target.value
    })

    const cadOn = (alerto) => {
        if (cadAtivado !== true) {
            setCadAtivado(cadAtivado = true)
        } else {
            setCadAtivado(cadAtivado = false)
            setAlo(alo = alerto)
        }
    }



    // função que ativa e desativa informações
    const cliAtivo = (id, setInfoC, setStatus) => {
        if (tOn !== true) {
            setInfoC([''])
            getCliente(id, setInfoC, setStatus)
            setTog(true)
            setOldId(id)
        } else if (id === oldId) {
            setTog(false)
        } else {
            setOldId(id)
            getCliente(id, setInfoC, setStatus)
        }
    }
    
    

    const getCompras = async () => {
        await axios.get(api + '/listacompras').then(
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


    const getDataCompra = async (id) => {
        await axios.get(`${api}/compra/${id}`).then(
            (response) => {

                setDaco(response.data.data)

            }
        ).catch(() => {
            setStatus({
                type: 'error',
                message: "Erro: sem conexão com a API."
            })
            console.log("Erro: sem conexão com a API.")
        })
    }



    const delCompra = async (idCompra) => {
        console.log(idCompra)

        const headers = {
            'Content-type': 'application/json'
        }

        if (window.confirm('Tem certeza que deseja excluir esta compra?')) {
            await axios.delete(`${api}/excluir-compra/${idCompra}`, { headers })
                .then((response) => {
                    // console.log(response.data.type)
                    // console.log(response.data.message)
                    setStatus({
                        type: 'error',
                        message: "Compra excluída com sucesso."
                    })
                    getCompras()
                    setAlo(true)
                }).catch(() => {
                    setStatus({
                        type: 'error',
                        message: 'Erro: Não foi possível conexão com API'
                    })
                })
        }
    }

    const cadCompra = async e => {
        e.preventDefault()
        console.log(compra.ClienteId)

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(`${api}/novacompras`, compra, { headers })
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
        getCompras()
        cadOn(true)
        setTog(false)
        setCompra({
            id: '',
            ClienteId: '',
            data: ''
        })
    }

    editAtivado = false

    const editOn = (editId) => {
        setDaco(empty)
        getDaco(editId)
        // getDataCompra(editId)
        setEditAtivado(editAtivado = true)
        setIdEdit(idEdit = editId)
        // setDaco(comData)
        console.log(editAtivado)
        // console.log(editId)
        // console.log(daCo)
    }

    const editOff = () => {
        setEditAtivado(false)
        setIdEdit(0)
    }

    const getDaco = async (id) => {
        await axios(`${api}/compra/${id}`)
            .then((response) => {
                setDaco(response.data.compras.data)
                // console.log(response.data.compras.data)
            })
            .catch(() => {
                console.log("Erro: não foi possível acessar API.")
            })
        setIdEdit(id)
        console.log(idEdit)
    }

    const editCompra = async (e, id, dataC, ClienteId) => {
        e.preventDefault()
        setEditAtivado(false)
        setIdEdit(0)
        setDaco(empty)


        const headers = {
            'Content-Type': "application/json"
        }

        await axios.put(`${api}/editar-compra/${id}`, { dataC, ClienteId }, {

        }, { headers }).then(response => {
            setStatus({
                type: 'success',
                message: 'Alteração feita com sucesso.'
            })
        }).catch(() => {
            setStatus({
                type: 'error',
                message: 'Não foi possível alterar informação.'
            })
        })
    }

    const alerta = () => {
        let alerto = false
        cadOn(alerto)
        dropClientes(setListaClientes, setStatus)
    }

    useEffect(() => {
        getCompras();
        getDataCompra()
    }, [idEdit])

    return (
        <div>
            <Container>
                <div className="d-grid p-2 c-col">
                    <div>
                        <h1>Visualizar informações das compras</h1>

                        <div className="p-2">
                            <span onClick={() => alerta()}
                                className="btn btn-outline-primary btn-sm">
                                Cadastrar
                            </span>

                            {cadAtivado === true ?
                                <Form className="d-flex flex-row mt-2 bg-light border-top border-primary" onSubmit={cadCompra}>
                                    <FormGroup className='d-flex flex-row'>
                                        <FormGroup className="w-70 p-2">
                                            <Label>
                                                Id do Cliente
                                            </Label>
                                            <UncontrolledDropdown >
                                                {!compra.ClienteId ?
                                                <DropdownToggle caret className="bg-primary border-0">
                                                     Clientes
                                                </DropdownToggle>: <DropdownToggle className="px-4 mx-2 bg-primary border-0" caret>
                                                     {compra.ClienteId}
                                                </DropdownToggle>}
                                                <DropdownMenu>
                                                    {listaClientes.map(item => (
                                                        <DropdownItem key={item.id} onClick={e => setCompra({
                                                            ...compra, 'ClienteId': e.target.value
                                                        })} value={item.id}>{item.id}</DropdownItem>
                                                    ))}
                                                </DropdownMenu>
                                            </UncontrolledDropdown>
                                        </FormGroup>
                                        <FormGroup className="w-70 p-2">
                                            <Label>
                                                Data da Compra
                                            </Label>
                                            <Input
                                                name="data"
                                                placeholder="Data da compra"
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
                                        <Button type="reset" outline color="primary" onClick={e => setCompra({
                                            ...compra, 'ClienteId': undefined
                                        })}>
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

                    {cadAtivado !== true && tOn === true?
                        <div id="profile-c" className="d-flex c-place end">
                            <table className="m-0 fit">
                                <tbody id="info" className="d-grid p-2 fit">
                                    <tr><td>{infoC.nome}</td></tr>
                                    <tr><td>{infoC.endereco}</td></tr>
                                    <tr><td>{infoC.cidade}</td></tr>
                                    <tr><td>{infoC.uf}</td></tr>
                                    <tr><td>{infoC.nascimento}</td></tr>
                                </tbody>
                            </table>
                            <div className="p-4 pt-2">
                                {infoC === empty ? '':<img id="pic" alt='' src={profile} />}
                            </div>

                        </div> : <div></div>}
                </div>

                <Table striped>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Id do Cliente</th>
                            <th>Data</th>
                            <th>Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>
                                    <Link
                                        to="#"
                                        onClick={() => cliAtivo(item.ClienteId, setInfoC, setStatus)}>
                                        {item.ClienteId}
                                    </Link>
                                </td>
                                {item.id !== idEdit ? <td>{item.data}</td> :
                                    <td>
                                        <Form>
                                            <Input
                                                name="data"
                                                placeholder=""
                                                type="text"
                                                value={daCo}
                                                onChange={e => setDaco(e.target.value)}
                                            />
                                        </Form>
                                    </td>
                                }
                                {item.id !== idEdit && editAtivado !== true ?
                                    <td className="text-center">
                                        <Link to={`/itens-compra/${item.id}`}
                                            className="btn btn-outline-primary btn-sm">
                                            Itens
                                        </Link>
                                        <span onClick={() => editOn(item.id)}
                                            className="btn btn-outline-warning btn-sm">
                                            Editar
                                        </span>

                                        <span className="btn btn-outline-danger btn-sm"
                                            onClick={() => delCompra(item.id)}>Excluir</span>
                                    </td> :
                                    <td className="text-center">
                                        <span onClick={e => editCompra(e, item.id, daCo, item.ClienteId)}
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