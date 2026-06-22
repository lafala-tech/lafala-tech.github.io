import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Lafala — AI-first ERP for whole-house custom furniture';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          fontFamily: 'system-ui, sans-serif',
          background:
            'radial-gradient(circle at 0% 0%, rgba(31,111,74,0.35) 0%, transparent 45%), radial-gradient(circle at 100% 100%, rgba(184,153,104,0.20) 0%, transparent 55%), #0e1216',
          color: '#f5f5f7',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: -0.5,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #1F6F4A 0%, #b89968 100%)',
            }}
          />
          Lafala
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 24,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: '#b89968',
              fontWeight: 600,
            }}
          >
            AI-FIRST · ERP
          </div>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.05,
              fontWeight: 700,
              letterSpacing: -2,
              maxWidth: 1040,
            }}
          >
            Run your ERP by asking, not clicking.
          </div>
          <div style={{ fontSize: 28, color: '#a8a8b3', maxWidth: 900 }}>
            An AI-first SaaS ERP for whole-house custom furniture SMBs.
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            color: '#797986',
            fontSize: 22,
          }}
        >
          <span>lafala.tech</span>
          <span>Press ⌘K · 37 AI tools</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
