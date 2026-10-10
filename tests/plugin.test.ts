import { afterEach, describe, expect, it, vi } from 'vitest';
import { App } from 'obsidian-test-mocks/obsidian';
import VisualLineNumbersPlugin from '../src/main';
import { SPONSORS, bindPro, isPro, onProChange, resetPro } from '../src/pro';
import { DEFAULT_SETTINGS, effectiveSettings, normalizeSettings } from '../src/settings';
import manifest from '../manifest.json';

afterEach(() => resetPro());

function fakeManager(start: boolean) {
	let pro = start;
	const fns = new Set<() => void>();
	return {
		isPro: () => pro,
		onChange: (fn: () => void) => {
			fns.add(fn);
			return () => fns.delete(fn);
		},
		set(v: boolean) {
			pro = v;
			for (const fn of fns) fn();
		},
	};
}

describe('settings', () => {
	it('loads with default settings against an in-memory vault', async () => {
		const app = App.createConfigured__({ files: { 'notes/a.md': '# Hello world' } });
		const plugin = new VisualLineNumbersPlugin(app as never, manifest as never);
		await plugin.loadSettings();
		expect(plugin.settings).toEqual(DEFAULT_SETTINGS);
		expect(isPro()).toBe(false);
	});

	it('repairs bad saved settings', () => {
		expect(normalizeSettings(null)).toEqual(DEFAULT_SETTINGS);
		expect(normalizeSettings({ mode: 'sideways' as never, enabled: 'yes' as never, colorRelative: 'blue', colorAbsolute: '#ABCDEF' })).toEqual({ ...DEFAULT_SETTINGS, colorAbsolute: '#abcdef' });
		expect(normalizeSettings({ mode: 'hybrid', countFolded: true }).mode).toBe('hybrid');
	});

	it('applies Pro choices only while Pro is on', () => {
		const saved = normalizeSettings({ countFolded: true, highlightCurrent: true, motionHint: true, noteProperty: true });
		expect(effectiveSettings(saved, false)).toEqual({ enabled: true, mode: 'relative', countFolded: false, highlightCurrent: false, motionHint: false, noteProperty: false });
		expect(effectiveSettings(saved, true)).toEqual({ enabled: true, mode: 'relative', countFolded: true, highlightCurrent: true, motionHint: true, noteProperty: true });
	});
});

describe('pro facade', () => {
	it('follows the GitHub Sponsors manager and tells listeners on each change', () => {
		expect(isPro()).toBe(false);
		const m = fakeManager(false);
		bindPro(m as never);
		const cb = vi.fn();
		const off = onProChange(cb);
		m.set(true);
		expect(isPro()).toBe(true);
		expect(cb).toHaveBeenCalledTimes(1);
		off();
		m.set(false);
		expect(cb).toHaveBeenCalledTimes(1);
		expect(isPro()).toBe(false);
	});

	it('resetPro drops the manager and the listeners', () => {
		bindPro(fakeManager(true) as never);
		expect(isPro()).toBe(true);
		resetPro();
		expect(isPro()).toBe(false);
	});

	it('uses the seller values from product.yaml', () => {
		expect(SPONSORS.sponsorLogin).toBe('theluckystrike');
		expect(SPONSORS.minMonthlyUsd).toBe(5);
		expect(SPONSORS.oneTimeUsd).toBe(15);
	});
});
