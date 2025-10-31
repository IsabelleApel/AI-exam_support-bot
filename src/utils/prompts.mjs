import { PromptTemplate } from "@langchain/core/prompts";

const relevanceTemplate = PromptTemplate.fromTemplate(
    `Avgör om följande fråga handlar om TechNova Ab:s produkter, leveranser, garantier eller policysvar.
    Svara endast med "JA" eller "NEJ"
    Fråga: {question}
    Svar: `
)

const standAloneQuestionTemplate = PromptTemplate.fromTemplate(
    `Givet en fråga, omformulera frågan till en fristående fråga och returnera endast den fristående frågan
    fråga: {question}
    fristående fråga:`
)

const answerTemplate = PromptTemplate.fromTemplate(
    `Du är en snäll och hjälpsam supporterbot till företaget TechNova AB. Du kan svara på frågor baserat på den tillhandahållna kontexten OCH tidigare konversation. Försök hitta svaret i kontexten. Om du verkligen inte vet svaret, hänvisa till företagets kundtjänst och telefon. Hitta inte på några svar. Tala alltid som om du pratade med en vän. 
    
    Tidigare konversation: 
    {chat_history}

    Kontext: 
    {context}
    
    Fråga: 
    {question}

    svar: `
)

const notRelevantTemplate = PromptTemplate.fromTemplate(
    `Svara alltid med: "Jag är TechNova AB:s kundtjänstbot och kan endast svara på frågor som rör företaget"`
)

export { answerTemplate, standAloneQuestionTemplate, relevanceTemplate, notRelevantTemplate };