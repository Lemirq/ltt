import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

const Icon9 = new L.Icon({
	iconUrl: '/9.png',
	iconRetinaUrl: '/9.png',
	popupAnchor: [-0, -0],
	iconSize: [20, 20],
});
export default function Bus9Marker({ bus9Position, data }: { bus9Position: { lat: number; lng: number }[]; data: Entity[] }) {
	return (
		<>
			{bus9Position &&
				bus9Position.map((position, index) => {
					return (
						<Marker icon={Icon9} position={[position.lat, position.lng]} key={index}>
							<Popup>
								{/* display info about vehicle */}
								<div>
									<h1>Bus 9</h1>
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
