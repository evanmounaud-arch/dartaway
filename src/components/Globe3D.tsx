"use client";

import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from "react";
import dynamic from "next/dynamic";

const GlobeGL = dynamic(() => import("react-globe.gl"), { ssr: false });

interface GlobeFeature {
  properties: {
    ISO_A2?: string;
    ADMIN?: string;
    NAME?: string;
  };
  geometry: object;
}

interface DartPin {
  lat: number;
  lng: number;
  id: number;
}

interface Globe3DProps {
  onCountryClick: (countryCode: string, countryName: string) => void;
}

export interface Globe3DRef {
  spinAndZoom: (lat: number, lng: number) => void;
}

const Globe3D = forwardRef<Globe3DRef, Globe3DProps>(({ onCountryClick }, ref) => {
  const globeRef = useRef<any>(null);
  const [countries, setCountries] = useState<{ features: GlobeFeature[] }>({ features: [] });
  const [hoverD, setHoverD] = useState<GlobeFeature | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [dartPins, setDartPins] = useState<DartPin[]>([]);
  const dartIdRef = useRef(0);

  useImperativeHandle(ref, () => ({
    spinAndZoom: (lat: number, lng: number) => {
      const globe = globeRef.current;
      if (!globe) return;

      // Speed up rotation
      globe.controls().autoRotateSpeed = 30;

      // After 1.5s, slow down and zoom to target
      setTimeout(() => {
        globe.controls().autoRotateSpeed = 0.5;
        globe.pointOfView({ lat, lng, altitude: 1.5 }, 1500);

        // Place dart pin after zoom completes
        setTimeout(() => {
          const id = ++dartIdRef.current;
          setDartPins((prev) => [...prev, { lat, lng, id }]);
          // Remove pin after 4s
          setTimeout(() => {
            setDartPins((prev) => prev.filter((p) => p.id !== id));
          }, 4000);
        }, 1200);
      }, 1500);
    },
  }));

  useEffect(() => {
    fetch("https://unpkg.com/world-atlas@2/countries-50m.json")
      .then((res) => res.json())
      .then((topoData) => {
        import("topojson-client").then(({ feature }) => {
          const geoData = feature(topoData, topoData.objects.countries) as any;
          setCountries(geoData);
        });
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      globeRef.current.controls().enableZoom = true;
      globeRef.current.pointOfView({ altitude: 2.5 });
    }
  }, []);

  const handlePolygonClick = useCallback(
    (polygon: object, _event: MouseEvent) => {
      const feat = polygon as GlobeFeature;
      const code = feat.properties?.ISO_A2 || "";
      const name = feat.properties?.ADMIN || feat.properties?.NAME || "Unknown";
      onCountryClick(code, name);
    },
    [onCountryClick]
  );

  // Custom HTML element for dart pin
  const dartHtmlElement = useCallback((d: object) => {
    const el = document.createElement("div");
    el.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        animation: dartBounce 0.5s ease-out;
        pointer-events: none;
      ">
        <div style="
          font-size: 28px;
          filter: drop-shadow(0 2px 8px rgba(124, 58, 237, 0.6));
          transform: rotate(-30deg);
        ">🎯</div>
        <div style="
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: radial-gradient(circle, #f97316, #7c3aed);
          box-shadow: 0 0 12px 4px rgba(249, 115, 22, 0.5), 0 0 24px 8px rgba(124, 58, 237, 0.3);
          animation: dartPulse 1.5s ease-in-out infinite;
        "></div>
      </div>
    `;
    return el;
  }, []);

  if (dimensions.width === 0) return null;

  return (
    <>
      <style jsx global>{`
        @keyframes dartBounce {
          0% { transform: translateY(-60px) scale(0.3); opacity: 0; }
          60% { transform: translateY(5px) scale(1.1); opacity: 1; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes dartPulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.6); opacity: 0.4; }
        }
      `}</style>
      <GlobeGL
        ref={globeRef}
        width={dimensions.width}
        height={dimensions.height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        showAtmosphere={true}
        atmosphereColor="#7c3aed"
        atmosphereAltitude={0.15}
        polygonsData={countries.features}
        polygonCapColor={(d: any) =>
          d === hoverD ? "rgba(251, 146, 60, 0.7)" : "rgba(124, 58, 237, 0.15)"
        }
        polygonSideColor={() => "rgba(124, 58, 237, 0.05)"}
        polygonStrokeColor={() => "rgba(167, 139, 250, 0.3)"}
        polygonAltitude={(d: any) => (d === hoverD ? 0.02 : 0.005)}
        onPolygonHover={(d: any) => setHoverD(d)}
        onPolygonClick={handlePolygonClick}
        polygonsTransitionDuration={200}
        htmlElementsData={dartPins}
        htmlLat={(d: any) => d.lat}
        htmlLng={(d: any) => d.lng}
        htmlAltitude={0.05}
        htmlElement={dartHtmlElement}
      />
    </>
  );
});

Globe3D.displayName = "Globe3D";

export default Globe3D;
