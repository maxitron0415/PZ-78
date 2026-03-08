document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('feedbackForm');
  if (!form) return;

  function clearErrors() {
    document.querySelectorAll('#feedbackForm .is-invalid').forEach(el => {
      el.classList.remove('is-invalid');
    });
    document.querySelectorAll('#feedbackForm .invalid-feedback').forEach(el => el.remove());
  }

  function showError(field, message) {
    field.classList.add('is-invalid');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;

    if (field.type === 'checkbox') {
      const formCheck = field.closest('.form-check');
      if (formCheck) {
        formCheck.appendChild(errorDiv);
      } else {
        field.parentNode.appendChild(errorDiv);
      }
    } else {
      field.parentNode.appendChild(errorDiv);
    }
  }

  function removeFieldError(field) {
    field.classList.remove('is-invalid');
    const parent = field.parentNode;
    const errors = parent.querySelectorAll('.invalid-feedback');
    errors.forEach(el => el.remove());

    if (field.type === 'checkbox') {
      const formCheck = field.closest('.form-check');
      if (formCheck) {
        const errorsInCheck = formCheck.querySelectorAll('.invalid-feedback');
        errorsInCheck.forEach(el => el.remove());
      }
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', function(event) {
    event.preventDefault();
    clearErrors();

    let isValid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const topic = document.getElementById('topic');
    const message = document.getElementById('message');
    const consent = document.getElementById('consent');

    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const topicValue = topic.value;
    const messageValue = message.value.trim();

    if (nameValue === '') {
      showError(name, 'Введите имя');
      isValid = false;
    } else if (nameValue.split(' ').filter(word => word.length > 0).length < 2) {
      showError(name, 'Введите имя и фамилию (минимум два слова)');
      isValid = false;
    }

    if (emailValue === '') {
      showError(email, 'Введите email');
      isValid = false;
    } else if (!isValidEmail(emailValue)) {
      showError(email, 'Введите корректный email (например, name@domain.com)');
      isValid = false;
    }

    if (topicValue === '') {
      showError(topic, 'Выберите тему сообщения');
      isValid = false;
    }

    if (messageValue === '') {
      showError(message, 'Введите сообщение');
      isValid = false;
    }

    if (!consent.checked) {
      showError(consent, 'Необходимо согласие на обработку данных');
      isValid = false;
    }

    if (isValid) {
      const formData = {
        name: nameValue,
        email: emailValue,
        topic: topicValue,
        message: messageValue,
        consent: consent.checked
      };
      const validEvent = new CustomEvent('formValid', { detail: formData });
      document.dispatchEvent(validEvent);
      alert('Форма отправлена!');
    }
  });

  const inputs = document.querySelectorAll('#feedbackForm input, #feedbackForm select, #feedbackForm textarea');
  inputs.forEach(input => {
    input.addEventListener('input', function() {
      removeFieldError(this);
    });
    if (input.type === 'checkbox') {
      input.addEventListener('change', function() {
        removeFieldError(this);
      });
    }
  });
});