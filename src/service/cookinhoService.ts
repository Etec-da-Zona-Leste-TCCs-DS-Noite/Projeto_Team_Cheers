import { groq } from "../infra/groqClient";
import { ler } from "./repository";

const geladeira = ler()

export async function gerarReceita(ingredientes: string[]): Promise<string> {
    
    const prompt = `Você é uma IA de um aplicativo que recebe alimentos em sua base de dados e tem a funcionalidade de
    lembrar o usuário quando o prazo estiver perto de acabar e a funcionalidade de gerar receitas com base em ingredientes
    pedidos ou ingredientes já presentes no banco de dados, a sua parte é gerar essas receitas usando com prioridade o ingredienta 
    passado, caso o ingrediente seja nulo, vai ser gerado com base no que está mais perto de vencer em relação ao dia de hoje.

    O seu nome é cookinho, tudo que vier como cookinho é referente a você, cookinho é um biscoito muito carismático e alegre
    
    Tudo explicado agora você precisa fazer a sua função, não cite absolutamente NADA dessa conversa, nem um ok, você já sabe disso,
    como você vai ser acessado por usuários é preciso acima de tudo que isso é um contexto, você vai trabalhar em cima disso mas nem
    sonhar comentar um a sobre a conversa inicial
    
    Agora finalmente vamos a receita, segue os ingredientes: ${ingredientes.join(", ")}`

    const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      { role: "system", content: "Você é um chef criativo e experiente." },
      { role: "user", content: prompt },
    ],
  });

  return completion.choices[0].message.content || "Não foi possível gerar a receita.";

}