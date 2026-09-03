/**
 * Builds the zip to upload to a host that takes a file rather than a git push
 * (GoDaddy Node.js Hosting, in our case).
 *
 *   npm run package   ->  dist/haus-of-pong.zip
 *
 * `git archive` is used deliberately: it ships exactly the tracked files at
 * HEAD, so node_modules, .next and any local .env can never be swept in, and
 * the paths land at the zip root where the host looks for package.json.
 *
 * It also refuses to build from a dirty tree. Uploading a zip whose contents
 * do not match a commit is how a host quietly ends up serving something no
 * branch contains, with nothing to diff against when it misbehaves.
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync, statSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = path.join(root, 'dist/haus-of-pong.zip')
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim()

const dirty = git('status', '--porcelain')
if (dirty) {
  console.error('Uncommitted changes — commit them first, or the zip will not match any commit:\n')
  console.error(dirty.split('\n').map((l) => '  ' + l).join('\n'))
  process.exit(1)
}

mkdirSync(path.dirname(out), { recursive: true })
git('archive', '--format=zip', '-o', out, 'HEAD')

// The host's requirements, checked against what is actually in the zip rather
// than against the working tree.
const pkg = JSON.parse(readFileSync(path.join(root, 'package.json'), 'utf8'))
const listing = execFileSync('unzip', ['-l', out], { encoding: 'utf8' })
const problems = []
if (!pkg.main) problems.push('package.json has no "main"')
if (!pkg.scripts?.build) problems.push('no build script')
if (!pkg.scripts?.start) problems.push('no start script')
if (Object.keys(pkg.devDependencies ?? {}).length)
  problems.push('devDependencies present — the host installs production deps only')
if (!/\bpackage\.json\b/.test(listing)) problems.push('package.json missing from the zip')
if (/node_modules|\/\.next\//.test(listing)) problems.push('zip contains node_modules or .next')

const mb = (statSync(out).size / 1024 / 1024).toFixed(1)
console.log(`commit   ${git('rev-parse', '--short', 'HEAD')}  ${git('log', '-1', '--format=%s')}`)
console.log(`archive  dist/haus-of-pong.zip  ${mb} MB`)
console.log(`entry    main=${pkg.main}  start=${pkg.scripts.start}`)

if (problems.length) {
  console.error('\nNOT READY TO UPLOAD:\n' + problems.map((p) => '  - ' + p).join('\n'))
  process.exit(1)
}
console.log('\nReady to upload.')
