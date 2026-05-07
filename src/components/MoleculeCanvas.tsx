import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface NodeData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  targetScale: number;
  currentScale: number;
}

interface ParticleData {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  life: number;
  maxLife: number;
  size: number;
}

interface Connection {
  from: number;
  to: number;
}

const GOLD_COLOR = new THREE.Color('#b8860b');
const GOLD_DIM = new THREE.Color('#5a4305');
const BG_COLOR = new THREE.Color('#050505');

function createHexagonGeometry(radius: number): THREE.BufferGeometry {
  const vertices: number[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    vertices.push(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  return geometry;
}

function getHoneycombPositions(_centerRadius: number, ringRadius: number): THREE.Vector3[] {
  const positions: THREE.Vector3[] = [];
  // Center hexagon
  positions.push(new THREE.Vector3(0, 0, 0));
  // 6 surrounding hexagons
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3 - Math.PI / 6;
    positions.push(new THREE.Vector3(
      Math.cos(angle) * ringRadius,
      Math.sin(angle) * ringRadius,
      0
    ));
  }
  // 6 outer ring hexagons (offset from inner ring)
  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    positions.push(new THREE.Vector3(
      Math.cos(angle) * ringRadius * 1.85,
      Math.sin(angle) * ringRadius * 1.85,
      0
    ));
  }
  return positions;
}

function getConnections(): Connection[] {
  const connections: Connection[] = [];
  // Center to inner ring
  for (let i = 1; i <= 6; i++) {
    connections.push({ from: 0, to: i });
  }
  // Inner ring to outer ring
  for (let i = 1; i <= 6; i++) {
    const outerIdx = 6 + i;
    connections.push({ from: i, to: outerIdx });
    // Also connect to adjacent inner ring neighbors
    const nextInner = i === 6 ? 1 : i + 1;
    connections.push({ from: i, to: nextInner });
  }
  // Outer ring adjacencies
  for (let i = 7; i <= 12; i++) {
    const nextOuter = i === 12 ? 7 : i + 1;
    connections.push({ from: i, to: nextOuter });
  }
  return connections;
}

