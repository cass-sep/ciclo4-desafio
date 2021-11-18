import { Container } from "reactstrap"
import './style.css'

export const Home = () => {
    return (
        <div>
            <Container>
                <div className="d-flex justify-content-center">
                    <h1>Home</h1>
                </div>
                <div className="d-flex gap-3 p-2 justify-content-center">
                    <a href='/listar-clientes' 
                    className="btn btn-outline-success btn-sm">
                        Clientes
                    </a>
                    <a href='/listar-pedidos' 
                    className="btn btn-outline-success btn-sm">
                        Pedidos
                    </a>
                    <a href='/listar-servicos' 
                    className="btn btn-outline-success btn-sm">
                        Serviços
                    </a>
                    <a href='/listar-itens-pedidos/' 
                    className="btn btn-outline-success btn-sm">
                        Itens Pedidos
                    </a>
                    <a href='/listar-compras/' 
                    className="btn btn-outline-success btn-sm">
                        Compras
                    </a>
                    <a href='/listar-produtos/' 
                    className="btn btn-outline-success btn-sm">
                        Produtos
                    </a>
                    <a href='/listar-itens-compras/' 
                    className="btn btn-outline-success btn-sm">
                        Itens Compras
                    </a>
                    
                </div>
            </Container>
        </div>
    )
}