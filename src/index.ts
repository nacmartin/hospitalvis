import "../css/main.css";

import L from "leaflet";
import { hospitals } from "./data";
import { status } from "./constants";

const lat = 42.816666;
const lng = -1.65;
const zoom = 9;

const map = L.map("map").setView([lat, lng], zoom);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 18,
  attribution:
    'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ',
  id: "mapbox/streets-v11",
  tileSize: 512,
  zoomOffset: -1,
}).addTo(map);

hospitals.forEach((hospital: Hospital) => {
  const icon = L.divIcon({
    className: "hospital-icon",
    html: `<div class='status status-${hospital.stateEcmo}'></div>
    <div class='status status-${hospital.stateIcuHigh}'></div>
    <div class='status status-${hospital.stateIcuLow}'></div>`,
    iconSize: [42, 13],
  });
  const marker = L.marker([hospital.lat, hospital.lng], { icon });

  const popup = L.popup().setContent(`
    <h1 class="hospital-name">${hospital.name}</h1>
    <div class="care-container">
      <span class="care-name">UCI - Bajo</span> 
      <div class="expand-status status-${hospital.stateIcuLow}">${
    status[hospital.stateIcuLow]
  }</div>
    </div>
    <div class="care-container">
      <span class="care-name">UCI - Alto</span> 
      <div class="expand-status status-${hospital.stateIcuHigh}">${
    status[hospital.stateIcuHigh]
  }</div>
    </div>
    <div class="care-container noborder">
      <div class="care-name">Respiradores</div> 
      <div class="expand-status status-${hospital.stateEcmo}">${
    status[hospital.stateEcmo]
  }</div>
    </div>
  `);
  marker.bindPopup(popup);
  marker.addTo(map);
});

const info = L.control();

info.onAdd = function () {
  this._div = L.DomUtil.create("div", "info");
  this.update();
  return this._div;
};

info.update = function () {
  this._div.innerHTML = `<h4>Estado de hospitales</h4>
    <div>
      <div class="info-container">
        <div class="status status-0"></div> ${status[0]}
      </div>
      <div class="info-container">
        <div class="status status-1"></div> ${status[1]}
      </div>
      <div class="info-container">
        <div class="status status-2"></div> ${status[2]}
      </div>
      <div class="info-container">
        <div class="status status-3"></div> ${status[3]}
      </div>
      <p>
        Clique en un hospital<br/>para más información
      </p>
    </div>
    `;
};

info.addTo(map);
