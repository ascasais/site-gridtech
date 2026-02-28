import React, { useState, useEffect } from 'react';
import { 
  FaNetworkWired, FaShieldAlt, FaVideo, FaFingerprint, FaCogs,
  FaWhatsapp, FaArrowRight, FaLaptopCode, FaCheckCircle, FaBars, FaTimes,
  FaEnvelope, FaPhoneAlt
} from 'react-icons/fa';
import emailjs from '@emailjs/browser'; // IMPORTAÇÃO DO MOTOR DE E-MAIL
import './App.sass';
import logoImg from './assets/logo.png'; 
import dashboardImg from './assets/dashboard-real.png'; 

// IMPORTAÇÃO DAS SUAS LOGOS REAIS EM PNG
import ppaLogo from './assets/partners/PPA.png';
import controlidLogo from './assets/partners/Controlid.png';
import niceLogo from './assets/partners/Nice.png';
import furukawaLogo from './assets/partners/Furukawa.png';
import hikvisionLogo from './assets/partners/Hikvision.png';
import intelbrasLogo from './assets/partners/Intelbras.png';
import tplinkLogo from './assets/partners/Tplink.png';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ESTADOS DO FORMULÁRIO DE CONTATO
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    phone: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

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

  // CAPTURA O QUE O CLIENTE DIGITA
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // MOTOR DE DISPARO (EMAILJS)
  const handleContato = (e) => {
    e.preventDefault();
    setIsSending(true);

    // Usa as chaves que você criou no painel
    emailjs.send(
      'service_m4lx6cs', // Seu Service ID
      'template_6hp1fjd', // Seu Template ID
      formData,           // Os dados preenchidos no form
      '39aYk_Y8QvGllfqbd' // Sua Public Key
    )
    .then((result) => {
        console.log("E-mail enviado com sucesso!", result.text);
        setIsSending(false);
        setSendSuccess(true);
        // Limpa o formulário
        setFormData({ from_name: '', from_email: '', phone: '', message: '' });
        // Tira a mensagem de sucesso após 5 segundos
        setTimeout(() => setSendSuccess(false), 5000);
    }, (error) => {
        console.log("Erro ao enviar o e-mail.", error.text);
        alert("Ocorreu um erro ao enviar sua mensagem. Por favor, tente pelo WhatsApp.");
        setIsSending(false);
    });
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

      {/* SESSÃO DE PARCEIROS/CLIENTES COM AS LOGOS REAIS */}
      <section className="partners-section">
        <p className="partners-title reveal">Trabalhamos com os melhores fabricantes do mercado</p>
        <div className="carousel-container reveal delay-100">
          <div className="carousel-track">
            {/* Bloco 1 */}
            <div className="partner-logo"><img src={intelbrasLogo} alt="Intelbras" /></div>
            <div className="partner-logo"><img src={furukawaLogo} alt="Furukawa" /></div>
            <div className="partner-logo"><img src={hikvisionLogo} alt="Hikvision" /></div>
            <div className="partner-logo"><img src={ppaLogo} alt="PPA" /></div>
            <div className="partner-logo"><img src={controlidLogo} alt="Control iD" /></div>
            <div className="partner-logo"><img src={niceLogo} alt="Nice" /></div>
            <div className="partner-logo"><img src={tplinkLogo} alt="Tplink" /></div>
            {/* Bloco 2 (Cópia para efeito infinito) */}
            <div className="partner-logo"><img src={intelbrasLogo} alt="Intelbras" /></div>
            <div className="partner-logo"><img src={furukawaLogo} alt="Furukawa" /></div>
            <div className="partner-logo"><img src={hikvisionLogo} alt="Hikvision" /></div>
            <div className="partner-logo"><img src={ppaLogo} alt="PPA" /></div>
            <div className="partner-logo"><img src={controlidLogo} alt="Control iD" /></div>
            <div className="partner-logo"><img src={niceLogo} alt="Nice" /></div>
            <div className="partner-logo"><img src={tplinkLogo} alt="Tplink" /></div>
          </div>
        </div>
      </section>

      {/* SESSÃO DE SOLUÇÕES */}
      <section id="solucoes" className="services-section">
        <div className="section-header reveal">
          <h2>Nosso <span className="highlight">Portfólio</span></h2>
          <p>Engenharia e tecnologia aplicadas para garantir a máxima segurança da sua operação.</p>
        </div>

        <div className="services-grid">
          <div className="service-card reveal delay-100">
            <div className="icon-box"><FaVideo /></div>
            <h3>CFTV Inteligente</h3>
            <p>Sistemas de câmeras HD/IP com Inteligência Artificial. Analíticos de vídeo avançados para detecção facial, cruzamento de linha e alerta de intrusão real.</p>
          </div>
          
          <div className="service-card reveal delay-200">
            <div className="icon-box"><FaFingerprint /></div>
            <h3>Controle de Acesso</h3>
            <p>Sistemas de altíssima segurança para condomínios e empresas. Reconhecimento facial de alta velocidade, biometria digital, tags RFID e catracas.</p>
          </div>

          <div className="service-card reveal delay-300">
            <div className="icon-box"><FaCogs /></div>
            <h3>Automação & Interfonia</h3>
            <p>Automatizadores de portão ultrarrápidos, cancelas para controle veicular e sistemas de interfonia digital IP com alta clareza de áudio e vídeo.</p>
          </div>

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

      {/* SESSÃO DE CONTATO (AGORA CONECTADA AO EMAILJS) */}
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
            {sendSuccess ? (
              <div className="success-message" style={{ background: '#10b981', color: 'white', padding: '20px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold' }}>
                <FaCheckCircle style={{ fontSize: '30px', marginBottom: '10px' }} />
                <br /> Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.
              </div>
            ) : (
              <form onSubmit={handleContato}>
                <div className="input-group">
                  <input type="text" name="from_name" placeholder="Seu Nome completo" value={formData.from_name} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <input type="email" name="from_email" placeholder="E-mail corporativo" value={formData.from_email} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <input type="tel" name="phone" placeholder="Seu Telefone / WhatsApp" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <textarea name="message" placeholder="Como podemos te ajudar? (Descreva brevemente sua necessidade)" rows="4" value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn-submit" disabled={isSending}>
                  {isSending ? 'Enviando aguarde...' : <>Enviar Mensagem <FaArrowRight /></>}
                </button>
              </form>
            )}
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