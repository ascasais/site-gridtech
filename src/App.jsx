import React, { useState, useEffect } from 'react';
import { 
  FaNetworkWired, FaShieldAlt, FaVideo, FaFingerprint, FaCogs,
  FaWhatsapp, FaArrowRight, FaLaptopCode, FaCheckCircle, FaBars, FaTimes,
  FaEnvelope, FaPhoneAlt, FaHeadset, FaFileContract
} from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './App.sass';
import logoImg from './assets/logo.png'; 
import dashboardImg from './assets/dashboard-real.png'; 

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

  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    phone: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  useEffect(() => {
    document.title = "GridTech - Segurança Eletrônica e Infraestrutura";
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContato = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.send(
      'service_m4lx6cs', 
      'template_6hp1fjd', 
      formData,           
      '39aYk_Y8QvGllfqbd' 
    )
    .then(() => {
        setIsSending(false);
        setSendSuccess(true);
        setFormData({ from_name: '', from_email: '', phone: '', message: '' });
        setTimeout(() => setSendSuccess(false), 5000);
    }, (error) => {
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
          <div className="badge">Tecnologia Aplicada em Segurança Eletrônica</div>
          <h1>Soluções que <span className="highlight">Conectam e Protegem</span> o seu Patrimônio.</h1>
          <p>Gestão inteligente de segurança para condomínios e empresas que exigem transparência absoluta e <strong>alta disponibilidade</strong>.</p>
          
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

      {/* 🔥 BARRA DE IMPACTO (SEM TERMOS CONFUSOS) 🔥 */}
      <section className="impact-bar reveal delay-100">
        <div className="impact-container">
          <div className="impact-item"><strong>500+</strong><span>Equipamentos Atendidos</span></div>
          <div className="impact-item"><strong>99.9%</strong><span>Disponibilidade</span></div>
          <div className="impact-item"><strong>100%</strong><span>Gestão Proativa</span></div>
          <div className="impact-item"><strong>100%</strong><span>Laudos Transparentes</span></div>
        </div>
      </section>

      {/* SESSÃO DE PARCEIROS */}
      <section className="partners-section">
        <p className="partners-title reveal">Trabalhamos com os líderes mundiais do setor</p>
        <div className="carousel-container reveal delay-200">
          <div className="carousel-track">
            {[intelbrasLogo, furukawaLogo, hikvisionLogo, ppaLogo, controlidLogo, niceLogo, tplinkLogo].map((logo, i) => (
              <div key={i} className="partner-logo"><img src={logo} alt="Fabricante" /></div>
            ))}
            {[intelbrasLogo, furukawaLogo, hikvisionLogo, ppaLogo, controlidLogo, niceLogo, tplinkLogo].map((logo, i) => (
              <div key={'dup'+i} className="partner-logo"><img src={logo} alt="Fabricante" /></div>
            ))}
          </div>
        </div>
      </section>

      {/* SESSÃO DE SOLUÇÕES (COM TEXTOS REALISTAS) */}
      <section id="solucoes" className="services-section">
        <div className="section-header reveal">
          <h2>Tecnologia de <span className="highlight">Vanguarda</span></h2>
          <p>Soluções estruturadas com hardware de ponta para garantir a máxima proteção do seu ambiente.</p>
        </div>

        <div className="services-grid">
          <div className="service-card reveal delay-100">
            <div className="card-header">
              <div className="icon-box"><FaVideo /></div>
              <div className="service-tag">Proteção Contínua</div>
            </div>
            <h3>CFTV Inteligente</h3>
            <p>Mais que imagens: câmeras com inteligência artificial, detecção de intrusão e analíticos avançados. Infraestrutura projetada para minimizar quedas.</p>
          </div>
          
          <div className="service-card reveal delay-200">
            <div className="card-header">
              <div className="icon-box"><FaFingerprint /></div>
              <div className="service-tag">Alta Circulação</div>
            </div>
            <h3>Controle de Acesso Avançado</h3>
            <p>Biometria facial de alta precisão e catracas de acesso rápido. Gestão de moradores e visitantes com total rastreabilidade pelo sistema.</p>
          </div>

          <div className="service-card reveal delay-300">
            <div className="card-header">
              <div className="icon-box"><FaCogs /></div>
              <div className="service-tag">Automação</div>
            </div>
            <h3>Portaria Conectada</h3>
            <p>Sistemas de interfonia IP e automatizadores de portão de alto ciclo. Comunicação clara e rápida, reduzindo os custos de manutenção corretiva.</p>
          </div>

          <div className="service-card reveal delay-400">
            <div className="card-header">
              <div className="icon-box"><FaNetworkWired /></div>
              <div className="service-tag">Base do Sistema</div>
            </div>
            <h3>Cabeamento Estruturado</h3>
            <p>A "espinha dorsal" de toda a segurança. Montagem de racks, roteamento e cabeamento robusto, com opções em fibra óptica sob demanda.</p>
          </div>
        </div>
      </section>

      {/* SESSÃO DE DIFERENCIAIS */}
      <section id="diferenciais" className="features-section">
        <div className="features-content">
          <div className="features-text reveal">
            <h2>Transparência e Controle em <span className="highlight">Tempo Real</span></h2>
            <p>A GridTech elimina a "caixa preta" da manutenção. Com nosso <strong>Portal do Cliente Exclusivo</strong>, você acompanha a nossa entrega na palma da mão.</p>
            
            <ul className="features-list">
              <li><FaCheckCircle className="check-icon" /> Dashboard com o status dos seus equipamentos.</li>
              <li><FaCheckCircle className="check-icon" /> Acompanhamento de chamados e soluções ao vivo.</li>
              <li><FaCheckCircle className="check-icon" /> Relatórios de preventivas com fotos e laudos técnicos.</li>
              <li><FaCheckCircle className="check-icon" /> Gestão transparente de orçamentos e faturas.</li>
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

      {/* SESSÃO DE CONTATO (SEM AMARRAS DE 2H/24H) */}
      <section id="contato" className="contact-section">
        <div className="contact-container reveal">
          <div className="contact-info">
            <h2>Fale com nossos <span className="highlight">Especialistas</span></h2>
            <p>Pronto para elevar o padrão da sua infraestrutura? Preencha os dados e retornaremos com agilidade.</p>
            
            <div className="sla-badge-box">
              <div className="sla-badge"><FaHeadset /> Suporte Técnico Ágil e Prioritário</div>
              <div className="sla-badge"><FaFileContract /> Orçamentos Rápidos e Detalhados</div>
            </div>

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
                <FaCheckCircle style={{ fontSize: '30px', margin: '0 auto 10px auto', display: 'block' }} />
                Mensagem enviada com sucesso! Nossa equipe entrará em contato em breve.
              </div>
            ) : (
              <form onSubmit={handleContato}>
                <div className="input-group">
                  <input type="text" name="from_name" placeholder="Nome / Condomínio" value={formData.from_name} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <input type="email" name="from_email" placeholder="E-mail corporativo" value={formData.from_email} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <input type="tel" name="phone" placeholder="Seu Telefone / WhatsApp" value={formData.phone} onChange={handleChange} required />
                </div>
                <div className="input-group">
                  <textarea name="message" placeholder="Como podemos ajudar hoje?" rows="4" value={formData.message} onChange={handleChange} required></textarea>
                </div>
                <button type="submit" className="btn-submit" disabled={isSending}>
                  {isSending ? 'Enviando aguarde...' : <>Solicitar Atendimento <FaArrowRight /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer-section">
        <div className="footer-bottom">
          <img src={logoImg} alt="GridTech" className="footer-logo" />
          <p>&copy; {new Date().getFullYear()} GridTech Tecnologia e Sistemas Elétricos ltda.<br/>Todos os direitos reservados. CNPJ: 45.477.979/0001-21</p>
        </div>
      </footer>

      {/* BOTÃO FLUTUANTE */}
      <a href="https://wa.me/5571992949859" target="_blank" rel="noreferrer" className="whatsapp-float">
        <FaWhatsapp />
      </a>
    </div>
  );
}