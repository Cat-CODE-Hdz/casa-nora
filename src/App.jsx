import { useState } from 'react'
import { createWhatsAppUrl, WHATSAPP_MSG, DEMO_MODE } from './lib/whatsapp'

const asset = (path) => `${import.meta.env.BASE_URL}${path}?v=real-4`
const HERO_IMG = asset('images/hero/hero-desktop.webp')
const HERO_MOBILE = asset('images/hero/hero-mobile.webp')
const ABOUT_KITCHEN = asset('images/about/kitchen.webp')
const ABOUT_CHEF = asset('images/about/chef.webp')
const EXPERIENCE_IMG = asset('images/experience/table.webp')

const hideOnError = (event) => {
  event.currentTarget.style.display = 'none'
}

const WA_TOOLTIP = 'Demo: el WhatsApp de Casa Nora no está conectado.'

const NAV_LINKS = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Nuestra cocina', href: '#nosotros' },
  { label: 'Carta', href: '#carta' },
  { label: 'Galería', href: '#galeria' },
  { label: 'Contacto', href: '#ubicacion' },
]

const PHILOSOPHY = [
  { num: '01', title: 'Producto', text: 'Seleccionamos ingredientes de calidad y proximidad.' },
  { num: '02', title: 'Temporada', text: 'Nuestra carta cambia con cada estación.' },
  { num: '03', title: 'Cocina', text: 'Respetamos el producto y cuidamos cada detalle.' },
  { num: '04', title: 'Momentos', text: 'Creamos espacios para compartir.' },
]

const DISHES = [
  {
    tag: 'Para compartir',
    name: 'Burrata cremosa',
    desc: 'Tomate de temporada, albahaca fresca y aceite de oliva.',
    price: '16€',
    img: asset('images/dishes/burrata.webp'),
  },
  {
    tag: 'Principal',
    name: 'Arroz meloso',
    desc: 'Setas de temporada, parmesano y hierbas frescas.',
    price: '22€',
    img: asset('images/dishes/arroz-meloso.webp'),
  },
  {
    tag: 'Principal',
    name: 'Pescado del día',
    desc: 'Producto fresco, verduras y salsa de temporada.',
    price: '24€',
    img: asset('images/dishes/pescado.webp'),
  },
  {
    tag: 'Postre',
    name: 'Tarta de queso',
    desc: 'Cremosa, suave y servida con frutos rojos.',
    price: '8€',
    img: asset('images/dishes/cheesecake.webp'),
  },
]

const EXPERIENCE_DATA = ['Producto local', 'Cocina de temporada', 'Madrid']

const GALLERY = [
  { num: '01', label: 'Restaurante exterior', img: asset('images/gallery/gallery-01.webp') },
  { num: '02', label: 'Interior', img: asset('images/gallery/gallery-02.webp') },
  { num: '03', label: 'Plato principal', img: asset('images/gallery/gallery-03.webp') },
  { num: '04', label: 'Entrada', img: asset('images/gallery/gallery-04.webp') },
  { num: '05', label: 'Postre', img: asset('images/gallery/gallery-05.webp') },
  { num: '06', label: 'Cocina', img: asset('images/gallery/gallery-06.webp') },
  { num: '07', label: 'Mesa', img: asset('images/gallery/gallery-07.webp') },
  { num: '08', label: 'Detalles', img: asset('images/gallery/gallery-08.webp') },
]

const HOURS = [
  { days: 'Martes — Jueves', time: '13:00 — 16:00 · 20:00 — 23:30' },
  { days: 'Viernes — Sábado', time: '13:00 — 16:30 · 20:00 — 00:00' },
  { days: 'Domingo', time: '13:00 — 17:00' },
]

const SOURCING = [
  {
    num: '01',
    title: 'Selección y control',
    text: 'Compramos producto local y revisamos cada partida al recibirla. Lo que no llega bien no entra en la carta.',
  },
  {
    num: '02',
    title: 'Cocina sin prisa',
    text: 'Mise en place diaria, cocciones lentas y revisión del plato antes de que salga a la mesa.',
  },
  {
    num: '03',
    title: 'Revisión antes de servir',
    text: 'Cada plato pasa por una última comprobación de punto, temperatura y presentación antes de llegar a tu mesa.',
  },
  {
    num: '04',
    title: 'Garantía en mesa',
    text: 'Si un plato no te convence, dínoslo en la mesa: lo retiramos sin coste y lo revisamos con el equipo de cocina.',
  },
]

