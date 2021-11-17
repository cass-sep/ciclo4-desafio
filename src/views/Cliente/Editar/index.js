import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config"

export const EditarCliente = (props) =>{

    const [id, setId] = useState(props.match.params.id)
    const [nome, setNome] = useState('')
    const [endereco, setEndereco] = useState('')
    const [cidade, setCidade] = useState('')
    const [uf, setUf] = useState('')
    const [nascimento, setNascimento] = useState('')

    const [status, setStatus] = useState({
        type:'',
        message:''
    })

    const editCliente = async e =>{
        e.preventDefault()

        const headers = {
            'Content-Type':"application/json"
        }

        await axios.put(`${api}/editar-cliente/${id}`,{
            id, nome, endereco, cidade, uf, nascimento
        }, {headers}).then(response=>{
            setStatus({
                type:'success',
                message:'Alteração feita com sucesso.'
            })
            console.log(response.data.type)
            console.log(response.data.message)})
            .catch(()=>{
                setStatus({
                    type:'error',
                    message:'Não foi possível acessar API.'
                })
            })

    }

    useEffect(()=>{
        const getCliente = async ()=>{
            await axios(`${api}/cliente/${id}`)
            .then((response)=>{   
                setId(response.data.cliente.id)
                setNome(response.data.cliente.nome)
                setEndereco(response.data.cliente.endereco)
                setCidade(response.data.cliente.cidade)
                setUf(response.data.cliente.uf)
                setNascimento(response.data.cliente.nascimento)
            })
            .catch(()=>{
                console.log("Erro: não foi possível acessar API.")
            })
        }
        getCliente()
    },[id])

    return (
        <Container>
        <div className="d-flex">
            <div className="m-auto p-2">
                <h1>Editar Cliente</h1>
            </div>
            <div className="p-2">
                <Link to='/listar-clientes'
                    className="btn btn-outline-success btn-sm">
                    Clientes</Link>
            </div>
        </div>

        <hr className="m-1" />

        {status.type === 'error' ?
            <Alert color="danger">
                {status.message}
            </Alert> : ''}
        {status.type === 'success' ?
            <Alert color="success">
                {status.message}
            </Alert> : ''}
        
        <Form className="p-2" onSubmit={editCliente}>
            <FormGroup className="p-2">
                <Label>
                    Id do Cliente
                </Label>
                <Input
                    name="id"
                    placeholder="Id do cliente"
                    type="text"
                    defaultValue={id}
                />
            </FormGroup>

            <FormGroup className="p-2">
                    <Label>
                        Nome
                    </Label>
                    <Input
                        name="nome"
                        placeholder="Nome"
                        type="text"
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    />
                </FormGroup>

            <FormGroup className="p-2">
                    <Label>
                        Endereço
                    </Label>
                    <Input
                        name="endereco"
                        placeholder="Endereço"
                        type="text"
                        value={endereco}
                        onChange={e => setEndereco(e.target.value)}
                    />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>
                        Cidade
                    </Label>
                    <Input
                        name="cidade"
                        placeholder="Cidade"
                        type="text"
                        value={cidade}
                        onChange={e => setCidade(e.target.value)}
                    />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>
                        UF
                    </Label>
                    <Input
                        name="uf"
                        placeholder="Uf"
                        type="text"
                        value={uf}
                        onChange={e => setUf(e.target.value)}
                    />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>
                        Nascimento
                    </Label>
                    <Input
                        name="nascimento"
                        placeholder="Nascimento"
                        type="text"
                        value={nascimento}
                        onChange={e => setNascimento(e.target.value)}
                    />
                </FormGroup>

                <FormGroup className="d-flex">
                    <Button type="submit" outline color="warning">
                        Alterar
                    </Button>
                    <Button type="reset" outline color="primary">
                        Limpar
                    </Button>
                </FormGroup>
            </Form>
        </Container>
    )
}