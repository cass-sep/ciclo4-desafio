import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config"

export const CadastrarClientes = () => {

    const [cliente, setCliente] = useState({
        nome: '',
        endereco: '',
        cidade:'',
        uf:'',
        nascimento:''
    })

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const valorInput = e => setCliente({
        ...cliente, [e.target.name]: e.target.value
    })

    const cadCliente = async e => {
        e.preventDefault()
        console.log(cliente)

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(`${api}/novoclientes`, cliente, { headers })
            .then((response) => {
                // console.log(response.data.message)
                if (response.data.error) {
                    setStatus({
                        type: 'error',
                        message: response.data.message
                    })
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
    }

    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Cadastrar clientes</h1>
                </div>
                <div className="p-2">
                    <Link to='/listar-clientes'
                        className="btn btn-outline-success btn-sm">
                        Cliente</Link>
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

            <Form className="p-2" onSubmit={cadCliente}>
                <FormGroup className="p-2">
                    <Label>
                        Nome
                    </Label>
                    <Input
                        name="nome"
                        placeholder="Nome"
                        type="text"
                        onChange={valorInput}
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
                        onChange={valorInput}
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
                        onChange={valorInput}
                    />
                </FormGroup>
                
                <FormGroup className="p-2">
                    <Label>
                        UF
                    </Label>
                    <Input
                        name="uf"
                        placeholder="Estado"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>
                        Data de Nascimento
                    </Label>
                    <Input
                        name="nascimento"
                        placeholder="Data de nascimento"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>

                <FormGroup className="d-flex">
                    <Button type="submit" outline color="primary">
                        Cadastrar
                    </Button>
                    <Button type="reset" outline color="primary">
                        Limpar
                    </Button>
                </FormGroup>
            </Form>
        </Container>
    )
}