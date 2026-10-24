document.querySelectorAll('.copy-citation').forEach((button) => {
  button.addEventListener('click', async () => {
    const panel = button.closest('.citation-panel');
    const text = panel.querySelector('pre').textContent;
    const status = panel.querySelector('.copy-status');
    try {
      await navigator.clipboard.writeText(text);
      status.textContent = 'Copied to clipboard.';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(panel.querySelector('pre'));
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = 'Citation selected. Press Ctrl+C or ⌘C to copy.';
    }
  });
});

const figureViewer = document.querySelector('.figure-viewer');
if (figureViewer && typeof figureViewer.showModal === 'function') {
  document.querySelectorAll('.paper-figure').forEach((link) => {
    link.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      const image = figureViewer.querySelector('.figure-full');
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      figureViewer.querySelector('#figure-title').textContent = link.dataset.figureTitle;
      figureViewer.querySelector('#figure-caption').textContent = link.dataset.figureCaption;
      figureViewer.showModal();
      document.documentElement.classList.add('figure-open');
    });
  });
  figureViewer.querySelector('.figure-close').addEventListener('click', () => figureViewer.close());
  figureViewer.addEventListener('click', (event) => {
    const bounds = figureViewer.getBoundingClientRect();
    if (event.target === figureViewer && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) figureViewer.close();
  });
  figureViewer.addEventListener('close', () => document.documentElement.classList.remove('figure-open'));
}
