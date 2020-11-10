// teardown.js
import { tmpdir } from 'os'
import { join } from 'path'

const DIR = join(tmpdir(), 'zed_run_global_setup')
export default async function () {
  // close the browser instance
  await global.__BROWSER_GLOBAL__.close()
}