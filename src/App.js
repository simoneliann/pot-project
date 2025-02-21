import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

function App() {
    const position = [29.7604, -95.3698]; // Houston, TX
    const MAPTILER_API_KEY = process.env.REACT_APP_MAPTILER_API_KEY;

    return (
        <div className="App">
            <h1 className="text-2xl font-bold text-blue-700 m-4">Police Operations Tracker</h1>

            <MapContainer center={position} zoom={13} className="w-full h-screen">
                <TileLayer
                    url={`https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`}
                    attribution='&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> contributors'
                />
                <Marker position={position}>
                    <Popup>Officer's Last Known Location (Houston, TX)</Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default App;
