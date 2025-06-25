# Port Activity Explorer
Projeto para pesquisa de atividades de porto utilizando os dados de [**Global Daily Port Activity and Trade Estimates**](https://www.kaggle.com/datasets/arunvithyasegar/daily-port-activity-data-and-trade-estimates/data)

---

## Tecnologias Utilizadas:

### Backend
- **Python v3.13.5**
    - FastAPI
    - SQLAlchemy
    - Uvicorn
    - Pandas
- **SQLite** (banco local)

### Frontend
- **Node v20.19.2**
    - npm v10.8.2
    - Vite v6.3.5

### Outros
- Git/GitHub

---

## Requisitos:
- Python 3.13.5 instalado
- Node.js v20+ instalado
- Pelo menos 3 GB de espaço livre em disco
- Memória suficiente para processar o dataset
- Clonar este repositório e baixar o dataset CSV original

---

## Execução:

### Backend
```bash
cd BackEnd
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```
- Baixar o arquivo Daily_Port_Activity_Data_and_Trade_Estimates.csv e alocar na raiz do projeto
- Executar o script de ETL:
```bash
python etl.py
```
- Certifique-se que o arquivo `portos.db` foi criado
- Inicie o servidor:
```bash
uvicorn main:app --reload
```
A API estará disponível em: http://localhost:8000

### Frontend
```bash
cd FrontEnd
npm install
npm install axios # AutoComplete
npm run dev
```
A interface estará disponível em: http://localhost:5173

---

## Funcionalidades

- ETL (Extract, Transform, Load) para importar dados do arquivo CSV original para o banco SQLite (`portos.db`)
- API RESTful desenvolvida com FastAPI para consulta e filtragem dos dados portuários
- Consulta paginada dos dados de atividade portuária, com seleção de itens por página (25, 50, 100 ou 200)
- Contagem total de registros para paginação dinâmica
- Autocomplete para campos de filtro (nome do porto e país) para facilitar a busca
- Tabela dinâmica exibindo resultados paginados com botão para abrir modal de detalhes completos do porto, como importações, exportações, tipos de cargas e port calls
