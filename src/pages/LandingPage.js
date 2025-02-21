import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix for missing marker icon
const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const MAPTILER_API_KEY = process.env.REACT_APP_MAPTILER_API_KEY;

const LandingPage = () => {
    const position = [29.7604, -95.3698]; // Houston, TX
    const [selectedEvent, setSelectedEvent] = useState(null);

    // Simulated officer tracking data
    const [officers, setOfficers] = useState([
        { id: 1, name: "Officer A", location: [29.75, -95.36] },
        { id: 2, name: "Officer B", location: [29.77, -95.35] },
        { id: 3, name: "Officer C", location: [29.76, -95.38] },
    ]);

    const officerTickets = {
        unfinished: [
            { id: 1, title: "Ongoing Robbery", location: [29.75, -95.36] },
            { id: 2, title: "Suspicious Activity", location: [29.77, -95.35] },
        ],
        finished: [
            { id: 3, title: "Traffic Violation", location: [29.76, -95.34] },
        ],
    };

    const recentEvents = [
        { id: 4, title: "Armed Assault", location: [29.74, -95.38] },
        { id: 5, title: "Fire Emergency", location: [29.78, -95.37] },
    ];

    // Simulate real-time officer movement
    useEffect(() => {
        const interval = setInterval(() => {
            setOfficers((prevOfficers) =>
                prevOfficers.map((officer) => ({
                    ...officer,
                    location: [
                        officer.location[0] + (Math.random() - 0.5) * 0.005,
                        officer.location[1] + (Math.random() - 0.5) * 0.005,
                    ],
                }))
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 flex font-padauk">
            {/* Left Panel */}
            <div className="w-[17.5%] p-6 bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-lg flex flex-col space-y-4">
                <h2 className="text-2xl font-medium text-gray-200">Unfinished Tickets</h2>
                <ul className="space-y-2">
                    {officerTickets.unfinished.map((ticket) => (
                        <li
                            key={ticket.id}
                            className="cursor-pointer p-3 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/40 transition font-normal"
                            onClick={() => setSelectedEvent(ticket)}
                        >
                            {ticket.title}
                        </li>
                    ))}
                </ul>

                <h2 className="text-2xl font-semibold text-gray-200 mt-6">Finished Tickets</h2>
                <ul className="space-y-2">
                    {officerTickets.finished.map((ticket) => (
                        <li key={ticket.id} className="p-3 rounded-lg bg-green-500/20 font-light">
                            {ticket.title}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Middle Panel */}
            <div className="w-[17.5%] p-6 bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-lg flex flex-col space-y-4 mx-4">
                <h2 className="text-2xl font-bold text-gray-200">Recent Events</h2>
                <ul className="space-y-2">
                    {recentEvents.map((event) => (
                        <li
                            key={event.id}
                            className="cursor-pointer p-3 rounded-lg bg-red-500/20 hover:bg-red-500/40 transition font-medium"
                            onClick={() => setSelectedEvent(event)}
                        >
                            {event.title}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Map Panel */}
            <div className="w-[65%] bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-lg p-6 relative">
                <h2 className="text-2xl font-medium text-gray-200">Live Tracking</h2>
                <div className="rounded-lg overflow-hidden h-full">
                    <MapContainer center={position} zoom={13} className="w-full h-full">
                        <TileLayer
                            url={`https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
                            attribution='&copy; MapTiler contributors'
                        />

                        {/* Officer Markers (Live Tracking) */}
                        {officers.map((officer) => (
                            <Marker key={officer.id} position={officer.location} icon={customIcon}>
                                <Popup>{officer.name}</Popup>
                            </Marker>
                        ))}

                        {/* Event Markers (Static) */}
                        {recentEvents.map((event) => (
                            <Marker key={event.id} position={event.location} icon={customIcon}>
                                <Popup>{event.title}</Popup>
                            </Marker>
                        ))}

                        {/* Selected Ticket/Event Marker */}
                        {selectedEvent && (
                            <Marker position={selectedEvent.location} icon={customIcon}>
                                <Popup>{selectedEvent.title}</Popup>
                            </Marker>
                        )}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
