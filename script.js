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
