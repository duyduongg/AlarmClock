function Clock() {
  let time = new Date();

  document.getElementById('clock').innerText =
    time.toLocaleTimeString('en-US');
    setTimeout(Clock, 1000);
}

Clock();
