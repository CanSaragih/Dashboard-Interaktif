// components/dashboard/MapIndonesia.tsx
import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { Feature, FeatureCollection } from "geojson";
import type { Layer } from "leaflet";
import "leaflet/dist/leaflet.css";

// GeoJSON Indonesia (pastikan file ini ada dan berisi data provinsi dengan provinceId)
import indonesiaGeoJSON from "../../data/indonesia-provinces.json";

interface Props {
  onProvinceClick: (id: number) => void;
  selectedProvince?: number | null;
}

interface ProvinceProperties {
  KODE_PROV: string;
  PROVINSI: string;
  // Pastikan ada property provinceId di GeoJSON
  provinceId?: number;
}

const MapIndonesia: React.FC<Props> = ({
  onProvinceClick,
  selectedProvince,
}) => {
  // Style untuk provinsi yang dipilih
  const getStyle = (feature?: Feature) => {
    if (!feature) {
      return {
        fillColor: "#8884d8",
        weight: 2,
        opacity: 1,
        color: "white",
        dashArray: "3",
        fillOpacity: 0.6,
      };
    }

    const props = feature.properties as ProvinceProperties;
    const provinceId = props.provinceId || parseInt(props.KODE_PROV);

    return {
      fillColor: selectedProvince === provinceId ? "#3182ce" : "#8884d8",
      weight: 2,
      opacity: 1,
      color: selectedProvince === provinceId ? "#1e40af" : "white",
      dashArray: "3",
      fillOpacity: selectedProvince === provinceId ? 0.8 : 0.6,
    };
  };

  return (
    <MapContainer
      center={[-2, 118]}
      zoom={5}
      className="w-full h-[400px]"
      style={{ borderRadius: "8px", overflow: "hidden", zIndex: 10 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <GeoJSON
        data={indonesiaGeoJSON as FeatureCollection}
        style={getStyle}
        onEachFeature={(feature: Feature, layer: Layer) => {
          const props = feature.properties as ProvinceProperties;
          const provinceId = props.provinceId || parseInt(props.KODE_PROV);
          const provinceName = props.PROVINSI;

          layer.bindTooltip(provinceName, {
            permanent: false,
            direction: "auto",
          });

          layer.on({
            click: () => onProvinceClick(provinceId),
            mouseover: (e) => {
              const layer = e.target;
              layer.setStyle({
                weight: 3,
                color: "#666",
                dashArray: "",
                fillOpacity: 0.7,
              });
            },
            mouseout: (e) => {
              const layer = e.target;
              layer.setStyle(getStyle(feature));
            },
          });
        }}
      />
    </MapContainer>
  );
};

export default MapIndonesia;
