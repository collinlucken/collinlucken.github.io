/* ============================================================
   Research Network Visualization
   Force-directed concept graph rendered on <canvas>
   No dependencies — vanilla JS with requestAnimationFrame
   ============================================================ */

(function () {
  'use strict';

  var canvas = document.getElementById('research-viz');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var dpr = window.devicePixelRatio || 1;
  var W, H;
  var mouse = { x: null, y: null, active: false };
  var hoveredNode = null;

  // --- Research concept graph ---
  var nodes = [
    // Core areas (larger)
    { id: 'progress', label: 'Scientific Progress', group: 'phil-sci', r: 22, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'engineering', label: 'Engineering Epistemology', group: 'phil-sci', r: 20, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'ai-cog', label: 'AI & Cognitive Science', group: 'ai', r: 22, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'history', label: 'History of Phil. of Science', group: 'history', r: 20, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'digital', label: 'Digital & Comp. Studies', group: 'digital', r: 20, x: 0, y: 0, vx: 0, vy: 0 },
    // Secondary concepts
    { id: 'embodied', label: 'Embodied Cognition', group: 'ai', r: 14, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'agents', label: 'Agent Simulations', group: 'ai', r: 13, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'agentic', label: 'Agentic Coding', group: 'ai', r: 11, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'instruments', label: 'Instruments', group: 'phil-sci', r: 12, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'calibration', label: 'Calibration', group: 'phil-sci', r: 10, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'models', label: 'Models', group: 'phil-sci', r: 12, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'whewell', label: 'Whewell', group: 'history', r: 14, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'carnap', label: 'Carnap', group: 'history', r: 14, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'concept-eng', label: 'Conceptual Engineering', group: 'history', r: 13, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'practice', label: 'Material Practice', group: 'phil-sci', r: 13, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'robotics', label: 'Robotics', group: 'ai', r: 11, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'making', label: 'Making & Understanding', group: 'phil-sci', r: 12, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'engagement', label: 'Public Engagement', group: 'phil-sci', r: 11, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'videogames', label: 'Video Games', group: 'digital', r: 13, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'phenomenology', label: 'Phenomenology', group: 'digital', r: 12, x: 0, y: 0, vx: 0, vy: 0 },
    { id: 'self-overcoming', label: 'Self-Overcoming', group: 'digital', r: 11, x: 0, y: 0, vx: 0, vy: 0 },
  ];

  var edges = [
    // Core connections
    { source: 'progress', target: 'engineering', strength: 0.9 },
    { source: 'progress', target: 'history', strength: 0.6 },
    { source: 'ai-cog', target: 'engineering', strength: 0.5 },
    { source: 'ai-cog', target: 'history', strength: 0.3 },
    { source: 'engineering', target: 'history', strength: 0.4 },
    { source: 'digital', target: 'practice', strength: 0.4 },
    { source: 'digital', target: 'ai-cog', strength: 0.3 },
    // Phil-sci cluster
    { source: 'progress', target: 'instruments', strength: 0.7 },
    { source: 'progress', target: 'models', strength: 0.6 },
    { source: 'engineering', target: 'practice', strength: 0.8 },
    { source: 'engineering', target: 'making', strength: 0.7 },
    { source: 'instruments', target: 'calibration', strength: 0.8 },
    { source: 'practice', target: 'making', strength: 0.6 },
    { source: 'progress', target: 'engagement', strength: 0.4 },
    // AI & cognitive science cluster
    { source: 'ai-cog', target: 'embodied', strength: 0.8 },
    { source: 'ai-cog', target: 'agents', strength: 0.8 },
    { source: 'agents', target: 'agentic', strength: 0.7 },
    { source: 'embodied', target: 'agents', strength: 0.6 },
    { source: 'ai-cog', target: 'robotics', strength: 0.5 },
    { source: 'engineering', target: 'robotics', strength: 0.6 },
    { source: 'models', target: 'robotics', strength: 0.3 },
    // History cluster
    { source: 'history', target: 'whewell', strength: 0.8 },
    { source: 'history', target: 'carnap', strength: 0.8 },
    { source: 'carnap', target: 'concept-eng', strength: 0.7 },
    { source: 'concept-eng', target: 'ai-cog', strength: 0.4 },
    { source: 'whewell', target: 'progress', strength: 0.5 },
    // Digital & computational studies cluster
    { source: 'digital', target: 'videogames', strength: 0.8 },
    { source: 'digital', target: 'phenomenology', strength: 0.7 },
    { source: 'videogames', target: 'self-overcoming', strength: 0.7 },
    { source: 'phenomenology', target: 'self-overcoming', strength: 0.6 },
  ];

  // Color scheme
  var colors = {
    'phil-sci': { node: '#00d4aa', glow: 'rgba(0, 212, 170, 0.25)' },
    'ai': { node: '#7b61ff', glow: 'rgba(123, 97, 255, 0.25)' },
    'history': { node: '#ff6b6b', glow: 'rgba(255, 107, 107, 0.25)' },
    'digital': { node: '#f5a623', glow: 'rgba(245, 166, 35, 0.25)' },
  };

  function resize() {
    var rect = canvas.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
  }

  function init() {
    resize();
    // Scatter nodes randomly within canvas
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].x = W * 0.2 + Math.random() * W * 0.6;
      nodes[i].y = H * 0.2 + Math.random() * H * 0.6;
    }
    // Build edge index
    for (var j = 0; j < edges.length; j++) {
      var e = edges[j];
      e.srcNode = nodeById(e.source);
      e.tgtNode = nodeById(e.target);
    }
  }

  function nodeById(id) {
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].id === id) return nodes[i];
    }
    return null;
  }

  // --- Physics ---
  var DAMPING = 0.92;
  var REPULSION = 2800;
  var SPRING = 0.008;
  var SPRING_LENGTH = 100;
  var CENTER_PULL = 0.0004;

  function simulate() {
    // Repulsion between all pairs
    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var a = nodes[i], b = nodes[j];
        var dx = b.x - a.x, dy = b.y - a.y;
        var dist = Math.sqrt(dx * dx + dy * dy) || 1;
        var force = REPULSION / (dist * dist);
        var fx = (dx / dist) * force;
        var fy = (dy / dist) * force;
        a.vx -= fx; a.vy -= fy;
        b.vx += fx; b.vy += fy;
      }
    }
    // Spring forces along edges
    for (var k = 0; k < edges.length; k++) {
      var e = edges[k];
      var s = e.srcNode, t = e.tgtNode;
      if (!s || !t) continue;
      var dx = t.x - s.x, dy = t.y - s.y;
      var dist = Math.sqrt(dx * dx + dy * dy) || 1;
      var displacement = dist - SPRING_LENGTH * (1 - e.strength * 0.3);
      var force = SPRING * displacement * e.strength;
      var fx = (dx / dist) * force;
      var fy = (dy / dist) * force;
      s.vx += fx; s.vy += fy;
      t.vx -= fx; t.vy -= fy;
    }
    // Center pull + boundary + damping
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      n.vx += (W / 2 - n.x) * CENTER_PULL;
      n.vy += (H / 2 - n.y) * CENTER_PULL;
      n.vx *= DAMPING;
      n.vy *= DAMPING;
      n.x += n.vx;
      n.y += n.vy;
      // Keep in bounds
      var pad = n.r + 4;
      if (n.x < pad) { n.x = pad; n.vx *= -0.5; }
      if (n.x > W - pad) { n.x = W - pad; n.vx *= -0.5; }
      if (n.y < pad) { n.y = pad; n.vy *= -0.5; }
      if (n.y > H - pad) { n.y = H - pad; n.vy *= -0.5; }
    }
    // Mouse repulsion
    if (mouse.active && mouse.x !== null) {
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i];
        var dx = n.x - mouse.x, dy = n.y - mouse.y;
        var dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < 120) {
          var force = (120 - dist) * 0.03;
          n.vx += (dx / dist) * force;
          n.vy += (dy / dist) * force;
        }
      }
    }
  }

  // --- Rendering ---
  function getThemeColors() {
    var style = getComputedStyle(document.documentElement);
    return {
      bg: style.getPropertyValue('--color-bg-alt').trim() || '#141414',
      text: style.getPropertyValue('--color-text').trim() || '#e0ddd5',
      textMuted: style.getPropertyValue('--color-text-muted').trim() || '#6b6860',
      border: style.getPropertyValue('--color-border').trim() || '#2a2a2a',
    };
  }

  function draw() {
    var theme = getThemeColors();
    ctx.clearRect(0, 0, W, H);

    // Edges
    for (var k = 0; k < edges.length; k++) {
      var e = edges[k];
      var s = e.srcNode, t = e.tgtNode;
      if (!s || !t) continue;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(t.x, t.y);
      var alpha = 0.08 + e.strength * 0.12;
      // Highlight edges connected to hovered node
      if (hoveredNode && (s === hoveredNode || t === hoveredNode)) {
        alpha = 0.4;
        ctx.strokeStyle = colors[hoveredNode.group].node;
      } else {
        ctx.strokeStyle = theme.textMuted;
      }
      ctx.globalAlpha = alpha;
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // Nodes
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      var c = colors[n.group];
      var isHovered = (n === hoveredNode);

      // Glow
      if (isHovered) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + 8, 0, Math.PI * 2);
        ctx.fillStyle = c.glow;
        ctx.fill();
      }

      // Circle
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = isHovered ? c.node : 'rgba(0,0,0,0)';
      ctx.fill();
      ctx.strokeStyle = c.node;
      ctx.lineWidth = isHovered ? 2 : 1.5;
      ctx.globalAlpha = isHovered ? 1 : 0.6;
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Label
      ctx.font = (isHovered ? '600 ' : '500 ') + (n.r > 15 ? '11px' : '9px') + ' Inter, system-ui, sans-serif';
      ctx.fillStyle = isHovered ? c.node : theme.text;
      ctx.globalAlpha = isHovered ? 1 : (n.r > 15 ? 0.8 : 0.55);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(n.label, n.x, n.y + n.r + 12);
      ctx.globalAlpha = 1;
    }
  }

  function loop() {
    simulate();
    draw();
    requestAnimationFrame(loop);
  }

  // --- Mouse interaction ---
  canvas.addEventListener('mousemove', function (e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.active = true;

    // Find hovered node
    hoveredNode = null;
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      var dx = mouse.x - n.x, dy = mouse.y - n.y;
      if (Math.sqrt(dx * dx + dy * dy) < n.r + 6) {
        hoveredNode = n;
        break;
      }
    }
    canvas.style.cursor = hoveredNode ? 'pointer' : 'default';
  });

  canvas.addEventListener('mouseleave', function () {
    mouse.active = false;
    hoveredNode = null;
    canvas.style.cursor = 'default';
  });

  window.addEventListener('resize', function () {
    resize();
  });

  // --- Start ---
  init();
  loop();
})();
