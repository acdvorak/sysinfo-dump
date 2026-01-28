import type { LiteralUnion } from 'type-fest';

/**
 * Unique identifier associated with a display.
 *
 * - `-1` = invalid or the correct ID is not yet known.
 * - `-10` = virtual display assigned to a unified desktop.
 */
export type DisplayId = LiteralUnion<-10 | -1, number>;

/**
 * Screen rotation in clockwise degrees.
 */
export type DisplayRotationDegrees = 0 | 90 | 180 | 270;

/**
 * Refresh rate.
 */
export type DisplayFrequencyHz = LiteralUnion<
  23.976 | 24 | 25 | 29.97 | 30 | 50 | 59.94 | 60 | 120,
  number
>;

/**
 * MacBook Retina screens and Apple Studio Displays often have a scale factor
 * of `2`.
 *
 * Most other "standard" screens have a scale factor of `1`.
 */
export type DisplayScaleFactor = LiteralUnion<1 | 2, number>;

/**
 * Number of bits for each color component (Red, Green, or Blue).
 */
export type DisplayColorComponentDepth = 8 | 10 | 12;

/**
 * {@link DisplayColorComponentDepth} × 3.
 */
export type DisplayBitsPerPixel = 24 | 30 | 36;

/**
 * Serialized string representing a color space (three-dimensional object
 * which contains all realizable color combinations) for the purpose of
 * color conversions.
 *
 * This is an internal string representations of Chromium's `gfx::ColorSpace`
 * objects. There is no "official" standalone specification for this format
 * because it is not intended to be a standardized data exchange format
 * (like JSON). Instead, it is a serialized output of Chromium's C++
 * `ToString()` method for color management.
 *
 * @example
 * // "Built-in Retina Display" on MacBook Pro M2 Max:
 * "{primaries:P3, transfer:{0.0777*x + 0.0000 if abs(x) < 0.0450 else sign(x)*((0.9495*abs(x) + 0.0495)**2.3955 + 0.0003)}, matrix:RGB, range:FULL}"
 *
 * @example
 * // "ATV Office (AirPlay)"
 * "{r:[0.6394, 0.3308], g:[0.2999, 0.6005], b:[0.1501, 0.0591], w:[0.3127, 0.3290]}, transfer:BT709_APPLE, matrix:RGB, range:FULL}"
 */
export type DisplayColorSpaceString = `{${string}}`;

export interface BasicDisplay {
  /**
   * Unique identifier associated with the display.
   *
   * - `-1` = invalid or the correct ID is not yet known.
   * - `-10` = virtual display assigned to a unified desktop.
   */
  id: DisplayId;

  /**
   * Exactly ONE display is always the OS's "primary" display.
   */
  isPrimary: boolean;

  /**
   * `true` for an internal display and `false` for an external display.
   */
  isInternal: boolean;

  /**
   * User-friendly label, determined by the platform.
   *
   * Value can be `null` when:
   *
   * 1. **OS-Level Permission Restrictions (macOS)**
   *
   *    On macOS (specifically versions 10.15 Catalina and later), accessing
   *    display metadata is tied to "Screen Recording" permissions.
   *
   *    If your application has not been granted "Screen Recording" permission
   *    in System Settings, the OS may withhold identifying information.
   *
   *    While `getAllDisplays()` will still return the resolution and `id`, the
   *    `label` often defaults to an empty string to protect user privacy.
   *
   * 2. **Headless and Virtual Environments**
   *
   *    In environments where there is no physical `EDID` _(Extended Display
   *    Identification Data)_ to read, the `label` field has no source data.
   *
   *    - **Linux CI/CD (Xvfb)**: When running in a virtual frame buffer, there
   *      is no physical hardware. The system sees a memory buffer rather than a
   *      "monitor," resulting in an empty label.
   *
   *    - **Docker Containers**: Unless you are passing through specific GPU and
   *      monitor device nodes, the display driver inside the container usually
   *      lacks the metadata required to populate a name.
   *
   * 3. **Driver and Hardware Limitations**
   *
   *    The `label` is populated by the underlying Chromium "display" stack,
   *    which relies on the OS querying the monitor's hardware.
   *
   *    - **Generic Drivers**: If a monitor is using a "Generic PnP Monitor"
   *      driver that fails to communicate via `DDC/CI` _(Display Data Channel)_,
   *      the OS may simply report the display as existing without a specific name.
   *
   *    - **Remote Desktop (RDP/VNC)**: Some remote desktop protocols create a
   *      virtual display driver that does not assign a string label to the
   *      session's "monitor."
   */
  label: string | null;

