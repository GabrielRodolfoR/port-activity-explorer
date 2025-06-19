from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

app = FastAPI()

@app.get("/")
async def read():
    return {"message": "API Incializada! Redirecione para /docs para ver a documentação."}

@app.get("/port_activity")
def ports():
    return {"message": "API Get de Port Activity"}
    
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)