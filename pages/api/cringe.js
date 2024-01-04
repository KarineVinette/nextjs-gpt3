// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const promptNom = req.body.promptNom;
  const promptPrenom = req.body.promptPrenom;
  const promptDiplome = req.body.promptDiplome;
  const promptEntreprise = req.body.promptEntreprise;
  const promptPoste = req.body.promptPoste;
  const promptAnnonce = req.body.promptAnnonce;

 
  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo-instruct", // Replace with the correct GPT-3.5 Turbo model identifier
    prompt: `Ecris une lettre de motivation convaincante et personnalisée pour le poste suivant, en utilisant les informations fournies.
  
      Nom: ${promptNom || "Nom Anonyme"}
      Prénom: ${promptPrenom || "Prénom Anonyme"}
      Diplôme: ${promptDiplome || "Diplôme Anonyme"}
      Entreprise cible: ${promptEntreprise || "Entreprise Anonyme"}
      Poste cible: ${promptPoste || "Poste Anonyme"}
      Annonce: ${promptAnnonce || "Annonce Anonyme"}
  
      Lettre de motivation:`,
    max_tokens: 1000,
    temperature: 0.8,
    presence_penalty: 0,
    frequency_penalty: 0,
  });
  
  const quote = completion.data.choices[0].text;

  res.status(200).json({ quote });
}
