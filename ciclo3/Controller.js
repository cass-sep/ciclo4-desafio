const express = require('express')
const cors = require('cors')

const {Sequelize} = require('./models')

const models = require('./models')

const app = express()
app.use(cors())
app.use(express.json())

let cliente = models.Cliente
let compra = models.Compra
let produto = models.Produto
let itemCompra = models.ItemCompra
let pedido = models.Pedido
let itemPedido = models.ItemPedido
let servico = models.Servico
let nProduto

// criação
    app.post('/novoclientes',async(req,res)=>{
        await cliente.create(
            req.body
        ).then(function(){
            return res.json({
                error:false,
                message:'Novo cliente criado com sucesso.'
            })
        }).catch(function(erro){
            return res.status(400).json({
                error:true,
                message:'Não foi possível conectar.'
            })
        })
    }) //http://localhost:3001/novoclientes

    app.post('/novoprodutos',async(req,res)=>{
        await produto.create(
            req.body
        ).then(function(){
            return res.json({
                error:false,
                message:'Novo produto criado com sucesso!'
            })
        }).catch(function(erro){
            return res.status(400).json({
                error:true,
                message:'Falha: Não foi possível conectar'
            })
        })
    }) //http://localhost:3001/novoprodutos

    app.post('/novacompras',async(req,res)=>{
         if(!await cliente.findByPk(req.body.ClienteId)){
            return res.json({
                error:true,
                message:'Cliente Inexistente.'
            })
        } else{
        await compra.create(
            req.body
        ).then(function(){
            return res.json({
                error:false,
                message:'Nova compra criada com sucesso!'
            })
        }).catch(function(erro){
            return res.status(400).json({
                error:true,
                message:'Falha: Não foi possível conectar'
            })
        })
    }
    }) //http://localhost:3001/novacompras

    app.post('/novoitemcompras',async(req,res)=>{
        
        await itemCompra.create(
            {
                CompraId: req.body.CompraId,
                ProdutoId: req.body.ProdutoId,
                quantidade: req.body.quantidade,
                valor: req.body.valor
            }
        ).then(function(){
            return res.json({
                error:false,
                message:'Novo item criado com sucesso!'
            })
        }).catch(function(erro){
            return res.status(400).json({
                error:true,
                message:'Você já adicionou este produto a sua lista de compra.'
            })
        })
    }) //http://localhost:3001/novoitemcompras

    app.post('/novoservicos',async(req,res)=>{
        await servico.create(
            req.body
        ).then(function(){
            return res.json({
                error:false,
                message:'Novo serviço criado com sucesso.'
            })
        }).catch(function(erro){
            return res.status(400).json({
                error:true,
                message:'Não foi possível conectar.'
            })
        })
    }) //http://localhost:3001/novoservicos

    app.post('/novopedidos',async(req,res)=>{
        await pedido.create(
            req.body
        ).then(function(){
            return res.json({
                error:false,
                message:'Novo pedido criado com sucesso.'
            })
        }).catch(function(erro){
            return res.status(400).json({
                error:true,
                message:'Não foi possível conectar.'
            })
        })
    }) //http://localhost:3001/novopedidos

    app.post('/novoitempedidos',async(req,res)=>{
        await itemPedido.create(
            req.body
        ).then(function(){
            return res.json({
                error:false,
                message:'Novo item criado com sucesso.'
            })
        }).catch(function(erro){
            return res.status(400).json({
                error:true,
                message:'Não foi possível conectar.'
            })
        })
    }) //http://localhost:3001/novoitempedidos


