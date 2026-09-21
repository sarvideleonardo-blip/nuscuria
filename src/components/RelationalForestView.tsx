import { useState, useRef, useEffect, type MouseEvent, type FormEvent } from 'react';
import { RelationalNode, RelationalEdge, CharacterEntity } from '../types';
import { 
  RELATIONAL_FOREST_NODES, 
  RELATIONAL_FOREST_EDGES, 
  CANONICAL_CHARACTERS 
} from '../data/canonicalData';
import { GitFork, Plus, Info, Sparkles, Heart, Trees, Compass } from 'lucide-react';

interface RelationalForestViewProps {
  onSpawnOrganismFromNode?: (nodeLabel: string) => void;
}

export default function RelationalForestView({ onSpawnOrganismFromNode }: RelationalForestViewProps) {
  const [nodes, setNodes] = useState<RelationalNode[]>(() => {
    // Distribute nodes in a gentle circular / organic layout
    const width = 800;
    const height = 540;
    const centerX = width / 2;
    const centerY = height / 2;

    return RELATIONAL_FOREST_NODES.map((node, i) => {
      if (node.id === 'renata') {
        return { ...node, x: centerX, y: centerY, vx: 0, vy: 0 };
      }
      const angle = (i / (RELATIONAL_FOREST_NODES.length - 1)) * 2 * Math.PI;
      const radius = 140 + ((i * 37) % 110);
      return {
        ...node,
        x: centerX + Math.cos(angle) * radius,
        y: centerY + Math.sin(angle) * radius,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4
      };
    });
  });

  const [edges, setEdges] = useState<RelationalEdge[]>(RELATIONAL_FOREST_EDGES);
  const [selectedNodeId, setSelectedNodeId] = useState<string>('renata');
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [newNodeLabel, setNewNodeLabel] = useState('');
  const [newTargetNode, setNewTargetNode] = useState('renata');
  const [newEdgeRelation, setNewEdgeRelation] = useState('simbiosis');

  const svgRef = useRef<SVGSVGElement | null>(null);

  // Selected node entity details
  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  const selectedCharacter = CANONICAL_CHARACTERS.find(c => c.id === selectedNodeId);

  // Connected edges to selected node
  const connectedEdges = edges.filter(
    e => e.source === selectedNodeId || e.target === selectedNodeId
  );

  // Handle Dragging
  const handleMouseDown = (nodeId: string, e: MouseEvent) => {
    e.stopPropagation();
    setSelectedNodeId(nodeId);
    setDraggingNodeId(nodeId);

    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      const node = nodes.find(n => n.id === nodeId);
      if (node && node.x !== undefined && node.y !== undefined) {
        setDragOffset({
          x: (e.clientX - rect.left) * (800 / rect.width) - node.x,
          y: (e.clientY - rect.top) * (540 / rect.height) - node.y
        });
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!draggingNodeId || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const currentX = (e.clientX - rect.left) * (800 / rect.width) - dragOffset.x;
    const currentY = (e.clientY - rect.top) * (540 / rect.height) - dragOffset.y;

    setNodes(prev => prev.map(n => {
      if (n.id === draggingNodeId) {
        return {
          ...n,
          x: Math.max(30, Math.min(770, currentX)),
          y: Math.max(30, Math.min(510, currentY))
        };
      }
      return n;
    }));
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  // Add a new relation node to the forest
  const handleAddRelation = (e: FormEvent) => {
    e.preventDefault();
    if (!newNodeLabel.trim()) return;

    const newId = `custom-${Date.now()}`;
    const target = nodes.find(n => n.id === newTargetNode);
    const targetX = target?.x || 400;
    const targetY = target?.y || 270;

    const angle = Math.random() * 2 * Math.PI;
    const dist = 80 + Math.random() * 50;

    const newNode: RelationalNode = {
      id: newId,
      label: newNodeLabel.trim(),
      type: 'concept',
      x: Math.max(40, Math.min(760, targetX + Math.cos(angle) * dist)),
      y: Math.max(40, Math.min(500, targetY + Math.sin(angle) * dist)),
      color: '#f59e0b',
      size: 22
    };

    const newEdge: RelationalEdge = {
      source: newTargetNode,
      target: newId,
      label: newEdgeRelation.trim() || 'vínculo',
      strength: 0.8
    };

    setNodes(prev => [...prev, newNode]);
    setEdges(prev => [...prev, newEdge]);
    setSelectedNodeId(newId);
    setNewNodeLabel('');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header Banner */}
      <div className="bg-[#11131a] border border-[#232938] rounded-2xl p-5 md:p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono-code text-[#c99e42] uppercase tracking-wider px-2 py-0.5 rounded bg-[#272115] border border-[#785b24]/40">
              Sección III
            </span>
            <h2 className="font-cinzel text-xl md:text-2xl font-bold tracking-wide text-[#f1f5f9]">
              El Bosque de Relaciones
            </h2>
          </div>
          <p className="text-sm text-[#94a3b8] font-garamond max-w-2xl leading-relaxed">
            «No almacenar palabras. Sino almacenar relaciones. Y entonces la biblioteca deja de parecer una base de datos: empieza a parecer un bosque.»
          </p>
        </div>

        {/* Canonical Tree formula badge */}
        <div className="p-2.5 rounded-xl bg-[#090b10] border border-[#262e3f] text-xs font-mono-code text-[#7dd3fc]">
          <span className="text-[#94a3b8] block text-[10px] uppercase">Rizoma Canónico:</span>
          Renata ── Ratnah ── pan ── ternura ── carbón que respira...
        </div>
      </div>

      {/* Main Forest Workspace: Graph + Relational Tree Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Interactive Canvas/SVG Graph */}
        <div className="lg:col-span-8 bg-[#0a0c10] border border-[#232938] rounded-2xl p-4 shadow-2xl relative overflow-hidden">
          
          <div className="absolute top-4 left-4 z-10 text-[11px] font-mono-code text-[#64748b] bg-[#11131a]/80 px-2.5 py-1 rounded-md border border-[#1e2434] backdrop-blur-sm">
            ✦ Arrastra los nodos · Haz clic para enfocar su red
          </div>

          <svg
            ref={svgRef}
            viewBox="0 0 800 540"
            className="w-full h-[520px] select-none cursor-grab active:cursor-grabbing overflow-visible"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
          >
            <defs>
              {/* Radial gradient glow for background forest */}
              <radialGradient id="forest-core-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#0a0c10" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Ambient Background Aura */}
            <circle cx="400" cy="270" r="320" fill="url(#forest-core-glow)" />

            {/* Relational Edges / Mycelium Hyphae */}
            <g className="transition-all duration-300">
              {edges.map((edge, idx) => {
                const src = nodes.find(n => n.id === edge.source);
                const tgt = nodes.find(n => n.id === edge.target);
                if (!src || !tgt || src.x === undefined || src.y === undefined || tgt.x === undefined || tgt.y === undefined) return null;

                const isConnected = edge.source === selectedNodeId || edge.target === selectedNodeId;
                const midX = (src.x + tgt.x) / 2;
                const midY = (src.y + tgt.y) / 2;

                return (
                  <g key={`edge-${idx}`}>
                    <line
                      x1={src.x}
                      y1={src.y}
                      x2={tgt.x}
                      y2={tgt.y}
                      stroke={isConnected ? '#38bdf8' : '#222d42'}
                      strokeWidth={isConnected ? 2.2 : 1.2}
                      strokeDasharray={isConnected ? 'none' : '3 3'}
                      strokeOpacity={isConnected ? 0.9 : 0.45}
                      className="transition-all duration-300"
                    />
                    {isConnected && (
                      <text
                        x={midX}
                        y={midY - 4}
                        fill="#94a3b8"
                        fontSize="10"
                        fontFamily="JetBrains Mono"
                        textAnchor="middle"
                        className="bg-black px-1 pointer-events-none"
                      >
                        {edge.label}
                      </text>
                    )}
                  </g>
                );
              })}
            </g>

            {/* Relational Nodes (Renata, Ratnah, pan, etc.) */}
            <g>
              {nodes.map((node) => {
                const isSelected = node.id === selectedNodeId;
                const radius = node.size || 24;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${node.x}, ${node.y})`}
                    onMouseDown={(e) => handleMouseDown(node.id, e)}
                    className="cursor-pointer transition-transform duration-100 hover:scale-110"
                  >
                    {/* Concentric pulsation aura for selected */}
                    {isSelected && (
                      <circle
                        r={radius + 10}
                        fill="none"
                        stroke={node.color || '#38bdf8'}
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        className="animate-spin origin-center"
                        style={{ animationDuration: '8s' }}
                      />
                    )}

                    {/* Node base body */}
                    <circle
                      r={radius}
                      fill={node.color || '#38bdf8'}
                      fillOpacity={isSelected ? 0.95 : 0.75}
                      stroke={isSelected ? '#ffffff' : '#1e2434'}
                      strokeWidth={isSelected ? 2.5 : 1.5}
                      className="filter drop-shadow-md"
                    />

                    {/* Node Core Glyph or Letter */}
                    <text
                      y="4"
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={radius > 28 ? '13' : '11'}
                      fontFamily="Cinzel"
                      fontWeight="bold"
                      className="pointer-events-none select-none"
                    >
                      {node.label.charAt(0)}
                    </text>

                    {/* Node Label Below */}
                    <text
                      y={radius + 16}
                      textAnchor="middle"
                      fill={isSelected ? '#f8fafc' : '#94a3b8'}
                      fontSize="11"
                      fontFamily="JetBrains Mono"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      className="pointer-events-none select-none drop-shadow"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Right Column: Node Details + Tree Explorer + Add Relation */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Selected Node Specimen card */}
          <div className="bg-[#11131a] border border-[#232938] rounded-2xl p-5 shadow-xl space-y-4">
            
            <div className="border-b border-[#232938] pb-3">
              <span className="text-[10px] font-mono-code text-[#c99e42] tracking-widest uppercase block">
                Nódulo Relacional Seleccionado
              </span>
              <h3 className="font-cinzel text-2xl font-bold text-[#f8fafc] mt-0.5">
                {selectedNode?.label}
              </h3>
              <p className="text-xs text-[#94a3b8] font-mono-code uppercase mt-0.5">
                Categoría: {selectedNode?.type}
              </p>
            </div>

            {/* If it corresponds to a canonical character */}
            {selectedCharacter ? (
              <div className="space-y-3">
                <div className="text-xs text-[#c99e42] font-cinzel font-semibold">
                  {selectedCharacter.epithet}
                </div>
                <p className="text-xs text-[#cbd5e1] font-garamond italic leading-relaxed">
                  {selectedCharacter.description}
                </p>

                {/* Associated Organs */}
                <div>
                  <span className="text-[11px] font-mono-code text-[#38bdf8] uppercase block mb-1">
                    Órganos Simbióticos:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {selectedCharacter.associatedOrgans.map(org => (
                      <span key={org} className="text-[11px] font-mono-code px-2 py-0.5 rounded bg-[#182030] text-[#cbd5e1] border border-[#2b354c]">
                        {org}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Memories */}
                <div>
                  <span className="text-[11px] font-mono-code text-[#a855f7] uppercase block mb-1">
                    Recuerdos Raigales:
                  </span>
                  <ul className="text-xs text-[#cbd5e1] space-y-1 font-garamond">
                    {selectedCharacter.memories.map((mem, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#a855f7]">✦</span>
                        <span>{mem}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-xs text-[#cbd5e1] font-garamond italic">
                  Elemento de la ecología poética de Nuscuria. Se entrelaza en el micelio afectivo sosteniendo la respiración colectiva del bosque.
                </p>
              </div>
            )}

            {/* Tree Branch Manifest for this node (like Renata's tree in the prompt) */}
            <div className="p-3.5 bg-[#090b10] rounded-xl border border-[#202737] space-y-2">
              <span className="text-[11px] font-mono-code text-[#7dd3fc] uppercase tracking-wider block">
                Ramificaciones Activas ({connectedEdges.length}):
              </span>
              <div className="space-y-1.5 font-mono-code text-xs">
                {connectedEdges.map((e, idx) => {
                  const otherId = e.source === selectedNodeId ? e.target : e.source;
                  const otherNode = nodes.find(n => n.id === otherId);
                  return (
                    <div key={idx} className="flex items-center justify-between text-[#cbd5e1] hover:text-[#38bdf8] transition-colors">
                      <span className="flex items-center gap-1.5">
                        <span className="text-[#64748b]">├──</span>
                        <span>{otherNode?.label}</span>
                      </span>
                      <span className="text-[10px] text-[#64748b] italic font-garamond">
                        ({e.label})
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action to translate this concept into an organism */}
            {onSpawnOrganismFromNode && (
              <button
                onClick={() => onSpawnOrganismFromNode(selectedNode?.label || '')}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-[#1d2433] hover:bg-[#283247] text-[#38bdf8] text-xs font-mono-code border border-[#313e59] transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Engendrar Organismo de «{selectedNode?.label}»</span>
              </button>
            )}
          </div>

          {/* Sower: Add new node/relation to forest */}
          <form onSubmit={handleAddRelation} className="bg-[#11131a] border border-[#232938] rounded-2xl p-4 shadow-xl space-y-3 text-xs">
            <span className="font-cinzel text-xs text-[#d4af37] tracking-wider uppercase block">
              Plantar Nueva Relación en el Bosque
            </span>

            <div>
              <label className="text-[10px] font-mono-code text-[#8f96a3] block mb-1">
                Nuevo Concepto o Nombre:
              </label>
              <input
                type="text"
                value={newNodeLabel}
                onChange={(e) => setNewNodeLabel(e.target.value)}
                placeholder="ej. Memoria, Silencio, Río..."
                className="w-full px-3 py-2 bg-[#090b10] border border-[#283042] rounded-lg text-[#f1f5f9] focus:outline-none focus:border-[#c99e42] font-garamond"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-[10px] font-mono-code text-[#8f96a3] block mb-1">
                  Enlazar con:
                </label>
                <select
                  value={newTargetNode}
                  onChange={(e) => setNewTargetNode(e.target.value)}
                  className="w-full px-2 py-1.5 bg-[#090b10] border border-[#283042] rounded-lg text-[#cbd5e1] font-mono-code text-xs focus:outline-none focus:border-[#c99e42]"
                >
                  {nodes.map(n => (
                    <option key={n.id} value={n.id}>{n.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono-code text-[#8f96a3] block mb-1">
                  Tipo de Vínculo:
                </label>
                <input
                  type="text"
                  value={newEdgeRelation}
                  onChange={(e) => setNewEdgeRelation(e.target.value)}
                  placeholder="ej. alianza, umbral..."
                  className="w-full px-2 py-1.5 bg-[#090b10] border border-[#283042] rounded-lg text-[#f1f5f9] font-mono-code text-xs focus:outline-none focus:border-[#c99e42]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!newNodeLabel.trim()}
              className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#242b3b] hover:bg-[#333e54] text-[#f8fafc] font-cinzel text-xs font-bold transition-all disabled:opacity-40"
            >
              <Plus className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Sembrar en el Micelio</span>
            </button>
          </form>

        </div>

      </div>
    </div>
  );
}
