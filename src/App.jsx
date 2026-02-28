import React, { useState, useEffect } from 'react';
import { 
  FaNetworkWired, FaShieldAlt, FaVideo, FaFingerprint, FaCogs,
  FaWhatsapp, FaArrowRight, FaLaptopCode, FaCheckCircle, FaBars, FaTimes,
  FaEnvelope, FaPhoneAlt
} from 'react-icons/fa';
import './App.sass';
import logoImg from './assets/logo.png'; 
import dashboardImg from './assets/dashboard-real.png'; 

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    const hiddenElements = document.querySelectorAll('.reveal');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => hiddenElements.forEach((el) => observer.unobserve(el));
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContato = (e) => {
    e.preventDefault();
    alert("Como não temos backend no site, o ideal é usar um serviço como EmailJS depois! Mas o layout está pronto.");
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
            <button onClick={() => scrollTo('diferenciais')}>Diferenciais</button>
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
            <button onClick={() => scrollTo('contato')}>Contato</button>
            <a href="https://web.gridtechtecnologia.com.br" className="btn-login-mobile">
              <FaLaptopCode /> Área do Cliente
            </a>
          </div>
        )}
      </nav>

      {/* SESSÃO HERO */}
      <header id="home" className="hero-section">
        <div className="grid-overlay"></div>
        <div className="hero-content reveal">
          <div className="badge">Especialistas em Infraestrutura de TI</div>
          <h1>Tecnologia que <span className="highlight">Conecta e Protege</span> o seu Negócio.</h1>
          <p>Soluções completas em segurança eletrônica, controle de acesso e automação para condomínios e empresas que exigem excelência.</p>
          
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

      {/* SESSÃO DE PARCEIROS/CLIENTES */}
      <section className="partners-section">
        <p className="partners-title reveal">Trabalhamos com os melhores fabricantes do mercado</p>
        <div className="carousel-container reveal delay-100">
          <div className="carousel-track">
            {/* Bloco 1 */}
            <div className="partner-logo">INTELBRAS</div>
            <div className="partner-logo">FURUKAWA</div>
            <div className="partner-logo">HIKVISION</div>
            <div className="partner-logo">PPA</div>
            <div className="partner-logo">LINEAR</div>
            <div className="partner-logo">WEG</div>
            {/* Bloco 2 */}
            <div className="partner-logo">INTELBRAS</div>
            <div className="partner-logo">FURUKAWA</div>
            <div className="partner-logo">HIKVISION</div>
            <div className="partner-logo">PPA</div>
            <div className="partner-logo">LINEAR</div>
            <div className="partner-logo">WEG</div>
          </div>
        </div>
      </section>

      {/* SESSÃO DE SOLUÇÕES (Focada em Segurança e Condomínios) */}
      <section id="solucoes" className="services-section">
        <div className="section-header reveal">
          <h2>Nosso <span className="highlight">Portfólio</span></h2>
          <p>Engenharia e tecnologia aplicadas para garantir a máxima segurança da sua operação.</p>
        </div>

        <div className="services-grid">
          {/* Card 1: CFTV */}
          <div className="service-card reveal delay-100">
            <div className="icon-box"><FaVideo /></div>
            <h3>CFTV Inteligente</h3>
            <p>Sistemas de câmeras HD/IP com Inteligência Artificial. Analíticos de vídeo avançados para detecção facial, cruzamento de linha e alerta de intrusão real.</p>
          </div>
          
          {/* Card 2: Controle de Acesso */}
          <div className="service-card reveal delay-200">
            <div className="icon-box"><FaFingerprint /></div>
            <h3>Controle de Acesso</h3>
            <p>Sistemas de altíssima segurança para condomínios e empresas. Reconhecimento facial de alta velocidade, biometria digital, tags RFID e catracas.</p>
          </div>

          {/* Card 3: Automação e Interfonia */}
          <div className="service-card reveal delay-300">
            <div className="icon-box"><FaCogs /></div>
            <h3>Automação & Interfonia</h3>
            <p>Automatizadores de portão ultrarrápidos, cancelas para controle veicular e sistemas de interfonia digital IP com alta clareza de áudio e vídeo.</p>
          </div>

          {/* Card 4: Redes */}
          <div className="service-card reveal delay-400">
            <div className="icon-box"><FaNetworkWired /></div>
            <h3>Infraestrutura de Redes</h3>
            <p>A base de toda a segurança: cabeamento estruturado certificado e fusão de fibra óptica para garantir que o seu sistema de câmeras e internet nunca caia.</p>
          </div>
        </div>
      </section>

      {/* SESSÃO DE DIFERENCIAIS */}
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

      {/* SESSÃO DE CONTATO */}
      <section id="contato" className="contact-section">
        <div className="contact-container reveal">
          <div className="contact-info">
            <h2>Fale com um <span className="highlight">Especialista</span></h2>
            <p>Pronto para elevar o padrão da sua infraestrutura? Preencha os dados abaixo e nossa equipe comercial entrará em contato em até 24 horas.</p>
            
            <div className="info-items">
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <span>comercial@gridtechtecnologia.com.br</span>
              </div>
              <div className="info-item">
                <FaPhoneAlt className="info-icon" />
                <span>(71) 99294-9859</span>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form onSubmit={handleContato}>
              <div className="input-group">
                <input type="text" placeholder="Seu Nome completo" required />
              </div>
              <div className="input-group">
                <input type="email" placeholder="E-mail corporativo" required />
              </div>
              <div className="input-group">
                <input type="tel" placeholder="Seu Telefone / WhatsApp" required />
              </div>
              <div className="input-group">
                <textarea placeholder="Como podemos te ajudar? (Descreva brevemente sua necessidade)" rows="4" required></textarea>
              </div>
              <button type="submit" className="btn-submit">
                Enviar Mensagem <FaArrowRight />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* SESSÃO FOOTER */}
      <footer className="footer-section">
        <div className="footer-bottom">
          <img src={logoImg} alt="GridTech" className="footer-logo" />
          <p>&copy; {new Date().getFullYear()} GridTech Tecnologia. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* BOTÃO FLUTUANTE */}
      <a href="https://wa.me/5571992949859" target="_blank" rel="noreferrer" className="whatsapp-float">
        <FaWhatsapp />
      </a>
    </div>
  );
}