// consultas
    app.get('/listaclientes',async(req,res)=>{
        await cliente.findAll({raw:true}).then(function(listaclientes){
            return res.json(listaclientes)})
    }) //http://localhost:3001/listaclientes

    app.get('/listaclientes/:id/pedidos',async(req,res)=>{
        await pedido.findAll({
            where:{ClienteId:req.params.id}
        }).then((pedidos) =>{
            return res.json(pedidos)})
    }) //http://localhost:3001/listaclientes/:id/pedidos

    app.get('/listaprodutos',async(req,res)=>{
        await produto.findAll({raw:true}).then(function(listaprodutos){
            return res.json(listaprodutos)})
    }) //http://localhost:3001/listaprodutos

    app.get('/listacompras',async(req,res)=>{
        await compra.findAll({raw:true}).then(function(compras){
            return res.json(compras)})
    }) //http://localhost:3001/listacompras

    app.get('/listaitenscompras',async(req,res)=>{
        await itemCompra.findAll({raw:true}).then(function(listaitem){
            return res.json(listaitem)})
    }) //http://localhost:3001/listaitenscompras

    app.get('/listaservicos',async(req,res)=>{
        await servico.findAll().then(servicos =>{
            return res.json(servicos)})
    }) //http://localhost:3001/listaservicos

    app.get('/listaservicos/:id/pedidos',async(req,res)=>{
        await itemPedido.findAll({
            where:{ServicoId:req.params.id}
        }).then((itens) =>{
            return res.json(itens)})
    }) //http://localhost:3001/listaservicos/:id/pedidos

    app.get('/listapedidos',async(req,res)=>{
        await pedido.findAll({raw:true}).then(function(pedidos){
            return res.json(pedidos)})
    }) //http://localhost:3001/listapedidos

    app.get('/lista-itens-pedidos',async(req,res)=>{
        await itemPedido.findAll({raw:true}).then(function(iPedidos){
            return res.json(iPedidos)})
    }) //http://localhost:3001/listapedidos

    app.get('/listaitenspedido/:id',async(req,res)=>{
        await itemPedido.findAll({where:{PedidoId:req.params.id}}).then(function(itens){
            return res.json(itens)})
    }) //http://localhost:3001/listaitenspedido

    app.get('/pedido/:id',async(req,res)=>{
        await pedido.findByPk(req.params.id)
        .then(function(pedidos){
            return res.json({
                error:false,
                pedidos
            })
        }).catch(erro=>{
                return res.status(400).json({
                    error:true,
                    message:"Não foi possível acessar API."
                })
            })
    }) //http://localhost:3001/pedido/:id
    
    app.get('/cliente/:id',async(req,res)=>{
        await cliente.findByPk(req.params.id)
        .then(function(cliente){
            return res.json({
                error:false,
                cliente
            })
        }).catch(erro=>{
                return res.status(400).json({
                    error:true,
                    message:"Não foi possível acessar API."
                })
            })
    }) //http://localhost:3001/cliente/:id

    app.get('/item-pedido/:idSer/:idPe',async(req,res)=>{
        await itemPedido.findAll({
            where:Sequelize.and({ServicoId:req.params.idSer},{PedidoId:req.params.idPe})
        })
        .then(function(ito){
            return res.json({
                error:false,
                ito
            })
        }).catch(erro=>{
                return res.status(400).json({
                    error:true,
                    message:"Não foi possível acessar API."
                })
            })
    }) //http://localhost:3001/item-pedido/:id


    app.get('/compra/:id',async(req,res)=>{
        await compra.findByPk(req.params.id)
        .then(function(compras){
            return res.json({
                error:false,
                compras
            })
        }).catch(erro=>{
                return res.status(400).json({
                    error:true,
                    message:"Não foi possível acessar API."
                })
            })
    }) //http://localhost:3001/compra/:id

    app.get('/produto/:id',async(req,res)=>{
        await produto.findByPk(req.params.id)
        .then(function(produtos){
            return res.json({
                error:false,
                produtos
            })
        }).catch(erro=>{
                return res.status(400).json({
                    error:true,
                    message:"Não foi possível acessar API."
                })
            })
    }) //http://localhost:3001/produto/:id

    app.get('/item-compra/:idCom',async(req,res)=>{
        await itemCompra.findAll({where:{CompraId:req.params.idCom}})
        .then(function(ito){
            return res.json({
                error:false,
                ito
            })
        }).catch(erro=>{
                return res.status(400).json({
                    error:true,
                    message:"Não foi possível acessar API."
                })
            })
    }) //http://localhost:3001/item-compra/:idCom/:idPro

    app.get('/item-compra-produto/:idCom/:idPro',async(req,res)=>{
        await itemCompra.findAll({
            where:Sequelize.and({CompraId:req.params.idCom},{ProdutoId:req.params.idPro})
        })
        .then(function(ito){
            return res.json({
                error:false,
                message:"Item",
                ito
            })
        }).catch(erro=>{
                return res.status(400).json({
                    error:true,
                    message:"Não foi possível acessar API."
                })
            })
    }) //http://localhost:3001/item-compra/:idCom/:idPro

    app.get('/item-produto/:idPro',async(req,res)=>{
        await itemCompra.findAll({
            where:{ProdutoId:req.params.idPro}
        })
        .then(function(ito){
            return res.json({
                error:false,
                message:"Item",
                ito
            })
        }).catch(erro=>{
                return res.status(400).json({
                    error:true,
                    message:"Não foi possível acessar API."
                })
            })
    }) //http://localhost:3001/item-compra/:idCom/:idPro

    app.get('/compras-cliente/:id',async(req,res)=>{
        await compra.findAll({where:{ClienteId:req.params.id}})
        .then(function(compras){
            return res.json(compras)})
    }) //http://localhost:3001/compras-cliente/:id





                        // edição

    app.put('/editar-cliente/:id', async(req,res)=>{
        const cli = {
            id: req.params.id,
            nome: req.body.nome,
            endereco: req.body.endereco,
            cidade:req.body.cidade,
            uf:req.body.uf,
            nascimento:req.body.nascimento
        }

        await cliente.update(cli,{
            where:{id:req.params.id}
        }).then(cliente=>{
            return res.json({
                error:false,
                message:'Cliente atualizado com sucesso.',
                cliente
            })
        }).catch(erro=>{
            return res.status(400).json({
                error:true,
                message:'Não foi possível atualizar o cliente'
            })
        })
    })// http://localhost:3001/editar-cliente/:id

    app.put('/editar-pedido/:id', async(req,res)=>{
        const ped = {
            id: req.params.id,
            ClienteId: req.body.ClienteId,
            dataPedido: req.body.dataPedido
        }
        if(!await cliente.findByPk(req.body.ClienteId)){
            return res.status(400).json({
                error:true,
                message:"Este cliente não existe."
            })
        }
        await pedido.update(ped,{
            where:Sequelize.and({
                ClienteId:req.body.ClienteId,
                id:req.params.id})
        }).then(pedidos=>{
            return res.json({
                error:false,
                message:'Pedido atualizado com sucesso.',
                pedidos
            })
        }).catch(erro=>{
            return res.status(400).json({
                error:true,
                message:'Não foi possível atualizar o pedido'
            })
        })
    })// http://localhost:3001/editar-pedido/:id

    app.put('/editar-item-pedido/:idSer/:idPe',async(req,res)=>{
        const ito = {
            quantidade:req.body.quantidade,
            valor:req.body.valor
        }
        if(!await pedido.findByPk(req.params.idPe)){
            return res.status(400).json({
                error:true,
                message:"Este pedido não existe."
            })
        }
        if(!await servico.findByPk(req.params.idSer)){
            return res.status(400).json({
                error:true,
                message:"Este serviço não existe."
            })
        }
        await itemPedido.update(ito,{
            where:Sequelize.and({
                ServicoId:req.params.idSer,
                PedidoId:req.params.idPe})
        }).then(ito=>{
            return res.json({
                error:false,
                message:'Pedido atualizado com sucesso.',
                ito
            })
        }).catch(erro=>{
            return res.status(400).json({
                error:true,
                message:'Não foi possível atualizar o pedido'
            })
        })
    }) //http://localhost:3001/item-pedido/:id

    app.put('/editar-compra/:id', async(req,res)=>{
        const com = {
            id: req.params.id,
            data: req.body.dataC,
            ClienteId: req.body.ClienteId
        }
        /* if(!await cliente.findByPk(req.body.ClienteId)){
            return res.status(400).json({
                error:true,
                message:"Este cliente não existe."
            })
        } */
        await compra.update(com,{
            where:Sequelize.and({ClienteId:req.body.ClienteId},{id:req.params.id})
        }).then(compras=>{
            return res.json({
                error:false,
                message:compras,
                compras
            })
        }).catch(erro=>{
            return res.status(400).json({
                error:true,
                message:'Não foi possível atualizar o pedido'
            })
        })
    })// http://localhost:3001/editar-compra/:id

    app.put('/editar-produto/:id', async(req,res)=>{
        const pro = {
            id: req.params.id,
            nome: req.body.nome,
            descricao: req.body.descricao
        }
        if(!await produto.findByPk(req.params.id
        )){
            return res.json({
                error:false,
                message:"Produto não achado."
        })}

        await produto.update(pro,{
            where:{id:req.params.id}
        }).then(prod=>{
            return res.json({
                error:false,
                message:"Produto atualizado com sucesso.",
                prod
            })
        }).catch(erro=>{
            return res.status(400).json({
                error:true,
                message:'Não foi possível atualizar o produto.'
            })
        })
    })// http://localhost:3001/editar-produto/:id

    app.put('/editar-item-compra/:idCompra/:idProduto', async(req,res)=>{
        const pro = {
            CompraId: req.params.idCompra,
            ProdutoId: req.params.idProduto,
            quantidade: req.body.quantidade,
            valor: req.body.valor
        }
        if(!await produto.findByPk(req.params.idProduto
        )){
            return res.json({
                error:true,
                message:"Produto não encontrada."
        })}
        if(!await compra.findByPk(req.params.idCompra
        )){
            return res.json({
                error:true,
                message:"Compra não encontrada."
        })}

        await itemCompra.update(pro,{
            where:Sequelize.and({CompraId:req.params.idCompra},{ProdutoId:req.params.idProduto})
        }).then(prod=>{
            return res.json({
                error:false,
                message:"Produto atualizado com sucesso.",
                prod
            })
        }).catch(erro=>{
            return res.status(400).json({
                error:true,
                message:'Não foi possível atualizar o produto.'
            })
        })
    })// http://localhost:3001/editar-produto/:id






