import axios from "axios"
import { api } from "../config"

export const getCliente = async (id, data, status) => {
    await axios.get(`${api}/cliente/${id}`)
        .then((response) => {
            data(response.data.cliente)
            status({
                type: 'encontrado',
                message: 'Cliente encontrado.'
            })
        }).catch(() => {
            status({
                type: 'error',
                message: 'Não foi possível encontrar o cliente.'
            })
        })
}

// importar image profile na pasta src
// importar getCliente na pasta Components


// declarar variavel para guardar informações do cliente
/* const [infoC, setInfoC] = useState([]) */


// variavel para ativar e desativar informacoes
/* let [tOn, setTog] = useState()*/

// variavel pra saber qual botao foi apertado
/*let [oldId, setOldId] = useState()*/



// função que ativa e desativa informações
/* const cliAtivo = (id, setInfoC, setStatus) => {
    getCliente(id, setInfoC, setStatus)
    if (tOn !== true) {
        setTog(true)
        setOldId(id)
    } else if (id === oldId) {
        setTog(false)
    } else {
        setOldId(id)
    }
} */


// grid na div pai
/* <div className="d-grid p-2 c-col"> */

// com cadastro na página {cadAtivado !== true && tOn === true ?
// cadastro em outra página {tOn === true ?
/*    <div id="profile-c" className="d-flex c-place end">
        <table className="m-0 fit">
            <tbody id="info" className="d-grid p-2 fit">
                <tr><td>{infoC.nome}</td></tr>
                <tr><td>{infoC.endereco}</td></tr>
                <tr><td>{infoC.cidade}</td></tr>
                <tr><td>{infoC.uf}</td></tr>
                <tr><td>{infoC.nascimento}</td></tr>
            </tbody>
        </table>
        <div className="p-4 pt-2">
            <img id="pic" alt='profile' src={profile} />
        </div>

    </div> : <div></div>} */

    
// link para abrir info
/* <Link to="#"
    onClick={() => cliAtivo(item.ClienteId, setInfoC, setStatus)}>
    {item.ClienteId}
</Link> */


export const dropClientes = async (data, status) => {
    await axios.get(`${api}/listaclientes/`)
        .then((response) => {
            data(response.data)
        }).catch(() => {
            status({
                type: 'error',
                message: 'Não foi possível encontrar o cliente.'
            })
        })
}