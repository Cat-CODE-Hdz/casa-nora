export const DEMO_MODE = import.meta.env.VITE_DEMO_MODE !== 'false'
export const WHATSAPP_DEMO_NUMBER = import.meta.env.VITE_WHATSAPP_DEMO_NUMBER || ''

export const WHATSAPP_MSG = 'Hola 👋\n\nMe gustaría recibir más información sobre Casa Nora.'

export function createWhatsAppUrl(message = WHATSAPP_MSG) {
  const number = WHATSAPP_DEMO_NUMBER.replace(/\D/g, '')
  if (DEMO_MODE || !number) return null
  const text = encodeURIComponent(message)
  return `https://wa.me/${number}?text=${text}`
}

export function openWhatsAppOrDemo(message = WHATSAPP_MSG) {
  const url = createWhatsAppUrl(message)
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer')
    return true
  }
  return false
}
