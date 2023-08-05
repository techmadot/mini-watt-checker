const sensorValues = document.querySelector("#sensor-values");

const sensorData = [];

/*
  Plotly.js graph and chart setup code
*/
var sensorChartDiv = document.getElementById("sensor-chart");

// History Data
var sensorTrace = {
  x: [],
  y: [],
  mode: "lines+markers",
  type: "line",
};

var sensorLayout = {
  autosize: false,
  width: 800,
  height: 500,
  colorway: ["#05AD86"],
  margin: { t: 40, b: 40, l: 80, r: 80, pad: 0 },
  xaxis: {
    gridwidth: "2",
    autorange: true,
    title: '時間 (sec)'
  },
  yaxis: {
    gridwidth: "2",
    autorange: true,
    title: '消費電力 (W)'
  },
};
var config = { responsive: true };

Plotly.newPlot(sensorChartDiv, [sensorTrace], sensorLayout, config);

// Will hold the sensor reads
let newSensorXArray = [];
let newSensorYArray = [];

// The maximum number of data points displayed on our scatter/line graph
let MAX_GRAPH_POINTS = 300;
let ctr = 0;

function updateChart(sensorRead) {
  newSensorXArray.push(ctr++);
  newSensorYArray.push(sensorRead);

  var data_update = {
    x: [newSensorXArray],
    y: [newSensorYArray],
  };

  var layout = {
    xaxis: {
      range: [0, 300],
      title: '時間 (sec)'
    },
    yaxis: {
      rangemode: 'tozero',
      autorange: true,
      title: '消費電力 (W)'
    }
  }
  if (ctr >= MAX_GRAPH_POINTS)
  {
    layout.xaxis.range[1] = ctr
  }

  Plotly.update(sensorChartDiv, data_update, layout);
}

// WebSocket support
var targetUrl = `ws://${location.host}/ws`;
var websocket;
window.addEventListener("load", onLoad);

function onLoad() {
  initializeSocket();
}

function initializeSocket() {
  console.log("Opening WebSocket connection MicroPython Server...");
  websocket = new WebSocket(targetUrl);
  websocket.onopen = onOpen;
  websocket.onclose = onClose;
  websocket.onmessage = onMessage;
}
function onOpen(event) {
  console.log("Starting connection to WebSocket server..");
}
function onClose(event) {
  console.log("Closing connection to server..");
  //setTimeout(initializeSocket, 2000);
}
function onMessage(event) {
  console.log("WebSocket message received:", event);
  updateValues(event.data);
  updateChart(event.data);
}

function sendMessage(message) {
  websocket.send(message);
}

function updateValues(data) {
  sensorData.unshift(data);
}
