from fastapi import FastAPI, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import List
from models import Porto
from schemas import PortActivitySchema, DetailedPortActivitySchema
from database import session_local

app = FastAPI()


def get_db():
    db = session_local()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def read():
    return {
        "message": "API Incializada! Redirecione para /docs para ver a documentação."
    }


@app.get("/port_activity", response_model=List[PortActivitySchema])
def get_port_activities(
    page: int = Query(1, ge=1),
    page_size: int = Query(25, ge=25, le=200),
    db: Session = Depends(get_db),
):
    offset = (page - 1) * page_size
    activities = db.query(Porto).offset(offset).limit(page_size).all()
    return activities


@app.get("/port_activity/{object_id}", response_model=DetailedPortActivitySchema)
def get_port_detailed_activity_by_object_id(object_id: str, db: Session = Depends(get_db)):
    porto = db.query(Porto).filter(Porto.objectid == object_id).first()
    if not porto:
        raise HTTPException(status_code=404, detail="Porto não encontrado")
    return porto



if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
