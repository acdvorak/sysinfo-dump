import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import { app, screen } from 'electron';

import { toLocalIsoStringSafe } from './datetime.js';
import { mapAndSortDisplays } from './sort-hardware.js';
import type { SysInfoSystemData } from './sysinfo-api.js';
import { getDynamicSysInfo, getStaticSysInfo } from './sysinfo-api.js';

async function main(): Promise<void> {
  const timestamp = toLocalIsoStringSafe(new Date());

  const [staticSysInfo, dynamicSysInfo] = await Promise.all([
    getStaticSysInfo(),
    getDynamicSysInfo(),
    app.whenReady(),
  ]);

  const primaryDisplayId = screen.getPrimaryDisplay().id;
  const electronDisplays = mapAndSortDisplays(
    screen.getAllDisplays(),
    primaryDisplayId,
  );

  const { distro: distroName } = staticSysInfo.osInfo;
  const { virtual, virtualHost, type: systemType } = staticSysInfo.system;

  /** @example "macOS" -> "macos" */
  const distroType = distroName
    .replace(/\W+/g, '_')
    .toLowerCase() as Lowercase<string>;

  /** @example "Sealed-Case PC" -> "sealed_case_pc" */
  const chassisType = (
    systemType === 'Other' && virtual && virtualHost ? virtualHost : systemType
  )
    .replace(/\W+/g, '_')
    .toLowerCase() as TitleToSnakeCase<
    | SysInfoSystemData['type']
    | Exclude<SysInfoSystemData['virtualHost'], undefined>
  >;

  const jsonFilePath = path.join(
    process.cwd(),
    `sysinfo-${distroType}-${chassisType}-${timestamp}.json`,
  );

  await fs.writeFile(
    jsonFilePath,
    JSON.stringify(
      {
        staticSysInfo,
        dynamicSysInfo,
        electronDisplays,
      },
      null,
      2,
    ),
  );

  console.log();
  console.log(jsonFilePath);

  app.quit();
}

void main();
