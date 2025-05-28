// Регистрация Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(registration => {
        console.log('ServiceWorker зарегистрирован:', registration.scope);
        
        // Проверяем, можно ли установить PWA
        if (registration.scope.includes('https://svt314.github.io/pwa-card/')) {
          setupPWAInstallPrompt();
        }
      })
      .catch(err => {
        console.log('Ошибка регистрации ServiceWorker:', err);
      });
  });
}

// Обработка кнопки QR-кода
document.addEventListener('DOMContentLoaded', () => {
  const qrButton = document.getElementById('qrToggle');
  const qrContainer = document.getElementById('qrContainer');
  
  if (qrButton && qrContainer) {
    qrButton.addEventListener('click', () => {
      qrContainer.classList.toggle('hidden');
      qrButton.querySelector('.button-text').textContent = 
        qrContainer.classList.contains('hidden') ? 'Показать QR-код' : 'Скрыть QR-код';
      qrButton.querySelector('.button-icon').textContent = 
        qrContainer.classList.contains('hidden') ? '👁️' : '👁️‍🗨️';
    });
  }
});

// Функция для показа кнопки установки PWA
let deferredPrompt;

function setupPWAInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    
    // Показываем кнопку установки
    const installButton = document.createElement('button');
    installButton.className = 'install-button';
    installButton.innerHTML = `
      <span class="button-icon">⬇️</span>
      <span class="button-text">Установить приложение</span>
    `;
    
    installButton.addEventListener('click', () => {
      installButton.style.display = 'none';
      deferredPrompt.prompt();
      
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Пользователь согласился установить PWA');
        } else {
          console.log('Пользователь отказался от установки PWA');
        }
        deferredPrompt = null;
      });
    });
    
    document.querySelector('.card').prepend(installButton);
  });

  window.addEventListener('appinstalled', () => {
    console.log('PWA было успешно установлено');
    deferredPrompt = null;
  });
}
