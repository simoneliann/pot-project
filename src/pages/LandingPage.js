import React, { useState } from "react";
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
    const [selectedEvent, setSelectedEvent] = useState(null);
    const position = [29.7604, -95.3698]; // Houston, TX

    // Dummy data for tracking officers & events
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

    return (
        <div className="grid grid-cols-3 gap-2 h-screen p-4 bg-gray-100">

            {/* Left Panel: Officer's Tickets */}
            <div className="bg-white p-4 shadow-md rounded-lg flex flex-col">
                <h2 className="text-lg font-semibold">Unfinished Tickets</h2>
                <ul className="mt-2">
                    {officerTickets.unfinished.map((ticket) => (
                        <li
                            key={ticket.id}
                            className="cursor-pointer p-2 bg-yellow-200 mb-2 rounded"
                            onClick={() => setSelectedEvent(ticket)}
                        >
                            {ticket.title}
                        </li>
                    ))}
                </ul>

                <h2 className="text-lg font-semibold mt-4">Finished Tickets</h2>
                <ul className="mt-2">
                    {officerTickets.finished.map((ticket) => (
                        <li key={ticket.id} className="p-2 bg-green-200 mb-2 rounded">
                            {ticket.title}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Middle Panel: Recent Events */}
            <div className="bg-white p-4 shadow-md rounded-lg flex flex-col">
                <h2 className="text-lg font-semibold">Recent Events</h2>
                <ul className="mt-2">
                    {recentEvents.map((event) => (
                        <li
                            key={event.id}
                            className="cursor-pointer p-2 bg-red-200 mb-2 rounded"
                            onClick={() => setSelectedEvent(event)}
                        >
                            {event.title}
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right Panel: Live Map */}
            <div className="bg-white p-4 shadow-md rounded-lg relative">
                <h2 className="text-lg font-semibold">Live Tracking</h2>
                <MapContainer center={position} zoom={13} className="w-full h-full rounded-lg">
                    <TileLayer
                        url={`https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
                        attribution='&copy; MapTiler contributors'
                    />
                    {selectedEvent && (
                        <Marker position={selectedEvent.location} icon={customIcon}>
                            <Popup>{selectedEvent.title}</Popup>
                        </Marker>
                    )}
                </MapContainer>
            </div>

        </div>
    );
};

export default LandingPage; // Ensure default export
