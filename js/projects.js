window.PROJECTS = [
  {
    slug: 'usdugc',
    title: 'UGC Auto-Rigging with OpenUSD',
    href: '/work/usdugc/',
    image: 'images/ugcusd/rep.png',
    tags: ['Avatar', 'Cloud', 'Pipeline', 'Procedural'],
    summary: 'A SIGGRAPH talk on using OpenUSD to build a scalable auto-rigging pipeline for user-generated avatar content with procedural workflows, schemas, and task-graph-driven execution.',
    search: ['auto rigging', 'usd', 'openusd', 'avatars', 'pipeline tooling']
  },
  {
    slug: 'metadrobe',
    title: 'Metadrobe (Virtual Fashion)',
    href: '/work/metadrobe',
    image: 'images/metadrobe.png',
    tags: ['Digital Twin', 'Clo3D', 'Houdini', 'Omniverse'],
    summary: 'A virtual fashion venture concept that combines mobile avatar scanning, Clo3D garments, procedural fitting and simulation in Houdini, and OpenUSD export for real-time rendering in Omniverse.',
    search: ['virtual fashion', 'digital humans', '3d garments']
  },
  {
    slug: 'deephouse',
    title: 'Interactive Dance Projection',
    href: '/work/deephouse',
    image: 'images/deephouse.png',
    tags: ['TouchDesigner', 'ZEDm', 'Projection', 'Procedural'],
    summary: 'An audio- and motion-reactive dance projection built in TouchDesigner, using ZED Mini depth sensing and procedural visuals designed around Deep House music.',
    search: ['interactive installation', 'dance', 'projection mapping', 'performance']
  },
  {
    slug: 'wiggly',
    title: 'Wiggly: Animating Deformable Objects',
    href: '/work/wiggly',
    image: 'images/wiggly.png',
    tags: ['Houdini', 'Compute', 'Workflow'],
    summary: 'A Houdini toolkit based on sparse spacetime constraints for generating natural oscillatory motion in deformable objects, with the core algorithm implemented in C++ and wrapped in a procedural workflow.',
    search: ['deformation', 'animation', 'tool development', 'procedural workflow']
  },
  {
    slug: 'neondodge',
    title: 'Neon Dodge (Game)',
    href: '/work/neondodge/',
    image: 'images/neondodge.png',
    tags: ['Unity', 'VR', 'Game Design', 'Multiplayer'],
    summary: 'A VR multiplayer dodgeball game built in Unity with OpenXR, UltimateXR for avatars and IK, and Mirror Networking for online play.',
    search: ['game', 'virtual reality', 'arcade', 'multiplayer gameplay']
  },
  {
    slug: 'crowdsim',
    title: 'Real-Time Crowd Simulation',
    href: '/work/crowdsim',
    image: 'https://raw.githubusercontent.com/wayne-wu/webgpu-crowd-simulation/main/img/teaser.png',
    tags: ['WebGPU', 'Compute', 'Render'],
    summary: 'A real-time crowd simulation in WebGPU based on position-based dynamics, built to explore a modern graphics API and bring dense crowd simulation to the web.',
    search: ['crowd simulation', 'gpu programming', 'real time graphics']
  },
  {
    slug: 'lumos',
    title: 'Lumos (Game)',
    href: '/work/lumos/',
    image: 'images/lumos.png',
    tags: ['Unreal', 'Game Design', '3D', 'Multiplayer'],
    summary: 'A cooperative 3D RPG in Unreal Engine 5 where one player fights enemies and the other manages lighting, built for online multiplayer play.',
    search: ['game', 'unreal engine', 'co-op', 'multiplayer']
  },
  {
    slug: 'shallowwater',
    title: 'Real-time Shallow Water',
    href: '/work/shallowwater',
    image: 'images/shallow-water.png',
    tags: ['WebGPU', 'Compute', 'Render'],
    summary: 'A WebGPU port of an earlier WebGL water simulation that solves 2D wave equations with compute shaders and renders the result with ray marching and light-traced caustics.',
    search: ['fluid simulation', 'water', 'real time rendering']
  },
  {
    slug: 'lsystems',
    title: 'Interactive L-Systems',
    href: '/work/lsystems',
    image: 'images/lsystems.png',
    tags: ['TouchDesigner', 'LeapMotion', 'Procedural'],
    summary: 'An interactive TouchDesigner plant system where Leap Motion gestures control L-system growth and blooming, optimized with geometry instancing for performance.',
    search: ['generative art', 'plants', 'interactive installation']
  },
  {
    slug: 'landscape',
    title: 'Real-time Procedural Landscape',
    href: '/work/landscape/',
    image: 'images/terrainglobe.jpg',
    tags: ['WebGL', 'Procedural', '3D', 'Render'],
    summary: 'A procedural WebGL landscape globe rendered with SDFs and ray marching, using FBM terrain and clouds, refraction, soft shadows, and atmospheric fog.',
    search: ['terrain', 'planet', 'graphics programming']
  },
  {
    slug: 'infinitycorridor',
    title: 'Infinity Corridor (Game)',
    href: '/work/infinitycorridor/',
    image: 'images/infinitycorridor.png',
    tags: ['Unity', 'Game Design', '3D', 'Mobile'],
    summary: 'A Unity endless runner inspired by Demon Slayer\'s Infinity Castle, featuring obstacle dodging, gravity manipulation, and a procedurally generated environment.',
    search: ['mobile game', 'level design', 'gameplay']
  },
  {
    slug: 'musicviz',
    title: 'Real-time Music Visualizer',
    href: '/work/musicviz/',
    image: 'images/musicviz.png',
    tags: ['WebGL', 'Procedural', '3D', 'Audio'],
    summary: 'A neon-themed WebGL music visualizer that deforms FBM-driven spheres and uses WebAudio spectrum data plus bloom post-processing for audio-reactive motion and glow.',
    search: ['music visualization', 'audio reactive', 'graphics']
  },
  {
    slug: 'nerf',
    title: 'Neural Radiance Field',
    href: '/work/nerf/',
    image: 'images/nerf.png',
    tags: ['PyTorch', 'Computer Vision', 'ML'],
    summary: 'An implementation of NeRF in PyTorch Lightning covering the core network, volume renderer, positional encoding, and hierarchical sampling for view synthesis and scene reconstruction.',
    search: ['machine learning', 'neural rendering', 'radiance fields']
  },
  {
    slug: 'grass',
    title: 'Real-Time Vulkan Grass Rendering',
    href: '/work/grass',
    image: 'https://raw.githubusercontent.com/wayne-wu/vulkan-grass-rendering/master/img/cullingtestscene.png',
    tags: ['Vulkan', 'Compute', 'Render'],
    summary: 'A Vulkan project based on responsive real-time grass rendering, using compute shaders for wind and gravity dynamics, tessellation for geometry generation, and culling for dense scenes.',
    search: ['gpu culling', 'real time rendering', 'graphics']
  },
  {
    slug: 'pathtracer',
    title: 'GPU Path Tracer and Denoiser',
    href: '/work/pathtracer',
    image: 'https://raw.githubusercontent.com/wayne-wu/cuda-path-tracer/main/img/sponza.png',
    tags: ['CUDA', 'Render', 'glTF'],
    summary: 'A CUDA path tracer and denoiser that supports glTF assets, metallic-roughness PBR materials, textures, and A-Trous filtering for global illumination rendering.',
    search: ['ray tracing', 'denoising', 'global illumination']
  },
  {
    slug: 'td',
    title: 'Interactive Art Sketchbook',
    href: '/work/td',
    image: 'images/td_waterbending.png',
    tags: ['TouchDesigner', 'LeapMotion', 'Compute'],
    summary: 'A collection of TouchDesigner experiments exploring interactive and generative art, including GPU boids and gesture-driven fluid interactions.',
    search: ['interactive art', 'sketchbook', 'installations']
  },
  {
    slug: 'blockusd',
    title: 'Procedural Block-based USD Workflows',
    href: '/work/blockusd',
    image: 'images/blockusd/applepile.jpg',
    tags: ['Houdini', 'USD', 'Design'],
    summary: 'A SIGGRAPH paper on a block-based procedural USD workflow in Houdini that lowers the barrier to USD adoption while preserving the power of native USD concepts.',
    search: ['usd workflows', 'procedural modeling', 'pipeline']
  },
  {
    slug: 'conduit',
    title: 'Conduit in Houdini',
    href: '/work/conduit',
    image: 'images/conduit.png',
    tags: ['Houdini', 'Pipeline', 'Design'],
    summary: 'A Houdini integration of Blue Sky\'s Conduit asset management system, establishing a production-ready framework built on USD, Solaris, and PDG.',
    search: ['tooling', 'pipeline design', 'workflow']
  },
  {
    slug: 'lostsenses',
    title: 'Lost Senses (Game)',
    href: '/work/lostsenses',
    image: 'images/lostsenses/teaser.png',
    tags: ['Unity', '3D', 'Game Design'],
    summary: 'A 48-hour Global Game Jam thriller escape-room game where the player regains lost senses, solves puzzles, and navigates a tense hospital environment.',
    search: ['game', 'environment art', 'gameplay']
  },
  {
    slug: 'rbd',
    title: 'Material-based Fracturing',
    href: '/work/rbd',
    image: 'images/housefracture.jpg',
    tags: ['Houdini', 'Workflow', 'Design'],
    summary: 'A Houdini destruction toolkit for prefracturing concrete, glass, and wood, redesigning the pre-simulation workflow for better performance, art direction, and usability.',
    search: ['destruction', 'fracturing', 'rbd', 'tool development']
  },
  {
    slug: 'facialrig',
    title: 'Advanced Facial Auto Rigging',
    href: '/work/facialrig',
    image: 'images/facialrig/cages-small.png',
    tags: ['Houdini', 'Workflow', 'Design'],
    summary: 'A FACS-based facial auto-rigging system for Houdini that uses a low-poly cage and attached patches to automate full-face rigging and transfer animation across characters.',
    search: ['face rigging', 'facs', 'character pipeline']
  },
  {
    slug: 'sketchbook',
    title: 'OpenGL Sketchbook',
    href: '/work/sketchbook',
    image: 'images/doodle.png',
    tags: ['OpenGL', 'Render', 'C++'],
    summary: 'A collection of OpenGL and WebGL studies exploring drawing, rendering, and experimentation across 2D artwork, ray tracing, and procedural scenes.',
    search: ['graphics programming', 'rendering experiments', 'c plus plus']
  },
  {
    slug: 'charactergui',
    title: 'Character Picker/GUI',
    href: '/work/charactergui',
    image: 'images/charactergui2.png',
    tags: ['Blender', 'Workflow', 'Design'],
    summary: 'A Blender addon for building character picker GUIs without native extensions, designed to be templateable, dependency-free, and familiar to animators in production.',
    search: ['addon', 'animation tools', 'pipeline']
  },
  {
    slug: 'blackstrider',
    title: 'Black Strider (Game)',
    href: '/work/blackstrider',
    image: 'images/black-strider.jpg',
    tags: ['Unity', '2D', 'Game Design'],
    summary: 'A 2D infinite runner in Unity built with open-source assets, state-machine-driven gameplay logic, and simple 2D navigation for enemy robots.',
    search: ['2d game', 'platformer', 'gameplay']
  }
];
