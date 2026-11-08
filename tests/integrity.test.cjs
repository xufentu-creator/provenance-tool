const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const core = require('../assets/integrity-core.js');

const hash = x => crypto.createHash('sha256').update(x).digest('hex');
const record = (files) => ({ algorithm: 'SHA-256', files });
const file = (name, content) => ({ relative_path: name, size_bytes: Buffer.byteLength(content), sha256: hash(content) });

test('main browser application inline JavaScript parses', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  const blocks = [...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)];
  const application = blocks.at(-1)?.[1];
  assert.ok(application && application.includes('readIntegrity'));
  assert.doesNotThrow(() => new Function(application));
});

test('main page links preserve every internal resource route and local stylesheet', () => {
  const root = path.join(__dirname, '..');
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const refs = [...html.matchAll(/\b(?:href|src)="(\.\/[^"]+)"/g)].map(x => x[1]);
  for (const ref of refs) {
    const clean = ref.slice(2).split('#')[0].split('?')[0];
    assert.ok(fs.existsSync(path.join(root, clean || 'index.html')), `Missing internal route/asset: ${ref}`);
  }
  for (const route of ['about.html', 'how-it-works.html', 'use-cases.html', 'faq.html', 'citation.html', 'privacy.html'])
    assert.ok(refs.includes(`./${route}`), `Missing visible resource navigation: ${route}`);
});

test('generated output is invalidated when input files or declared metadata change', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
  assert.match(html, /function invalidateCreatedPackage\(\)/);
  assert.match(html, /if\(key==="create"\)\{invalidateCreatedPackage\(\);autofillCreateMetadata\(clean\)\}/);
  for (const field of ['title', 'author', 'version', 'date', 'type', 'classification', 'source'])
    assert.ok(html.includes(`"${field}"`), `Missing invalidation field: ${field}`);
  assert.match(html, /addEventListener\("input",invalidateCreatedPackage\)/);
  assert.match(html, /addEventListener\("change",invalidateCreatedPackage\)/);
});

test('known SHA-256 vector remains independently reproducible', () => {
  assert.equal(hash('abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
});

test('nested Chinese names and Unicode normalization remain stable', () => {
  assert.equal(core.normalizePath('作品\\第一版\\照片 1.jpg'), '作品/第一版/照片 1.jpg');
  assert.equal(core.normalizePath('cafe\u0301/a.txt'), 'caf\u00e9/a.txt');
});

test('reject unsafe, absolute, empty and ambiguous paths', () => {
  for (const p of ['', '/root/secret', 'C:\\private', '../secret', 'a/../b', 'a//b', 'a/./b', 'a/'])
    assert.throws(() => core.normalizePath(p));
});

test('reject duplicate paths even when size or modified time differs', () => {
  assert.throws(() => core.uniqueFiles([{ path: 'a.txt', size: 1 }, { path: 'a.txt', size: 2 }], x => x.path), /Duplicate/);
  assert.throws(() => core.uniqueFiles([{ path: 'caf\u00e9/x' }, { path: 'cafe\u0301/x' }], x => x.path), /Duplicate/);
});

test('validate integrity records and reject malformed digests and duplicate paths', () => {
  assert.equal(core.validateIntegrity(record([file('目录/a.txt', 'alpha')])).length, 1);
  assert.throws(() => core.validateIntegrity(record([file('a', 'x'), file('a', 'y')])), /Duplicate/);
  assert.throws(() => core.validateIntegrity(record([{ ...file('a', 'x'), sha256: 'invalid' }])), /SHA-256/);
  assert.throws(() => core.validateIntegrity(record([{ ...file('a', 'x'), size_bytes: -1 }])), /size/);
});

test('validate release manifest including integrity record presence', () => {
  const good = { package_files: [{ path: 'file-integrity-records.json', size_bytes: 3, sha256: hash('abc') }] };
  assert.equal(core.validateManifest(good).length, 1);
  assert.throws(() => core.validateManifest({ package_files: [{ path: 'README.md', size_bytes: 1, sha256: hash('x') }] }), /Integrity record/);
  assert.throws(() => core.validateManifest({ package_files: [...good.package_files, ...good.package_files] }), /Duplicate/);
});

test('compare unchanged, changed, added and removed files', () => {
  const before = [{ path: 'x', hash: hash('old') }, { path: 'gone', hash: hash('gone') }, { path: 'stable', hash: hash('same') }];
  const after = [{ path: 'x', hash: hash('new') }, { path: 'added', hash: hash('added') }, { path: 'stable', hash: hash('same') }];
  const results = Object.fromEntries(core.compareFiles(before, after).map(x => [x.k, x.status]));
  assert.deepEqual(results, { added: 'added', gone: 'removed', stable: 'same', x: 'changed' });
});

test('PWA cache list only references tracked files', () => {
  const sw = fs.readFileSync(path.join(__dirname, '../service-worker.js'), 'utf8');
  const list = sw.match(/const APP_SHELL = \[([\s\S]*?)\];/)[1];
  const entries = [...list.matchAll(/"\.\/([^"]*)"/g)].map(x => x[1]);
  for (const entry of entries) assert.ok(fs.existsSync(path.join(__dirname, '..', entry)), `missing cache file ${entry}`);
  assert.match(sw, /event\.request\.mode === "navigate"/);
});

test('public metadata schema matches the actual generated field name', () => {
  const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '../schemas/provenance-package.schema.json'), 'utf8'));
  assert.ok(schema.properties.generated_by.required.includes('tool_originator'));
});
