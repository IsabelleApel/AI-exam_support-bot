import { ChatOllama } from '@langchain/ollama';
import { RunnableSequence, RunnableLambda, RunnableMap } from '@langchain/core/runnables';
import { BufferMemory, ChatMessageHistory } from 'langchain/memory';

import { retrieveDocuments } from './setupRetriever.mjs';
import { answerTemplate, standAloneQuestionTemplate } from './prompts.mjs';

const llm = new ChatOllama({
    model: "llama3.2"
});

const memory = new BufferMemory({
    chatHistory:  new ChatMessageHistory(),
    returnMessages: true,
    memoryKey: "chat_history",
})


function combineDocuments(docs) {
    return docs.map((doc) => doc.pageContent).join("\n\n")
};

const chain = RunnableSequence.from([
    RunnableMap.from({
        question: RunnableLambda.from(async (question) => question),
        chat_history: RunnableLambda.from(async () => {
            const memoryVars = await memory.loadMemoryVariables({});
            return memoryVars.chat_history ?? []; 
        }),
        standAloneQuestion: RunnableLambda.from(async (question) => {
            const response = await llm.invoke(
                await standAloneQuestionTemplate.format({ question })
            );
            console.log(response)
            return response.content ?? response;
        })
    }),

    RunnableLambda.from(async ({ question, standAloneQuestion, chat_history }) => {
        const context = await retrieveDocuments.invoke(standAloneQuestion);
        console.log(combineDocuments(context));
        return { question, context: combineDocuments(context), chat_history }
    }),

    RunnableLambda.from(async ({ question, context, chat_history }) => {
        const finalPrompt = await answerTemplate.format({ context, question, chat_history })
        const answer = await llm.invoke(finalPrompt);
        await memory.saveContext({ question }, { answer });
        return answer.content ?? answer;
    })
]);

export { chain };
