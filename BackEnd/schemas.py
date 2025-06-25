from pydantic import BaseModel
from datetime import date

class PortActivitySchema(BaseModel):
    
    # Modelo de Porto
    portid: str
    date: date
    portname: str
    country: str
    ISO3: str
    
    # Identificador do Objeto (Primary Key)
    objectid: int
    
    class Config:
        from_attributes = True

class DetailedPortActivitySchema(PortActivitySchema):
    """
    Schema para detalhamento das atividades portuárias.
    Planejamento de uso: Exibir uma lista simplificada.
    Quando o usuário clicar em detalhes exibir este schema.
    Evita poluição e melhora a performance da API. (Eu espero)
    """
    
    # Modelo de Porto
    portid: str
    date: str
    portname: str
    country: str
    ISO3: str
    
    # Estatística de Tráfego
    portcalls_container: int
    portcalls_dry_bulk: int
    portcalls_general_cargo: int
    portcalls_roro: int
    portcalls_tanker: int
    portcalls_cargo: int
    portcalls: int
    
    # Estatística de Importação
    import_container: float
    import_dry_bulk: float
    import_general_cargo: float
    import_roro: float  
    import_tanker: float
    import_cargo: float
    import_total: float
    
    # Estatística de Exportação
    export_container: float
    export_dry_bulk: float
    export_general_cargo: float
    export_roro: float
    export_tanker: float
    export_cargo: float
    export_total: float
    
    # Identificador do Objeto
    objectid: int