const FAQ_ITEMS = [
  {
    q: '¿Es necesario reservar?',
    a: 'Recomendamos reservar con antelación, especialmente durante fines de semana.',
  },
  {
    q: '¿Tenéis opciones vegetarianas?',
    a: 'Sí. Nuestra carta incluye opciones vegetarianas y puede adaptarse según disponibilidad.',
  },
  {
    q: '¿Podéis atender alergias?',
    a: 'Indícanos cualquier alergia o necesidad al realizar tu reserva.',
  },
  {
    q: '¿Se puede reservar para grupos?',
    a: 'Sí. Para grupos recomendamos contactar con nosotros previamente.',
  },
]

const EXTRA_TOOLTIP =
  'No viene incluido en tu nivel: el contacto es WhatsApp. Pídenoslo como extra.'

function WhatsAppIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.006.55 1.764.846 2.806.846 3.182 0 5.768-2.587 5.768-5.766.001-3.182-2.585-5.629-5.768-5.629zm3.42 8.167c-.145.405-.838.774-1.171.823-.334.05-.758.077-2.348-.544-1.905-.744-3.134-2.693-3.23-2.821-.095-.129-.769-1.023-.769-1.95 0-.928.486-1.385.66-1.575.174-.19.38-.238.508-.238.127 0 .253.002.365.008.117.005.274-.045.428.327.16.386.548 1.336.595 1.433.048.097.08.21.016.337-.064.127-.096.206-.191.317-.095.111-.2.248-.286.333-.095.095-.195.198-.084.388.111.19.493.813 1.058 1.317.728.648 1.341.85 1.531.945.19.096.302.08.413-.048.112-.127.477-.555.604-.746.127-.19.254-.159.429-.095.175.064 1.112.524 1.303.62.19.095.317.143.365.222.048.08.048.46-.097.865z" />
    </svg>
  )
}

function WhatsAppCta({ children, className, onDemo, message = WHATSAPP_MSG, title = WA_TOOLTIP }) {
  const url = createWhatsAppUrl(message)

  if (url) {
    return (
      <a className={className} href={url} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={className} onClick={onDemo} title={title}>
      {children}
    </button>
  )
}

function AnnouncementBar() {
  return (
    <div className="announce">
      <span>Producto local · Cocina de temporada · Madrid</span>
    </div>
  )
}

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="header">
      <AnnouncementBar />

      <nav className="nav" aria-label="Navegación principal">
        <a href="#hero" className="nav-logo">
          Casa Nora
        </a>

        <button
          type="button"
          className="nav-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
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
              Reservar mesa
            </a>
          </li>
          <li className="nav-city">Madrid</li>
        </ul>
      </nav>
    </header>
  )
}

function Hero({ onDemo }) {
  const hideBrokenImage = (event) => {
    event.currentTarget.style.display = 'none'
  }

  return (
    <section id="hero" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          {DEMO_MODE && <span className="badge-concept">Proyecto conceptual</span>}
          <span className="hero-eyebrow">Casa Nora · Madrid</span>
          <h1 className="hero-title">
            Cocina mediterránea.
            <br />
            Momentos que se recuerdan.
          </h1>
          <p className="hero-text">
            Producto local, recetas de temporada y una experiencia pensada para disfrutar sin
            prisa.
          </p>

          <div className="hero-actions">
            <WhatsAppCta className="btn btn-primary" onDemo={onDemo}>
              <WhatsAppIcon className="btn-icon" />
              <span>Reservar mesa</span>
            </WhatsAppCta>
            <a className="btn btn-outline" href="#carta">
              Ver la carta
            </a>
          </div>

          <p className="hero-note">
            El contacto es WhatsApp: escribes con tu fecha y el número de personas y la reserva
            se coordina por ahí.
          </p>
        </div>

        <figure className="hero-visual">
          <picture>
            <source media="(max-width: 700px)" srcSet={HERO_MOBILE} />
            <img src={HERO_IMG} alt="Comedor de Casa Nora con mesas preparadas y luz cálida" onError={hideBrokenImage} />
          </picture>
          <figcaption>Mesa preparada · imagen de ambiente</figcaption>
        </figure>
      </div>

      <a href="#nosotros" className="hero-scroll">
        Scroll to explore
      </a>
    </section>
  )
}

