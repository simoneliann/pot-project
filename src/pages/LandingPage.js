import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

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
    const navigate = useNavigate();
    const position = [29.7604, -95.3698];
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isClockedIn, setIsClockedIn] = useState(false);

    const [agents, setAgents] = useState([
        { id: 1, name: "Agent A", location: [29.75, -95.36], active: true },
        { id: 2, name: "Agent B", location: [29.77, -95.35], active: true },
        { id: 3, name: "Agent C", location: [29.76, -95.38], active: true },
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            setAgents((prevAgents) =>
                prevAgents.map((agent) => ({
                    ...agent,
                    location: [
                        agent.location[0] + (Math.random() - 0.5) * 0.005,
                        agent.location[1] + (Math.random() - 0.5) * 0.005,
                    ],
                }))
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const agentCases = {
        open: [
            { id: 1, title: "Ongoing Investigation", location: [29.75, -95.36] },
            { id: 2, title: "Surveillance Operation", location: [29.77, -95.35] },
        ],
    };

    const recentActivity = [
        { id: 3, title: "Intelligence Briefing", location: [29.74, -95.38] },
        { id: 4, title: "Counterterrorism Meeting", location: [29.78, -95.37] },
    ];

    return (
        <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex flex-col font-padauk">
            <header className="flex items-center justify-center space-x-4 p-4 bg-gray-800 shadow-md w-full">
                <img src="/securitylogo.png" alt="Logo" className="h-10 w-10" />
                <h1 className="text-xl font-bold">U.S. Department of State - United Security</h1>
            </header>

            <div className="flex flex-grow p-6">
                <div className="w-[17.5%] p-6 bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-lg flex flex-col space-y-4">
                    <button onClick={() => navigate("/profile")} className="flex items-center p-3 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium space-x-3">
                        <img src="/agent-profile.jpg" alt="Profile" className="h-8 w-8 rounded-full" />
                        <span>My Profile</span>
                    </button>
                    <button onClick={() => setIsClockedIn(!isClockedIn)} className={`p-3 rounded-lg font-medium ${isClockedIn ? "bg-green-500" : "bg-red-500"} hover:opacity-75`}>
                        {isClockedIn ? "Clock Out" : "Clock In"}
                    </button>
                    <h2 className="text-2xl font-medium text-gray-200 mt-4">Open Cases</h2>
                    <ul className="space-y-2">
                        {agentCases.open.map((caseItem) => (
                            <li key={caseItem.id} className="cursor-pointer p-3 rounded-lg bg-yellow-500/20 hover:bg-yellow-500/40 transition font-normal">
                                {caseItem.title}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-[17.5%] p-6 bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-lg flex flex-col space-y-4 mx-4">
                    <h2 className="text-2xl font-bold text-gray-200">Recent Activity</h2>
                    <ul className="space-y-2">
                        {recentActivity.map((activity) => (
                            <li key={activity.id} className="cursor-pointer p-3 rounded-lg bg-red-500/20 hover:bg-red-500/40 transition font-medium">
                                {activity.title}
                            </li>
                        ))}
                    </ul>
                    <h2 className="text-2xl font-bold text-gray-200 mt-4">Active Agents</h2>
                    <div className="h-32 overflow-y-auto p-2 border border-gray-700 rounded-lg">
                        {agents.map((agent) => (
                            <div key={agent.id} className="p-2 bg-green-500/20 rounded-lg mb-2">
                                {agent.name}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-[65%] bg-gray-800/50 backdrop-blur-md rounded-2xl shadow-lg p-6 relative">
                    <h2 className="text-2xl font-medium text-gray-200">Live Tracking</h2>
                    <div className="rounded-lg overflow-hidden h-full">
                        <MapContainer center={position} zoom={13} className="w-full h-full">
                            <TileLayer
                                url={`https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
                                attribution="&copy; MapTiler contributors"
                            />
                            {agents.concat(agentCases.open, recentActivity).map((event) => (
                                <Marker key={event.id} position={event.location} icon={customIcon}>
                                    <Popup>{event.name || event.title}</Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
