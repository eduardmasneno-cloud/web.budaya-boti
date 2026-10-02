// ===== PETA STRUKTUR GRAF HYPERMEDIA G = (V, E) =====
// V = Node, E = Edge (link)

const graphData = {
  nodes: [
    { id: 'beranda',  label: 'Beranda',        x: 400, y: 100 },
    { id: 'profil',   label: 'Profil',          x: 150, y: 300 },
    { id: 'falsafah', label: 'Falsafah',        x: 350, y: 300 },
    { id: 'galeri',   label: 'Galeri Motif',    x: 550, y: 300 },
    { id: 'audio',    label: 'Audio Bahasa',    x: 250, y: 500 },
    { id: 'peta',     label: 'Peta Interaktif', x: 500, y: 500 }
  ],
  edges: [
    { from: 'beranda',  to: 'profil'   },
    { from: 'beranda',  to: 'falsafah' },
    { from: 'beranda',  to: 'galeri'   },
    { from: 'beranda',  to: 'audio'    },
    { from: 'beranda',  to: 'peta'     },
    { from: 'profil',   to: 'falsafah' },
    { from: 'falsafah', to: 'galeri'   },
    { from: 'galeri',   to: 'audio'    },
    { from: 'audio',    to: 'peta'     },
    { from: 'peta',     to: 'beranda'  } // link kembali
  ]
};

function gambarGraf(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('viewBox', '0 0 800 650');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', 'auto');
  svg.style.background = '#f9f9f4';
  svg.style.borderRadius = '12px';

  // Gambar edges (link)
  graphData.edges.forEach(edge => {
    const from = graphData.nodes.find(n => n.id === edge.from);
    const to   = graphData.nodes.find(n => n.id === edge.to);

    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', from.x);
    line.setAttribute('y1', from.y);
    line.setAttribute('x2', to.x);
    line.setAttribute('y2', to.y);
    line.setAttribute('stroke', '#1a3a2a');
    line.setAttribute('stroke-width', '2');
    line.setAttribute('marker-end', 'url(#arrow)');
    svg.appendChild(line);
  });

  // Definisi marker panah
  const defs = document.createElementNS(svgNS, 'defs');
  defs.innerHTML = `
    <marker id="arrow" markerWidth="10" markerHeight="10"
            refX="20" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#1a3a2a"/>
    </marker>`;
  svg.appendChild(defs);

  // Gambar nodes (simpul)
  graphData.nodes.forEach(node => {
    const circle = document.createElementNS(svgNS, 'circle');
    circle.setAttribute('cx', node.x);
    circle.setAttribute('cy', node.y);
    circle.setAttribute('r', 45);
    circle.setAttribute('fill', '#d4a017');
    circle.setAttribute('stroke', '#1a3a2a');
    circle.setAttribute('stroke-width', '3');
    svg.appendChild(circle);

    const text = document.createElementNS(svgNS, 'text');
    text.setAttribute('x', node.x);
    text.setAttribute('y', node.y + 5);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('font-size', '13');
    text.setAttribute('font-weight', 'bold');
    text.setAttribute('fill', '#000');
    text.textContent = node.label;
    svg.appendChild(text);
  });

  container.innerHTML = '';
  container.appendChild(svg);
}

// Panggil saat halaman siap
document.addEventListener('DOMContentLoaded', () => {
  gambarGraf('peta-container');
});