function About() {
  return (
    <section id="nosotros" className="section">
      <div className="container">
        <div className="about-grid">
          <div className="about-copy">
            <span className="section-label">Nuestra historia</span>
            <h2 className="section-title">Comer bien es una forma de compartir.</h2>
            <p className="section-desc">
              Casa Nora nace de una idea sencilla: reunir buenos productos, buenas personas y
              tiempo para disfrutar.
            </p>
            <p className="section-desc">
              Nuestra cocina combina tradición mediterránea y una mirada contemporánea, respetando
              cada ingrediente y dejando que la temporada marque el ritmo.
            </p>
          </div>

          <aside className="value-card">
            <span className="section-label">Propuesta de valor</span>
            <p className="value-lines">
              Producto local.
              <br />
              Cocina de temporada.
              <br />
              Momentos para recordar.
            </p>
            <p className="value-text">
              En Casa Nora creemos que una buena comida empieza mucho antes del primer plato.
              Producto, tiempo, personas y un espacio pensado para disfrutar.
            </p>
          </aside>
        </div>

        <div className="about-photos">
          <figure className="about-photo">
              <img src={ABOUT_KITCHEN} alt="Cocina de Casa Nora preparando producto de temporada" loading="lazy" onError={hideOnError} />
            <figcaption>Cocina abierta · producto de temporada</figcaption>
          </figure>
          <figure className="about-photo about-photo-portrait">
              <img src={ABOUT_CHEF} alt="Chef de Casa Nora en la cocina" loading="lazy" onError={hideOnError} />
            <figcaption>Personaje de demo · CAT CODE</figcaption>
          </figure>
        </div>

        <div className="philosophy">
          <h2 className="section-title section-title-center">
            Lo que hacemos empieza en el producto.
          </h2>
          <div className="philosophy-grid">
            {PHILOSOPHY.map((item) => (
              <article className="phil-card" key={item.num}>
                <span className="phil-num">{item.num}</span>
                <h3 className="phil-title">{item.title}</h3>
                <p className="phil-text">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Dishes({ onDemo }) {
  return (
    <section id="carta" className="section section-alt">
      <div className="container">
        <div className="section-head">
          <span className="section-label">En la mesa</span>
          <h2 className="section-title">Algunos de nuestros favoritos.</h2>
          <p className="section-desc section-desc-center">
            Cuatro platos que resumen lo que somos: producto de temporada, cocina sin prisa y
            sobremesas que se alargan.
          </p>
        </div>

        <div className="dishes-grid">
          {DISHES.map((dish) => (
            <article className="dish-card" key={dish.name}>
              <div className="dish-img">
                <img src={dish.img} alt={`${dish.name} en Casa Nora`} loading="lazy" onError={hideOnError} />
              </div>
              <span className="dish-tag">{dish.tag}</span>
              <h3 className="dish-name">{dish.name}</h3>
              <p className="dish-desc">{dish.desc}</p>
              <div className="dish-price">{dish.price}</div>
            </article>
          ))}
        </div>

        <div className="dishes-cta">
          <WhatsAppCta className="btn btn-primary btn-lg" onDemo={onDemo}>
            <WhatsAppIcon className="btn-icon" />
            <span>Pedir mesa por WhatsApp</span>
          </WhatsAppCta>
          <p className="dishes-note">
            La carta completa y los detalles del día se comparten por WhatsApp.
          </p>
        </div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experiencia" className="section">
      <div className="container exp-grid">
        <div className="exp-copy">
          <span className="section-label">La experiencia</span>
          <h2 className="exp-title">
            Cómo reservamos,
            <br />
            cómo llegas al plato.
          </h2>
          <p className="section-desc">
            Casa Nora está pensada para disfrutar sin prisa. Una comida entre amigos, una cena
            especial o simplemente un momento para desconectar.
          </p>
          <ol className="exp-process">
            <li>
              <strong>Reserva por WhatsApp.</strong> Escribes cuántos sois y cuándo. Te respondemos
              con el hueco disponible, sin apps ni pasos de burocracia.
            </li>
            <li>
              <strong>Confirmamos el día.</strong> La carta cambia con la temporada; te mandamos
              lo que va a estar en tu mesa antes de llegar.
            </li>
            <li>
              <strong>Llegas y comemos.</strong> Mesa preparada, tiempo real y sin cronómetro.
              Si algo no está como lo imaginamos, lo remediamos ahí mismo, sin discutir.
            </li>
          </ol>

          <ul className="exp-data">
            {EXPERIENCE_DATA.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <figure className="exp-visual">
          <img src={EXPERIENCE_IMG} alt="Mesa preparada en el comedor de Casa Nora" loading="lazy" onError={hideOnError} />
          <figcaption>Ambientación · imagen de ambiente</figcaption>
        </figure>
      </div>
    </section>
  )
}

function Gallery() {
  return (
    <section id="galeria" className="section section-alt">
      <div className="container">
        <div className="section-head">
          <span className="section-label">Galería</span>
          <h2 className="section-title">Casa Nora, por dentro.</h2>
          <p className="section-desc section-desc-center">
            Un vistazo a Casa Nora: la sala, la cocina y los detalles del día a día.
          </p>
        </div>

        <div className="gallery-grid">
          {GALLERY.map((item) => (
            <figure className="gallery-item" key={item.num}>
              <img className="gallery-img" src={item.img} alt={`Casa Nora · ${item.label}`} loading="lazy" onError={hideOnError} />
              <span className="gallery-num">{item.num}</span>
              <figcaption className="gallery-cap">{item.label}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Location({ onDemo }) {
  return (
    <section id="ubicacion" className="section">
      <div className="container">
        <div className="section-head">
          <span className="section-label">Ubicación</span>
          <h2 className="section-title">En el corazón de Madrid.</h2>
        </div>

        <div className="loc-grid">
          <div className="loc-info">
            <div className="loc-card">
              <span className="loc-card-label">Dirección</span>
              <p className="loc-name">Casa Nora</p>
              <p>Calle Demo 123</p>
              <p>Madrid</p>
              <span className="loc-chip">Dirección demo · no es un local real</span>
            </div>

            <div className="loc-card">
              <span className="loc-card-label">Horario</span>
              <ul className="hours">
                {HOURS.map((row) => (
                  <li key={row.days}>
                    <span className="hours-days">{row.days}</span>
                    <span className="hours-time">{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="loc-card loc-card-muted">
              <span className="loc-card-label">Teléfono</span>
              <p>No publicado en esta demo.</p>
            </div>

            <WhatsAppCta className="btn btn-primary btn-block" onDemo={onDemo}>
              <WhatsAppIcon className="btn-icon" />
              <span>Contactar por WhatsApp</span>
            </WhatsAppCta>
          </div>

          <div className="map-ph" role="img" aria-label="Mapa estilizado de la ubicación demo de Casa Nora en Madrid">
            <span className="map-marker" aria-hidden="true" />
            <span className="map-pin-label">Casa Nora</span>
            <span className="map-chip">Mapa estilizado · dirección demo</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Sourcing() {
  return (
    <section id="origen" className="section section-alt">
      <div className="container src-grid">
        <div className="src-copy">
          <span className="section-label">Sección ampliada</span>
          <h2 className="section-title">Cómo trabajamos y qué pasa si algo no sale bien.</h2>
          <p className="section-desc">
            Antes de llegar a la mesa, cada plato pasa por un proceso claro. Te contamos cómo
            seleccionamos, cómo cocinamos y qué hacemos si algo no está a la altura.
          </p>
          <p className="section-desc">
            Preferimos enseñar el oficio antes que las cifras: revisión antes de servir y retirada
            sin coste si un plato no te convence.
          </p>
        </div>

        <ol className="src-list">
          {SOURCING.map((item) => (
            <li className="src-item" key={item.num}>
              <span className="src-num">{item.num}</span>
              <div>
                <h3 className="src-title">{item.title}</h3>
                <p className="src-text">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function Faq() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="section">
      <div className="container faq-wrap">
        <div className="section-head">
          <span className="section-label">FAQ</span>
          <h2 className="section-title">Preguntas frecuentes</h2>
        </div>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index
            const panelId = `faq-panel-${index}`
            const buttonId = `faq-button-${index}`

            return (
              <div className={`faq-item${isOpen ? ' open' : ''}`} key={item.q}>
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="faq-a"
                  hidden={!isOpen}
                >
                  <p>{item.a}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Reservation() {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')
  const [popover, setPopover] = useState(false)
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    fecha: '',
    hora: '',
    personas: '2',
    mensaje: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: value })
  }

  const fillExample = () => {
    setForm({
      nombre: 'Nombre de ejemplo',
      email: 'nombre@ejemplo.com',
      telefono: '600 000 000',
      fecha: '2026-12-31',
      hora: '21:00',
      personas: '4',
      mensaje: 'Mesa para 4, sin alergias. Reserva de ejemplo.',
    })
    setError('')
    setStatus('idle')
  }

  const validate = (values) => {
    if (!values.nombre.trim()) return 'Indica tu nombre.'
    if (!/^[^\s@]+@ejemplo\.(com|es)$/i.test(values.email))
      return 'Usa un correo de ejemplo (nombre@ejemplo.com).'
    if (!/^6\d{2} \d{3} \d{3}$/.test(values.telefono.trim()))
      return 'Introduce un teléfono con formato 6XX XXX XXX.'
    if (!values.fecha) return 'Indica la fecha.'
    if (!values.hora) return 'Indica la hora.'
    if (!values.personas) return 'Indica el número de personas.'
    return ''
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const message = validate(form)
    if (message) {
      setError(message)
      return
    }
    setError('')
    setStatus('loading')
    window.setTimeout(() => setStatus('success'), 900)
  }

  const resetForm = () => {
    setForm({
      nombre: '',
      email: '',
      telefono: '',
      fecha: '',
      hora: '',
      personas: '2',
      mensaje: '',
    })
    setError('')
    setStatus('idle')
  }

  return (
    <section id="reservar" className="section section-alt">
      <div className="container reservation">
        <div className="res-head">
          <span className="badge-extra">EXTRA · a presupuestar</span>

          <div className="info-wrap">
            <button
              type="button"
              className="info-btn"
              title={EXTRA_TOOLTIP}
              aria-label="Información sobre el extra de formulario"
              aria-expanded={popover}
              onClick={() => setPopover(!popover)}
            >
              i
            </button>

            {popover && (
              <div className="res-popover" role="note">
                <strong>El formulario no va incluido en este nivel.</strong>
                El contacto de esta landing es un botón de WhatsApp: te escriben y reservan ahí
                mismo, sin esperas. Un formulario te obligaría a redactar tu propia política de
                privacidad y la de cookies, y a mantenerlas al día cada vez que cambies algo. Si lo
                quieres, es un extra: tú nos das el texto legal redactado y nosotros lo montamos.
                Esto es una demo de cómo se vería.
              </div>
            )}
          </div>
        </div>

        <div className="section-head">
          <h2 className="section-title">¿Comemos?</h2>
          <p className="section-desc section-desc-center">
            Reserva tu mesa y ven a disfrutar de Casa Nora.
          </p>
        </div>

        <div className="notice" role="note">
          <span className="notice-title">Demostración.</span> Este formulario no envía nada a
          ningún sitio ni comprueba disponibilidad.
        </div>

        <button type="button" className="form-example" onClick={fillExample}>
          Rellenar con datos de ejemplo →
        </button>

        <form className="res-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="res-nombre">Nombre</label>
              <input
                id="res-nombre"
                name="nombre"
                type="text"
                placeholder="Tu nombre completo"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="res-email">Email</label>
              <input
                id="res-email"
                name="email"
                type="email"
                placeholder="nombre@ejemplo.com"
                pattern="[^@\s]+@ejemplo\.(com|es)"
                title="Usa un correo de ejemplo, p. ej. nombre@ejemplo.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="res-telefono">Teléfono</label>
              <input
                id="res-telefono"
                name="telefono"
                type="tel"
                placeholder="6XX XXX XXX"
                pattern="6[0-9]{2} [0-9]{3} [0-9]{3}"
                title="Formato: 6XX XXX XXX"
                value={form.telefono}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="res-personas">Número de personas</label>
              <select
                id="res-personas"
                name="personas"
                value={form.personas}
                onChange={handleChange}
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'persona' : 'personas'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="res-fecha">Fecha</label>
              <input
                id="res-fecha"
                name="fecha"
                type="date"
                value={form.fecha}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="res-hora">Hora</label>
              <input
                id="res-hora"
                name="hora"
                type="time"
                value={form.hora}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="res-mensaje">Mensaje</label>
            <textarea
              id="res-mensaje"
              name="mensaje"
              rows={3}
              placeholder="Alergias, celebraciones, preferencias..."
              value={form.mensaje}
              onChange={handleChange}
            />
          </div>

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading'
              ? 'Enviando…'
              : status === 'success'
                ? 'Solicitud enviada'
                : 'Solicitar reserva'}
          </button>

          <p className="form-micro">Esto no comprueba disponibilidad: es una demo.</p>

          {status === 'success' && (
            <div className="success-panel" role="status" id="demo-feedback">
              <p className="success-title">Simulación completada</p>
              <p>
                Esto es una demostración.
                <br />
                Así se vería la confirmación si el formulario estuviera activo. No hemos recibido
                nada.
              </p>
              <hr />
              <p className="success-demo">
                <strong>DEMO CAT CODE</strong>
                <br />
                Ningún dato se ha enviado ni guardado.
              </p>
              <button type="button" className="btn-reset" onClick={resetForm}>
                Rellenar otra vez →
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}

function Footer({ onDemo }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="footer-logo">Casa Nora</span>
            <p className="footer-city">Madrid</p>
            <p className="footer-desc">
              Cocina mediterránea
              <br />
              de temporada.
            </p>
            {DEMO_MODE && (
              <span className="badge-concept badge-concept-dark">Proyecto conceptual</span>
            )}
          </div>

          <div className="footer-col">
            <span className="footer-heading">Ubicación</span>
            <ul>
              <li>Calle Demo 123</li>
              <li>Madrid</li>
              <li>Dirección demo</li>
            </ul>
          </div>

          <div className="footer-col">
            <span className="footer-heading">Horario</span>
            <ul>
              {HOURS.map((row) => (
                <li key={row.days}>
                  {row.days}: {row.time}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <span className="footer-heading">Enlaces</span>
            <ul>
              <li>
                <a href="#carta">Carta</a>
              </li>
              <li>
                <a href="#ubicacion">Contacto</a>
              </li>
              <li>
                <a href="#reservar">Reservas</a>
              </li>
              <li>
                <span className="footer-muted" title="Perfil no conectado en la demo">
                  Instagram
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="level-panel">
          <div className="level-head">
            <span className="level-name">CUSTOM Pro</span>
            <span className="level-price">249 € + 29 €/mes</span>
            <span className="level-star">★ MÁS ELEGIDO</span>
          </div>

          <div className="level-body">
            <p>
              <strong>Incluye:</strong> 8 secciones · hero con WhatsApp · sobre nosotros ·
              servicios (la carta) · confianza · ubicación · sección ampliada · galería · FAQ ·
              hosting · responsive · SEO básico · 2 rondas de cambios.
            </p>
            <p className="level-no">
              <strong>No incluye:</strong> blog, casos de éxito y aviso legal → Custom Premium
              (+200 €). Formulario → extra, a presupuestar.
            </p>
          </div>

          <div className="level-links">
            <a
              href="https://cat-code-hdz.github.io/taller-recambios/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ¿Ver el escalón anterior? → Taller Recambios
            </a>
            <a
              href="https://cat-code-hdz.github.io/ruta-norte/"
              target="_blank"
              rel="noopener noreferrer"
            >
              ¿Ver el siguiente nivel? → Ruta Norte
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Casa Nora</span>
          {DEMO_MODE && (
            <span className="footer-badge">Proyecto conceptual · Diseñado por CAT CODE</span>
          )}
          <WhatsAppCta className="footer-wa" onDemo={onDemo}>
            <WhatsAppIcon className="btn-icon" />
            <span>Reservas por WhatsApp</span>
          </WhatsAppCta>
        </div>
      </div>
    </footer>
  )
}

function WhatsAppFab({ onDemo }) {
  return (
    <div className="wa-fab-wrap">
      <span className="wa-fab-label">¿Necesitas ayuda?</span>
      <WhatsAppCta className="wa-fab" onDemo={onDemo} title="¿Necesitas ayuda?">
        <WhatsAppIcon className="wa-fab-icon" />
        <span className="sr-only">Escríbenos por WhatsApp</span>
      </WhatsAppCta>
    </div>
  )
}

export default function App() {
  const [toast, setToast] = useState(false)

  const showDemoToast = () => {
    setToast(true)
    window.setTimeout(() => setToast(false), 5000)
  }

  return (
    <>
      <Header />
      <main>
        <Hero onDemo={showDemoToast} />
        <About />
        <Dishes onDemo={showDemoToast} />
        <Experience />
        <Gallery />
        <Location onDemo={showDemoToast} />
        <Sourcing />
        <Faq />
        <Reservation />
      </main>
      <Footer onDemo={showDemoToast} />
      <WhatsAppFab onDemo={showDemoToast} />

      {toast && (
        <div className="wa-toast" role="status">
          <span className="wa-toast-label">Estado demo</span>
          <p>
            <strong>Esta es una demostración de la integración con WhatsApp.</strong> El número de
            Casa Nora no está conectado: así se abriría la conversación con tu mensaje
            predefinido.
          </p>
        </div>
      )}
    </>
  )
}
