# Pasquali 2026 - Buglio

Un sito web moderno, spettacolare e mobile-first per celebrare la tradizione dei Pasquali di Buglio.

## 🌟 Caratteristiche

- **Design Moderno**: Interfaccia elegante con palette colori ispirata al logo Buglio (blu #1e5cb3)
- **Mobile-First**: Ottimizzato per smartphone e dispositivi mobili
- **Animazioni Fluide**: Micro-animazioni e transizioni smooth
- **Realtà Aumentata 3D**: Visualizzatore interattivo del Pasquale con A-Frame
- **Feedback System**: Sistema di recensioni con emoji

## 📁 Struttura del Progetto

```
Pasquali2026buglio/
├── index.html              # Homepage
├── significato.html        # Il significato del Pasquale
├── partecipanti.html       # Chi ha contribuito (55 nomi)
├── realta-aumentata.html   # AR 3D Viewer
├── recensioni.html        # Sistema feedback
├── Screenshot_2026-02-03_211348-removebg-preview.png  # Logo Buglio
├── css/
│   └── style.css          # Stili CSS completi
├── js/
│   └── main.js            # JavaScript funzionalità
└── README.md              # Documentazione
```

## 🎨 Design System (Basato sul Logo Buglio)

### Palette Colori (ESTRATTI DAL LOGO)
- **Blu Buglio**: `#1e5cb3` (Colore principale del logo)
- **Blu Chiaro**: `#4a8be0`
- **Blu Scuro**: `#0f3a6e`
- **Oro**: `#c9a227` (per contrasto e tradizione)
- **Crema**: `#faf6ef`

### Tipografia
- **Display**: Playfair Display / Cinzel
- **Body**: Inter / Roboto

## 🚀 Come Vedere il Sito Online

### Opzione 1: GitHub Pages (Consigliato)
1. Carica questo repository su GitHub
2. Vai su Settings > Pages
3. Seleziona il branch "main" (o "master")
4. Il sito sarà disponibile su: `https://tuo-username.github.io/Pasquali2026buglio/`

### Opzione 2: Netlify (Gratuito)
1. Vai su [netlify.com](https://netlify.com)
2. Trascina la cartella del progetto
3. Il sito sarà online immediatamente

### Opzione 3: Vercel
1. Vai su [vercel.com](https://vercel.com)
2. Connetti il tuo repository GitHub
3. Deploy automatico

### Opzione 4: Locale (Per sviluppo)
```bash
# Apri index.html nel browser
# O usa un server locale:
npx serve .
# oppure
python3 -m http.server 8000
```

## 📱 Pagine del Sito

### Homepage
- Hero section con numero del Pasquale
- Logo Buglio animato
- QR Code per votare
- Contatori live
- Quick links alle sezioni

### Significato
- Layout arioso per mobile
- Simboli del Pasquale con icone
- Galleria immagini

### Partecipanti
- Lista pulita di 55 nomi (solo nomi, senza ruoli)
- Layout responsive
- Animazioni subtle

### Realtà Aumentata 3D
- Viewer 3D con A-Frame
- Modellazione Pasquale interattiva
- Controlli (reset, auto-rotazione)
- Supporto VR

### Recensioni
- 5 emoji (triste → felice)
- Commento opzionale
- Invio email automatico a nico.trameri@gmail.com
- Nessuna recensione pubblicata

## 📦 Installazione per Sviluppo

```bash
# Clona il repository
git clone https://github.com/tuo-username/Pasquali2026buglio.git
cd Pasquali2026buglio

# Opzionale: Installa dipendenze per server locale
npm install -g serve

# Avvia server locale
serve .
```

## 🔧 Personalizzazione

### Colori
Modifica le variabili CSS in [`css/style.css`](css/style.css):
```css
:root {
    --buglio-blue: #1e5cb3;
    --buglio-blue-light: #4a8be0;
    --buglio-gold: #c9a227;
    /* ... */
}
```

### QR Code
Modifica l'URL in [`js/main.js`](js/main.js):
```javascript
const CONFIG = {
    qrUrl: "https://tu-url.com/vota",
    // ...
};
```

### Email Feedback
Modifica il destinatario in [`js/main.js`](js/main.js):
```javascript
const CONFIG = {
    emailRecipient: "tua-email@gmail.com",
    // ...
};
```

## 🛠️ Tecnologie

- HTML5
- CSS3 (Variables, Grid, Flexbox)
- JavaScript ES6+
- A-Frame (VR/AR)
- Font Awesome (Icone)
- Google Fonts (Playfair Display, Cinzel, Inter)

## 📄 Licenza

© 2026 Pasquali Buglio - Tutti i diritti riservati

## 📞 Contatti

Per domande o suggerimenti:
- Email: nico.trameri@gmail.com
- Sito: https://pasquali-bormio.it

---

Creato con ❤️ per la tradizione di Buglio
