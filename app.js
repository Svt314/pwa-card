// Регистрация Service Worker с улучшенной обработкой ошибок
document.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  }
  
  // Добавляем класс для анимации после загрузки
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 200);
});