from fastapi import FastAPI, Depends, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Optional
from models import Porto
from schemas import PortActivitySchema, DetailedPortActivitySchema
from database import session_local
from datetime import date

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Permite acesso ao React App
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    page_size: int = Query(50, ge=25, le=200),
    portname: Optional[str] = None,
    country: Optional[str] = None,
    data_inicial: Optional[date] = None,
    data_final: Optional[date] = None,
    db: Session = Depends(get_db),
):
    offset = (page - 1) * page_size
    query = db.query(Porto)

    if portname:    
        query = query.filter(Porto.portname == portname)
    if country:
        query = query.filter(Porto.country == country)
    if data_inicial and data_final:
        query = query.filter(Porto.date.between(data_inicial, data_final))
    elif data_inicial:
        query = query.filter(Porto.date >= data_inicial)
    elif data_final:
        query = query.filter(Porto.date <= data_final)

    return query.offset(offset).limit(page_size).all()


@app.get("/port_activity/count")
def get_port_activity_count(
    portname: str = Query(None),
    country: str = Query(None),
    date: date = Query(None),
    db: Session = Depends(get_db),
):
    query = db.query(Porto)

    if country:
        query = query.filter(Porto.country == country)
    if portname:
        query = query.filter(Porto.portname == portname)
    if date:
        query = query.filter(Porto.date == date)


    total_count = query.count()

    return {"total": total_count}


@app.get("/port_activity/{object_id}", response_model=DetailedPortActivitySchema)
def get_port_detailed_activity_by_object_id(
    object_id: str, db: Session = Depends(get_db)
):
    porto = db.query(Porto).filter(Porto.objectid == object_id).first()
    if not porto:
        raise HTTPException(status_code=404, detail="Porto não encontrado")
    return porto


@app.get("/autocomplete")
def autocomplete(
    term: str = Query(..., min_length=1),
    field: str = Query(...),
    db: Session = Depends(get_db),
):
    allowed_fields = {
        "portname": Porto.portname,
        "country": Porto.country,
    }

    if field not in allowed_fields:
        raise HTTPException(status_code=400, detail="Campo inválido para autocomplete")

    column = allowed_fields[field]

    results = (
        db.query(column).filter(column.ilike(f"%{term}%")).distinct().limit(20).all()
    )

    # Transforma resultado [(val,), (val,), ...] em [val, val, ...]
    return [r[0] for r in results if r[0] is not None]


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
