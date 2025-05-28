document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggleQrBtn');
  const qrContainer = document.getElementById('qrCodeContainer');
  
  // Проверка существования элементов
  if (!toggleBtn || !qrContainer) {
    console.error('Не найдены необходимые элементы на странице!');
    return;
  }
  
  toggleBtn.addEventListener('click', function() {
    // Переключаем видимость
    const isHidden = qrContainer.classList.contains('hidden');
    
    if (isHidden) {
      qrContainer.classList.remove('hidden');
      qrContainer.classList.add('visible');
      toggleBtn.querySelector('.btn-text').textContent = 'Скрыть QR-код';
      toggleBtn.querySelector('.btn-icon').textContent = '🔲';
    } else {
      qrContainer.classList.remove('visible');
      qrContainer.classList.add('hidden');
      toggleBtn.querySelector('.btn-text').textContent = 'Показать QR-код';
      toggleBtn.querySelector('.btn-icon').textContent = '🔳';
    }
  });
  
  // Регистрация Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(reg => console.log('Service Worker зарегистрирован', reg))
      .catch(err => console.error('Ошибка регистрации Service Worker', err));
  }
});