// exclusão
    app.delete('/excluirclientes/:id',async(req,res)=>{
        if(!await cliente.findByPk(req.params.id)){
            return res.status(400).json({
                error:true,
                message:'Esse cliente não existe!'
            })}
        await cliente.destroy({
            where:{id:req.params.id}
        }).then(()=>{
            return res.json({
                error:false,
                message:'Cliente excluído com sucesso.'
            })
        }).catch(erro=>{
            return res.status(400).json({
                error:true,
                message:'Não foi possível excluir cliente.'
            })
        })
    })// http://localhost:3001/excluirclientes

    app.delete('/excluirprodutos',async(req,res)=>{
        if(!await produto.findByPk(req.body.id)){
            return res.status(400).json({
                error:true,
                message:'Esse produto não existe!'
            })}
        await produto.destroy({
            where:{id:req.body.id}
        }).then(()=>{
            return res.json({
                error:false,
                message:'Produto excluído com sucesso.'
            })
        }).catch(erro=>{
            return res.status(400).json({
                error:true,
                message:'Não foi possível excluir produto.'
            })
        })
    })// http://localhost:3001/excluirprodutos

    app.delete('/excluircompras',async(req,res)=>{
        if(!await compra.findByPk(req.body.id)){
            return res.status(400).json({
                error:true,
                message:'Essa compra não existe!'
            })}
        await compra.destroy({
            where:{id:req.body.id}
        }).then(()=>{
            return res.json({
                error:false,
                message:'Compra excluída com sucesso.'
            })
        }).catch(erro=>{
            return res.status(400).json({
                error:true,
                message:'Não foi possível excluir compra.'
            })
        })
    })// http://localhost:3001/excluircompras


    app.delete('/excluir-compra/:id',async(req,res)=>{
        if(!await compra.findByPk(req.params.id)){
            return res.status(400).json({
                error:true,
                message:'Essa compra não existe!'
            })}
        await compra.destroy({
            where:{id:req.params.id}
        }).then(()=>{
            return res.json({
                error:false,
                message:'Compra excluída com sucesso.'
            })
        }).catch(erro=>{
            return res.status(400).json({
                error:true,
                message:'Não foi possível excluir compra.'
            })
        })
    })// http://localhost:3001/excluircompras

    
    app.delete('/excluiritenscompra',async(req,res)=>{
        if(!await compra.findByPk(req.body.CompraId)){
            return res.status(400).json({
                error:true,
                message:'Essa compra não existe!'
            })}
        if(!await produto.findByPk(req.body.Produtoid)){
            return res.status(400).json({
                error:true,
                message:'Esse produto não existe!'
            })}
        await itemCompra.destroy({
            where:Sequelize.and({CompraId:req.body.CompraId}, {ProdutoId:req.body.ProdutoId})
        }).then(()=>{
            return res.json({
                error:false,
                message:'Item excluído com sucesso.'
            })
        }).catch(erro=>{
            return res.status(400).json({
                error:true,
                message:'Não foi possível excluir item.'
            })
        })
    })// http://localhost:3001/excluiritenscompra

    app.delete('/excluirservicos/:id',async(req,res)=>{
        if(!await servico.findByPk(req.params.id)){
            return res.status(400).json({
                error:true,
                message:'Esse serviço não existe!'
            })}
        await servico.destroy({
            where:{id:req.params.id}
        }).then(()=>{
            return res.json({
                error:false,
                message:'Serviço excluído com sucesso.'
            })
        }).catch(erro=>{
            return res.status(400).json({
                error:true,
                message:'Não foi possível excluir serviço.'
            })
        })
    })// http://localhost:3001/excluirservicos

    app.delete('/excluir-pedido/:id',async(req,res)=>{
        if(!await pedido.findByPk(req.params.id)){
            return res.status(400).json({
                error:true,
                message:'Esse pedido não existe!'
            })}
        await pedido.destroy({
            where:{id:req.params.id}
        }).then(()=>{
            return res.json({
                error:false,
                message:'Pedido excluído com sucesso.'
            })
        }).catch(erro=>{
            return res.status(400).json({
                error:true,
                message:'Não foi possível excluir pedido.'
            })
        })
    })// http://localhost:3001/excluirpedidos/:id

    app.delete('/excluir-item-pedidos/:idSer/:idPe',async(req,res)=>{
        if(!await pedido.findByPk(req.params.idPe)){
            return res.status(400).json({
                error:true,
                message:'Esse pedido não existe!'
            })}
        if(!await servico.findByPk(req.params.idSer)){
            return res.status(400).json({
                error:true,
                message:'Esse Serviço não existe!'
            })}
        await itemPedido.destroy({
            where:Sequelize.and({PedidoId:req.params.idPe},{ServicoId:req.params.idSer})
        }).then(()=>{
            return res.json({
                error:false,
                message:'Item excluído com sucesso.'
            })
        }).catch(erro=>{
            return res.status(400).json({
                error:true,
                message:'Não foi possível excluir item.'
            })
        })
    }) // http://localhost:3001/excluir-item-pedidos/:idSer/:idPe
    
    app.delete('/excluir-produto/:id',async(req,res)=>{
        if(!await produto.findByPk(req.params.id)){
            return res.status(400).json({
                error:true,
                message:'Esse produto não existe!'
            })}
            await produto.destroy({
                where:{id:req.params.id}
            }).then(()=>{
                return res.json({
                    error:false,
                    message:'Produto excluído com sucesso.'
                })
            }).catch(erro=>{
                return res.status(400).json({
                    error:true,
                    message:'Não foi possível excluir produto.'
                })
            })
        })// http://localhost:3001/excluir-produto/:id
        
    app.delete('/excluir-item-compra/:idCompra/:idProduto',async(req,res)=>{
        if(!await compra.findByPk(req.params.idCompra)){
            return res.status(400).json({
                error:true,
                message:'Essa compra não existe!'
            })}
        if(!await produto.findByPk(req.params.idProduto)){
            return res.status(400).json({
                error:true,
                message:'Esse produto não existe!'
            })}
        await itemCompra.destroy({
            where:Sequelize.and({CompraId:req.params.idCompra},{ProdutoId:req.params.idProduto})
        }).then(()=>{
            return res.json({
                error:false,
                message:'Item excluído com sucesso.'
            })
        }).catch(erro=>{
            return res.status(400).json({
                error:true,
                message:'Não foi possível excluir item.'
            })
        })
    }) // http://localhost:3001/excluir-item-compra/:idCompra/:idProduto
        




let port = process.env.PORT || 3001

app.listen(port, (req,res)=>{
    console.log('Servidor ativo: http://localhost:3001')
})