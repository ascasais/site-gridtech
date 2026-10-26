import React, { useState, useEffect } from 'react';
import { 
  FaNetworkWired, FaVideo, FaFingerprint, FaCogs,
  FaWhatsapp, FaArrowRight, FaLaptopCode, FaCheckCircle, FaBars, FaTimes,
  FaEnvelope, FaPhoneAlt, FaHeadset, FaFileContract
} from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './App.sass';
import logoImg from './assets/logo.png'; 
import dashboardImg from './assets/dashboard-real.png';

// Fotos de obras feitas pela equipe (originais em /fotos, fora do build)
import fotoRackCabeado from './assets/obras/rack-cabeado.webp';
import fotoRackOrganizado from './assets/obras/rack-organizado.webp';
import fotoCameraExterna from './assets/obras/camera-externa.webp';
import fotoAcessoFacial from './assets/obras/acesso-facial.webp';
import fotoTotemAcesso from './assets/obras/totem-acesso.webp';
import fotoPatchPanel from './assets/obras/patch-panel.webp';
import fotoSwitchDetalhe from './assets/obras/switch-detalhe.webp';
import fotoRackDvr from './assets/obras/rack-dvr.webp';
import fotoCabeamentoFeixes from './assets/obras/cabeamento-feixes.webp';
import fotoRackFibra from './assets/obras/rack-fibra.webp';
import fotoRackExterno from './assets/obras/rack-externo.webp';
import fotoCentralAcesso from './assets/obras/central-acesso.webp';
import fotoCameraJardim from './assets/obras/camera-jardim.webp';

import ppaLogo from './assets/partners/PPA.png';
import controlidLogo from './assets/partners/Controlid.png';
import niceLogo from './assets/partners/Nice.png';
import furukawaLogo from './assets/partners/Furukawa.png';
import hikvisionLogo from './assets/partners/Hikvision.png';
import intelbrasLogo from './assets/partners/Intelbras.png';
import tplinkLogo from './assets/partners/Tplink.png';

const FABRICANTES = [
  { logo: intelbrasLogo, nome: 'Intelbras' }, { logo: furukawaLogo, nome: 'Furukawa' }, { logo: hikvisionLogo, nome: 'Hikvision' },
  { logo: ppaLogo, nome: 'PPA' }, { logo: controlidLogo, nome: 'Control iD' }, { logo: niceLogo, nome: 'Nice' }, { logo: tplinkLogo, nome: 'TP-Link' }
];

const SERVICOS = [
  { foto: fotoCameraExterna, icone: FaVideo, titulo: 'CFTV', texto: 'Instalação, troca e manutenção de câmeras e gravadores. Todo mês conferimos a gravação câmera por câmera e mandamos o relatório.' },
  { foto: fotoAcessoFacial, icone: FaFingerprint, titulo: 'Controle de acesso', texto: 'Leitores faciais, biometria, tags e catracas, com o cadastro de moradores e visitantes configurado e funcionando.' },
  { foto: fotoTotemAcesso, icone: FaCogs, titulo: 'Portaria e portões', texto: 'Interfonia, totens de entrada e automatizadores de portão. Manutenção preventiva para o portão não parar na hora errada.' },
  { foto: fotoRackOrganizado, icone: FaNetworkWired, titulo: 'Cabeamento e redes', texto: 'Montagem de rack, cabeamento identificado, switches e fibra óptica. A base para câmera e acesso não caírem.' }
];

const OBRAS = [
  { foto: fotoCabeamentoFeixes, legenda: 'Cabos separados por cor e amarrados em feixes' },
  { foto: fotoPatchPanel, legenda: 'Patch panel com cabos identificados' },
  { foto: fotoSwitchDetalhe, legenda: 'Switch e organizador de cabos' },
  { foto: fotoRackFibra, legenda: 'Rack com fibra óptica e sobras organizadas' },
  { foto: fotoRackDvr, legenda: 'Gravador e alimentação das câmeras' },
  { foto: fotoRackExterno, legenda: 'Rack em área técnica' },
  { foto: fotoCentralAcesso, legenda: 'Central de acesso com fonte e baterias' },
  { foto: fotoCameraJardim, legenda: 'Câmera em área externa' }
];

