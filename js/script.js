// ===============================
// DOM READY
// ===============================
document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('mainContent');
    const header = document.getElementById('header');

    setTimeout(() => {
        preloader.classList.add('complete');
        mainContent.style.display = 'block';
        header.style.display = 'flex';

        initializeGalleries();
        initializeHeroParallax();
        initializeParallax();
        initializeScrollEffects();
        initializeForm();
        initializeMobileMenu();

        setTimeout(() => preloader.style.display = 'none', 1000);
    }, 3800);
});


// ===============================
// MOBILE MENU INITIALIZATION
// ===============================
function initializeMobileMenu() {
    const burgerMenu = document.getElementById('burgerMenu');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileClose = document.getElementById('mobileClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!burgerMenu || !mobileMenu) return;
    
    // Открыть/закрыть меню
    burgerMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        burgerMenu.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Закрыть по крестику
    mobileClose.addEventListener('click', () => {
        burgerMenu.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Закрыть по клику на ссылку
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Закрыть по клику вне меню
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !burgerMenu.contains(e.target)) {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Закрыть по Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            burgerMenu.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}


// ===============================
// NAVIGATION (SAFE)
// ===============================
function initializeScrollEffects() {
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');
    const header = document.getElementById('header');

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (!target) return;
            
            // Закрыть мобильное меню если открыто
            const burgerMenu = document.getElementById('burgerMenu');
            const mobileMenu = document.getElementById('mobileMenu');
            if (burgerMenu && burgerMenu.classList.contains('active')) {
                burgerMenu.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    window.addEventListener('scroll', () => {
        let current = '';
        const pos = window.scrollY + 120;

        sections.forEach(section => {
            if (pos >= section.offsetTop && pos < section.offsetTop + section.offsetHeight) {
                current = section.id;
            }
        });

        // Обновить активные ссылки в обоих меню
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${current}`);
        });

        header.classList.toggle('scrolled', window.scrollY > 80);
    });
}


// ===============================
// HERO PARALLAX (NO SCROLL HIJACK)
// ===============================
function initializeHeroParallax() {
    let currentSet = 1;

    const subtitles = [
        "Expertises onder één dak",
        "Natuursteen Specialisten",
        "Vloer & Terras Experts"
    ];

    const descriptions = [
        "Met oog voor detail, duurzaamheid en kwaliteit realiseren wij uw droomproject.",
        "Jarenlange ervaring met marmer, graniet en alle soorten natuursteen.",
        "Van klassieke keramiek tot moderne grootformaat tegels."
    ];

    setInterval(() => {
        document.querySelectorAll('.parallax-set').forEach(s => s.classList.remove('active'));
        currentSet = currentSet >= 3 ? 1 : currentSet + 1;
        document.getElementById(`set${currentSet}`).classList.add('active');

        document.getElementById('heroSubtitle').textContent = subtitles[currentSet - 1];
        document.getElementById('heroDescription').textContent = descriptions[currentSet - 1];
    }, 8000);

    const indicator = document.getElementById('scrollIndicator');
    if (indicator) {
        indicator.onclick = () =>
            document.querySelector('#renovatie').scrollIntoView({ behavior: 'smooth' });
    }
}


// ===============================
// PARALLAX BACKGROUNDS
// ===============================
function initializeParallax() {
    const items = document.querySelectorAll('.parallax-bg');
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        items.forEach(el => {
            el.style.transform = `translateY(${y * 0.25}px) scale(1.1)`;
        });
    });
}


// ===============================
// FULL GALLERY DATA (RESTORED)
// ===============================
const galleryData = {
    renovatie: [
        {
            src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/1619270390316-XGJFHSRL8A8K2OZTMMI3/IMG_9606.jpg',
            title: 'Badkamer Renovatie',
            description: 'Moderne badkamer met marmeren wanden'
        },
        {
            src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/d6643023-a49d-43ef-ab50-d35bcd6d4784/IMG-20221013-WA0007.jpg',
            title: 'Vloerproject',
            description: 'Natuurstenen vloer'
        },
        {
            src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/7921faf0-343e-47a2-9eb1-1cc801f2ab0c/IMG-20221013-WA0008.jpg',
            title: 'Precisiewerk',
            description: 'Perfecte aansluitingen'
        },
        {
            src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/0670b1bb-a29d-4182-a145-b09399bb561d/IMG-20221013-WA0015.jpg',
            title: 'Wandafwerking',
            description: 'Complete wandrenovatie'
        }
    ],
    natuursteen: [
        {
            src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/1619270318077-OWEXVZOBQHPEQFZZ45IY/IMG_7493.jpg',
            title: 'Marmer',
            description: 'Italiaans marmer'
        },
        {
            src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/1613827998874-BKQJZ7ZS5C9ETL549OSV/marmer_zwart_shutterstock_1565196766.jpg',
            title: 'Zwart Marmer',
            description: 'Luxe zwart marmer'
        }
    ],
    vloer: [
        {
            src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/1619270195055-BY56WOKSFW6PGI1U52Z1/IMG_3320.jpg',
            title: 'Vloertegels',
            description: 'Moderne vloertegels'
        },
        {
            src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/d6643023-a49d-43ef-ab50-d35bcd6d4784/IMG-20221013-WA0007.jpg',
            title: 'Terrastegels',
            description: 'Natuursteen terras'
        }
    ],
    realisaties: [
        {
            src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/1619270390316-XGJFHSRL8A8K2OZTMMI3/IMG_9606.jpg',
            title: 'Luxe Badkamer',
            description: 'Complete renovatie'
        },
        {
            src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/1619270318077-OWEXVZOBQHPEQFZZ45IY/IMG_7493.jpg',
            title: 'Marmeren Wand',
            description: 'Natuursteen wand'
        },
        {
            src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/1619270195055-BY56WOKSFW6PGI1U52Z1/IMG_3320.jpg',
            title: 'Designtegels',
            description: 'Moderne tegels'
        }
    ]
};


// ===============================
// GALLERY INIT
// ===============================
function initializeGalleries() {
    for (const galleryId in galleryData) {
        const container = document.getElementById(`${galleryId}Gallery`);
        if (!container) continue;

        galleryData[galleryId].forEach((item, index) => {
            const el = document.createElement('div');
            el.className = 'gallery-item';
            el.style.setProperty('--item-index', index);
            el.innerHTML = `
                <img src="${item.src}" alt="${item.title}" class="gallery-image">
                <div class="gallery-overlay">
                    <div class="gallery-title">${item.title}</div>
                    <div class="gallery-description">${item.description}</div>
                </div>
            `;
            el.onclick = () => openModal(galleryId, index);
            container.appendChild(el);
        });
    }
}


// ===============================
// MODAL GALLERY (FULL)
// ===============================
const modalOverlay = document.getElementById('modalOverlay');
const modalImage = document.getElementById('modalImage');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');
const modalThumbs = document.getElementById('modalThumbs');
const modalClose = document.getElementById('modalClose');

let currentGallery = null;
let currentIndex = 0;

function openModal(galleryId, index) {
    currentGallery = galleryId;
    currentIndex = index;
    updateModal();
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

function updateModal() {
    const items = galleryData[currentGallery];
    const item = items[currentIndex];

    modalImage.style.opacity = '0';
    
    setTimeout(() => {
        modalImage.src = item.src;
        modalImage.alt = item.title;
        
        modalImage.onload = () => {
            modalImage.style.opacity = '1';
        };
        
        if (modalImage.complete) {
            modalImage.style.opacity = '1';
        }
    }, 300);

    modalThumbs.innerHTML = '';
    items.forEach((thumb, i) => {
        const t = document.createElement('div');
        t.className = `modal-thumb ${i === currentIndex ? 'active' : ''}`;
        t.innerHTML = `<img src="${thumb.src}" alt="${thumb.title}">`;
        t.onclick = () => {
            currentIndex = i;
            updateModal();
        };
        modalThumbs.appendChild(t);
    });
}

modalPrev.onclick = () => {
    currentIndex = (currentIndex - 1 + galleryData[currentGallery].length) %
                   galleryData[currentGallery].length;
    updateModal();
};

modalNext.onclick = () => {
    currentIndex = (currentIndex + 1) % galleryData[currentGallery].length;
    updateModal();
};

modalClose.onclick = closeModal;
modalOverlay.onclick = e => e.target === modalOverlay && closeModal();

// Добавить обработчики клавиш
document.addEventListener('keydown', (e) => {
    if (!modalOverlay.classList.contains('active')) return;
    
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') modalPrev.click();
    if (e.key === 'ArrowRight') modalNext.click();
});


// ===============================
// FORM
// ===============================
function initializeForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    form.addEventListener('submit', e => {
        e.preventDefault();
        alert('Formulier verzonden ✔');
        form.reset();
    });
}