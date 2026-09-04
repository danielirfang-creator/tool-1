document.addEventListener('DOMContentLoaded', () => {
  // Tab switching
  const tabs = document.querySelectorAll('.tab-btn');
  const contents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(tab.dataset.tab).classList.add('active');
    });
  });

  // Flooring Calculator
  function calcFlooring() {
    const len = parseFloat(document.getElementById('floor-len').value) || 0;
    const wid = parseFloat(document.getElementById('floor-wid').value) || 0;
    const wastePct = parseFloat(document.getElementById('floor-waste').value) || 0;
    const boxSqft = parseFloat(document.getElementById('floor-box').value) || 20;

    const baseArea = len * wid;
    const totalArea = Math.ceil(baseArea * (1 + wastePct / 100));
    const boxes = Math.ceil(totalArea / boxSqft);

    document.getElementById('floor-base').textContent = `${baseArea.toFixed(1)} sq ft`;
    document.getElementById('floor-total').textContent = `${totalArea} sq ft`;
    document.getElementById('floor-boxes').textContent = `${boxes} Boxes (${(boxes * boxSqft).toFixed(1)} sq ft)`;
  }
  document.getElementById('calc-floor-btn').addEventListener('click', calcFlooring);

  // Paint Calculator
  function calcPaint() {
    const perim = parseFloat(document.getElementById('paint-perim').value) || 0;
    const height = parseFloat(document.getElementById('paint-height').value) || 0;
    const doors = parseFloat(document.getElementById('paint-doors').value) || 0;
    const windows = parseFloat(document.getElementById('paint-windows').value) || 0;
    const coats = parseFloat(document.getElementById('paint-coats').value) || 2;

    const rawArea = perim * height;
    const deductions = (doors * 21) + (windows * 15);
    const netArea = Math.max(0, rawArea - deductions);
    const totalCoverageNeeded = netArea * coats;
    const gallons = Math.ceil(totalCoverageNeeded / 350); // 350 sq ft per gallon rule
    const liters = (gallons * 3.78541).toFixed(1);

    document.getElementById('paint-net').textContent = `${netArea.toFixed(0)} sq ft (${coats} coats)`;
    document.getElementById('paint-gallons').textContent = `${gallons} Gallon${gallons > 1 ? 's' : ''} (~${liters} L)`;
  }
  document.getElementById('calc-paint-btn').addEventListener('click', calcPaint);

  // Concrete Calculator
  function calcConcrete() {
    const len = parseFloat(document.getElementById('conc-len').value) || 0;
    const wid = parseFloat(document.getElementById('conc-wid').value) || 0;
    const thickInches = parseFloat(document.getElementById('conc-thick').value) || 4;

    const volumeCuFt = len * wid * (thickInches / 12);
    const cubicYards = (volumeCuFt / 27) * 1.10; // 10% waste buffer
    const bags80 = Math.ceil(cubicYards * 45); // 45 bags of 80lb per cu yd
    const bags60 = Math.ceil(cubicYards * 60); // 60 bags of 60lb per cu yd

    document.getElementById('conc-yards').textContent = `${cubicYards.toFixed(2)} Cu Yd (+10% margin)`;
    document.getElementById('conc-80lb').textContent = `${bags80} Bags (80 lb)`;
    document.getElementById('conc-60lb').textContent = `${bags60} Bags (60 lb)`;
  }
  document.getElementById('calc-conc-btn').addEventListener('click', calcConcrete);

  // Converter
  function convertUnits() {
    const type = document.getElementById('conv-type').value;
    const val = parseFloat(document.getElementById('conv-val').value) || 0;
    let out = '';

    switch(type) {
      case 'ft-m':
        out = `${(val * 0.3048).toFixed(3)} Meters`;
        break;
      case 'm-ft':
        out = `${(val / 0.3048).toFixed(3)} Feet`;
        break;
      case 'sqft-m2':
        out = `${(val * 0.092903).toFixed(3)} Square Meters (m²)`;
        break;
      case 'm2-sqft':
        out = `${(val / 0.092903).toFixed(2)} Square Feet`;
        break;
      case 'in-mm':
        out = `${(val * 25.4).toFixed(2)} mm`;
        break;
      case 'gal-l':
        out = `${(val * 3.78541).toFixed(2)} Liters`;
        break;
    }
    document.getElementById('conv-out').textContent = out;
  }
  document.getElementById('calc-conv-btn').addEventListener('click', convertUnits);
});
