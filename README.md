# Port Activity Explorer
Projeto para pesquisa de atividades de porto utilizando os dados de [**Global Daily Port Activity and Trade Estimates**](https://www.kaggle.com/datasets/arunvithyasegar/daily-port-activity-data-and-trade-estimates/data)

## Tecnologias Utilizadas:
- Python v3.13.5
    - FastAPI
    - SQLAlchemy
    - Uvicorn
- SQLite
- GitHub

## Requisitos:
- Ter espaço livre (recomendado ao menos 2 GB), com risco de perca de performance caso tenha pouca memoria disponível
- Python v3.13.5 instalado no sistema
- Baixar o arquivo disponibilizado no GitHub

## Execução:
- Rodar o comando na pasta \BackEnd:<br>
    `venv\Scripts\activate.bat`
- Instalar as bibliotecas em requirements.txt
- Baixar e alocar o arquivo na pasta raiz:<br>
    `Daily_Port_Activity_Data_and_Trade_Estimates.csv`
- Rodar o comando:<br>
    `py etl.py`
    - Verificar a criação do arquivo "portos.db"
- Rodar o código:<br>
    `uvicorn main:app --reload`


## Funcionalides
- Transforma o arquivo .CSV em portos.BD
- Verificar um conjunto de dados (10 a 100 por página)
    - No FrontEnd será aplicado um filtro para: 10, 20, 50 e 100
- Escolher a página para vizualizar
- Fazer um GET por objectid para detalhes do item escolhido