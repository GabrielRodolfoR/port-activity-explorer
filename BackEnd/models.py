from sqlalchemy import Column, Integer, String, Float
from database import Base
from datetime import date


class Porto(Base):
    __tablename__ = "portos"

    # Modelo de Porto
    portid = Column(String)
    date = Column(String)
    portname = Column(String, index=True)
    country = Column(String)
    ISO3 = Column(String)

    # Estatística de Tráfego
    portcalls_container = Column(Integer)
    portcalls_dry_bulk = Column(Integer)
    portcalls_general_cargo = Column(Integer)
    portcalls_roro = Column(Integer)
    portcalls_tanker = Column(Integer)
    portcalls_cargo = Column(Integer)
    portcalls = Column(Integer)

    # Estatística de Importação
    import_container = Column(Float)
    import_dry_bulk = Column(Float)
    import_general_cargo = Column(Float)
    import_roro = Column(Float)
    import_tanker = Column(Float)
    import_cargo = Column(Float)
    import_total = Column("import", Float)

    # Estatística de Exportação
    export_container = Column(Float)
    export_dry_bulk = Column(Float)
    export_general_cargo = Column(Float)
    export_roro = Column(Float)
    export_tanker = Column(Float)
    export_cargo = Column(Float)
    export_total = Column("export", Float)

    # Identificador do Objeto (Primary Key)
    objectid = Column(Integer, primary_key=True, index=True)