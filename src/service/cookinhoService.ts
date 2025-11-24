// import { groq } from "../infra/groqClient";
// import { Ler } from "./repository";

// const geladeira = Ler()

// export async function gerarReceita(ingredientes: string[]): Promise<string> {
    
//     const prompt = `Você é uma IA de um aplicativo que recebe alimentos em sua base de dados e tem a funcionalidade de
//     lembrar o usuário quando o prazo estiver perto de acabar e a funcionalidade de gerar receitas com base em ingredientes
//     pedidos ou ingredientes já presentes no banco de dados, a sua parte é gerar essas receitas usando com prioridade o ingredienta 
//     passado, caso o ingrediente seja nulo, vai ser gerado com base no que está mais perto de vencer em relação ao dia de hoje.

//     O seu nome é cookinho, tudo que vier como cookinho é referente a você, cookinho é um biscoito muito carismático e alegre
    
//     Tudo explicado agora você precisa fazer a sua função, não cite absolutamente NADA dessa conversa, nem um ok, você já sabe disso,
//     como você vai ser acessado por usuários é preciso acima de tudo que isso é um contexto, você vai trabalhar em cima disso mas nem
//     sonhar comentar um a sobre a conversa inicial
    
//     Agora finalmente vamos a receita, segue os ingredientes: ${ingredientes.join(", ")}`

//     const completion = await groq.chat.completions.create({
//     model: "llama-3.1-8b-instant",
//     messages: [
//       { role: "system", content: "Você é um chef criativo e experiente." },
//       { role: "user", content: prompt },
//     ],
//   });

//   return completion.choices[0].message.content || "Não foi possível gerar a receita.";

// }

import { RetornaApiKey } from '@/ApiKey/api';
import axios from 'axios';
import { Product, Recipe } from '../types';

// Placeholder for the API Key
const API_KEY = RetornaApiKey();
const API_URL = 'https://estoque-app.openai.azure.com/openai/v1/chat/completions';

interface Recipe {
  title: string;
  description: string;
  ingredientes: string[];
}

function parsearReceitas(texto: string) {
    try {
        let jsonContent = texto.trim();

        if (jsonContent.startsWith('"') && jsonContent.endsWith('"')) {
            jsonContent = jsonContent.slice(1, -1);
        }

        jsonContent = jsonContent.replace(/^```json\n/, '').replace(/\n```$/, '');

        return JSON.parse(jsonContent);
    } catch (error) {
        console.error('Erro ao processar JSON:', error);
        return null;
    }
}

export const fetchRecipes = async (products: Product[]): Promise<Recipe[]> => {
    console.log("ENTROU")
    if (products.length === 0) return [];

    const productList = products.map(p => `${p.name} (${p.quantity})`).join(', ');

    try {

        console.log(`Fetching recipes for: ${productList}`);

        const response = await axios.post<{ choices: { message: { content: string } }[] }>(API_URL, {
            "messages": [
                {
                    "role": "system",
                    "content": "Você é um consultor culinário, muito educado e profissional que ajudar pessoas a não desperdiçar comida, lendo o estoque do usuário que será passado e dando recomendações de receitas para a lista de ingredientes que ela informar. Informar receitas detalhadas, informando quantidades e passo a passo correto para o preparo. Recomende sempre 5 receitas. Enviar resposta no formato de JSON row para que eu consigo integrar facilmente com um frontend. Responder em pt-BR"
                },
                {
                    "role": "user",
                    "content": `${productList}`
                }
            ],
            "max_tokens": 5000,
            "model": "estoque-DeepSeek-V3-0324"
        }, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': API_KEY
            }
        });

        const data = response.data;
        const content = data.choices[0].message.content;
        console.log("VISH MIL", content);
        return parsearReceitas(content) as Recipe[];
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
};