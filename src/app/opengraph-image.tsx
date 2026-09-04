import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "NerdLogic";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

const MARK_PATHS = [
  "M30.75 32.8 4.216 41.224 4.024 109.253c-.024 8.694 4.873 15.755 10.939 15.773L30.49 125.069Z",
  "M126.735 15.874 126.566 98.729 126.505 125.238H109.446c-.43-.107-.859-.246-1.273-.445-4.695-2.117-8.162-9.419-8.131-18.087L100.195 32.595 30.901 32.166 30.625 4 110.274 4.184c8.943.062 16.185 5.323 16.216 11.782Z",
  "M187.499 125.207 126.504 125.238 126.565 98.729 179.921 98.698Z",
];

/**
 * Share card matching the site header Logo lockup:
 * mark + "NerdLogic" in a horizontal row (gap ~2.5).
 */
export default async function OpenGraphImage() {
  const fontData = await readFile(
    join(process.cwd(), "src/fonts/Surgena-SemiBold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 30% 20%, rgba(0,102,230,0.5) 0%, transparent 55%), radial-gradient(ellipse at 80% 85%, rgba(0,61,165,0.35) 0%, transparent 50%)",
          }}
        />

        {/* Same composition as header: inline-flex items-center gap-2.5 */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 28,
          }}
        >
          <svg
            width="84"
            height="57"
            viewBox="0 0 191.5 129.24"
            fill="#FFFFFF"
          >
            {MARK_PATHS.map((d) => (
              <path key={d.slice(0, 24)} d={d} />
            ))}
          </svg>

          <div
            style={{
              display: "flex",
              fontFamily: "Surgena",
              fontSize: 96,
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              lineHeight: 1,
            }}
          >
            NerdLogic
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Surgena",
          data: fontData,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
