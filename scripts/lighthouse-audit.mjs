import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';

const siteUrl = 'http://127.0.0.1:4322';
const reportPath = './reports/lighthouse';

const run = (command, args) =>
  new Promise((resolve, reject) => {
    const child = spawn(command, args, { stdio: 'inherit', shell: false });
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(' ')} exited with code ${code ?? 'unknown'}`));
    });
  });

const waitForServer = async () => {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch(siteUrl);
      if (response.ok) {
        return;
      }
    } catch {
      // Keep polling until preview is ready.
    }

    await delay(1000);
  }

  throw new Error('Timed out waiting for preview server');
};

await mkdir('./reports', { recursive: true });
await run('npm', ['run', 'build']);

const preview = spawn('npm', ['run', 'preview:ci'], {
  stdio: 'inherit',
  shell: false,
});

try {
  await waitForServer();

  await run('./node_modules/.bin/lighthouse', [
    siteUrl,
    '--only-categories=performance,accessibility,seo,best-practices',
    '--output=html',
    '--output=json',
    `--output-path=${reportPath}`,
    '--chrome-flags=--headless',
    `--chrome-path=${chromium.executablePath()}`,
  ]);
} finally {
  preview.kill('SIGTERM');
}
