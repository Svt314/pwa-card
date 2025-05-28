document.addEventListener('DOMContentLoaded', () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('ServiceWorker зарегистрирован');
      })
      .catch(err => {
        console.log('Ошибка регистрации ServiceWorker: ', err);
      });
  }
  
  // Анимация загрузки
  setTimeout(() => {
    document.body.classList.add('loaded');
  }, 200);
});
