/**
 * Derives every icon the site serves from the one brand asset.
 *
 *   public/images/logo.png  ->  app/icon.png            browser tab, bookmarks
 *                           ->  app/apple-icon.png      iOS home screen
 *                           ->  app/opengraph-image.png link previews
 *
 * The header and footer already read logo.png directly, so after running this
 * a single file is the source of the mark everywhere. Before this the three
 * icons were hand-made copies, which meant replacing the logo silently left
 * the tab icon and every shared link showing the old one.
 *
 *   npm run icons
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const SOURCE = path.join(root, 'public/images/logo.png')

const OG = { width: 1200, height: 630, badge: 420 }

async function run() {
  const source = sharp(SOURCE)
  const { width, height } = await source.metadata()
  console.log(`source  public/images/logo.png  ${width}x${height}`)

  await mkdir(path.join(root, 'app'), { recursive: true })

  await sharp(SOURCE).resize(512, 512, { fit: 'contain' }).png().toFile(path.join(root, 'app/icon.png'))
  console.log('wrote   app/icon.png            512x512')

  await sharp(SOURCE).resize(180, 180, { fit: 'contain' }).png().toFile(path.join(root, 'app/apple-icon.png'))
  console.log('wrote   app/apple-icon.png      180x180')

  // Paint the card in the logo's own corner colour rather than the site's
  // #050505: a shade off and the pasted badge shows a visible square seam.
  const { data } = await sharp(SOURCE).extract({ left: 0, top: 0, width: 1, height: 1 }).raw().toBuffer({ resolveWithObject: true })
  const background = { r: data[0], g: data[1], b: data[2], alpha: 1 }

  const badge = await sharp(SOURCE).resize(OG.badge, OG.badge, { fit: 'contain' }).png().toBuffer()
  await sharp({ create: { width: OG.width, height: OG.height, channels: 4, background } })
    .composite([{ input: badge, gravity: 'centre' }])
    .png()
    .toFile(path.join(root, 'app/opengraph-image.png'))
  console.log(`wrote   app/opengraph-image.png ${OG.width}x${OG.height} on rgb(${background.r},${background.g},${background.b})`)
}

run().catch((err) => {
  console.error('icon generation failed:', err.message)
  process.exit(1)
})
