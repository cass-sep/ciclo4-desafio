import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config"

export const EditarPedido = (props) => {

    const [id, setId] = useState(props.match.params.id)
    const [dataPedido, setData] = useState('')
    const [ClienteId, setClienteId] = useState('')

    const [status, setStatus] = useState({
        type:'',
        message:''
    })

    const editPedido = async e =>{
        e.preventDefault()

        const headers = {
            'Content-Type':"application/json"
        }

        await axios.put(`${api}/editar-pedido/${id}`,{
            id, dataPedido, ClienteId
        }, {headers}).then(response=>{
            setStatus({
                type:'success',
                message:'Alteração feita com sucesso.'
            })
            console.log(response.data.type)
            console.log(response.data.message)
        }).catch(()=>{
            setStatus({
                type:'error',
                message:'Não foi possível acessar API.'
            })
        })
    }

    useEffect(()=>{
        const getPedido = async ()=>{
            await axios(`${api}/pedido/${id}`)
            .then((response)=>{
                setId(response.data.pedidos.id)
                setData(response.data.pedidos.dataPedido)
                setClienteId(response.data.pedidos.ClienteId)
            })
            .catch(()=>{
                console.log("Erro: não foi possível acessar API.")
            })
        }
        getPedido()
    },[id])
    
    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Editar Pedido</h1>
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

            <Form className="p-2" onSubmit={editPedido}>
                <FormGroup className="p-2">
                    <Label>
                        Id do Pedido
                    </Label>
                    <Input
                        name="id"
                        placeholder="Id do Pedido"
                        type="text"
                        defaultValue={id}
                    />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>
                        Data do Pedido
                    </Label>
                    <Input
                        name="data"
                        placeholder="Data do Pedido"
                        type="text"
                        value={dataPedido}
                        onChange={e => setData(e.target.value)}
                    />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>
                        Id do Cliente
                    </Label>
                    <Input
                        name="ClienteId"
                        placeholder="Id do cliente"
                        type="text"
                        defaultValue={ClienteId}
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