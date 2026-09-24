import { useState } from 'react'

const HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZXdTAiPJd9q2LBEXXK6gDn9kZ3_srRuiFbLZLyEtIrpSV9v2m2TgHyM3NVEC_vQYe3oTq5-rEJiYKbJKHPYmPSg-ZzPNmLFjrbDM8PVCH4iNppX0fhpbc_MvyXdTLbRIAuSgMH-Z_GqlGg0cT9BwVGtaqfwvm1F38VbfqEWNBFMgiN1B1lk5Eyrx6ngpNQzDeKUz2rICS9Zbu6EpXSM8sXg9tzqKPIOhP-vXWmekFvdeQVn3xTi82'

const NAV_LINKS = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Carta', href: '#carta' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Reservar', href: '#reservar' },
]

const MENU_ITEMS = [
  {
    category: 'Entrante',
    name: 'Tartare de Atún Rojo',
    desc: 'Atún rojo de almadraba, aguacate, sésamo negro y vinagreta de yuzu',
    price: '€18',
  },
  {
    category: 'Principal',
    name: 'Carrillera Ibérica',
    desc: 'Cocción lenta 48h, puré de boniato trufado, reducción de vino tinto',
    price: '€32',
  },
  {
    category: 'Postre',
    name: 'Sol de Nora',
    desc: 'Mousse de mango, coriostería crujiente, gel de tamarindo y hibisco',
    price: '€14',
  },
  {
    category: 'Entrante',
    name: 'Burata Pugliese',
    desc: 'Burata cremosa, tomates confitados, pesto de albahaca y reducción de balsámico',
    price: '€16',
  },
  {
    category: 'Arroces',
    name: 'Arroz Caldoso de Bogavante',
    desc: 'Bogavante fresco, arroz caldoso cremoso, aliño de guindilla y azafrán',
    price: '€38',
  },
  {
    category: 'Bodega',
    name: 'Selección de Bodega',
    desc: 'Carta curated de más de 200 referencias, con especialidad en vinos españoles',
    price: 'desde €6',
  },
]

const GALLERY_ITEMS = [
  { img: HERO_IMG, wide: true, tall: false },
  { img: HERO_IMG, wide: false, tall: true },
  { img: HERO_IMG, wide: false, tall: false },
  { img: HERO_IMG, wide: false, tall: false },
  { img: HERO_IMG, wide: true, tall: false },
]

function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="nav">
      <a href="#hero" className="nav-logo">Casa Nora</a>

      <button
        className="nav-toggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`nav-links${open ? ' open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          </li>
        ))}
        <li>
          <a href="#reservar" className="nav-cta" onClick={() => setOpen(false)}>
            Reservar Mesa
          </a>
        </li>
      </ul>
    </nav>
  )
}

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <span className="hero-label">Cocina Contemporánea · Madrid</span>
        <h1 className="hero-title">Donde cada plato cuenta una historia</h1>
        <p className="hero-desc">
          Una experiencia gastronómica que fusiona la tradición culinaria española
          con técnicas vanguardistas, en el corazón de Madrid.
        </p>
        <div className="hero-buttons">
          <a href="#reservar" className="btn-primary">Reservar Mesa</a>
          <a href="#carta" className="btn-outline">Ver Carta</a>
        </div>
      </div>
    </section>
  )
}

