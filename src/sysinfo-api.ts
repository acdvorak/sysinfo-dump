import type { Systeminformation as SI } from 'systeminformation';
import * as sysinfo from 'systeminformation';
import type { LiteralUnion, SetOptional } from 'type-fest';

import { isTruthy } from './truthy';

const api = sysinfo as SysInfoApi;

////////////////////////////////////////////////////////////////////////////////

export interface SysInfoChassisData extends SI.ChassisData {
  type:
    | 'Advanced TCA'
    | 'All in One'
    | 'Blade Enclosure'
    | 'Blade'
    | 'Bus Expansion Chassis'
    | 'Compact PCI'
    | 'Convertible'
    | 'Desktop'
    | 'Detachable'
    | 'Docking Station'
    | 'Embedded PC'
    | 'Expansion Chassis'
    | 'Hand Held'
    | 'IoT Gateway'
    | 'Laptop'
    | 'Low Profile Desktop'
    | 'Lunch Box'
    | 'Main System Chassis'
    | 'Mini PC'
    | 'Mini Tower'
    | 'Multi-System Chassis'
    | 'Notebook'
    | 'Other'
    | 'Peripheral Chassis'
    | 'Pizza Box'
    | 'Portable'
    | 'Rack Mount Chassis'
    | 'Sealed-Case PC'
    | 'Space-Saving'
    | 'Stick PC'
    | 'Storage Chassis'
    | 'Sub Notebook'
    | 'SubChassis'
    | 'Tablet'
    | 'Tower'
    | 'Unknown';
}

export interface SysInfoSystemData extends SI.SystemData {
  manufacturer: LiteralUnion<
    | ''
    | 'Apple Inc.'
    | 'Microsoft'
    | 'Parallels International GmbH.'
    | 'Raspberry Pi Foundation',
    string
  >;

  model: LiteralUnion<
    | 'bochs'
    | 'Computer'
    | 'Docker Container'
    | 'KVM'
    | 'Parallels ARM Virtual Machine'
    | 'Virtual Machine'
    | 'VirtualBox'
    | 'WSL'
    | SysInfoRaspberryPiData['model'],
    string
  >;

  raspberry?: SysInfoRaspberryPiData;

  serial: LiteralUnion<'-', string>;

  sku: LiteralUnion<'-', string>;

  type?: 'Desktop' | 'Notebook' | 'Other' | 'Tower';

  version: LiteralUnion<'' | SysInfoRaspberryPiData['revision'], string>;

  virtualHost?:
    | 'bochs'
    | 'Hyper-V'
    | 'KVM'
    | 'Parallels'
    | 'QEMU'
    | 'Virtual PC'
    | 'VirtualBox'
    | 'VMware'
    | 'Xen';
}

export interface SysInfoRaspberryPiData extends SI.RaspberryRevisionData {
  manufacturer:
    | 'Egoman'
    | 'Embest'
    | 'Qisda'
    | 'Sony Japan'
    | 'Sony UK'
    | 'Stadium';

  processor:
    | 'BCM2711'
    | 'BCM2712'
    | 'BCM2835'
    | 'BCM2836'
    | 'BCM2837'
    | 'BCM2837B0'
    | 'RP2040'
    | 'RP2350'
    | 'RP3A0';

  type:
    | '2B'
    | '3A+'
    | '3B'
    | '3B+'
    | '4B'
    | '400'
    | '5'
    | '500/500+'
    | 'A'
    | 'A+'
    | 'B'
    | 'B+'
    | 'CM1'
    | 'CM3'
    | 'CM3+'
    | 'CM4'
    | 'CM4S'
    | 'CM5'
    | 'CM5 Lite'
    | 'Zero'
    | 'Zero W'
    | 'Zero 2 W';

  revision: '1.0' | '1.1' | '1.2' | '1.3' | '2.0';

  model: LiteralUnion<
    'Raspberry Pi 4 Model B Rev 1.1' | 'Raspberry Pi 4 Model B Rev 1.2',
    string
  >;

  /** Unit: MiB. */
  memory: 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384;
}

export interface SysInfoAudioDevice extends SetNullable<
  SI.AudioData,
  'channel' | 'default' | 'driver' | 'in' | 'out' | 'revision'
> {
  type:
    | ''
    | 'Controller' // Audio controller, NOT a Gamepad
    | 'Digital Out'
    | 'Digital Signal Processor'
    | 'Headset'
    | 'Line Out'
    | 'Microphone'
    | 'Phone'
    | 'Sound Driver'
    | 'Speaker';

  status:
    | ''
    | 'disabled'
    | 'enabled'
    | 'not applicable'
    | 'online'
    | 'other'
    | 'unknown';

  channel:
    | ''
    | 'Audio-Jack'
    | 'Built-In'
    | 'Display-Port'
    | 'HDMI'
    | 'PCIe'
    | 'USB';
}

