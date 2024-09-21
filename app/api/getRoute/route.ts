import { NextRequest, NextResponse } from 'next/server';
// const fetchData = async () => {
// 	const response = await fetch('http://gtfs.ltconline.ca/Vehicle/VehiclePositions.json', {
// 		// no cors
// 		mode: 'no-cors',
// 	});
// 	const data = await response.json();
// 	const bus19 = data.entity.filter((entity: Entity) => entity.vehicle && entity.vehicle.trip && entity.vehicle.trip.route_id === '19');

// 	const bus9 = data.entity.filter((entity: Entity) => entity.vehicle && entity.vehicle.trip && entity.vehicle.trip.route_id === '9');

// 	// extract lat and long for bus 19
// 	const bus19Position = bus19.map((entity: Entity) => {
// 		return {
// 			lat: entity.vehicle.position.latitude,
// 			lng: entity.vehicle.position.longitude,
// 		};
// 	});

// 	// extract lat and long for bus 9
// 	const bus9Position = bus9.map((entity: Entity) => {
// 		return {
// 			lat: entity.vehicle.position.latitude,
// 			lng: entity.vehicle.position.longitude,
// 		};
// 	});

// 	setBus19Position(bus19Position);
// 	setBus19Data(bus19);

// 	setBus9Position(bus9Position);
// 	setBus9Data(bus9);
// };

export async function GET(request: NextRequest) {
	// fetch data from the API
	const response = await fetch('http://gtfs.ltconline.ca/Vehicle/VehiclePositions.json');
	const data = await response.json();
	const bus19 = data.entity.filter((entity: Entity) => entity.vehicle && entity.vehicle.trip && entity.vehicle.trip.route_id === '19');
	const bus9 = data.entity.filter((entity: Entity) => entity.vehicle && entity.vehicle.trip && entity.vehicle.trip.route_id === '09');

	return NextResponse.json({
		data: {
			bus19,
			bus9,
		},
		position: {
			bus19: bus19.map((entity: Entity) => {
				return {
					lat: entity.vehicle.position.latitude,
					lng: entity.vehicle.position.longitude,
				};
			}),
			bus9: bus9.map((entity: Entity) => {
				return {
					lat: entity.vehicle.position.latitude,
					lng: entity.vehicle.position.longitude,
				};
			}),
		},
	});
}
