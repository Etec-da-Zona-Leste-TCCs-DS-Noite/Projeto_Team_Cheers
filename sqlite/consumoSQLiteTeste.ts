import { Database } from "sqlite3";

const db = new Database('CookClock');

db.prepare(
    `CREATE TABLE IF NOT EXISTS geladeira (
        nome TEXT PRIMARY KEY AUTOINCREMENT NOT NULL,
        quantidade TEXT NOT NULL,
        data_de_validade TEXT NOT NULL

    )`
).run();



function PrepararPraSalvar(nome: string, quantidade: number, dataDeValidade: Date){

    const hoje = new Date

    if (dataDeValidade > hoje || dataDeValidade == undefined){
        throw new Error("insira uma data válida")
    }
    if (Number.isInteger(quantidade) || isNaN(quantidade) || quantidade < 0){
        throw new Error("insira uma quantidade válida")
    }
    if (nome == "" || nome != null){
        throw new Error("insira um nome")
    }

    const dataTraduzida = dataDeValidade.toLocaleDateString('pt-BR')
    const dataSalva = dataTraduzida.toString()

    const quantidadeSalva = quantidade.toString()

    const valido: string[] = [nome,quantidadeSalva,dataSalva]

    return valido
}
function PrepararRetorno(nome:string , quantidadeEmString: string, dataEmString:string){

    const regex = "/(\d{2})\/(\d{2})\/(\d{4})/"

    const resultado = dataEmString.match(regex)

    if (resultado){

        const [dia, mes, ano] = resultado.slice(1)

        const convertidos: number[] = [parseInt(dia), parseInt(mes), parseInt(ano)]

        const dataRecebida = new Date(convertidos[2],convertidos[1],convertidos[0])

        const dataTraduzida = dataRecebida.toLocaleDateString('pt-BR')

        const retorno: (string | number | Date)[] = [nome, Number.parseInt(quantidadeEmString), dataTraduzida]  

        return retorno
    }

}
function Salvar(nome: string, quantidade: number, dataDeValidade: Date){

    const retorno = PrepararPraSalvar(nome,quantidade,dataDeValidade)

    db.run(`INSERT INTO geladeira (nome, quantidade, data) VALUES (?, ?, ?)`, [retorno[0], retorno[1], retorno[2]], function(err){
        if (err){
            console.log(err.message)
        }
    console.log(`${nome} inserido com sucesso`)
    });
}
function ler(){

    db.all("SELECT * FROM geladeira", [], (err, rows: {nome: string, quantidade: string, data_de_validade: string}[]) => {
        if (err){
            console.error(err.message)
        }
        rows.forEach(row =>{

            const { nome, quantidade, data_de_validade} = row

            PrepararRetorno(nome,quantidade,data_de_validade)
        })
    })
}
function lerUmNome(nome: string){

    db.all("SELECT * FROM WHERE nome = ?", [nome], (err, rows: {nome: string, quantidade: string, data_de_validade: string}[]) => {
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