export interface SysInfoUSBDevice extends SetNullable<
  SI.UsbData,
  | 'bus'
  | 'deviceId'
  | 'manufacturer'
  | 'maxPower'
  | 'name'
  | 'serialNumber'
  | 'vendor'
> {
  type:
    | ''
    | 'Audio'
    | 'Bluetooth'
    | 'Camera'
    | 'Controller' // USB controller, NOT a gamepad
    | 'Hub'
    | 'Keyboard'
    | 'Microphone'
    | 'Mouse'
    | 'Sensor'
    | 'Storage'
    | 'Touch Bar'
    | 'Trackpad';
}

export interface SysInfoBluetoothDevice extends SetNullable<
  SI.BluetoothDeviceData,
  | 'batteryPercent'
  | 'connected'
  | 'device'
  | 'macDevice'
  | 'macHost'
  | 'manufacturer'
> {
  type:
    | ''
    | 'Audio'
    | 'Computer'
    | 'Headset'
    | 'Keyboard'
    | 'Microphone'
    | 'Mouse'
    | 'Phone'
    | 'Speaker'
    | 'Tablet'
    | 'Trackpad'
    | 'Watch';
}

export type SysInfoDisplayConnectionType =
  | 'Component video'
  | 'Composite video'
  | 'D_JPN'
  | 'DP embedded'
  | 'DP'
  | 'DVI'
  | 'HD15'
  | 'HDMI'
  | 'INTERNAL'
  | 'LVDS'
  | 'MIRACAST'
  | 'OTHER'
  | 'SDI'
  | 'SDTVDONGLE'
  | 'SVIDEO'
  | 'UDI embedded'
  | 'UDI'
  | 'UNINITIALIZED';

export type SysInfoDisplayManufacturer =
  | 'Acer'
  | 'AMD'
  | 'AOC Monitors'
  | 'Apple'
  | 'Asus'
  | 'ATI'
  | 'BenQ'
  | 'Broadcom'
  | 'Compaq'
  | 'Dell'
  | 'DELL' // systeminformation v5.3 returns BOTH capitalizations of `Dell`
  | 'Eizo'
  | 'HP'
  | 'Iiyama'
  | 'Intel'
  | 'Lenovo'
  | 'LG'
  | 'NEC'
  | 'NVDIA'
  | 'Philips'
  | 'Samsung'
  | 'Sharp'
  | 'Sony'
  | 'ViewSonic';

export interface SysInfoGpuDevice extends Without<
  SI.GraphicsControllerData,
  'cores'
> {
  bus: '' | 'Built-In' | 'PCI' | 'PCIe' | 'Onboard';
  cores?: `${number}`;
}

export interface SysInfoDisplayDevice extends SetOptional<
  SI.GraphicsDisplayData,
  'deviceName'
> {
  connection: SysInfoDisplayConnectionType | null;
  model: LiteralUnion<'Color LCD', string>;
  vendor: SysInfoDisplayManufacturer;
}

////////////////////////////////////////////////////////////////////////////////

type SysInfoAllFnKeys = KeysOfType<typeof sysinfo, () => Promise<unknown>>;

type SysInfoSlimFnKeys = Exclude<
  SysInfoAllFnKeys,
  | `disk${string}`
  | `docker${string}`
  | `fs${string}`
  | `get${string}`
  | `inet${string}`
>;

type SysInfoFastFnKeys = Without<
  SysInfoSlimFnKeys,
  | 'blockDevices'
  | 'cpuCache'
  | 'cpuTemperature'
  | 'networkConnections'
  | 'networkStats'
  | 'printer'
  | 'processes'
  | 'shell'
  | 'users'
  | 'uuid'
  | 'wifiConnections'
  | 'wifiNetworks'
>;

export type SysInfoKey = Without<SysInfoFastFnKeys, never>;

export type StaticSysInfoKey = Satisfies<
  SysInfoKey,
  | 'baseboard'
  | 'bios'
  | 'chassis'
  | 'cpu'
  | 'cpuFlags'
  | 'memLayout'
  | 'osInfo'
  | 'system'
  | 'versions'
>;

export type DynamicSysInfoKey = Exclude<SysInfoKey, StaticSysInfoKey>;

////////////////////////////////////////////////////////////////////////////////

type SysInfoApi = Pick<
  typeof sysinfo,
  SysInfoKey | 'observe' | (keyof typeof sysinfo & `get${string}`)
>;

type S<K extends SysInfoKey> = Satisfies<SysInfoKey, K>;

export type SysInfoReturnType<K extends SysInfoKey> =
  S<'audio'> extends K
    ? SysInfoAudioDevice[]
    : S<'usb'> extends K
      ? SysInfoUSBDevice[]
      : S<'bluetoothDevices'> extends K
        ? SysInfoBluetoothDevice[]
        : S<'system'> extends K
          ? SysInfoSystemData
          : S<'chassis'> extends K
            ? SysInfoChassisData
            : Awaited<ReturnType<SysInfoApi[K]>>;

