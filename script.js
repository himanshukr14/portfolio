// Start on Moving Images by default
window.addEventListener('DOMContentLoaded', () => applyFilter('MOV'));

const GRID_CATS = new Set(['3D', 'PHOTO', 'ANALOG', 'ILLUSTRATION']);
const GRID_CAT_ORDER = ['3D', 'PHOTO', 'ANALOG', 'ILLUSTRATION', 'ABOUT', 'MOV'];

const catNavLabel = {
  '3D': '3D', 'PHOTO': 'Photography', 'ANALOG': 'Analog', 'ILLUSTRATION': 'Illustration',
  'ABOUT': 'About', 'MOV': 'Moving Images'
};

const gridMeta = {
  '3D':           { label: '3D Modelling & Rendering' },
  'PHOTO':        { label: 'Photography' },
  'ANALOG':       { label: 'Analog' },
  'ILLUSTRATION': { label: 'Illustration' },
};

// ── ADD YOUR IMAGES OR VIDEOS HERE — this is the only section you ever edit ──
// Supports: .jpg .jpeg .png .gif .webp .mp4 .mov .webm
const gridImages = {
  '3D': [
    'images/0001-0120.mp4','images/Copy of I_Vaibhav_01.mp4','images/Copy of F_Vaibhav_02.mp4','images/Copy of Chapter 3 final.png','images/Near river.png','images/Screenshot 2026-05-17 at 1.07.27 PM.png','images/Screenshot 2026-05-17 at 2.22.23 PM.png','images/Screenshot 2026-05-17 at 2.18.45 PM.png','images/Screenshot 2026-05-17 at 1.11.25 PM.png','images/Screenshot 2026-05-17 at 1.10.55 PM.png','images/Screenshot 2026-05-17 at 1.07.27 PM.png','images/Screenshot 2026-05-17 at 7.44.01 PM.png','images/Screenshot 2026-05-17 at 7.42.45 PM.png','images/Screenshot 2026-05-17 at 7.47.46 PM.png','images/Copy of E_Vaibhav_02.jpg'
    // 'images/another-3d.jpg',
    // 'images/my-animation.mp4',
  ],
  'PHOTO': [
    'images/Copy of DSC01731-2.jpg','images/Copy of DSC01778.jpg','images/Copy of DSC01835.jpg','images/Copy of DSC01857.jpg','images/Copy of DSC04537.jpg','images/Copy of DSC04566.jpg','images/Copy of DSC04679.jpg','images/Copy of DSC04734.jpg','images/Copy of DSC04838.JPG','images/Copy of DSC04847.JPG','images/Copy of DSC04851.JPG','images/Copy of DSC04966.JPG'
  ],
  'ANALOG': [
    'images/Copy of 1.jpg','images/Copy of 2.jpg','images/Copy of 3.jpg','images/Copy of 4.jpg','images/Copy of 5.jpg','images/Copy of 6.jpg','images/Copy of 7.jpg','images/Copy of 8.jpg','images/Copy of 9.jpg','images/Copy of 10.jpg','images/Copy of 11.jpg','images/Copy of 12.jpg','images/Copy of 13.jpg','images/Copy of 14.jpg','images/Copy of 15.jpg'
  ],
  'ILLUSTRATION': [
    'images/extra 1_10.jpg','images/extra.jpg','images/figure in circle (2).jpg','images/IMG_20230414_152507.jpg','images/IMG_20230722_173109_106.jpg','images/IMG_20230722_173317_528.jpg','images/IMG_20230730_155629_833.jpg','images/IMG_20230807_155253.jpg','images/IMG_20230810_210046.jpg','images/IMG_20230813_145611.jpg','images/IMG_20231229_183944_1(1).jpg','images/IMG_20231231_235110_652.webp','images/IMG_20240307_001644.jpg','images/IMG_20240310_211200.jpg','images/IMG_20240310_211217.jpg'
  ],
};

// ── HELPER: detect video files ──
function isVideo(src) {
  return /\.(mp4|mov|webm)(\?.*)?$/i.test(src);
}

// ── NAV & VIEW FUNCTIONS ──

function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
  document.getElementById('hamburger').classList.toggle('open');
}

