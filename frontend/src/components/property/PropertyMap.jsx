import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { FiMapPin } from 'react-icons/fi';
import 'leaflet/dist/leaflet.css';

const defaultCenter = [12.9716, 77.5946];
const defaultZoom = 12;

function createMarkerIcon() {
  const iconHtml = renderToStaticMarkup(
    <div style={{
      width: 36,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '50%',
      background: '#FF5A1F',
      color: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
      fontSize: 18,
      border: '3px solid #fff',
    }}>
      <FiMapPin />
    </div>
  );
  return divIcon({
    html: iconHtml,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36],
    className: '',
  });
}

export default function PropertyMap({ lat, lng, popupData }) {
  const hasValidCoords = lat != null && lng != null && !isNaN(lat) && !isNaN(lng);
  const center = hasValidCoords ? [lat, lng] : defaultCenter;

  return (
    <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden shadow-md border border-gray-200">
      <MapContainer
        center={center}
        zoom={hasValidCoords ? 15 : defaultZoom}
        scrollWheelZoom={false}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {hasValidCoords && (
          <Marker position={[lat, lng]} icon={createMarkerIcon()}>
            {popupData && (
              <Popup maxWidth={280} className="rounded-xl">
                <div className="flex items-center gap-3 p-1 min-w-[200px]">
                  {popupData.image && (
                    <img
                      src={popupData.image}
                      alt=""
                      className="w-14 h-14 rounded-lg object-cover shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {popupData.title || 'Property'}
                    </p>
                    {popupData.price && (
                      <p className="text-xs text-rushkey-500 font-medium mt-0.5">
                        &#8377;{popupData.price.toLocaleString('en-IN')}/-
                      </p>
                    )}
                  </div>
                </div>
              </Popup>
            )}
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