  /**
   * Full size of the display in DIP points (Density-Independent Pixels).
   *
   * **NOTE**: Some portions of the display might NOT be usable by applications
   * (e.g., Windows Taskbar, macOS menu bar). See {@link workArea} for the
   * usable area of the screen.
   */
  bounds: Electron.Rectangle;

  /**
   * Usable portion of the display in DIP points (Density-Independent Pixels).
   *
   * Represents the portion of the screen that applications can actively use,
   * and may be smaller than {@link bounds} due to OS-level features like the
   * Windows Taskbar or macOS menu bar.
   */
  workArea: Electron.Rectangle;

  /**
   * Output device's pixel scale factor.
   *
   * Often `1` or `2`.
   */
  scaleFactor: DisplayScaleFactor;

  /**
   * Can be `0`, `90`, `180`, `270`.
   *
   * Represents screen rotation in clock-wise degrees.
   */
  rotation: DisplayRotationDegrees;

  /**
   * Value can be `null` for:
   *
   * - **Headless Environments**: If your app is running on a server or a CI/CD
   *   environment without a physical monitor, the "virtual" display created by
   *   the OS often reports a refresh rate of `0`.
   *
   * - **Virtual Displays / Remote Desktop**: Some virtual display drivers
   *   (like those used for RDP, Citrix, or VNC) do not report a hardware
   *   refresh rate to Chromium, resulting in a fallback to `0`.
   *
   * - **Platform Limitations**: This property was originally added as a
   *   Windows-only feature. While it has since expanded to other platforms,
   *   certain Linux window managers (especially older X11 setups or specific
   *   Wayland compositors) may not expose the refresh rate to the underlying
   *   Chromium engine, causing it to return `0`.
   */
  displayFrequency: DisplayFrequencyHz | null;

  /**
   * Number of bits per color component (R, G, B).
   */
  colorBitDepthPerComponent: DisplayColorComponentDepth;

  /**
   * Number of bits per pixel (R + G + B).
   */
  colorBitDepthPerPixel: DisplayBitsPerPixel;

  /**
   * Serialized string representing a color space (three-dimensional object
   * which contains all realizable color combinations) for the purpose of
   * color conversions.
   *
   * This is an internal string representations of Chromium's `gfx::ColorSpace`
   * objects. There is no "official" standalone specification for this format
   * because it is not intended to be a standardized data exchange format
   * (like JSON). Instead, it is a serialized output of Chromium's C++
   * `ToString()` method for color management.
   *
   * @example
   * // "Built-in Retina Display" on MacBook Pro M2 Max:
   * "{primaries:P3, transfer:{0.0777*x + 0.0000 if abs(x) < 0.0450 else sign(x)*((0.9495*abs(x) + 0.0495)**2.3955 + 0.0003)}, matrix:RGB, range:FULL}"
   *
   * @example
   * // "ATV Office (AirPlay)"
   * "{r:[0.6394, 0.3308], g:[0.2999, 0.6005], b:[0.1501, 0.0591], w:[0.3127, 0.3290]}, transfer:BT709_APPLE, matrix:RGB, range:FULL}"
   */
  colorSpace: DisplayColorSpaceString;
}
