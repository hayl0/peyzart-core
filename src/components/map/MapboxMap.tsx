'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl/mapbox';
import type { MapRef, ViewState } from 'react-map-gl/mapbox';
import { MapPin } from 'lucide-react';

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const DEFAULT_VIEW_STATE: ViewState = {
  longitude: 28.9784,
  latitude: 41.0082,
  zoom: 11,
  bearing: 0,
  pitch: 0,
  padding: { top: 0, bottom: 0, left: 0, right: 0 },
};

interface Landscaper {
  id: string;
  name: string;
  service: string;
  price: number;
  rating: number;
  reviewCount: number;
  distance: number;
  lat: number;
  lng: number;
}

interface MapboxMapProps {
  landscapers: Landscaper[];
  onSelect?: (id: string | null) => void;
  selectedId?: string | null;
}

export default function MapboxMap({ landscapers, onSelect, selectedId }: MapboxMapProps) {
  const mapRef = useRef<MapRef>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [popupInfo, setPopupInfo] = useState<Landscaper | null>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const update = () => {
      setTheme(html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
    };
    update();
    const observer = new MutationObserver(update);
    observer.observe(html, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const mapStyle = useMemo(
    () =>
      theme === 'dark'
        ? 'mapbox://styles/mapbox/dark-v11'
        : 'mapbox://styles/mapbox/light-v11',
    [theme],
  );

  const handleMarkerClick = useCallback(
    (l: Landscaper) => {
      setPopupInfo(l);
      onSelect?.(l.id);
      mapRef.current?.flyTo({ center: [l.lng, l.lat], zoom: 14, duration: 400 });
    },
    [onSelect],
  );

  const handlePopupClose = useCallback(() => {
    setPopupInfo(null);
    onSelect?.(null);
  }, [onSelect]);

  const handleMapError = useCallback(() => {
    setMapError(true);
  }, []);

  if (!MAPBOX_TOKEN) {
    return (
      <div className="w-full h-full min-h-[160px] bg-[var(--theme-bg)] flex items-center justify-center rounded-[12px] border border-[var(--theme-border)]">
        <div className="text-center px-6">
          <MapPin size={28} className="mx-auto mb-2 text-[var(--theme-text-muted)]" />
          <p className="text-sm font-semibold text-[var(--theme-text)] mb-1">
            Harita yüklenemedi
          </p>
          <p className="text-xs text-[var(--theme-text-secondary)] leading-relaxed">
            <code className="text-bright-green text-[11px]">
              NEXT_PUBLIC_MAPBOX_TOKEN
            </code>
            <br />
            .env.local dosyasına ekleyin
          </p>
        </div>
      </div>
    );
  }

  if (mapError) {
    return (
      <div className="w-full h-full min-h-[160px] bg-[var(--theme-bg)] flex items-center justify-center rounded-[12px] border border-[var(--theme-border)]">
        <div className="text-center px-6">
          <MapPin size={28} className="mx-auto mb-2 text-red-400" />
          <p className="text-sm font-semibold text-[var(--theme-text)] mb-1">
            Harita yüklenirken hata oluştu
          </p>
          <p className="text-xs text-[var(--theme-text-secondary)]">
            Mapbox API anahtarınızı kontrol edin
          </p>
        </div>
      </div>
    );
  }

  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={MAPBOX_TOKEN}
      mapStyle={mapStyle}
      initialViewState={DEFAULT_VIEW_STATE}
      style={{ width: '100%', height: '100%' }}
      attributionControl={false}
      reuseMaps
      onError={handleMapError}
      scrollZoom={false}
      dragPan={true}
      doubleClickZoom={false}
      touchZoomRotate={true}
    >
      <NavigationControl position="bottom-right" />
      <GeolocateControl position="bottom-right" />

      {landscapers.map((l) => (
        <Marker
          key={l.id}
          longitude={l.lng}
          latitude={l.lat}
          onClick={() => handleMarkerClick(l)}
          style={{ cursor: 'pointer' }}
        >
          <div
            className={`
              rounded-full border-2 border-white shadow-md transition-all duration-200
              ${
                selectedId === l.id
                  ? 'w-4 h-4 ring-2 ring-lime/60 scale-125'
                  : 'w-3 h-3'
              }
              bg-gradient-to-br from-bright-green to-medium-green
            `}
          />
        </Marker>
      ))}

      {popupInfo && (
        <Popup
          longitude={popupInfo.lng}
          latitude={popupInfo.lat}
          onClose={handlePopupClose}
          closeButton={true}
          closeOnClick={false}
          offset={12}
          maxWidth="260px"
        >
          <div className="px-1.5 py-1">
            <p className="font-bold text-sm text-dark-forest">{popupInfo.name}</p>
            <p className="text-xs text-gray-500 mb-1.5">{popupInfo.service}</p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-medium-green">
                ₺{popupInfo.price}
              </span>
              <span className="text-xs text-gray-400">
                ★ {(popupInfo.rating ?? 0).toFixed(1)}
              </span>
            </div>
          </div>
        </Popup>
      )}
    </Map>
  );
}
