import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"; // Import Leaflet
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png"; // Import marker image
import markerShadow from "leaflet/dist/images/marker-shadow.png"; // Import shadow image
import "./App.css";

const MAPTILER_API_KEY = process.env.REACT_APP_MAPTILER_API_KEY; //API Key

// Fix for missing marker icon
const customIcon = new L.Icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41], // Default Leaflet size
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

function App() {
    const position = [29.7604, -95.3698]; // Houston, TX

    return (
        <div className="App">
            <h1 className="text-2xl font-bold text-blue-700 m-4">Police Operations Tracker</h1>

            {/* Leaflet Map Container */}
            <MapContainer center={position} zoom={13} className="w-full h-screen">

                {/* Tile Layer (MapTiler) */}
                <TileLayer
                    url={`https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
                    attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> contributors'
                />

                {/* Corrected Marker with Custom Icon */}
                <Marker position={position} icon={customIcon}>
                    <Popup>Officer's Last Known Location (Houston, TX)</Popup>
                </Marker>

            </MapContainer>
        </div>
    );
}

export default App;
