document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggleQrBtn');
  const qrContainer = document.getElementById('qrCodeContainer');
  
  console.log('DOM загружен');

  toggleBtn.addEventListener('click', function() {
    if (qrContainer.classList.contains('hidden')) {
      qrContainer.classList.remove('hidden');
      qrContainer.classList.add('visible');
      toggleBtn.textContent = 'Скрыть QR-код';
      console.log('QR-код показан');
    } else {
      qrContainer.classList.remove('visible');
      qrContainer.classList.add('hidden');
      toggleBtn.textContent = 'Показать QR-код';
      console.log('QR-код скрыт');
    }
  });
  
  // Регистрация Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('SW registered', reg))
      .catch(err => console.log('SW registration failed', err));
  }
});
