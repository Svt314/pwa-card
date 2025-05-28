document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggleQrBtn');
  const qrContainer = document.getElementById('qrCodeContainer');
  
  toggleBtn.addEventListener('click', function() {
    if (qrContainer.classList.contains('hidden')) {
      qrContainer.classList.remove('hidden');
      qrContainer.classList.add('visible');
      toggleBtn.textContent = 'Скрыть QR-код';
    } else {
      qrContainer.classList.remove('visible');
      qrContainer.classList.add('hidden');
      toggleBtn.textContent = 'Показать QR-код';
    }
  });
  
  // Регистрация Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('SW registered', reg))
      .catch(err => console.log('SW registration failed', err));
  }
});