const WHATSAPP ='https://wa.me/5571992949859?text=' + encodeURIComponent('Olá! Vim pelo site da GridTech e gostaria de falar com um especialista.');

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
    document.title = "GridTech - Segurança Eletrônica, CFTV e Controle de Acesso";
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
    }, () => {
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
            <button onClick={() => scrollTo('solucoes')}>Serviços</button>
            <button onClick={() => scrollTo('obras')}>Trabalhos</button>
            <button onClick={() => scrollTo('diferenciais')}>Portal</button>
            <button onClick={() => scrollTo('contato')}>Contato</button>
          </div>

          <div className="nav-actions desktop-only">
            <a href="https://web.gridtechtecnologia.com.br" className="btn-login">
              <FaLaptopCode /> Área do Cliente
            </a>
          </div>

          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MENU MOBILE */}
        {menuOpen && (
          <div className="mobile-menu">
            <button onClick={() => scrollTo('home')}>Início</button>
            <button onClick={() => scrollTo('solucoes')}>Serviços</button>
            <button onClick={() => scrollTo('obras')}>Trabalhos</button>
            <button onClick={() => scrollTo('diferenciais')}>Portal</button>
            <button onClick={() => scrollTo('contato')}>Contato</button>
            <a href="https://web.gridtechtecnologia.com.br" className="btn-login-mobile">
              <FaLaptopCode /> Área do Cliente
            </a>
          </div>
        )}
      </nav>

      {/* SESSÃO HERO */}
      <header id="home" className="hero-section">
        <div className="hero-grade">
          <div className="hero-content reveal">
            <p className="hero-local">Salvador e Região Metropolitana</p>
            <h1>Manutenção de CFTV, controle de acesso e redes para condomínios e empresas.</h1>
            <p>Instalamos, cuidamos e registramos tudo: cada visita gera relatório com fotos, e você acompanha os chamados pelo portal.</p>

            <div className="hero-buttons">
              <a className="btn-primary" href={WHATSAPP} target="_blank" rel="noreferrer">
                <FaWhatsapp /> Falar no WhatsApp
              </a>
              <button className="btn-secondary" onClick={() => scrollTo('obras')}>
                Ver trabalhos feitos
              </button>
            </div>
          </div>
          <figure className="hero-foto reveal delay-200">
            <img src={fotoRackCabeado} alt="Rack de rede montado pela equipe GridTech, com cabos separados por cor e amarrados" fetchPriority="high" />
            <figcaption>Rack montado pela nossa equipe</figcaption>
          </figure>
        </div>
      </header>

      <section className="impact-bar">
        <ul className="impact-container">
          <li>Relatório com fotos em cada preventiva</li>
          <li>Gravação dos DVRs conferida todo mês</li>
          <li>Chamados acompanhados pelo portal</li>
          <li>Orçamento detalhado antes de qualquer troca</li>
        </ul>
      </section>

      {/* SESSÃO DE PARCEIROS */}
      <section className="partners-section">
        <p className="partners-title reveal">Marcas que instalamos e mantemos</p>
        <div className="carousel-container reveal delay-200">
          <div className="carousel-track">
            {FABRICANTES.map((f, i) => (
              <div key={i} className="partner-logo"><img src={f.logo} alt={f.nome} loading="lazy" /></div>
            ))}
            {/* Cópia para o carrossel girar sem emenda (escondida dos leitores de tela) */}
            {FABRICANTES.map((f, i) => (
              <div key={'dup'+i} className="partner-logo" aria-hidden="true"><img src={f.logo} alt="" loading="lazy" /></div>
            ))}
          </div>
        </div>
      </section>

      {/* O QUE FAZEMOS */}
      <section id="solucoes" className="services-section">
        <div className="section-header reveal">
          <h2>O que fazemos</h2>
          <p>Instalação e manutenção. As fotos são de serviços da nossa equipe.</p>
        </div>

        <div className="services-grid">
          {SERVICOS.map((s, i) => (
            <article key={s.titulo} className={`service-card reveal delay-${(i + 1) * 100}`}>
              <img className="service-foto" src={s.foto} alt={s.titulo} loading="lazy" />
              <div className="service-texto">
                <h3><s.icone className="service-icone" /> {s.titulo}</h3>
                <p>{s.texto}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="obras" className="obras-section">
        <div className="section-header reveal">
          <h2>Trabalhos recentes</h2>
          <p>Como deixamos os racks e as instalações depois do serviço.</p>
        </div>
        <div className="obras-grid">
          {OBRAS.map((o) => (
            <figure key={o.legenda} className="obra reveal">
              <img src={o.foto} alt={o.legenda} loading="lazy" />
              <figcaption>{o.legenda}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* SESSÃO DE DIFERENCIAIS */}
      <section id="diferenciais" className="features-section">
        <div className="features-content">
          <div className="features-text reveal">
            <h2>Acompanhe tudo pelo portal</h2>
            <p>O síndico ou o gestor entra no portal e vê o que foi feito, quando e por quem, sem precisar ligar para perguntar.</p>
            
            <ul className="features-list">
              <li><FaCheckCircle className="check-icon" /> Dashboard com o status dos seus equipamentos.</li>
              <li><FaCheckCircle className="check-icon" /> Acompanhamento de chamados e soluções ao vivo.</li>
              <li><FaCheckCircle className="check-icon" /> Relatórios de preventivas com fotos e laudos técnicos.</li>
              <li><FaCheckCircle className="check-icon" /> Relatório mensal com a gravação dos DVRs conferida, câmera por câmera.</li>
              <li><FaCheckCircle className="check-icon" /> Gestão transparente de orçamentos e faturas.</li>
            </ul>

            <a href="https://web.gridtechtecnologia.com.br" className="btn-feature-login">
              Entrar no portal <FaArrowRight />
            </a>
          </div>
          <div className="features-image reveal delay-200">
            <div className="mockup-container">
              <div className="mockup-window">
                <div className="mockup-header">
                  <span className="dot dot-red"></span><span className="dot dot-yellow"></span><span className="dot dot-green"></span>
                  <div className="mockup-url">web.gridtechtecnologia.com.br</div>
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
            <h2>Fale com a gente</h2>
            <p>Conte o que está precisando, seja uma visita técnica, um orçamento ou um contrato de manutenção. Respondemos pelo WhatsApp ou por e-mail.</p>
            
            <div className="sla-badge-box">
              <div className="sla-badge"><FaHeadset /> Atendimento a chamados de contrato com prioridade</div>
              <div className="sla-badge"><FaFileContract /> Orçamento com item, quantidade e valor</div>
            </div>

            <div className="info-items">
              <div className="info-item">
                <FaEnvelope className="info-icon" />
                <a href="mailto:comercial@gridtechtecnologia.com.br">comercial@gridtechtecnologia.com.br</a>
              </div>
              <div className="info-item">
                <FaPhoneAlt className="info-icon" />
                <a href="tel:+5571992949859">(71) 99294-9859</a>
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
                <p className="form-lgpd">Usamos seus dados apenas para responder a este contato.</p>
                <button type="submit" className="btn-submit" disabled={isSending}>
                  {isSending ? 'Enviando aguarde...' : <>Enviar mensagem <FaArrowRight /></>}
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
      <a href={WHATSAPP} target="_blank" rel="noreferrer" className="whatsapp-float" aria-label="Falar com a GridTech pelo WhatsApp" title="Falar pelo WhatsApp">
        <FaWhatsapp />
      </a>
    </div>
  );
}