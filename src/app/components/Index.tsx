import axios from "axios";
import { useEffect, useState } from "react";
import { Text } from "react-native";

type Receita = {

    nome: string;
}

export default function TelaReceita() {

    const [receitas, setReceitas] = useState<Receita[]>([])

    useEffect(() => {
        axios
            .post('https://estoque-app.openai.azure.com/openai/v1/chat/completions',
                {
                    "messages": [
                        {
                            "role": "system",
                            "content": "Você é um consultor culinário, muito educado e profissional que ajudar pessoas a não desperdiçar comida dando recomendações de receitas para a lista de ingredientes que ela informar. Informar receitas detalhadas, informando quantidades e passo a passo correto para o preparo. Recomende sempre 5 receitas. Enviar resposta no formato de JSON row para que eu consigo integrar facilmente com um frontend. Responder em pt-BR"
                        },
                        {
                            "role": "user",
                            "content": "fainha, ovo, peixe, azeitona, leite, morango, arroz, limão"
                        }
                    ],
                    "max_tokens": 5000,
                    "model": "estoque-DeepSeek-V3-0324"
                },
                {
                    headers: {
                        'api-key': 'git não deixa upar api key, mas ta no discord'
                    }
                }
            )
            .then((response) => {
                const stringCompleta = response.data.choices[0].message.content;

                const regexLimpeza = /^\s*```json\n|```\s*$/g;

                const stringJsonLimpa = stringCompleta.replace(regexLimpeza, '').trim();

                const objetoReceitas = JSON.parse(stringJsonLimpa);

                setReceitas(objetoReceitas.receitas);
            })
    })

    return (
        <Text>{receitas[0]?.nome}</Text>
    );
}