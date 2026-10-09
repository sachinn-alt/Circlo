import { test, expect } from '@playwright/test';

test.describe('Circlo E-Waste Platform - End to End Suite', () => {

  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('01: Hero Section & Kinetic Typography rendering', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Circlo/);

    // Verify brand title and headline presence
    await expect(page.locator('.kinetic-brand-title')).toHaveText('CIRCLO');
    await expect(page.locator('.kinetic-hero-headline')).toContainText('RECYCLE TECH.');
    await expect(page.locator('.kinetic-hero-headline')).toContainText('GET PAID CASH.');
    await expect(page.locator('.kinetic-hero-headline')).toContainText('STOP THE BURNING.');

    // Check live indicator badge
    await expect(page.locator('.kinetic-live-dot').first()).toBeVisible();
    await expect(page.locator('text=FAIR TRADE RECYCLING PROTOCOL')).toBeVisible();

    // Check big stats
    await expect(page.locator('.kinetic-giant-num', { hasText: '1.5M' })).toBeVisible();
    await expect(page.locator('.kinetic-giant-num', { hasText: '85%' })).toBeVisible();
  });

  test('02: Instant Scrap Valuator card interactions & preset switching', async ({ page }) => {
    // Initial preset 01 (Telecom PCBs)
    const valuatorCard = page.locator('.kinetic-card-inversion');
    await expect(valuatorCard).toBeVisible();
    await expect(valuatorCard.locator('.payout-big-number')).toHaveText('₹1,240');
    await expect(valuatorCard.locator('.kinetic-card-title')).toContainText('SERVER BOARD');

    // Switch to Preset 02 (Dead Laptop)
    await valuatorCard.getByRole('button', { name: /02 \// }).click();
    await expect(valuatorCard.locator('.payout-big-number')).toHaveText('₹890');
    await expect(valuatorCard.locator('.kinetic-card-title')).toContainText('DELL CORE I5');

    // Switch to Preset 03 (Old Phones)
    await valuatorCard.getByRole('button', { name: /03 \// }).click();
    await expect(valuatorCard.locator('.payout-big-number')).toHaveText('₹460');
    await expect(valuatorCard.locator('.kinetic-card-title')).toContainText('ANDROID PHONES');
  });

  test('03: AI Scanner tab navigation & vision detection', async ({ page }) => {
    // Click AI SCANNER in nav
    await page.locator('nav.kinetic-nav-links button', { hasText: 'AI SCANNER' }).click();

    // Verify Camera Viewport and Spectrometer HUD
    await expect(page.locator('text=CAMERA VIEWPORT')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=LIVE SPECTROMETER')).toBeVisible();
    await expect(page.locator('.scanner-laser-kinetic')).toBeVisible();
    await expect(page.locator('.scanner-camera-box')).toBeVisible();

    // Verify guaranteed civic scrap value
    await expect(page.locator('text=GUARANTEED CIVIC SCRAP VALUE')).toBeVisible();
    await expect(page.locator('.payout-big-number').first()).toBeVisible();

    // Verify precious metal yield table
    await expect(page.locator('text=EXTRACTABLE PRECIOUS ELEMENTS')).toBeVisible();
    await expect(page.locator('.materials-hairline-grid')).toBeVisible();
  });

  test('04: Civic Radar / Find Recyclers & Doorstep Pickup Modal flow', async ({ page }) => {
    // Navigate to FIND RECYCLERS tab
    await page.locator('nav.kinetic-nav-links button', { hasText: 'FIND RECYCLERS' }).click();

    // Verify section header and distance filter
    await expect(page.locator('h2', { hasText: 'FIND NEARBY COLLECTORS' })).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=SEARCH RADIUS')).toBeVisible();

    // Verify collector list cards
    const collectorsList = page.locator('span', { hasText: 'NEARBY COLLECTORS' });
    await expect(collectorsList).toBeVisible();

    // Click first collector card (Ram Lakhan)
    const firstCollector = page.locator('div[style*="cursor: pointer"]', { hasText: 'RAM LAKHAN' }).first();
    await expect(firstCollector).toBeVisible({ timeout: 5000 });
    await firstCollector.click();
    
    // Verify doorstep booking button appears
    const bookButton = page.locator('.btn-kinetic-primary', { hasText: 'BOOK DOORSTEP PICKUP' });
    await expect(bookButton).toBeVisible();
    await bookButton.click();

    // Verify Modal opens
    await expect(page.locator('text=DOORSTEP DISPATCH PROTOCOL')).toBeVisible();
    await expect(page.locator('input[value*="Barakhamba"]')).toBeVisible();

    // Confirm pickup dispatch
    await page.locator('.btn-kinetic-primary', { hasText: 'CONFIRM PICKUP' }).click();
    await expect(page.locator('text=DISPATCH CONFIRMED!')).toBeVisible();
    await expect(page.locator('text=#4821')).toBeVisible();

    // Close modal
    await page.locator('.btn-kinetic-primary', { hasText: 'RETURN TO PLATFORM' }).click();
    await expect(page.locator('text=DOORSTEP DISPATCH PROTOCOL')).not.toBeVisible();
  });

  test('05: Collector Hub & MCX Commodity Rates', async ({ page }) => {
    // Navigate to COLLECTOR HUB tab
    await page.locator('nav.kinetic-nav-links button', { hasText: 'COLLECTOR HUB' }).click();

    // Verify Welfare header
    await expect(page.locator('text=COLLECTOR WELFARE & LIVE RATES')).toBeVisible({ timeout: 10000 });

    // Check commodity rate tickers
    await expect(page.locator('text=MCX LINKED').first()).toBeVisible();

    // Check citizen pickup leads
    await expect(page.locator('text=ACTIVE PICKUP LEADS IN YOUR SECTOR')).toBeVisible();
    await expect(page.locator('text=LIVE REQUESTS')).toBeVisible();
  });

  test('06: Cedar Policy Lab evaluation engine', async ({ page }) => {
    // Navigate to FAIR PRICE GUARD tab
    await page.locator('nav.kinetic-nav-links button', { hasText: 'FAIR PRICE GUARD' }).click();

    // Verify header and rules
    await expect(page.locator('text=FAIR PRICE & SAFETY GUARD')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=RULE 01')).toBeVisible();
    await expect(page.locator('text=RULE 02')).toBeVisible();
    await expect(page.locator('text=RULE 03')).toBeVisible();

    // Verify automated verdict banner
    await expect(page.locator('text=AUTOMATED VERDICT')).toBeVisible();
    await expect(page.locator('text=LATENCY:').first()).toBeVisible();
  });

  test('07: Impact Ledger & CPCB Certificate Generator', async ({ page }) => {
    // Navigate to IMPACT LEDGER tab
    await page.locator('nav.kinetic-nav-links button', { hasText: 'IMPACT LEDGER' }).click();

    // Verify statistics
    await expect(page.locator('text=142.8')).toBeVisible({ timeout: 10000 });
    await expect(page.locator('text=TONNES DIVERTED')).toBeVisible();
    await expect(page.locator('text=3.1M')).toBeVisible();
    await expect(page.locator('text=LITERS WATER SAVED')).toBeVisible();

    // Click Generate Verified Certificate
    const certBtn = page.locator('.btn-kinetic-primary', { hasText: 'GENERATE VERIFIED CERTIFICATE' });
    await expect(certBtn).toBeVisible();
    await certBtn.click();

    // Verify Certificate Modal is rendered
    await expect(page.locator('text=CPCB VERIFIABLE AUDIT DOCKET')).toBeVisible();
    await expect(page.locator('text=CIRCULAR STEWARDSHIP CERTIFICATE')).toBeVisible();
    await expect(page.locator('text=CIRCLO-2026-EPR')).toBeVisible();
    await expect(page.locator('text=CPCB EPR COMPLIANT')).toBeVisible();
  });

});
