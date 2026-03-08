document.addEventListener('DOMContentLoaded', function() {
  document.addEventListener('formValid', function(event) {
    const data = event.detail;
    console.clear();
    console.log('=== Данные формы ===');
    console.log('Имя:', data.name);
    console.log('Email:', data.email);
    console.log('Тема:', data.topic);
    console.log('Сообщение:', data.message || '(пусто)');
    console.log('Согласие:', data.consent ? 'Да' : 'Нет');
    console.log('====================');
  });
});