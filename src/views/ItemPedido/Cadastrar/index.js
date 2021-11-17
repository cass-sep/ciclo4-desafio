import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config"

export const CadastrarItem = () => {

    const [item, setItem] = useState({
        PedidoId: '',
        ServicoId: '',
        quantidade:'',
        valor:'',
    })

    const [status, setStatus] = useState({
        type: '',
        message: ''
    })

    const valorInput = e => setItem({
        ...item, [e.target.name]: e.target.value
    })

    const cadItem = async e => {
        e.preventDefault()
        console.log(item)

        const headers = {
            'Content-Type': 'application/json'
        }

        await axios.post(`${api}/novoitempedidos`, item, { headers })
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
                    <h1>Cadastrar Item</h1>
                </div>
                <div className="p-2">
                    <Link to='/listar-itens-pedidos'
                        className="btn btn-outline-success btn-sm">
                        Itens Pedidos</Link>
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

            <Form className="p-2" onSubmit={cadItem}>
                <FormGroup className="p-2">
                    <Label>
                        Id do Pedido
                    </Label>
                    <Input
                        name="PedidoId"
                        placeholder="Id do Pedido"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>
                        Id do Serviço
                    </Label>
                    <Input
                        name="ServicoId"
                        placeholder="Id do Serviço"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>
                        Quantidade
                    </Label>
                    <Input
                        name="quantidade"
                        placeholder="Quantidade"
                        type="text"
                        onChange={valorInput}
                    />
                </FormGroup>
                
                <FormGroup className="p-2">
                    <Label>
                        Valor
                    </Label>
                    <Input
                        name="valor"
                        placeholder="Valor"
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