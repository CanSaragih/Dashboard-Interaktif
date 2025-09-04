import React from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import type { Feature, FeatureCollection } from "geojson";
import type { Layer } from "leaflet";
import "leaflet/dist/leaflet.css";

// GeoJSON Indonesia (isi sesuai file provinsi Indonesia yang kamu punya)
import indonesiaGeoJSON from "../../data/indonesia-provinces.json";

interface Props {
  onProvinceClick: (id: number) => void;
}

interface ProvinceProperties {
  KODE_PROV: string;
  PROVINSI: string;
}

const MapIndonesia: React.FC<Props> = ({
  onProvinceClick,
}: {
  onProvinceClick: (id: number) => void;
}) => {
  const handleClick = (event: any) => {
    const provinceId = event.target.feature.properties.provinceId;
    onProvinceClick(provinceId);
  };

  return (
    <MapContainer center={[-2, 118]} zoom={5} className="w-full h-[400px]">
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <GeoJSON
        data={indonesiaGeoJSON as FeatureCollection}
        onEachFeature={(feature: Feature, layer: Layer) => {
          const props = feature.properties as ProvinceProperties;

          const provinceId = parseInt(props.KODE_PROV);
          const provinceName = props.PROVINSI;

          layer.bindTooltip(provinceName);

          layer.on({
            click: () => onProvinceClick(provinceId),
          });
        }}
      />
    </MapContainer>
  );
};

export default MapIndonesia;
