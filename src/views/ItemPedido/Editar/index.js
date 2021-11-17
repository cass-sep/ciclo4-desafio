import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Alert, Button, Container, Form, FormGroup, Input, Label } from "reactstrap"
import { api } from "../../../config"

export const EditarItemP = (props) => {

    const [PedidoId, setPedidoId] = useState(props.match.params.PedidoId)
    const [ServicoId, setServicoId] = useState(props.match.params.ServicoId)
    const io = useState(props.match.params.ServicoId)
    const oi = useState(props.match.params.PedidoId)
    const [quantidade, setQuantidade] = useState()
    const [valor, setValor] = useState()

    const [status, setStatus] = useState({
        type:'',
        message:''
    })

    const editItemPedido = async e =>{
        e.preventDefault()

        const headers = {
            'Content-Type':"application/json"
        }

        await axios.put(`${api}/editar-item-pedido/${ServicoId}/${PedidoId}`,{
            quantidade, valor
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
        
        const getItemPedido = async ()=>{
            await axios.get(`${api}/item-pedido/${io[0]}/${oi[0]}`)
            .then((response)=>{
                setServicoId(response.data.ito[0].ServicoId)
                setPedidoId(response.data.ito[0].PedidoId)
                setQuantidade(response.data.ito[0].quantidade)
                setValor(response.data.ito[0].valor)
            })
            .catch(()=>{
                console.log("Erro: não foi possível acessar API.")
            })
        }
        getItemPedido()
        // eslint-disable-next-line
    },[])
    
    return (
        <Container>
            <div className="d-flex">
                <div className="m-auto p-2">
                    <h1>Editar item pedido</h1>
                </div>
                <div className="p-2">
                    <Link to='/listar-itens-pedidos'
                        className="btn btn-outline-success btn-sm">
                        Itens pedidos</Link>
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

            <Form className="p-2" onSubmit={editItemPedido}>
                <FormGroup className="p-2">
                    <Label>
                        Id do Pedido
                    </Label>
                    <Input
                        name="PedidoId"
                        placeholder="Id do Pedido"
                        type="text"
                        defaultValue={PedidoId}
                    />
                </FormGroup>

                <FormGroup className="p-2">
                    <Label>
                        Id do Serviço
                    </Label>
                    <Input
                        name="ServicoId"
                        placeholder="Id do serviço"
                        type="text"
                        defaultValue={ServicoId}
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
                        value={quantidade}
                        onChange={e => setQuantidade(e.target.value)}
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
                        value={valor}
                        onChange={e => setValor(e.target.value)}
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