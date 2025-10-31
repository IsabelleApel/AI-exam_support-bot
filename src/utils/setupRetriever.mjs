import { OllamaEmbeddings } from "@langchain/ollama";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { createClient } from "@supabase/supabase-js";

const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const VITE_SUPABASE_API_KEY = import.meta.env.VITE_SUPABASE_API_KEY;

const embeddings = new OllamaEmbeddings({ model: "llama3.2" });
const supabaseClient = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_API_KEY);

const vectorstore = new SupabaseVectorStore(embeddings, {
    client: supabaseClient,
    tableName: "documents",
    queryName: "match_documents",
});

const retrieveDocuments = vectorstore.asRetriever();

export { retrieveDocuments };