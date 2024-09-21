import L from 'leaflet';

const locationIcon = new L.Icon({
	iconUrl: '/location.svg',
	iconRetinaUrl: '/location.svg',
	popupAnchor: [-0, -0],
	iconSize: [20, 20],
});

import Image from 'next/image';
import { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';

export default function LocationMarker() {
	const [position, setPosition] = useState(null);
	const map = useMapEvents({
		click() {
			map.locate();
		},
		locationfound(e: any) {
			setPosition(e.latlng);
			map.flyTo(e.latlng, map.getZoom());
		},
	});

	return position === null ? null : (
		<Marker position={position} icon={locationIcon}>
			<Popup>You are here</Popup>
		</Marker>
	);
}
