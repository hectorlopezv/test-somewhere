'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

interface ATM {
  id: number;
  location: string;
  status: 'Online' | 'Offline';
  latitude?: number;
  longitude?: number;
}

interface ATMMapProps {
  atm: ATM | null;
}

function ChangeMapView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  return null;
}

export function ATMMap({ atm }: ATMMapProps) {
  if (!atm || !atm.latitude || !atm.longitude) {
    return (
      <div className="flex items-center justify-center h-[400px] border-2 border-dashed rounded-lg">
        <div className="text-center">
          <p className="text-muted-foreground">
            Select an ATM to view on map
          </p>
        </div>
      </div>
    );
  }

  const center: [number, number] = [atm.latitude, atm.longitude];

  return (
    <div className="rounded-lg overflow-hidden border h-[400px]">
      <MapContainer
        key={atm.id}
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <ChangeMapView center={center} zoom={13} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>
            <div>
              <p className="font-semibold">{atm.location}</p>
              <p className="text-sm text-muted-foreground">
                Status: {atm.status}
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

