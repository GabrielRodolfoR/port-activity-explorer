import pandas as pd
from sqlalchemy import create_engine
from database import Base
from models import Porto
from datetime import datetime

# Caminho para o arquivo CSV
csv_path = "../Daily_Port_Activity_Data_and_Trade_Estimates.csv"

# Banco de Dados SQLite
DATABASE_URL = "sqlite:///./portos.db"
engine = create_engine(DATABASE_URL)

# Ler CSV
df = pd.read_csv(csv_path)

# Padronizar colunas para minúsculo
df.columns = df.columns.str.lower()

# Total de linhas
total_linhas = len(df)

# 1. Verificar preenchimento (não-nulos)
print("\n[1] Porcentagem de preenchimento (valores não-nulos) por coluna:")
print((df.notnull().sum() / total_linhas * 100).round(2).astype(str) + '%')

# 2. Verificar colunas numéricas com valores diferentes de zero
numeric_cols = df.select_dtypes(include=['number']).columns
print("\n[2] Valores diferentes de zero por coluna numérica:")
for col in numeric_cols:
    count_non_zero = (df[col] != 0).sum()
    perc = round(count_non_zero / total_linhas * 100, 2)
    print(f"{col}: {count_non_zero} ({perc}%)")

# 3. Verificar colunas de texto com valores úteis (≠ "0" e ≠ vazio)
string_cols = df.select_dtypes(include=['object']).columns
print("\n[3] Valores não vazios e diferentes de '0' em colunas de texto:")
for col in string_cols:
    count_valid = df[col].apply(lambda x: str(x).strip() not in ["", "0", "nan"]).sum()
    perc = round(count_valid / total_linhas * 100, 2)
    print(f"{col}: {count_valid} ({perc}%)")

# Criar tabela no banco e inserir dados
Base.metadata.create_all(bind=engine)
df.to_sql("portos", con=engine, if_exists="replace", index=False)