# TechNova AB chatbot

## RunnableMap och RunnableLambda

Jag har valt att lägga till funktionen RunnableMap i mitt projekt. RunnableMap används för att köra flera delsteg i RunnableSequence parallellt. Resultaten returneras sedan som ett objekt. Jag har använt det för att samtidigt: hämta tidigare chathistorik, skapa en fristående fråga och skicka vidare orginalfrågan. RunnableMap gör att man kan kan samla ihop flera saker i ett och samma steg, istället för att behöva använda flera separata steg. RunnableLambda används för att lägga till egen logik i kedjan, den är en del av LangChains runnables struktur, och gör att koden får bättre struktur och blir lättare att arbeta vidare med.

## Screenshot av Supabase-tabell

<img width="1239" height="399" alt="Screenshot 2025-11-03 100550" src="https://github.com/user-attachments/assets/79508ab1-d9bc-4f99-a22e-92f2b9bfa1be" />