function closeMobileMenu() {
  document.getElementById('mobile-menu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
}

function showHome() {
  document.getElementById('detail-view').style.display = 'none';
  document.getElementById('about-view').style.display  = 'none';
  document.getElementById('grid-view').style.display   = 'none';
  document.getElementById('home-view').style.display   = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function applyFilter(cat) {
  const titles = {
    'MOV': 'Moving Images', '3D': '3D Modelling & Rendering',
    'PHOTO': 'Photography', 'ANALOG': 'Analog',
    'ILLUSTRATION': 'Illustration', 'all': 'All Works'
  };
  const labelEl = document.querySelector('#home-view .section-label');
  if (labelEl && titles[cat]) labelEl.textContent = titles[cat];
  document.querySelectorAll('.project-card').forEach(card => {
    card.classList.toggle('hidden', cat !== 'all' && card.dataset.cat !== cat);
  });
}

function showAbout() {
  document.getElementById('home-view').style.display   = 'none';
  document.getElementById('detail-view').style.display = 'none';
  document.getElementById('grid-view').style.display   = 'none';
  document.getElementById('about-view').style.display  = 'block';
  document.querySelectorAll('.nav-cats button, .mobile-menu button').forEach(b => b.classList.remove('active'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderGrid(cat) {
  const meta  = gridMeta[cat] || {};
  const items = gridImages[cat] || [];

  document.getElementById('grid-section-label').textContent = meta.label || cat;

  const grid = document.getElementById('insta-grid');
  grid.innerHTML = '';

  if (items.length === 0) {
    grid.innerHTML = '<div style="grid-column:1/-1;padding:48px;text-align:center;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#9A9488;">No images yet</div>';
  } else {
    items.forEach(src => {
      const cell = document.createElement('div');
      cell.className = 'insta-cell';
      cell.style.cursor = 'default';

      if (isVideo(src)) {
        // ── VIDEO cell ──
        const video = document.createElement('video');
        video.src = src;
        video.autoplay = true;
        video.muted = true;
        video.loop = true;
        video.playsInline = true;
        video.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;';
        cell.appendChild(video);
      } else {
        // ── IMAGE cell ──
        const img = document.createElement('img');
        img.src = src;
        img.alt = '';
        cell.appendChild(img);
      }

      grid.appendChild(cell);
    });
  }

  const currentIdx = GRID_CAT_ORDER.indexOf(cat);
  const nextCat    = GRID_CAT_ORDER[(currentIdx + 1) % GRID_CAT_ORDER.length];
  const nextLabel  = nextCat === 'ABOUT' ? 'About' : (gridMeta[nextCat]?.label || catNavLabel[nextCat]);
  document.getElementById('grid-next-title').textContent = nextLabel;
  document.getElementById('grid-next').onclick = () => {
    if (nextCat === 'ABOUT') {
      showAbout();
    } else if (nextCat === 'MOV') {
      const activeBtn = [...document.querySelectorAll('.nav-cats button')]
        .find(b => b.textContent.trim() === 'Moving Images');
      filterCat('MOV', activeBtn || null);
    } else {
      const activeBtn = [...document.querySelectorAll('.nav-cats button, .mobile-menu button')]
        .find(b => b.textContent.trim() === catNavLabel[nextCat]);
      filterCat(nextCat, activeBtn || null);
    }
  };
}

function filterCat(cat, el, fromMobile) {
  document.getElementById('detail-view').style.display = 'none';
  document.getElementById('about-view').style.display  = 'none';
  document.querySelectorAll('.nav-cats button, .mobile-menu button').forEach(b => b.classList.remove('active'));
  if (el) el.classList.add('active');

  if (GRID_CATS.has(cat)) {
    document.getElementById('home-view').style.display = 'none';
    document.getElementById('grid-view').style.display = 'block';
    renderGrid(cat);
  } else {
    document.getElementById('grid-view').style.display = 'none';
    document.getElementById('home-view').style.display = 'block';
    applyFilter(cat);
  }

  if (fromMobile) closeMobileMenu();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── MOVING IMAGES PROJECT DATA ──
const projectsData = [
  {
    title: "Animation Workshop",
    tag: "Animation · Workshop",
    desc: "Frame-by-frame and motion-based animation workshop exercises.",
    writeup: "<p>A collection of individual animation test frameworks focusing on traditional frame-by-frame pacing mechanics, volume control, and keyframe motion studies.</p>",
    img: "images/project-07.jpg",
    driveLink: "https://drive.google.com/your-link",
    stills: ["images/project-07.jpg"]
  },
  {
    title: "A way back home",
    tag: "Moving Image · Sequential Art",
    desc: "A way back home",
    writeup: "<p>An exploration of illustrated storytelling blending a character from actuality and creating the story based on the observation of the character. The story revolves around a person's escape from his accidental journey that takes him away from his everyday repetitive life.</p>",
    img: "images/Comic 1.png",
    driveLink: "https://drive.google.com/your-link",
    stills: ["images/Comic 1.png","images/Comic 2.png","images/Comic 3.png","images/Comic 4.png"]
  },
  {
    title: "Spatial Mythification",
    tag: "Documentary · Individual Project",
    desc: "These structures are manifestations of human emotion, machines with no minds of their own, yet they possess the qualities that respond to the mind, machines carved with myths to create one of their own.",
    writeup: `<p>A documentary focusing mainly on space/architecture, trying to understand the fog of myth that surrounds such well-planned space with the help of history, conversations and observations. The film will also try to understand their relevance in contemporary times while drawing meaning by comparing these old spaces and myths with those of the new.</p><p>Using the book and concept of mythification by French philosopher Roland Barthes as a base, the film will try to expand the understanding and impact of space/architecture. It will also shine light on how a space can unconsciously affect the culture and masses and sometimes be used to create what Marx explains as 'false consciousness'. The film will also explore the physical manifestation of myths and draw conclusions by comparing ancient space/architecture and their myths with contemporary ones.</p>`,
    img: "images/Documentary.jpg",
    driveLink: "https://drive.google.com/drive/folders/168nmbZ-KCu89Ufe91WlSMB2S2kC8jaBR?usp=share_link",
    stills: ["images/Documentary.jpg","images/Copy of DSC01361.jpg","images/Copy of DSC01375.jpg","images/Copy of DSC01404.jpg"]
  },
  {
    title: "Doors",
    tag: "Moving Image · Experimental",
    desc: "A visual experimental exploration of moral impurity.",
    writeup: "<p>An experimental exploration of the idea of corruption of the human soul as it leads the being to its end. The exploration revolves around a dollmaker and the doll that embarks on a journey lead by greed and corruption that gradually guides the doll to its demise.</p>",
    img: "images/Doors.png",
    driveLink: "https://drive.google.com/your-link",
    stills: ["images/Doors.png","images/doors1.png","images/doors2.png","images/doors3.png"]
  },
  {
    title: "Fiction (WIP)",
    tag: "Fiction · WIP",
    desc: "Work-in-progress fiction short — script, storyboard and early production notes.",
    writeup: "<p>A systematic operational look into an upcoming narrative structure—tracking core screenplay revisions, conceptual character blueprints, and scene block boards.</p>",
    img: "images/project-01.jpg",
    driveLink: "https://drive.google.com/your-link",
    stills: ["images/project-01.jpg"]
  },
  {
    title: "Water — Reservoir of Memories",
    tag: "Animation · KHM Collaboration",
    desc: "Experimental animation in collaboration with KHM and Anant Nalya.",
    writeup: "<p>An international collaborative moving-image framework visualizing liquid metrics, time-lapse properties, and soundscape integrations.</p>",
    img: "images/Water the reservoir of memories.png",
    driveLink: "https://drive.google.com/drive/folders/1aHJE9EIzAe55lqPy9nMKuuA-HNoCcEUD?usp=share_link",
    stills: ["images/Screenshot 2025-11-01 031502.png","images/Screenshot 2026-05-13 023946.png","images/Team01 Water.mp4"]
  },
  {
    title: "A Quiet Escape — Production Design",
    tag: "Fiction · Group Project",
    desc: "Production designer on a paranoia thriller — set dressing and spatial design.",
    writeup: "<p>The film revolves around a girl and her paranoia as she suspects someone is breaking into her home every day while she is away. In this group project i played the role of production designer under the guidance of Iggy from oddfishspaces.</p>",
    img: "images/Production design.png",
    driveLink: "https://drive.google.com/drive/folders/177UgA8ycZNrtG-SiWlnshFWzvqJpwvVN?usp=share_link",
    stills: ["images/Production design.png","images/production design1.png","images/production design 2.png"]
  },
  {
    title: "Memories",
    tag: "Moving Image · Personal",
    desc: "A visual exploration of personal memories and moments through time.",
    writeup: "<p>Memories' is an experimental mixed-media animation exploring archival objects and their stories while using the objects themselves as the model for animation.</p>",
    img: "images/Screenshot 2026-05-17 162752.png",
    driveLink: "https://drive.google.com/drive/folders/1iipp5rjfRccPBnxi2g9ND6nex-_g_yA6?usp=sharing",
    stills: ["images/Screenshot 2026-05-17 162818.png",'images/Screenshot 2026-05-17 162954.png','images/Memories.png','images/Copy of Animation Workshop Final.mp4']
  },
  {
    title: "Stopmotion",
    tag: "Animation · Stop Motion",
    desc: "Stop-motion animation — concept, construction and frame-by-frame execution.",
    writeup: "<p>A stop-motion animation project covering full pipeline from concept development through puppet construction and frame-by-frame animation.</p>",
    img: "images/project-13.jpg",
    driveLink: "https://drive.google.com/your-link",
    stills: ["images/project-13.jpg"]
  },
  {
    title: "Whiff of Time",
    tag: "Experimental · Individual Project",
    desc: "A poetic experiment on nostalgia, memory and the smell of old things.",
    writeup: "<p>A poetic experiment exploring the emotion of nostalgia and childhood memories that are trapped in particular objects and smells. This particular story revolves around a kid who walks down memory lane, memories long forgotten that were brought back by the smell of old books.</p>",
    img: "images/3.jpg",
    driveLink: "https://drive.google.com/your-link",
    stills: ["images/2.png","images/3.jpg","images/4.png","images/5.jpg"]
  }
];

function showDetail(index) {
  const project = projectsData[index];
  if (!project) return;

  const detailView = document.getElementById('detail-view');

  detailView.querySelector('.hero-tag').textContent   = project.tag;
  detailView.querySelector('.hero-title').textContent = project.title;
  detailView.querySelector('.hero-desc').textContent  = project.desc;
  detailView.querySelector('.writeup-text').innerHTML = project.writeup;

  const driveBtn = detailView.querySelector('.drive-btn');
  if (project.driveLink && project.driveLink !== "#" && project.driveLink !== "") {
    driveBtn.href = project.driveLink;
    driveBtn.style.display = 'inline-flex';
    const hint = detailView.querySelector('.drive-btn-hint');
    if (hint) hint.style.display = 'block';
  } else {
    driveBtn.style.display = 'none';
    const hint = detailView.querySelector('.drive-btn-hint');
    if (hint) hint.style.display = 'none';
  }

  const heroImg = detailView.querySelector('.detail-hero img');
  const ph = detailView.querySelector('.hero-placeholder');
  if (project.img && project.img !== "") {
    heroImg.src = project.img;
    heroImg.style.display = 'block';
    if (ph) ph.style.display = 'none';
  } else {
    heroImg.src = "";
    heroImg.style.display = 'none';
    if (ph) ph.style.display = 'flex';
  }

  const galleryContainer = document.getElementById('stills-gallery');
  if (galleryContainer) {
    galleryContainer.innerHTML = '';
    if (project.stills && project.stills.length > 0) {
      project.stills.forEach(stillPath => {
        const imgWrap = document.createElement('div');
        imgWrap.className = 'gallery-item';
        const imgEl = document.createElement('img');
        imgEl.src = stillPath;
        imgEl.alt = "Film Still / Process Artifact";
        imgWrap.appendChild(imgEl);
        galleryContainer.appendChild(imgWrap);
      });
      document.getElementById('gallery-section').style.display = 'block';
    } else {
      document.getElementById('gallery-section').style.display = 'none';
    }
  }

  const nextIndex   = (index + 1) % projectsData.length;
  const nextProject = projectsData[nextIndex];
  const nextSection = detailView.querySelector('.next-project');
  if (nextSection && nextProject) {
    detailView.querySelector('.next-title').textContent = nextProject.title;
    nextSection.onclick = () => showDetail(nextIndex);
  }

  document.getElementById('home-view').style.display  = 'none';
  document.getElementById('about-view').style.display = 'none';
  detailView.style.display = 'block';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
