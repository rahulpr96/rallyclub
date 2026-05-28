const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

document.querySelectorAll('.copy-email-btn').forEach(button => {
  button.addEventListener('click', async () => {
    const email = button.dataset.copy;
    const text = button.querySelector('.copy-email-text');

    if (!email || !text) {
      return;
    }

    const previousLabel = text.textContent;

    try {
      await navigator.clipboard.writeText(email);
      text.textContent = 'Copied';
      button.classList.add('copied');
      button.setAttribute('aria-label', `Copied ${email}`);
    } catch (error) {
      text.textContent = 'Failed';
    }

    window.setTimeout(() => {
      text.textContent = previousLabel;
      button.classList.remove('copied');
      button.setAttribute('aria-label', `Copy ${email}`);
    }, 1500);
  });
});
