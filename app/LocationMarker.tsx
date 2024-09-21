import L from 'leaflet';

const Icon19 = new L.Icon({
	iconUrl: '/19.png',
	iconRetinaUrl: '/19.png',
	popupAnchor: [-0, -0],
	iconSize: [20, 20],
});

const Icon9 = new L.Icon({
	iconUrl: '/9.png',
	iconRetinaUrl: '/9.png',
	popupAnchor: [-0, -0],
	iconSize: [20, 20],
});

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

export function Bus19Marker({ bus19Position, data }: { bus19Position: { lat: number; lng: number }[]; data: Entity[] }) {
	return (
		<>
			{bus19Position &&
				bus19Position.map((position, index) => {
					return (
						<Marker icon={Icon19} position={[position.lat, position.lng]} key={index}>
							<Popup>
								{/* display info about vehicle */}
								<div>
									<h1>Bus 19</h1>
									<p>Vehicle ID: {data[index].vehicle.vehicle.id}</p>
									<p>Route ID: {data[index].vehicle.trip.route_id}</p>
									<p>Direction: {data[index].vehicle.trip.direction_id}</p>
									<p>Speed: {data[index].vehicle.position.speed}</p>
								</div>
							</Popup>
						</Marker>
					);
				})}
		</>
	);
}

export function Bus9Marker({ bus9Position, data }: { bus9Position: { lat: number; lng: number }[]; data: Entity[] }) {
	return (
		<>
			{bus9Position &&
				bus9Position.map((position, index) => {
					return (
						<Marker icon={Icon9} position={[position.lat, position.lng]} key={index}>
							<Popup>
								<Image src="/9.png" alt="bus" width={50} height={50} />
							</Popup>
						</Marker>
					);
				})}
		</>
	);
}
