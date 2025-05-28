document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('qrModal');
  const closeBtn = document.querySelector('.close');
  
  // Обработка всех кнопок контактов
  document.querySelectorAll('.contact-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });
  });
  
  // Закрытие модального окна
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
  
  // Закрытие при клике вне QR-кода
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
  
  // PWA функционал
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('SW registered'))
      .catch(err => console.log('SW error:', err));
  }
  
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    setTimeout(() => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
      }
    }, 3000);
  });
});
