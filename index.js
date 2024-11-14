const maxCapacity = 92;
const deviceMaxConsumption = 40;
let activeDevices = [];
let currentPower = 0;

function connectDevice(device) {
  if (currentPower + deviceMaxConsumption <= maxCapacity) {
    device.powerConsumed = deviceMaxConsumption;
    currentPower += deviceMaxConsumption;
    activeDevices.push(device);
  } else {
    const remainingPower = maxCapacity - currentPower;
    device.powerConsumed = remainingPower;
    currentPower = maxCapacity;
    activeDevices.push(device);
  }
}

function disconnectDevice(device) {
  activeDevices = activeDevices.filter(d => d !== device);
  currentPower -= device.powerConsumed;
}

function changeConsumption(device, newConsumption) {
  if (newConsumption <= deviceMaxConsumption) {
    const availablePower = maxCapacity - currentPower + device.powerConsumed;
    if (availablePower >= newConsumption) {
      currentPower += newConsumption - device.powerConsumed;
      device.powerConsumed = newConsumption;
    } else {
      device.powerConsumed = availablePower;
      currentPower = maxCapacity;
    }
  } else {
    console.log("Error: Device cannot consume more than 40 units.");
  }
}

function processEvent(event) {
  if (event.type === "connect") {
    connectDevice(event.device);
  } else if (event.type === "disconnect") {
    disconnectDevice(event.device);
  } else if (event.type === "changeConsumption") {
    changeConsumption(event.device, event.newConsumption);
  }
}

let deviceA = { name: "Device A", powerConsumed: 0 };
let deviceB = { name: "Device B", powerConsumed: 0 };
let deviceC = { name: "Device C", powerConsumed: 0 };

processEvent({ type: "connect", device: deviceA });
console.log(activeDevices);

processEvent({ type: "connect", device: deviceB });
console.log(activeDevices);

processEvent({ type: "connect", device: deviceC });
console.log(activeDevices);

processEvent({ type: "changeConsumption", device: deviceA, newConsumption: 20 });
console.log(activeDevices);

processEvent({ type: "disconnect", device: deviceB });
console.log(activeDevices);
