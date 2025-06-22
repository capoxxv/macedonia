(function(){
  const frameCount = 14;
  const seqImg     = document.getElementById('sequence');
  const overlay    = document.getElementById('overlay');
  const cache      = [];

  // 1) Precarica tutte le immagini
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = `assets/${i}.webp`;
    cache.push(img);
  }

  // 2) Funzione per formattare la data/ora con colon lampeggiante
  function formatOverlayDate(d) {
  const dd   = String(d.getDate()).padStart(2,'0');
  const mm   = String(d.getMonth()+1).padStart(2,'0');
  const yyyy = d.getFullYear();
  const hh   = String(d.getHours()).padStart(2,'0');
  const min  = String(d.getMinutes()).padStart(2,'0');
  const timeStr = `${hh}<span class="blink-colon">:</span>${min}`;
  return `macedonia01<br>${dd}/${mm}/${yyyy} ${timeStr}<br><a href="https://www.instagram.com/ugostudiocosasarebbe/" target="_blank" class="overlay-link">ugostudio</a>`;
}

  // 3) Al scroll calcola frame e aggiorna overlay
  window.addEventListener('scroll', () => {
    // calcola index del frame [0…frameCount-1]
    const scrollTop = Math.max(0, window.scrollY);
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    let frac        = scrollTop / maxScroll;
    let index       = Math.floor(frac * frameCount);
    index = Math.max(0, Math.min(frameCount - 1, index));

    // aggiorna immagine
    seqImg.src = `assets/${index + 1}.webp`;

    // crea nuova Date aggiungendo 'index' minuti
    const now = new Date();
    const dt  = new Date(now.getTime() + index * 60000);

    // aggiorna overlay con innerHTML per inserire lo span
    overlay.innerHTML = formatOverlayDate(dt);
  });
})();
