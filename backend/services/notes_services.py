from .llm_client import client

def summarize_f(content: str):
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=content
    )
    return response.text

def ans_doubt(question: str):
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=question
    )
    return response.text

def questions(notes: str):
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"Can you generate questions based on these notes: {notes}"
    )
    return response.text
