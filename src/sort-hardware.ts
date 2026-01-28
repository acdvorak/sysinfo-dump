import type {
  BasicDisplay,
  DisplayBitsPerPixel,
  DisplayColorComponentDepth,
  DisplayColorSpaceString,
  DisplayRotationDegrees,
} from './basic-display-types';

export function compareDisplays(a: BasicDisplay, b: BasicDisplay): number {
  const diffs: number[] = [
    (a.isInternal ? 1 : 0) - (b.isInternal ? 1 : 0),
    (a.isPrimary ? 1 : 0) - (b.isPrimary ? 1 : 0),
    a.id - b.id,
  ];
  return diffs.find(Boolean) || 0;
}

/**
 * ✅ Returns a NEW array. Does NOT mutate the input array.
 */
export function sortDisplays(
  unsorted: BasicDisplay[] | readonly BasicDisplay[],
): readonly BasicDisplay[] {
  return [...unsorted].sort(compareDisplays);
}

/**
 * Eliminate floating point noise from display refresh rates (framerates).
 *
 * @example
 * ```ts
 * console.log(cleanRefreshRate(60.000003814697266)); // 60
 * console.log(cleanRefreshRate(120.00000762939453)); // 120
 * console.log(cleanRefreshRate(59.94005994005994)); // 59.94
 * ```
 */
function cleanRefreshRate(rate: number): number {
  // 1. Define a tolerance. 0.01 is safe because it's
  // much smaller than the 0.06 difference between 59.94 and 60.
  const epsilon = 0.01;

  // 2. Check if it's "basically" an integer
  const rounded = Math.round(rate);
  if (Math.abs(rate - rounded) < epsilon) {
    return rounded;
  }

  // 3. Check for the common NTSC fractional rates (e.g., 59.940059...)
  // These are usually 60 / 1.001, 30 / 1.001, etc.
  const ntscRate = rounded / 1.001;
  if (Math.abs(rate - ntscRate) < epsilon) {
    // Return to 2 decimal places for display (59.94)
    return parseFloat(ntscRate.toFixed(2));
  }

  // 4. Fallback: If it's a weird Variable Refresh Rate (VRR),
  // just trim the floating point noise.
  return parseFloat(rate.toFixed(3));
}

export function mapAndSortDisplays(
  unsorted: Electron.Display[],
  primaryDisplayId: number,
): readonly BasicDisplay[] {
  const mapped = unsorted.map((display: Electron.Display): BasicDisplay => {
    return {
      id: display.id,

      isPrimary: display.id === primaryDisplayId,
      isInternal: display.internal,

      // Normalize empty strings to `null`
      label: display.label.trim() || null,

      bounds: { ...display.bounds },
      workArea: { ...display.workArea },

      scaleFactor: display.scaleFactor,
      rotation: display.rotation as DisplayRotationDegrees,

      // Normalize `0` to `null`
      displayFrequency: cleanRefreshRate(display.displayFrequency) || null,

      colorBitDepthPerComponent:
        display.depthPerComponent as DisplayColorComponentDepth,
      colorBitDepthPerPixel: display.colorDepth as DisplayBitsPerPixel,
      colorSpace: display.colorSpace as DisplayColorSpaceString,
    };
  });

  return mapped.sort(compareDisplays);
}
