const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

const communityLink = [
  'https://chat.whatsapp.com/',
  'HXVd3h5cqOAGXOsgkV6X4k',
  '?mode=gi_t'
].join('');

document.querySelectorAll('.js-community-link').forEach(link => {
  link.setAttribute('href', communityLink);
  link.setAttribute('target', '_blank');
  link.setAttribute('rel', 'noopener noreferrer');
  link.setAttribute('referrerpolicy', 'no-referrer');
});

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
