// Pure rendering module for the PRECURSOR governance visualizer.
// No DOM or fetch dependencies — exports string-building functions so the
// module is trivially unit-testable under node:test.

export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function renderBadge(tier) {
  const t = String(tier);
  return `<span class="tier tier-${t.toLowerCase()}">${escapeHtml(t)}</span>`;
}

export function renderField(field) {
  return `<li><strong>${escapeHtml(field.name)}:</strong> ${escapeHtml(field.value)}</li>`;
}

export function renderLayer(layer) {
  const fields = layer.fields.map(renderField).join('');
  return `<article class="layer" data-id="${escapeHtml(layer.id)}">
  <header>
    <h2>${escapeHtml(layer.name)}</h2>
    ${renderBadge(layer.tier)}
  </header>
  <p class="description">${escapeHtml(layer.description)}</p>
  <ul class="fields">${fields}</ul>
</article>`;
}

export function renderAll(data) {
  const layers = data.layers.map(renderLayer).join('\n');
  return `<header class="page-header">
  <h1>${escapeHtml(data.title)}</h1>
  <p class="subtitle">${escapeHtml(data.subtitle)}</p>
</header>
<main class="layers">
${layers}
</main>`;
}
