from fastapi import FastAPI
from transformers import AutoTokenizer, AutoModelForCausalLM, pipeline

app = FastAPI()

# Load the Gemma 3 4B model
tokenizer = AutoTokenizer.from_pretrained("google/gemma-3-4b")
model = AutoModelForCausalLM.from_pretrained("google/gemma-3-4b")

pipe = pipeline("text-generation", model=model, tokenizer=tokenizer)

@app.get("/chat")
async def chat(query: str):
    # Generate a response from the model
    response = pipe(query, max_length=150)
    return {"response": response[0]['generated_text']}