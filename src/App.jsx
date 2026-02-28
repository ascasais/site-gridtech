import React, { useState, useEffect } from 'react';
import { 
  FaNetworkWired, FaShieldAlt, FaServer, FaTools, 
  FaWhatsapp, FaArrowRight, FaLaptopCode, FaCheckCircle, FaBars, FaTimes
} from 'react-icons/fa';
import './App.sass';
import logoImg from './assets/logo.png'; 
import dashboardImg from './assets/dashboard-real.png'; 

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // EFEITO 1: Mudar o menu ao rolar a página
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // EFEITO 2: Motor de Animação de Rolagem (Efeito Wow)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 }); // Dispara quando 10% do elemento aparece

    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-container">
      {/* NAVEGAÇÃO FIXA */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-content">
          <img src={logoImg} alt="GridTech Tecnologia" className="logo" />
          
          <div className="nav-links desktop-only">
            <button onClick={() => scrollTo('home')}>Início</button>
            <button onClick={() => scrollTo('solucoes')}>Soluções</button>
            <button onClick={() => scrollTo('diferenciais')}>Por que a GridTech?</button>
            <button onClick={() => scrollTo('contato')}>Contato</button>
          </div>

          <div className="nav-actions desktop-only">
            <a href="https://web.gridtechtecnologia.com.br" className="btn-login">
              <FaLaptopCode /> Área do Cliente
            </a>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MENU MOBILE */}
        {menuOpen && (
          <div className="mobile-menu">
            <button onClick={() => scrollTo('home')}>Início</button>
            <button onClick={() => scrollTo('solucoes')}>Soluções</button>
            <button onClick={() => scrollTo('diferenciais')}>Diferenciais</button>
            <a href="https://web.gridtechtecnologia.com.br" className="btn-login-mobile">
              <FaLaptopCode /> Área do Cliente
            </a>
          </div>
        )}
      </nav>

      {/* SESSÃO HERO (TOPO IMPACTANTE) */}
      <header id="home" className="hero-section">
        <div className="grid-overlay"></div>
        <div className="hero-content reveal">
          <div className="badge">Especialistas em Infraestrutura de TI</div>
          <h1>Tecnologia que <span className="highlight">Conecta e Protege</span> o seu Negócio.</h1>
          <p>Soluções completas em cabeamento estruturado, segurança eletrônica e manutenção técnica para empresas que não podem parar.</p>
          
          <div className="hero-buttons">
            <button className="btn-primary" onClick={() => scrollTo('contato')}>
              Fale com um Especialista <FaArrowRight />
            </button>
            <button className="btn-secondary" onClick={() => scrollTo('solucoes')}>
              Conheça nossas Soluções
            </button>
          </div>
        </div>
      </header>

      {/* SESSÃO DE SOLUÇÕES */}
      <section id="solucoes" className="services-section">
        <div className="section-header reveal">
          <h2>Nosso <span className="highlight">Portfólio</span></h2>
          <p>Engenharia e tecnologia aplicadas para garantir a máxima disponibilidade da sua operação.</p>
        </div>

        <div className="services-grid">
          {/* Note os delays: 100, 200, 300, 400 para efeito "escadinha" */}
          <div className="service-card reveal delay-100">
            <div className="icon-box"><FaNetworkWired /></div>
            <h3>Infraestrutura de Redes</h3>
            <p>Cabeamento estruturado, fusão de fibra óptica, montagem de racks e certificação de redes corporativas.</p>
          </div>
          <div className="service-card reveal delay-200">
            <div className="icon-box"><FaShieldAlt /></div>
            <h3>Segurança Eletrônica</h3>
            <p>Sistemas de CFTV HD/IP, controle de acesso facial e biometria, alarmes e monitoramento inteligente.</p>
          </div>
          <div className="service-card reveal delay-300">
            <div className="icon-box"><FaServer /></div>
            <h3>Datacenter & Servidores</h3>
            <p>Projetos de sala cofre, adequação elétrica, refrigeração de TI e organização de ativos.</p>
          </div>
          <div className="service-card reveal delay-400">
            <div className="icon-box"><FaTools /></div>
            <h3>Manutenção Preventiva</h3>
            <p>Contratos de suporte técnico especializado, atendimento via SLA e portal exclusivo para abertura de OS.</p>
          </div>
        </div>
      </section>

      {/* SESSÃO DE DIFERENCIAIS (COM O PRINT REAL E 3D) */}
      <section id="diferenciais" className="features-section">
        <div className="features-content">
          <div className="features-text reveal">
            <h2>Transparência e Controle em <span className="highlight">Tempo Real</span></h2>
            <p>Diferente do mercado tradicional, a GridTech oferece a você controle total sobre os seus projetos e chamados através do nosso <strong>Portal do Cliente Exclusivo</strong>.</p>
            
            <ul className="features-list">
              <li><FaCheckCircle className="check-icon" /> Acompanhe o cronograma da sua obra (Gantt).</li>
              <li><FaCheckCircle className="check-icon" /> Aprove orçamentos com assinatura digital.</li>
              <li><FaCheckCircle className="check-icon" /> Acompanhe chamados técnicos e SLAs ao vivo.</li>
              <li><FaCheckCircle className="check-icon" /> Relatórios fotográficos e laudos em PDF.</li>
            </ul>

            <a href="https://web.gridtechtecnologia.com.br" className="btn-feature-login">
              Acessar Meu Portal Agora <FaArrowRight />
            </a>
          </div>
          <div className="features-image reveal delay-200">
            <div className="mockup-container">
              <div className="mockup-window">
                <div className="mockup-header">
                  <span className="dot dot-red"></span><span className="dot dot-yellow"></span><span className="dot dot-green"></span>
                  <div className="mockup-url">gridtech.dashboard.live</div>
                </div>
                <div className="mockup-body-real">
                  <img src={dashboardImg} alt="Painel GridTech Real" className="real-dashboard-img" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SESSÃO FOOTER / CONTATO */}
      <footer id="contato" className="footer-section">
        <div className="footer-grid reveal">
          <div className="footer-brand">
            <img src={logoImg} alt="GridTech" className="footer-logo" />
            <p>Elevando o padrão da infraestrutura tecnológica na sua região.</p>
          </div>
          <div className="footer-links">
            <h4>Links Rápidos</h4>
            <ul>
              <li onClick={() => scrollTo('home')}>Início</li>
              <li onClick={() => scrollTo('solucoes')}>Serviços</li>
              <li onClick={() => scrollTo('diferenciais')}>Portal do Cliente</li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Fale Conosco</h4>
            <p><strong>E-mail:</strong> comercial@gridtechtecnologia.com.br</p>
            <p><strong>Atendimento:</strong> (71) 99294-9859</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} GridTech Tecnologia. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* BOTÃO FLUTUANTE DO WHATSAPP */}
      <a href="https://wa.me/5571992949859" target="_blank" rel="noreferrer" className="whatsapp-float">
        <FaWhatsapp />
      </a>
    </div>
  );
}