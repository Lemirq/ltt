import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';

const Icon19 = new L.Icon({
	iconUrl: '/19.png',
	iconRetinaUrl: '/19.png',
	popupAnchor: [-0, -0],
	iconSize: [20, 20],
});

export default function Bus19Marker({ bus19Position, data }: { bus19Position: { lat: number; lng: number }[]; data: Entity[] }) {
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
