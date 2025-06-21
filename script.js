(function(){
  const frameCount = 14;
  const seqImg     = document.getElementById('sequence');
  const overlay    = document.getElementById('overlay');
  const cache      = [];

  // Precarica tutte le immagini
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = `assets/${i}.webp`;
    cache.push(img);
  }

  // Formatta una Date in DD/MM/YYYY HH:MM:SS
  function formatDate(d) {
    const dd   = String(d.getDate()).padStart(2,'0');
    const mm   = String(d.getMonth()+1).padStart(2,'0');
    const yyyy = d.getFullYear();
    const hh   = String(d.getHours()).padStart(2,'0');
    const min  = String(d.getMinutes()).padStart(2,'0');
    return `${dd}/${mm}/${yyyy} ${hh}:${min}`;
  }

  window.addEventListener('scroll', () => {
    // 1) calcola frame index
    const scrollTop = Math.max(0, window.scrollY);
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    let frac        = scrollTop / maxScroll;
    let index       = Math.floor(frac * frameCount);
    index = Math.max(0, Math.min(frameCount-1, index));

    // 2) cambia immagine
    seqImg.src = `assets/${index+1}.webp`;

    // 3) crea nuova Date con minuti spostati di 'index'
    const now   = new Date();
    const ms    = now.getTime() + index * 60000;
    const dt    = new Date(ms);

    // 4) aggiorna overlay
    overlay.textContent = `macedonia01\n${formatDate(dt)}`;
  });
})();