export default function MoleculeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const nodesRef = useRef<NodeData[]>([]);
  const particlesRef = useRef<ParticleData[]>([]);
  const materialsRef = useRef<{
    hexLines: THREE.LineBasicMaterial[];
    edgeLines: THREE.LineBasicMaterial[];
    particles: THREE.PointsMaterial;
  } | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = BG_COLOR;
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.z = 12;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Honeycomb structure
    const hexRadius = 0.6;
    const ringRadius = 1.3;
    const positions = getHoneycombPositions(hexRadius, ringRadius);
    const connections = getConnections();

    // Node data
    const nodes: NodeData[] = positions.map((pos) => ({
      position: pos.clone(),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.002,
        (Math.random() - 0.5) * 0.001
      ),
      targetScale: 1,
      currentScale: 0,
    }));
    nodesRef.current = nodes;

    // Hexagon outlines
    const hexGeometry = createHexagonGeometry(hexRadius);
    const hexLines: THREE.Line[] = [];
    const hexMaterials: THREE.LineBasicMaterial[] = [];

    positions.forEach((pos, i) => {
      const material = new THREE.LineBasicMaterial({
        color: i === 0 ? GOLD_COLOR : GOLD_DIM,
        transparent: true,
        opacity: i === 0 ? 0.8 : 0.4,
        blending: THREE.AdditiveBlending,
      });
      hexMaterials.push(material);

      const line = new THREE.Line(hexGeometry, material);
      line.position.copy(pos);
      scene.add(line);
      hexLines.push(line);
    });

    // Connection edges
    const edgeGeometry = new THREE.BufferGeometry();
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: GOLD_DIM,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });

    const edgePositions: number[] = [];
    connections.forEach((conn) => {
      edgePositions.push(
        positions[conn.from].x, positions[conn.from].y, positions[conn.from].z,
        positions[conn.to].x, positions[conn.to].y, positions[conn.to].z
      );
    });
    edgeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(edgePositions, 3));
    const edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    scene.add(edges);

    // Glow nodes (small spheres at vertices)
    const glowGeometry = new THREE.SphereGeometry(0.04, 8, 8);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: GOLD_COLOR,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const glowMeshes: THREE.Mesh[] = [];
    positions.forEach((pos) => {
      const glow = new THREE.Mesh(glowGeometry, glowMaterial.clone());
      glow.position.copy(pos);
      scene.add(glow);
      glowMeshes.push(glow);
    });

    // Floating particles
    const particleCount = 60;
    const particles: ParticleData[] = [];
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.5 + Math.random() * 3;
      const pos = new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 2
      );
      particles.push({
        position: pos,
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.003,
          (Math.random() - 0.5) * 0.002
        ),
        life: Math.random(),
        maxLife: 0.5 + Math.random() * 0.5,
        size: 0.02 + Math.random() * 0.03,
      });
      particlePositions[i * 3] = pos.x;
      particlePositions[i * 3 + 1] = pos.y;
      particlePositions[i * 3 + 2] = pos.z;
    }
    particlesRef.current = particles;

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    const particleMaterial = new THREE.PointsMaterial({
      color: GOLD_COLOR,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    materialsRef.current = {
      hexLines: hexMaterials,
      edgeLines: [edgeMaterial],
      particles: particleMaterial,
    };

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current.targetX = (e.touches[0].clientX / window.innerWidth - 0.5) * 2;
        mouseRef.current.targetY = (e.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Animation loop
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      timeRef.current += 0.016;
      const time = timeRef.current;

      // Smooth mouse follow
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Camera parallax tilt
      camera.position.x = mouseRef.current.x * 0.5;
      camera.position.y = -mouseRef.current.y * 0.5;
      camera.lookAt(0, 0, 0);

      // Group rotation (slow organic spin)
      const groupRotation = time * 0.08;

      // Breathing pulse
      const breathScale = 1 + Math.sin(time * 0.6) * 0.03;
      const breathOpacity = 0.7 + Math.sin(time * 0.6) * 0.15;

      // Update hexagons
      hexLines.forEach((line, i) => {
        const node = nodes[i];

        // Organic drift
        node.position.add(node.velocity);

        // Gentle return force
        const originalPos = positions[i];
        const drift = node.position.clone().sub(originalPos);
        node.position.sub(drift.multiplyScalar(0.02));

        // Apply rotation around Z
        const rotatedX = node.position.x * Math.cos(groupRotation) - node.position.y * Math.sin(groupRotation);
        const rotatedY = node.position.x * Math.sin(groupRotation) + node.position.y * Math.cos(groupRotation);

        line.position.set(rotatedX, rotatedY, node.position.z);
        line.scale.setScalar(breathScale * node.currentScale);

        // Fade in on first appearance
        if (node.currentScale < node.targetScale) {
          node.currentScale += (node.targetScale - node.currentScale) * 0.03;
        }

        // Pulse opacity
        const mat = hexMaterials[i];
        mat.opacity = (i === 0 ? 0.8 : 0.35) * breathOpacity * node.currentScale;
      });

      // Update glow positions
      glowMeshes.forEach((glow, i) => {
        const node = nodes[i];
        const rotatedX = node.position.x * Math.cos(groupRotation) - node.position.y * Math.sin(groupRotation);
        const rotatedY = node.position.x * Math.sin(groupRotation) + node.position.y * Math.cos(groupRotation);
        glow.position.set(rotatedX, rotatedY, node.position.z);
        glow.scale.setScalar(breathScale * node.currentScale);

        const mat = glow.material as THREE.MeshBasicMaterial;
        mat.opacity = 0.5 * breathOpacity * node.currentScale;
      });

      // Update edge positions
      const edgePosArray = edges.geometry.attributes.position.array as Float32Array;
      let edgeIdx = 0;
      connections.forEach((conn) => {
        const fromNode = nodes[conn.from];
        const toNode = nodes[conn.to];

        const fromRotatedX = fromNode.position.x * Math.cos(groupRotation) - fromNode.position.y * Math.sin(groupRotation);
        const fromRotatedY = fromNode.position.x * Math.sin(groupRotation) + fromNode.position.y * Math.cos(groupRotation);
        const toRotatedX = toNode.position.x * Math.cos(groupRotation) - toNode.position.y * Math.sin(groupRotation);
        const toRotatedY = toNode.position.x * Math.sin(groupRotation) + toNode.position.y * Math.cos(groupRotation);

        edgePosArray[edgeIdx++] = fromRotatedX;
        edgePosArray[edgeIdx++] = fromRotatedY;
        edgePosArray[edgeIdx++] = fromNode.position.z;
        edgePosArray[edgeIdx++] = toRotatedX;
        edgePosArray[edgeIdx++] = toRotatedY;
        edgePosArray[edgeIdx++] = toNode.position.z;
      });
      edges.geometry.attributes.position.needsUpdate = true;
      edgeMaterial.opacity = 0.2 * breathOpacity;

      // Update particles
      const particlePosArray = particleGeometry.attributes.position.array as Float32Array;
      particles.forEach((p, i) => {
        p.position.add(p.velocity);
        p.life += 0.016;

        // Reset if life exceeded
        if (p.life > p.maxLife) {
          const angle = Math.random() * Math.PI * 2;
          const radius = 1.5 + Math.random() * 3;
          p.position.set(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius,
            (Math.random() - 0.5) * 2
          );
          p.life = 0;
          p.velocity.set(
            (Math.random() - 0.5) * 0.003,
            (Math.random() - 0.5) * 0.003,
            (Math.random() - 0.5) * 0.002
          );
        }

        // Apply group rotation to particles too
        const rotatedX = p.position.x * Math.cos(groupRotation * 0.5) - p.position.y * Math.sin(groupRotation * 0.5);
        const rotatedY = p.position.x * Math.sin(groupRotation * 0.5) + p.position.y * Math.cos(groupRotation * 0.5);

        particlePosArray[i * 3] = rotatedX;
        particlePosArray[i * 3 + 1] = rotatedY;
        particlePosArray[i * 3 + 2] = p.position.z;
      });
      particleGeometry.attributes.position.needsUpdate = true;
      particleMaterial.opacity = 0.4 * breathOpacity;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      // Cleanup Three.js resources
      hexGeometry.dispose();
      edgeGeometry.dispose();
      glowGeometry.dispose();
      particleGeometry.dispose();
      hexMaterials.forEach((m) => m.dispose());
      edgeMaterial.dispose();
      glowMaterial.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        background: '#050505',
        overflow: 'hidden',
      }}
    />
  );
}
