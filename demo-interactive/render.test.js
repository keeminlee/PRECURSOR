// Unit tests for render.js. Uses node:test (built-in, no external deps).
// Run: `node --test render.test.js`

import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  escapeHtml,
  renderBadge,
  renderField,
  renderLayer,
  renderAll,
} from './render.js';

test('escapeHtml escapes the five HTML-sensitive characters', () => {
  const input = `<a href="x">'y'&z</a>`;
  const expected = '&lt;a href=&quot;x&quot;&gt;&#39;y&#39;&amp;z&lt;/a&gt;';
  assert.equal(escapeHtml(input), expected);
});

test('renderBadge emits a tier-scoped CSS class and displays the tier label', () => {
  const html = renderBadge('T2');
  assert.match(html, /class="tier tier-t2"/);
  assert.match(html, />T2</);
});

test('renderField escapes HTML-special characters in both name and value', () => {
  const html = renderField({ name: 'Greenlight <status>', value: 'YES & <approved>' });
  assert.match(html, /&lt;status&gt;/);
  assert.match(html, /&amp;/);
  assert.match(html, /&lt;approved&gt;/);
});

test('renderLayer includes id, name, description, tier badge, and fields', () => {
  const layer = {
    id: 'plan-governance',
    name: 'Plan Governance Header',
    description: 'Test description.',
    tier: 'T2',
    fields: [
      { name: 'Principal Intent', value: 'what success means' },
      { name: 'Greenlight', value: 'YES' },
    ],
  };
  const html = renderLayer(layer);
  assert.match(html, /data-id="plan-governance"/);
  assert.match(html, /<h2>Plan Governance Header<\/h2>/);
  assert.match(html, /class="tier tier-t2"/);
  assert.match(html, /<p class="description">Test description\.<\/p>/);
  assert.match(html, /<strong>Principal Intent:<\/strong>/);
  assert.match(html, /<strong>Greenlight:<\/strong>/);
});

test('renderAll produces page header with title/subtitle and main with layers', () => {
  const data = {
    title: 'Demo Title',
    subtitle: 'Demo subtitle.',
    layers: [
      { id: 'a', name: 'Layer A', description: 'd', tier: 'T1', fields: [] },
      { id: 'b', name: 'Layer B', description: 'd', tier: 'T2', fields: [] },
    ],
  };
  const html = renderAll(data);
  assert.match(html, /<h1>Demo Title<\/h1>/);
  assert.match(html, /<p class="subtitle">Demo subtitle\.<\/p>/);
  assert.match(html, /<main class="layers">/);
  assert.match(html, /data-id="a"/);
  assert.match(html, /data-id="b"/);
});
