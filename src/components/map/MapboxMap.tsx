'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Map, { Marker, Popup, NavigationControl, GeolocateControl } from 'react-map-gl/mapbox';
import type { MapRef, ViewState } from 'react-map-gl/mapbox';
import { MapPin, Star } from 'lucide-react';

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
      <div className="w-full h-full min-h-[200px] bg-[var(--theme-bg)] flex items-center justify-center rounded-[16px] border border-[var(--theme-border)]">
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
      <div className="w-full h-full min-h-[200px] bg-[var(--theme-bg)] flex items-center justify-center rounded-[16px] border border-[var(--theme-border)]">
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
      scrollZoom={true}
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
                rounded-full border-[3px] border-white shadow-lg transition-all duration-300
                ${
                  selectedId === l.id
                    ? 'w-6 h-6 ring-4 ring-lime/50 scale-125'
                    : 'w-5 h-5 hover:scale-110'
                }
                bg-gradient-to-br from-bright-green to-medium-green cursor-pointer
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
          <div className="px-3 py-2.5 min-w-[180px]">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-bright-green to-lime flex items-center justify-center text-white text-xs font-bold">
                {popupInfo.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-sm text-dark-forest leading-tight">{popupInfo.name}</p>
                <p className="text-[11px] text-gray-500">{popupInfo.service}</p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-gray-50 rounded-[10px] px-3 py-2">
              <span className="text-sm font-extrabold text-medium-green">₺{popupInfo.price}</span>
              <span className="flex items-center gap-1 text-xs font-semibold text-amber-600">
                <Star size={12} className="fill-amber-400 text-amber-400" /> {(popupInfo.rating ?? 0).toFixed(1)}
              </span>
            </div>
          </div>
        </Popup>
      )}
    </Map>
  );
}
