// Обработка QR-кодов
document.addEventListener('DOMContentLoaded', () => {
  const qrContainer = document.getElementById('qrContainer');
  const qrImage = document.getElementById('qrImage');
  const closeQrBtn = document.getElementById('closeQrBtn');
  
  // Обработчики для кнопок QR-кодов
  document.querySelectorAll('.qr-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const qrType = btn.getAttribute('data-qr');
      qrImage.src = `qr-${qrType}.png`;
      qrContainer.classList.remove('hidden');
    });
  });
  
  // Закрытие QR-кода
  closeQrBtn.addEventListener('click', () => {
    qrContainer.classList.add('hidden');
  });
  
  // PWA Installation
  const installContainer = document.getElementById('installContainer');
  const installBtn = document.getElementById('installBtn');
  let deferredPrompt;
  
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installContainer.classList.remove('hidden');
  });
  
  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        installContainer.classList.add('hidden');
      }
      deferredPrompt = null;
    }
  });
  
  window.addEventListener('appinstalled', () => {
    installContainer.classList.add('hidden');
  });
  
  // Регистрация Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('SW registered:', reg))
      .catch(err => console.log('SW registration failed:', err));
  }
});
