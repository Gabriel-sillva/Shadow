import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css"
import { useEffect, useState } from "react";

export default function Mapinha(){
    
    const centroInicial = [-22.913933, -47.00];
    const [posicao, setPosicao] = useState(null);
    const [erro, setErro] = useState("");
    
    useEffect(() => {

        if (!("geolocation" in navigator)) {
            setErro("Seu navegador não tem suporte para geolocalização!")
            return;
        }
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosicao({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
            },
            () => {
                setErro("Não foi possivel obter sua localização.")
            },
            {
                enableHighAccuracy: true, 
                timeout: 8000,
                maximumAge: 0,
            }
        );

    }, []);

    const local = [-22.91379, -47.0681000]
    const zoomInicial = local ? 15 : 13;

    return (
        <section className="mapinha">
            <h1> Mapinhaaa~ :3</h1>

            {erro && <div className="erro"> {erro} </div>}

            <MapContainer 
                center={posicao ? local : centroInicial}
                zoom={zoomInicial}
                scrollWheelZoom={true}
                className="mapa"
            >
                <TileLayer 
                    attribution="&copy; Openstreetmap"
                    url="https://{s}.title.openstreetmaap.org/{z}/{x}/{y}.png" />

                {local && (
                    <Marker position={local}>
                        <Popup>Você está aqui!!! </Popup>
                    </Marker>
                )}
            
            
            </MapContainer>

        </section>
    );

}