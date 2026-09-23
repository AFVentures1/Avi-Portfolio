/**
 * Renders the proposal in docs-src/ to a PDF plus a cover preview, and
 * screenshots the live sites shown in the "Things I've built" section.
 *
 *   PW=/path/to/node_modules node scripts/build-docs.cjs [proposal|shots]
 *
 * Needs playwright-core and sharp (install them in a scratch folder, not
 * here) and Google Chrome.
 */
const path = require('path')
const mods = process.env.PW || ''
const { chromium } = require(path.join(mods, 'playwright-core'))
const sharp = require(path.join(mods, 'sharp'))

const root = path.resolve(__dirname, '..')
const what = process.argv[2] || 'proposal'

const SITES = {
  fuel2save: 'https://fuelsave-website.vercel.app',
  binman: 'https://binman.app',
  earthpulse: 'https://earthpulse.africa',
  afventures: 'https://digital-growth-partner-azure.vercel.app',
  massai: 'https://massai-group.vercel.app',
  ntv: 'https://ntvonline.replit.app',
}

;(async () => {
  const browser = await chromium.launch({ channel: 'chrome' })
  if (what === 'proposal') {
    const page = await browser.newPage()
    await page.goto('file://' + path.join(root, 'docs-src/akam-proposal/proposal.html'), { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    const pdf = path.join(root, 'assets/docs/akam-internship-proposal.pdf')
    await page.pdf({ path: pdf, format: 'A4', printBackground: true, preferCSSPageSize: true, margin: { top: 0, right: 0, bottom: 0, left: 0 } })
    await page.setViewportSize({ width: 794, height: 1123 })
    const cover = await page.screenshot({ clip: { x: 0, y: 0, width: 794, height: 1123 } })
    await sharp(cover).resize(640).webp({ quality: 82 }).toFile(pdf.replace('.pdf', '-cover.webp'))
    console.log('Wrote', pdf)
  } else {
    for (const [k, u] of Object.entries(SITES)) {
      const p = await browser.newPage({ viewport: { width: 1440, height: 900 } })
      try { await p.goto(u, { waitUntil: 'networkidle', timeout: 45000 }) } catch (e) { console.log(k, e.message.split('\n')[0]) }
      await p.waitForTimeout(3500)
      await sharp(await p.screenshot()).resize(1200).webp({ quality: 78 }).toFile(path.join(root, 'assets/shots', k + '.webp'))
      console.log('shot', k)
      await p.close()
    }
  }
  await browser.close()
})()