type VHostFull = Exclude<SysInfoSystemData['virtualHost'], undefined>;
type VHostNorm = TitleToSnakeCase<VHostFull>;

function sniffVirtualHost(sys: SysInfoSystemData): VHostFull | undefined {
  function normalize<V extends string>(vhost: V): TitleToSnakeCase<V> {
    return vhost.replace(/\W+/g, '_').toLowerCase() as TitleToSnakeCase<V>;
  }

  const namesRaw = [
    'bochs',
    'Hyper-V',
    'KVM',
    'Parallels',
    'QEMU',
    'Virtual PC',
    'VirtualBox',
    'VMware',
    'Xen',
  ] as const satisfies VHostFull[];

  const namesNorm: VHostNorm[] = namesRaw.map(normalize);

  const fieldsRaw = [sys.manufacturer, sys.model].filter(isTruthy);
  const fieldsNorm = fieldsRaw.map(normalize);

  let i = 0;
  for (i = 0; i < namesRaw.length; i++) {
    const knownRaw = namesRaw[i];
    const knownNorm = namesNorm[i];

    // Make the compiler happy
    if (!knownRaw || !knownNorm) {
      continue;
    }

    if (
      fieldsNorm.some((fieldNorm) => {
        return (
          new RegExp(`\\b${knownNorm}\\b`).test(fieldNorm) ||
          new RegExp(`\\b${knownNorm.replaceAll('_', '')}\\b`).test(
            fieldNorm,
          ) ||
          fieldNorm.startsWith(knownNorm) ||
          fieldNorm
            .replaceAll('_', '')
            .startsWith(knownNorm.replaceAll('_', ''))
        );
      })
    ) {
      return knownRaw;
    }
  }

  return undefined;
}

export async function getOneSysInfo<K extends SysInfoKey>(
  key: K,
): Promise<SysInfoReturnType<K>> {
  console.log(`⏳ Get ${key}...`);
  const promise = api[key]() as Promise<SysInfoReturnType<K>>;
  const result = await promise;
  console.log(`✅ Got ${key}!`);

  if (key === 'system') {
    const sys = result as SysInfoSystemData;

    if (!sys.virtualHost) {
      const foundName: VHostFull | undefined = sniffVirtualHost(sys);
      if (foundName) {
        sys.virtualHost = foundName;
        sys.virtual = true;
      }
    }

    return sys as SysInfoReturnType<K>;
  }

  return result;
}

export type StaticSysInfos = {
  [K in StaticSysInfoKey]: SysInfoReturnType<K>;
};

export type DynamicSysInfos = {
  [K in DynamicSysInfoKey]: SysInfoReturnType<K>;
};

export async function getStaticSysInfo<K extends StaticSysInfoKey>(
  keys?: K | K[],
): Promise<Pick<StaticSysInfos, K>> {
  if (!keys) {
    keys = [
      'baseboard',
      'bios',
      'chassis',
      'cpu',
      'cpuFlags',
      'memLayout',
      'osInfo',
      'system',
      'versions',
    ] satisfies StaticSysInfoKey[] as K[];
  }

  const uniqueKeys = [...new Set<K>(Array.isArray(keys) ? keys : [keys])];

  const promises: Array<Promise<[K, SysInfoReturnType<K>]>> = uniqueKeys.map(
    async (key: K): Promise<[K, SysInfoReturnType<K>]> => {
      return [key, await getOneSysInfo(key)];
    },
  );

  return Object.fromEntries(await Promise.all(promises)) as Pick<
    StaticSysInfos,
    K
  >;
}

export async function getDynamicSysInfo<K extends DynamicSysInfoKey>(
  keys?: K | K[],
): Promise<Pick<DynamicSysInfos, K>> {
  if (!keys) {
    keys = [
      'audio',
      'battery',
      'bluetoothDevices',
      'cpuCurrentSpeed',
      'currentLoad',
      'fullLoad',
      'graphics',
      'mem',
      'networkGatewayDefault',
      'networkInterfaceDefault',
      'networkInterfaces',
      'usb',
      'vboxInfo',
      'wifiInterfaces',
    ] satisfies DynamicSysInfoKey[] as K[];
  }

  const uniqueKeys = [...new Set<K>(Array.isArray(keys) ? keys : [keys])];

  const promises: Array<Promise<[K, SysInfoReturnType<K>]>> = uniqueKeys.map(
    async (key: K): Promise<[K, SysInfoReturnType<K>]> => {
      return [key, await getOneSysInfo(key)];
    },
  );

  return Object.fromEntries(await Promise.all(promises)) as Pick<
    DynamicSysInfos,
    K
  >;
}
