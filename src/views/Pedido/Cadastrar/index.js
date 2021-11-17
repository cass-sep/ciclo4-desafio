import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config"

export const CadastrarPedidos = () => {

    const [pedido, setPedido] = useState({
        id: '',
        ClienteId: '',
        dataPedido:'',
    })

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const valorInput = e => setPedido({
        ...pedido, [e.target.name]: e.target.value
    })

    const cadPedido = async e => {
        e.preventDefault()
        // console.log(cliente)

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(`${api}/novopedidos`, pedido, { headers })
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
                    <h1>Cadastrar pedidos</h1>
                </div>
                <div className="p-2">
                    <Link to='/listar-pedidos'
                        className="btn btn-outline-success btn-sm">
                        Pedidos</Link>
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

            <Form className="p-2" onSubmit={cadPedido}>
                <FormGroup className="p-2">
                    <Label>
                        Id do cliente
                    </Label>
                    <Input
                        name="ClienteId"
                        placeholder="Id do cliente"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>
                        Data do pedido
                    </Label>
                    <Input
                        name="dataPedido"
                        placeholder="Data do pedido"
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