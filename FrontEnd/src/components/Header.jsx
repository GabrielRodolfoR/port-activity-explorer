// src/components/Header.jsx
import '../styles/Header.css';
import logo from '../assets/logo.png';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Logo Global Port Activity" className="header-logo" />
      <h1 className="header-title">Sistema de Pesquisa Portuária</h1>
    </header>
  );
}

export default Header;
