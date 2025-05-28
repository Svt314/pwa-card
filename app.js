document.addEventListener('DOMContentLoaded', function() {
  const qrButton = document.getElementById('qrToggle');
  const qrContainer = document.getElementById('qrContainer');
  
  if (!qrButton || !qrContainer) {
    console.error('Не найдены необходимые элементы!');
    return;
  }
  
  qrButton.addEventListener('click', function() {
    const isHidden = qrContainer.classList.contains('hidden');
    
    if (isHidden) {
      // Показываем QR-код
      qrContainer.classList.remove('hidden');
      setTimeout(() => {
        qrContainer.classList.add('visible');
      }, 10);
      
      // Меняем текст кнопки
      qrButton.querySelector('.button-text').textContent = 'Скрыть QR-код';
      qrButton.querySelector('.button-icon').textContent = '👁️‍🗨️';
    } else {
      // Скрываем QR-код
      qrContainer.classList.remove('visible');
      setTimeout(() => {
        qrContainer.classList.add('hidden');
      }, 500);
      
      // Меняем текст кнопки
      qrButton.querySelector('.button-text').textContent = 'Показать QR-код';
      qrButton.querySelector('.button-icon').textContent = '👁️';
    }
  });
  
  // Регистрация Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Service Worker зарегистрирован'))
      .catch(err => console.error('Ошибка регистрации SW:', err));
  }
});
