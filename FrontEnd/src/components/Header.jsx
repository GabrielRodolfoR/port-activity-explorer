// src/components/Header.jsx
import '../styles/Header.css';
import logo from '../assets/logo.png';

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo Global Port Activity" className="header-logo" />
      </div>
      <nav className="header-nav">
        <a href="#" className="nav-link">Página Principal</a>
        <a href="https://github.com/GabrielRodolfoR/port-activity-explorer" target="_blank" rel="noopener noreferrer" className="nav-link">
          GitHub
        </a>
      </nav>
    </header>
  );
}

export default Header;