function About() {
  const stats = [
    { number: '12', label: 'Años de experiencia' },
    { number: '1', label: 'Estrella Michelin' },
    { number: '98%', label: 'Clientes satisfechos' },
    { number: '0km', label: 'Del producto' },
  ]

  return (
    <section id="nosotros" className="section">
      <div className="container">
        <div className="about-grid">
          <div className="about-image">
            <img src={HERO_IMG} alt="Interior de Casa Nora" />
            <div className="about-image-accent" />
          </div>

          <div className="about-content">
            <span className="section-label">Nuestra Historia</span>
            <h2 className="section-title">
              Sabor, tradición y una pizca de atrevimiento
            </h2>
            <p className="section-desc">
              Desde 2014, Casa Nora ha sido un homenaje a los sabores auténticos de
              la cocina española, reinterpretados con una mirada contemporánea. Cada
              plato nace de la relación directa con productores locales y de la
              pasión por la excelencia.
            </p>
            <p className="section-desc" style={{ marginTop: '1rem' }}>
              Nuestro equipo, liderado por la chef Nora Martín, transforma
              ingredientes de temporada en experiencias que despiertan los sentidos
              y dejan una huella inolvidable.
            </p>

            <div className="about-stats">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="stat-number">{s.number}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Menu() {
  return (
    <section id="carta" className="section" style={{ background: 'var(--surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">Nuestra Carta</span>
          <h2 className="section-title">Sabores que enamoran</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Una selección cuidada de platos que celebran la mejor materia prima
            de cada temporada.
          </p>
        </div>

        <div className="menu-grid">
          {MENU_ITEMS.map((item) => (
            <div className="menu-card" key={item.name}>
              <span className="menu-card-label">{item.category}</span>
              <h3 className="menu-card-name">{item.name}</h3>
              <p className="menu-card-desc">{item.desc}</p>
              <div className="menu-card-price">{item.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section id="galeria" className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-label">Galería</span>
          <h2 className="section-title">Momentos en Casa Nora</h2>
          <p className="section-desc" style={{ margin: '0 auto' }}>
            Cada detalle cuenta. Descubre la atmósfera que nos define.
          </p>
        </div>

        <div className="gallery-grid">
          {GALLERY_ITEMS.map((item, i) => (
            <div
              key={i}
              className={`gallery-item${item.wide ? ' gallery-item-wide' : ''}${item.tall ? ' gallery-item-tall' : ''}`}
            >
              <img src={item.img} alt={`Galería Casa Nora ${i + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reservation() {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    fecha: '',
    comensales: '2',
    notas: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(
      `Reserva recibida, ${form.nombre}.\n` +
        `Fecha: ${form.fecha}\n` +
        `Comensales: ${form.comensales}\n` +
        `Te confirmaremos por email a ${form.email}.`
    )
  }

  return (
    <section id="reservar" className="section" style={{ background: 'var(--surface)' }}>
      <div className="reservation-inner">
        <span className="section-label">Reservar</span>
        <h2 className="section-title">Reserva tu mesa</h2>
        <p className="section-desc" style={{ margin: '0 auto' }}>
          Completa el formulario y nos pondremos en contacto contigo para
          confirmar tu reserva.
        </p>

        <form className="reservation-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="nombre">Nombre</label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Tu nombre completo"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="tu@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="fecha">Fecha</label>
              <input
                id="fecha"
                name="fecha"
                type="date"
                value={form.fecha}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="comensales">Comensales</label>
              <select
                id="comensales"
                name="comensales"
                value={form.comensales}
                onChange={handleChange}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'persona' : 'personas'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="notas">Notas</label>
            <textarea
              id="notas"
              name="notas"
              placeholder="Alergias, preferencias, occasion especial..."
              value={form.notas}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="form-submit">
            Confirmar Reserva
          </button>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand-name">Casa Nora</div>
          <p className="footer-brand-desc">
            Cocina contemporánea con alma española. Una experiencia gastronómica
            en el corazón de Madrid.
          </p>
        </div>

        <div className="footer-col">
          <div className="footer-heading">Ubicación</div>
          <ul>
            <li><p>Calle de Serrano 42</p></li>
            <li><p>28001 Madrid</p></li>
            <li><a href="tel:+34912345678">+34 912 345 678</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <div className="footer-heading">Horario</div>
          <ul>
            <li><p>Lun – Jue: 13:00 – 15:30 / 20:00 – 23:00</p></li>
            <li><p>Vie – Sáb: 13:00 – 16:00 / 20:00 – 00:00</p></li>
            <li><p>Domingo: Cerrado</p></li>
          </ul>
        </div>

        <div className="footer-col">
          <div className="footer-heading">Síguenos</div>
          <ul>
            <li><a href="#">Instagram</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">TripAdvisor</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 Casa Nora. Todos los derechos reservados.</span>
        <div className="footer-socials">
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Reservation />
      <Footer />
    </>
  )
}
