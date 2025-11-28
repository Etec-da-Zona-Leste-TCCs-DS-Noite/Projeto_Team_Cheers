import axios from 'axios';
import { Product } from '../context/ProductContext';
import { Recipe } from '../context/RecipeContext';


const API_KEY = "";
const API_URL = 'https://estoque-app.openai.azure.com/openai/v1/chat/completions';

function parsearReceitas(texto: string) {
    try {

        let jsonContent = texto.trim();


        if (jsonContent.startsWith('"') && jsonContent.endsWith('"')) {
            jsonContent = jsonContent.slice(1, -1);
        }

        // Remove ```json e ```
        jsonContent = jsonContent.replace(/^```json\n/, '').replace(/\n```$/, '');

        // Parse do JSON
        return JSON.parse(jsonContent);
    } catch (error) {
        console.error('Erro ao processar JSON:', error);
        return null;
    }
}

export const fetchRecipes = async (products: Product[]): Promise<Recipe[]> => {
    console.log("ENTROU")
    if (products.length === 0) return [];

    const productList = products.map(p => `${p.name}`).join(', ');
    console.log("PRODUCT LIST:", productList);

    try {
        // This is a mock implementation since we don't have a real API key yet.
        // In a real scenario, you would make a fetch request here.
        console.log(`Fetching recipes for: ${productList}`);

        const response = await axios.post<{ choices: { message: { content: string } }[] }>(API_URL, {
            "messages": [
                {
                    "role": "system",
                    "content": "Você é um consultor culinário, muito educado e profissional que ajudar pessoas a não desperdiçar comida dando recomendações de receitas para a lista de ingredientes que ela informar. Informar receitas detalhadas, informando quantidades e passo a passo correto para o preparo. Recomende sempre 5 receitas. Enviar resposta no formato de JSON row para que eu consigo integrar facilmente com um frontend. Responder em pt-BR. O formato do JSON deve ser um array de objetos, onde cada objeto representa uma receita com os seguintes campos: nome (string), ingredientes (array de strings), passo_a_passo (array de strings)."
                },
                {
                    "role": "user",
                    "content": productList
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