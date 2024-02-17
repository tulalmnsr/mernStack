import React, { useEffect, useState } from 'react';
import CinemaCard from './cinemacard'; // Assuming the filename is correct
import saida from '../images/saida.png';
import salinas from '../images/salinas.jpg';
import vox from '../images/vox.jpg'; 
import verdun from '../images/verdun.jpg';   
import dbayeh from '../images/dbayeh.jpg';
import galaxy from '../images/galaxy.jpg';
import './CinemaListings.css'
// Import images for other cinemas

const CinemaListings = () => {
    const [cinemas, setCinemas] = useState([]);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        // Function to fetch cinemas based on user's location
        const fetchCinemas = async () => {
            try {
                const lebanonCinemas = [
                    {
                        id: 1,
                        name: "Grand The Spot Saida Cinema",
                        location: "The Spot Saida",
                        contact: "+961 7 723 026",
                        webUrl: "https://lb.grandcinemasme.com/en/",
                        imageUrl: saida,
                        coordinates: { latitude: 33.5628, longitude: 35.3775 } // Example coordinates for Saida
                    },
                    {
                        id: 2,
                        name: "Grand Las Salinas Cinema",
                        location: "9P7P+JCC, Anfeh",
                        contact: "+961 6 540 973",
                        webUrl: "https://lb.grandcinemasme.com/en/",
                        imageUrl: salinas,
                        coordinates: { latitude: 34.4261, longitude: 35.8302 } // Example coordinates for Salinas
                    },
                    // Add more cinemas
                    {
                        id: 3,
                        name: "Grand ABC Verdun",
                        location: "ABC Verdun, Beirut",
                        contact: "+961 1 803 301",
                        webUrl: "https://lb.grandcinemasme.com/en/",
                        imageUrl: verdun,
                        coordinates: { latitude: 33.8869, longitude: 35.4851 } // Example coordinates for Verdun
                    },
                    {
                        id: 4,
                        name: "VOX Cinemas ",
                        location: "City Center Beirut, Hazmieh",
                        contact: "+961 1 287 187",
                        webUrl: "https://lb.voxcinemas.com/",
                        imageUrl: vox,
                        coordinates: { latitude: 33.8625, longitude: 35.5724 } // Example coordinates for Vox
                    },
                    {
                        id: 5,
                        name: "Grand ABC Dbayeh ",
                        location: "WHGQ+M9G, Kfartay, Lebanon",
                        contact: "+961 1 209 109",
                        webUrl: "https://lb.grandcinemasme.com/en/",
                        imageUrl: dbayeh,
                        coordinates: { latitude: 33.9464, longitude: 35.6464 } // Example coordinates for Dbayeh
                    },
                    {
                        id: 6,
                        name: "Grand Galaxy ",
                        location: "Camil Chamoun, Beirut",
                        contact: "+961 1 544 051",
                        webUrl: "https://lb.grandcinemasme.com/en/",
                        imageUrl: galaxy,
                        coordinates: { latitude: 33.8738, longitude: 35.5081 } // Example coordinates for Galaxy
                    }
                ];

                // Get user's location
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        position => {
                            setUserLocation({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            });
                        },
                        error => {
                            console.error("Error getting user location:", error);
                        }
                    );
                } else {
                    console.error("Geolocation is not supported by this browser.");
                }

                // Sort cinemas by distance from user's location
                lebanonCinemas.sort((a, b) => {
                    if (!userLocation) return 0;
                    const distanceA = calculateDistance(userLocation, a.coordinates);
                    const distanceB = calculateDistance(userLocation, b.coordinates);
                    return distanceA - distanceB;
                });

                setCinemas(lebanonCinemas);
            } catch (error) {
                console.error("Error fetching cinemas:", error);
            }
        };

        // Function to calculate distance between two coordinates using Haversine formula
        const calculateDistance = (coord1, coord2) => {
            const R = 6371; // Radius of the Earth in kilometers
            const lat1 = deg2rad(coord1.latitude);
            const lon1 = deg2rad(coord1.longitude);
            const lat2 = deg2rad(coord2.latitude);
            const lon2 = deg2rad(coord2.longitude);
            const dLat = lat2 - lat1;
            const dLon = lon2 - lon1;
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c; // Distance in kilometers
            return distance;
        };

        const deg2rad = deg => {
            return deg * (Math.PI / 180);
        };

        // Fetch cinemas based on user's location
        fetchCinemas();
    }, [userLocation]); // Re-run effect when user location changes

    return (
        <div className="container">
            <h2 className="text-purple-600 text-3xl font-bold mt-4 center">Choose Your Cinema Location</h2>
            <div>
                <p className="text-lg mt-4 mb-6 ml-1">
                    City has invested over USD85mn in movie theater screens since establishment under its renowned regional brand name for film exhibition "City Movie". <br />
                    Today "City Movie" encompasses 30 movie screens across Lebanon.
                </p>
            </div>
            <div className="grid grid-rows-1 sm:grid-rows-2 lg:grid-rows-3 gap-3">
                {cinemas.map(cinema => (
                    <div key={cinema.id}>
                        <CinemaCard cinema={cinema} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CinemaListings;
