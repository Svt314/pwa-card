document.addEventListener('DOMContentLoaded', () => {
  // Регистрация Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('ServiceWorker зарегистрирован');
      })
      .catch(err => {
        console.log('Ошибка регистрации ServiceWorker: ', err);
      });
  }
  
  // Обработка кнопки показа QR-кода
  const qrBtn = document.getElementById('showQrBtn');
  const qrContainer = document.getElementById('qrContainer');
  
  qrBtn.addEventListener('click', () => {
    if (qrContainer.style.display === 'none') {
      qrContainer.style.display = 'block';
      qrBtn.textContent = 'Скрыть QR-код';
    } else {
      qrContainer.style.display = 'none';
      qrBtn.textContent = 'Показать QR-код';
    }
  });
  
  // Анимация загрузки
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 200);
});
