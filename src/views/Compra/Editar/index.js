import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config"

export const EditarCompra = (props) => {

    const [id, setId] = useState(props.match.params.id)
    const [dataC, setDataC] = useState('')
    const [ClienteId, setClienteId] = useState('')

    const [status, setStatus] = useState({
        type:'',
        message:''
    })

    const editCompra = async e =>{
        e.preventDefault()

        const headers = {
            'Content-Type':"application/json"
        }

        await axios.put(`${api}/editar-compra/${id}`,{
            id, dataC, ClienteId
        }, {headers}).then(response=>{
            setStatus({
                type:'success',
                message:'Alteração feita com sucesso.'
            })
        }).catch(()=>{
            setStatus({
                type:'error',
                message:'Não foi possível acessar API.'
            })
        })
    }

    useEffect(()=>{
        const getCompra = async ()=>{
            await axios(`${api}/compra/${id}`)
            .then((response)=>{
                setId(response.data.compras.id)
                setDataC(response.data.compras.data)
                setClienteId(response.data.compras.ClienteId)
            })
            .catch(()=>{
                console.log("Erro: não foi possível acessar API.")
            })
        }
        getCompra()
    },[id])
    
    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Editar Compra</h1>
                </div>
                <div className="p-2">
                    <Link to='/listar-compras'
                        className="btn btn-outline-success btn-sm">
                        Compras</Link>
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

            <Form className="p-2" onSubmit={editCompra}>
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

                <FormGroup className="p-2">
                    <Label>
                        Id da compra
                    </Label>
                    <Input
                        name="id"
                        placeholder="Id da compra"
                        type="text"
                        defaultValue={id}
                    />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>
                        Data da compra
                    </Label>
                    <Input
                        name="data"
                        placeholder="Data do Pedido"
                        type="text"
                        value={dataC}
                        onChange={e => setDataC(e.target.value)}
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