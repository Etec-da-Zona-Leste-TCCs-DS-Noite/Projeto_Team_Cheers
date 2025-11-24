import { openDatabaseAsync, type SQLiteDatabase, SQLiteRunResult } from "expo-sqlite";

type Produto = {
    id: number;
    nome: string;
    marca: string | null;
    quantidade: number;
    dataDeValidade: string;
};

type DTOProduto = Omit<Produto, 'id'>;

let db: SQLiteDatabase | null = null;
const DB_NAME = 'geladeira.db';

async function setupTableAsync(database: SQLiteDatabase): Promise<void> {
    const sql = `
        CREATE TABLE IF NOT EXISTS geladeira (
            id INTEGER PRIMARY KEY NOT NULL AUTOINCREMENT,
            nome TEXT NOT NULL,
            marca TEXT,
            quantidade INTEGER NOT NULL,
            data_de_validade TEXT NOT NULL
        );
    `;
    await database.execAsync(sql);
    console.log('[DB] Tabela geladeira inicializada.');
}

export async function initDb(): Promise<SQLiteDatabase> {
    if (!db) {
        db = await openDatabaseAsync(DB_NAME);
        console.log(`[DB] Banco de dados '${DB_NAME}' aberto/criado.`);
        await setupTableAsync(db);
    }
    return db;
}

function PrepararPraSalvar(nome: string, marca: string | null, quantidade: number, dataDeValidade: Date): DTOProduto {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const validade = new Date(dataDeValidade);
    validade.setHours(0, 0, 0, 0);

    if (validade < hoje) throw new Error("insira uma data válida (data de validade não pode ser no passado)");
    if (!Number.isInteger(quantidade) || quantidade <= 0) throw new Error("insira uma quantidade válida (deve ser um inteiro positivo)");
    if (!nome || nome.trim() === "") throw new Error("insira um nome");

    const dataParaBanco = validade.toISOString().split('T')[0];
    const id: string = `${nome.trim().toLowerCase()}-${dataParaBanco}`;

    return { nome: nome, marca, quantidade, dataDeValidade: dataParaBanco };
}

function PrepararRetorno(nome: string, marca: string | null, quantidade: number, dataEmString: string): DTOProduto {
    const dataRecebida = new Date(dataEmString + 'T00:00:00');
    const dataTraduzida = dataRecebida.toLocaleDateString('pt-BR');

    return { nome, marca, quantidade, dataDeValidade: dataTraduzida };
}

export async function Salvar(nome: string, marca: string | null, quantidade: number, dataDeValidade: Date): Promise<void> {
    const database = await initDb();
    try {
        const produto = PrepararPraSalvar(nome, marca, quantidade, dataDeValidade);
        const result: SQLiteRunResult = await database.runAsync(
            `INSERT INTO geladeira (id, nome, quantidade, data_de_validade) VALUES (?, ?, ?, ?)
             ON CONFLICT(id) DO UPDATE SET quantidade = excluded.quantidade + geladeira.quantidade`,
            produto.nome, produto.quantidade, produto.dataDeValidade
        );
        console.log(`[DB] Produto ${nome} salvo/atualizado. Changes: ${result.changes}`);
    } catch (error) {
        console.error(`[DB ERROR] Erro ao salvar produto:`, error);
        throw error;
    }
}

export async function Deletar(id: string): Promise<void> {
    const database = await initDb();
    const result: SQLiteRunResult = await database.runAsync(
        `DELETE FROM geladeira WHERE id = ?`, id
    );

    if (result.changes === 0) {
        console.log(`[DB] Nada encontrado para deletar com o ID: ${id}`);
        throw new Error("Produto não encontrado para exclusão.");
    } else {
        console.log(`[DB] Produto com ID ${id} deletado com sucesso. Mudanças: ${result.changes}`);
    }
}

export async function Ler(): Promise<DTOProduto[]> {
    const database = await initDb();
    const rows = await database.getAllAsync<{ nome: string; marca: string | null, quantidade: number; data_de_validade: string }>(
        "SELECT nome, quantidade, data_de_validade FROM geladeira ORDER BY data_de_validade ASC"
    );
    return rows.map(row => PrepararRetorno(row.nome, row.marca, row.quantidade, row.data_de_validade));
}

export async function LerUmNome(nome: string): Promise<DTOProduto[]> {
    const database = await initDb();
    const rows = await database.getAllAsync<{ nome: string; marca: string | null, quantidade: number; data_de_validade: string }>(
        "SELECT nome, quantidade, data_de_validade FROM geladeira WHERE nome LIKE ?",
        `%${nome}%`
    );

    if (rows.length === 0) {
        console.log(`[DB] Nenhum produto encontrado com o nome: ${nome}`);
        return [];
    }

    return rows.map(row => PrepararRetorno(row.nome, row.marca, row.quantidade, row.data_de_validade));
}
