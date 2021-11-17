// import logo from './logo.svg';
// import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Home } from './views/Home'
import { Menu } from './Components/Menu'
import { ListarClientes } from './views/Cliente/Listar';
import { CadastrarClientes } from './views/Cliente/Cadastrar';
import { EditarCliente } from './views/Cliente/Editar';
import { PedidosCliente } from './views/Cliente/Listar/Pedidos';
import { ListarServico } from './views/Servico/Listar';
import { CadastrarServicos } from './views/Servico/Criar';
import { PedidosServico } from './views/Servico/Listar/Item';
import { EditarPedido } from './views/Pedido/Editar';
import { ListarPedidos } from './views/Pedido/Listar';
import { CadastrarPedidos } from './views/Pedido/Cadastrar';
import { ItensPedido } from './views/ItemPedido/Listar/Consulta';
import { ListarItens } from './views/ItemPedido/Listar';
import { CadastrarItem } from './views/ItemPedido/Cadastrar';
import { EditarItemP } from './views/ItemPedido/Editar';
import { ListarCompras } from './views/Compra/Listar';
import { ListarProdutos } from './views/Produto/Listar';
import { CompraItens } from './views/Item-Compra/Compra';
import { ListarItensCompra } from './views/Item-Compra/Consulta';
import { ProdutoItens } from './views/Item-Compra/Produto';
import { ComprasCliente } from './views/Compra/Cliente';
import { EditarCompra } from './views/Compra/Editar';

function App() {
  return (
    <div className="App">
      <Router>
        {<Menu/>}
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/listar-clientes" component={ListarClientes}/>
          <Route path="/cadastrar-clientes" component={CadastrarClientes}/>
          <Route path="/editar-cliente/:id" component={EditarCliente}/>

          <Route path='/listar-servicos' component={ListarServico}/>
          <Route path='/cadastrar-servicos' component={CadastrarServicos}/> 

          <Route path='/listar-pedidos/' component={ListarPedidos}/>
          <Route path='/cadastrar-pedidos' component={CadastrarPedidos}/> 
          <Route path='/editar-pedido/:id' component={EditarPedido}/>
          <Route path='/pedidos-servico/:id' component={PedidosServico}/> 
          <Route path='/pedidos-cliente/:id' component={PedidosCliente}/> 

          <Route path='/listar-itens-pedidos/' component={ListarItens}/>
          <Route path='/cadastrar-item-pedidos' component={CadastrarItem}/> 
          <Route path='/itens-pedido/:id' component={ItensPedido}/>
          <Route path='/editar-itempedido/:ServicoId/:PedidoId' component={EditarItemP}/>

          <Route path='/listar-compras/' component={ListarCompras}/>
          <Route path='/compras-cliente/:id' component={ComprasCliente}/>
          <Route path='/editar-compra/:id' component={EditarCompra}/>

          <Route path='/listar-produtos/' component={ListarProdutos}/>

          <Route path='/listar-itens-compras/' component={ListarItensCompra}/>
          <Route path='/itens-compra/:id/' component={CompraItens}/>
          <Route path='/itens-produto/:id/' component={ProdutoItens}/>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
