(() => {
  const form = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  if (!form || !formStatus) return;

  function errorText(field) {
    if (field.validity.valueMissing) return 'Заповніть це поле.';
    if (field.validity.typeMismatch && field.type === 'email') return 'Вкажіть адресу електронної пошти з символом @.';
    if (field.validity.tooShort) return `Введіть щонайменше ${field.minLength} символів.`;
    if (field.validity.tooLong) return `Скоротіть текст до ${field.maxLength} символів.`;
    if (field.validity.patternMismatch) return 'Перевірте формат номера: від 10 до 20 цифр, пробілів і необов’язковий знак + на початку.';
    return 'Перевірте введене значення.';
  }

  function clearValidError(field) {
    const error = document.getElementById(`${field.id}-error`);
    if (error && field.checkValidity()) {
      error.textContent = '';
      field.removeAttribute('aria-invalid');
    }
  }

  form.addEventListener('input', (event) => {
    if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)) return;
    clearValidError(event.target);
    formStatus.textContent = '';
  });

  form.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement)) return;
    clearValidError(event.target);
    formStatus.textContent = '';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    formStatus.textContent = '';
    let firstInvalid = null;

    for (const field of form.querySelectorAll('input, textarea')) {
      const error = document.getElementById(`${field.id}-error`);
      if (!error) continue;

      if (field.checkValidity()) {
        error.textContent = '';
        field.removeAttribute('aria-invalid');
      } else {
        error.textContent = `Помилка: ${errorText(field)}`;
        field.setAttribute('aria-invalid', 'true');
        firstInvalid = firstInvalid || field;
      }
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    formStatus.textContent = 'Дякуємо! Перевірку форми пройдено. У навчальній версії повідомлення не надсилається.';
    form.reset();
  });

  form.addEventListener('reset', () => {
    for (const field of form.querySelectorAll('input, textarea')) {
      const error = document.getElementById(`${field.id}-error`);
      if (error) error.textContent = '';
      field.removeAttribute('aria-invalid');
    }
  });
})();
