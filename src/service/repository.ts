import { Database } from "sqlite3";

const db = new Database('CookClock');

db.prepare(
    `CREATE TABLE IF NOT EXISTS geladeira (
        id TEXT PRIMARY KEY NOT NULL
        nome TEXT NOT NULL,
        quantidade INTEGER NOT NULL,
        data_de_validade TEXT NOT NULL

    )`
).run();



export function PrepararPraSalvar(nome: string, quantidade: number, dataDeValidade: Date){

    const hoje = new Date

    if (dataDeValidade < hoje || dataDeValidade == undefined){
        throw new Error("insira uma data válida")
    }
    if (Number.isInteger(quantidade) || quantidade < 0){
        throw new Error("insira uma quantidade válida")
    }
    if (!nome || nome.trim() === ""){
        throw new Error("insira um nome")
    }

    const dataTraduzida = dataDeValidade.toLocaleDateString('pt-BR')
    const dataSalva = dataTraduzida.toString()

    const id = (nome + dataSalva)

    const valido: (string | number)[] = [id,nome,quantidade,dataSalva]

    return valido
}
export function PrepararRetorno(nome:string , quantidade: number, dataEmString:string){

    const regex = "/(\d{2})\/(\d{2})\/(\d{4})/"

    const resultado = dataEmString.match(regex)

    if (resultado){

        const [dia, mes, ano] = resultado.slice(1)

        const convertidos: number[] = [parseInt(dia), parseInt(mes), parseInt(ano)]

        const dataRecebida = new Date(convertidos[2],convertidos[1],convertidos[0])

        const dataTraduzida = dataRecebida.toLocaleDateString('pt-BR')

        const retorno: (string | number | Date)[] = [nome, quantidade, dataTraduzida]  

        return retorno
    }
}
export function Deletar(id: string){

    db.run(`DELETE FROM geladira WHERE id = ?`, [id], function(err) {
        if (err){
            console.log(err.message)
        } else if (this.changes === 0){
            console.log("Nada encontrado para deletar")
        } else {
            console.log("deletado com sucesso")
        }
    })
}
export function Salvar(nome: string, quantidade: number, dataDeValidade: Date){

    const retorno = PrepararPraSalvar(nome,quantidade,dataDeValidade)

    db.run(`INSERT INTO geladeira (id, nome, quantidade, data) VALUES (?, ?, ?, ?)`, [retorno[0], retorno[1], retorno[2], retorno[3]], function(err){
        if (err){
            console.log(err.message)
        }
    console.log(`${nome} inserido com sucesso`)
    });
}
export function ler(){

    db.all("SELECT * FROM geladeira", [], (err, rows: {nome: string, quantidade: number, data_de_validade: string}[]) => {
        if (err){
            console.error(err.message)
        }
        rows.forEach(row =>{

            const { nome, quantidade, data_de_validade} = row

            PrepararRetorno(nome,quantidade,data_de_validade)
        })
    })
}
export function lerUmNome(nome: string){

    db.all("SELECT * FROM WHERE nome = ?", [nome], (err, rows: {nome: string, quantidade: number, data_de_validade: string}[]) => {
        if (err){
            console.error(err.message)
        }else{
        if (!rows){
            console.log("nada encontrado")
        }else{
            rows.forEach(row =>{

                const { nome, quantidade, data_de_validade } = row;

                PrepararRetorno(nome, quantidade, data_de_validade)
            })
        }
    }
    })
}