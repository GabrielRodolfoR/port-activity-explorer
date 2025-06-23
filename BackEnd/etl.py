import pandas as pd
from sqlalchemy import create_engine
from database import Base
from models import Porto
from datetime import datetime

csv_path = "../Daily_Port_Activity_Data_and_Trade_Estimates.csv"

# Banco de Dados SQLite
DATABASE_URL = "sqlite:///./portos.db"
engine = create_engine(DATABASE_URL)

df = pd.read_csv(csv_path)

# Padronizar colunas para minúsculo
df.columns = df.columns.str.lower()

total_linhas = len(df)

df['date'] = pd.to_datetime(df['date'], errors='coerce').dt.date
df.drop(columns=["year", "month", "day"], inplace=True)

# Criar tabela no banco e inserir dados
Base.metadata.create_all(bind=engine)
df.to_sql("portos", con=engine, if_exists="replace", index=False)