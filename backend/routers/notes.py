from fastapi import APIRouter
from models.schemas import NoteInput, DoubtInput, GenQ
from services.notes_service import summarize_f, ans_doubt, questions

router = APIRouter(prefix="/notes")

@router.post("/summarize")
async def summarize(data: NoteInput):
    prompt = f"Can you summarize this for me: {data.text}"
    return {"summary": summarize_f(prompt)}

@router.post("/ask_doubt")
async def ask_doubt_endpoint(data: DoubtInput):
    prompt = (
        f"Based on these notes: {data.text}\n"
        f"Answer this question: {data.doubt}"
    )
    return {"answer": ans_doubt(prompt)}

@router.post("/generate_q")
async def generate_q_endpoint(data: GenQ):
    prompt = f"Based on these notes: {data.text}. Generate a set of questions."
    return {"questions": questions(prompt)}
