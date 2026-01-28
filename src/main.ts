import * as fs from 'node:fs/promises';
import * as path from 'node:path';

import { toLocalIsoStringSafe } from './datetime';
import type { SysInfoChassisData } from './sysinfo-api';
import { getDynamicSysInfo, getStaticSysInfo } from './sysinfo-api';

async function main(): Promise<void> {
  const timestamp = toLocalIsoStringSafe(new Date());

  const [staticSysInfo, dynamicSysInfo] = await Promise.all([
    getStaticSysInfo(),
    getDynamicSysInfo(),
  ]);

  const { distro: distroName } = staticSysInfo.osInfo;
  const { type: chassisName } = staticSysInfo.chassis;

  /** @example "macOS" -> "macos" */
  const distroType = distroName
    .replace(/\W+/g, '_')
    .toLowerCase() as Lowercase<string>;

  /** @example "Sealed-Case PC" -> "sealed_case_pc" */
  const chassisType = chassisName
    .replace(/\W+/g, '_')
    .toLowerCase() as TitleToSnakeCase<SysInfoChassisData['type']>;

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
      },
      null,
      2,
    ),
  );

  console.log();
  console.log(jsonFilePath);
}

void main();
