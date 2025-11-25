from pydantic import BaseModel

class NoteInput(BaseModel):
    text: str

class DoubtInput(BaseModel):
    text: str
    doubt: str

class GenQ(BaseModel):
    text: str
