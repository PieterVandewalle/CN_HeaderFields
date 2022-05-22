import { Field } from "./field.js";
class PacketHeaderFields {
  #fields = [];
  #headerType;
  constructor() {
    this.getData();
  }
  set headerType(value) {
    this.#headerType = value;
  }

  async getData() {
    const data = await fetch("./data/fields.json");
    const jsonData = await data.json();
    jsonData.forEach((el) => {
      this.#fields.push(
        new Field(el.headerType, el.name, el.description, el.gridArea, el.color)
      );
    });
  }

  fieldsToHtml() {
    const container = document.getElementById("grid-container");
    if (String(container.lastChild.id).includes("grid-")) {
      container.removeChild(container.lastChild);
    }
    const grid = document.createElement("div");
    grid.id = `grid-${this.#headerType}`;
    grid.className = "grid";
    const fields = this.filteredFields;

    fields.forEach((field) => {
      const el = document.createElement("button");
      el.id = field.name;
      el.className = `btn btn-${field.color}`;
      el.innerText = field.name;
      el.style.gridArea = `${field.gridArea}`;
      if (field.color == "secondary") {
        el.disabled = true;
      }
      el.onclick = () => this.descriptionToHtml(field.description);
      grid.appendChild(el);
    });
    container.appendChild(grid);
  }

  descriptionToHtml(description) {
    document.getElementById("info").innerText = description;
  }

  veranderProtocol(protocol, protocolTitel, aantalBytes) {
    document.getElementById("info").innerText =
      "Click op een veld om de uitleg te zien! Enkel de velden te kennen voor het examen computer networks I zijn klikbaar :)";
    this.#headerType = protocol;
    document.getElementById(
      "title"
    ).innerText = `Header Fields: ${protocolTitel} (${aantalBytes} bytes)`;
    this.fieldsToHtml();
  }

  get filteredFields() {
    return this.#fields.filter((f) => f.headerType === this.#headerType);
  }
}

function init() {
  const ph = new PacketHeaderFields();
  document.getElementById("ipv4").onclick = () => {
    ph.veranderProtocol("ipv4", "IPv4", 20);
  };
  document.getElementById("ipv6").onclick = () => {
    ph.veranderProtocol("ipv6", "IPv6", 40);
  };
  document.getElementById("tcp").onclick = () => {
    ph.veranderProtocol("tcp", "TCP", 20);
  };
  document.getElementById("udp").onclick = () => {
    ph.veranderProtocol("udp", "UDP", 8);
  };
}

window.onload = init;
