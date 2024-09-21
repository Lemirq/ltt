'use client';
import { MapContainer, TileLayer } from 'react-leaflet';

import dynamic from 'next/dynamic';

const LocationMarker = dynamic(() => import('./LocationMarker'), {
	ssr: false,
});

const Bus19Marker = dynamic(() => import('./Bus19Marker'), {
	ssr: false,
});

const Bus9Marker = dynamic(() => import('./Bus9Marker'), {
	ssr: false,
});

import { useEffect, useState } from 'react';

export default function Map() {
	const [bus19Position, setBus19Position] = useState<
		| {
				lat: number;
				lng: number;
		  }[]
		| null
	>();
	const [bus19Data, setBus19Data] = useState(null);

	// now for bus 9
	const [bus9Position, setBus9Position] = useState(null);
	const [bus9Data, setBus9Data] = useState(null);
	const [timer, setTimer] = useState(10);

	useEffect(() => {
		const timerInterval = setInterval(() => {
			setTimer((prevTimer) => (prevTimer === 0 ? 10 : prevTimer - 1));
		}, 1000);

		return () => clearInterval(timerInterval);
	}, []);

	// every two seconds,  the /api/getRoute/route.ts API
	useEffect(() => {
		const interval = setInterval(async () => {
			const response = await fetch('/api/getRoute', {
				cache: 'no-store',
			});
			const data = await response.json();
			setBus19Position(data.position.bus19);
			setBus19Data(data.data.bus19);
			setBus9Position(data.position.bus9);
			setBus9Data(data.data.bus9);
		}, 10000);

		return () => clearInterval(interval);
	}, []);

	// use effect that tracks positions of both buses
	useEffect(() => {
		if (bus19Position && bus9Position) {
			console.log('Bus 19:', bus19Position[0].lat, bus19Position[0].lng);
			console.log('Bus 9:', bus9Position);
		}

		// now useing lat and long to display the buses on the map
		// console.log('Bus 19:', bus19Position);
	}, [bus19Position, bus9Position]);

	return (
		<div className="w-screen h-screen overflow-hidden">
			<div className="bg-black p-2 py-1 rounded-md text-xl font-bold fixed top-10 right-10 z-[9999]">{timer}</div>
			<MapContainer
				zoom={13}
				center={{ lat: 43.015638766275465, lng: -81.3394222 }}
				style={{ height: '100%', backgroundColor: 'black', width: '100%' }}
				scrollWheelZoom={true}
			>
				<TileLayer
					// attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{bus19Position && bus19Data && <Bus19Marker bus19Position={bus19Position} data={bus19Data} />}
				{bus9Position && bus9Data && <Bus9Marker bus9Position={bus9Position} data={bus9Data} />}

				<LocationMarker />
			</MapContainer>
		</div>
	);
}
