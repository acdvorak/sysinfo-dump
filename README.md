# System Information Dumper

CLI tool that dumps the output of the
[`systeminformation` library](https://systeminformation.io/) and
[Electron's `screen.getAllDisplays()`](https://www.electronjs.org/docs/latest/api/screen#screengetalldisplays)
to a JSON file.

That's it.

## Requirements

1. **Node.js v22** or newer
2. **Windows, macOS, Linux, Raspberry Pi**, etc. \
   I.e., any hardware / OS that is supported by both:
   - [`systeminformation`](https://systeminformation.io/)
   - [Electron](https://www.electronjs.org/) (Chromium)

## Usage

```bash
npm start
```

This will create a file in your PWD named something like
`sysinfo-macos-notebook-20260128_135202.json` (depending on your OS / hardware).

## APIs

This tool **only** calls a _subset_ of `systeminformation`'s APIs that are fast,
lightweight, and return quickly.

Specifically, it calls:

- `audio`
- `baseboard`
- `battery`
- `bios`
- `bluetoothDevices`
- `chassis`
- `cpu`
- `cpuCurrentSpeed`
- `cpuFlags`
- `currentLoad`
- `fullLoad`
- `graphics`
- `mem`
- `memLayout`
- `networkGatewayDefault`
- `networkInterfaceDefault`
- `networkInterfaces`
- `osInfo`
- `system`
- `usb`
- `vboxInfo`
- `versions`
- `wifiInterfaces`

## Type definitions

This CLI tool exports improved TypeScript definitions for _some_ of the objects
and APIs in [`systeminformation`](https://systeminformation.io/) to make them
stronger, safer, and easier to work with.

All string literal union type values were manually scraped from the JS source
code of `systeminformation` `v5.30`.
