// ОСНОВНОЙ СКРИПТ
document.addEventListener('DOMContentLoaded', function() {
    // ПРЕЛОУДЕР
    const preloader = document.getElementById('preloader');
    const mainContent = document.getElementById('mainContent');
    const header = document.getElementById('header');
    
    // Задержка завершения прелоудера
    setTimeout(() => {
        // Добавляем класс завершения для плавного исчезновения
        preloader.classList.add('complete');
        
        // Показываем основной контент
        mainContent.style.display = 'block';
        header.style.display = 'flex';
        
        // Инициализируем галереи
        initializeGalleries();
        
        // Инициализируем герой паралакс
        initializeHeroParallax();
        
        // Запускаем параллакс эффекты
        initializeParallax();
        
        // Запускаем скролл эффекты
        initializeScrollEffects();
        
        // Инициализируем форму
        initializeForm();
        
        // Через 1 секунду скрываем прелоудер полностью
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 1000);
        
    }, 3800); // Общее время анимации прелоудера
    
    // ДАННЫЕ ДЛЯ ГАЛЕРЕЙ
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
                description: 'Natuurstenen vloer in Dentergem'
            },
            {
                src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/7921faf0-343e-47a2-9eb1-1cc801f2ab0c/IMG-20221013-WA0008.jpg',
                title: 'Precisiewerk',
                description: 'Perfecte aansluitingen en details'
            },
            {
                src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/0670b1bb-a29d-4182-a145-b09399bb561d/IMG-20221013-WA0015.jpg',
                title: 'Wandafwerking',
                description: 'Complete wandrenovatie'
            },
            {
                src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/2a1c1603-ad99-4c8e-8cb4-a14497e6fef9/IMG-20221013-WA0009.jpg',
                title: 'Keukenrenovatie',
                description: 'Granieten werkbladen'
            },
            {
                src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/739b5e69-98ef-40ad-b28a-cea548763eb2/IMG-20221014-WA0019.jpg',
                title: 'Tegelwerk',
                description: 'Vloer- en wandtegels'
            }
        ],
        natuursteen: [
            {
                src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/1619270318077-OWEXVZOBQHPEQFZZ45IY/IMG_7493.jpg',
                title: 'Marmer',
                description: 'Italiaans marmer in badkamer'
            },
            {
                src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/1613827998874-BKQJZ7ZS5C9ETL549OSV/marmer_zwart_shutterstock_1565196766.jpg',
                title: 'Zwart Marmer',
                description: 'Luxe zwart marmer'
            },
            {
                src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/cdbce118-b071-4cd6-bdf2-49e1429a320b/IMG-20221014-WA0012.jpg',
                title: 'Steenbewerking',
                description: 'Precisie steenbewerking'
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
                description: 'Complete badkamerrenovatie'
            },
            {
                src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/1619270318077-OWEXVZOBQHPEQFZZ45IY/IMG_7493.jpg',
                title: 'Marmeren Wand',
                description: 'Natuursteen wandafwerking'
            },
            {
                src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/1619270195055-BY56WOKSFW6PGI1U52Z1/IMG_3320.jpg',
                title: 'Designtegels',
                description: 'Moderne vloertegels'
            },
            {
                src: 'https://images.squarespace-cdn.com/content/v1/60291af338abaf535502ac16/d6643023-a49d-43ef-ab50-d35bcd6d4784/IMG-20221013-WA0007.jpg',
                title: 'Totaalrenovatie',
                description: 'Complete woningrenovatie'
            }
        ]
    };
    
    // ИНИЦИАЛИЗАЦИЯ ГАЛЕРЕЙ
    function initializeGalleries() {
        for (const galleryId in galleryData) {
            const container = document.getElementById(`${galleryId}Gallery`);
            if (!container) continue;
            
            galleryData[galleryId].forEach((item, index) => {
                const galleryItem = document.createElement('div');
                galleryItem.className = 'gallery-item';
                galleryItem.style.setProperty('--item-index', index);
                galleryItem.dataset.src = item.src;
                galleryItem.dataset.title = item.title;
                galleryItem.dataset.description = item.description;
                
                galleryItem.innerHTML = `
                    <img src="${item.src}" alt="${item.title}" class="gallery-image">
                    <div class="gallery-overlay">
                        <div class="gallery-title">${item.title}</div>
                        <div class="gallery-description">${item.description}</div>
                    </div>
                `;
                
                galleryItem.addEventListener('click', () => {
                    openModal(galleryId, index);
                });
                
                container.appendChild(galleryItem);
            });
        }
        
        // Анимация появи галереї при скролі
        const galleryObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.gallery-item');
                    items.forEach(item => {
                        item.style.animationPlayState = 'running';
                    });
                    entry.target.style.animationPlayState = 'running';
                }
            });
        }, { threshold: 0.2 });
        
        document.querySelectorAll('.gallery-container').forEach(container => {
            galleryObserver.observe(container);
        });
    }
    
    // ИНИЦИАЛИЗАЦИЯ ГЕРОЙ ПАРАЛАКС
    function initializeHeroParallax() {
        // Паралакс слайдер з описом
        let currentSet = 1;
        const heroSubtitles = [
            "Expertises onder één dak",
            "Natuursteen Specialisten",
            "Vloer & Terras Experts"
        ];
        const heroDescriptions = [
            "Met oog voor detail, duurzaamheid en kwaliteit realiseren wij uw droomproject.",
            "Jarenlange ervaring met marmer, graniet en alle soorten natuursteen.",
            "Van klassieke keramiek tot moderne grootformaat tegels voor binnen en buiten."
        ];

        function changeSet() {
            document.querySelectorAll('.parallax-set').forEach(s => s.classList.remove('active'));
            currentSet = currentSet >= 3 ? 1 : currentSet + 1;
            document.getElementById(`set${currentSet}`).classList.add('active');
            
            // Оновлення тексту
            document.getElementById('heroSubtitle').textContent = heroSubtitles[currentSet - 1];
            document.getElementById('heroDescription').textContent = heroDescriptions[currentSet - 1];
        }
        
        // Автоматична зміна кожні 8 секунд
        setInterval(changeSet, 8000);
        
        // Smart Scroll - плавна прокрутка при невеликому скролі
        const scrollIndicator = document.getElementById('scrollIndicator');
        let isScrolling = false;
        
        window.addEventListener('wheel', (e) => {
            if (window.scrollY < 100 && !isScrolling) {
                if (e.deltaY > 0) {
                    // Прокрутка вниз на головній сторінці
                    e.preventDefault();
                    isScrolling = true;
                    
                    document.querySelector('#renovatie').scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    setTimeout(() => {
                        isScrolling = false;
                    }, 1000);
                }
            }
        });

        // Клік на індикатор скролу
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('#renovatie').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // МОДАЛЬНАЯ ГАЛЕРЕЯ
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
        document.body.style.overflow = 'auto';
    }
    
    function updateModal() {
        if (!currentGallery) return;
        
        const items = galleryData[currentGallery];
        if (!items || !items[currentIndex]) return;
        
        const item = items[currentIndex];
        modalImage.src = item.src;
        modalImage.alt = item.title;
        modalImage.classList.remove('active');
        
        setTimeout(() => {
            modalImage.classList.add('active');
        }, 100);
        
        updateModalThumbs();
    }
    
    function updateModalThumbs() {
        modalThumbs.innerHTML = '';
        const items = galleryData[currentGallery];
        
        items.forEach((item, index) => {
            const thumb = document.createElement('div');
            thumb.className = `modal-thumb ${index === currentIndex ? 'active' : ''}`;
            thumb.innerHTML = `<img src="${item.src}" alt="${item.title}">`;
            thumb.addEventListener('click', () => {
                currentIndex = index;
                updateModal();
            });
            modalThumbs.appendChild(thumb);
        });
    }
    
    modalPrev.addEventListener('click', () => {
        const items = galleryData[currentGallery];
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateModal();
    });
    
    modalNext.addEventListener('click', () => {
        const items = galleryData[currentGallery];
        currentIndex = (currentIndex + 1) % items.length;
        updateModal();
    });
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (!modalOverlay.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') modalPrev.click();
        if (e.key === 'ArrowRight') modalNext.click();
    });
    
    // ПАРАЛЛАКС ЭФФЕКТЫ
    function initializeParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-bg');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0) scale(1.2)`;
            });
        });
        
        // Дополнительный параллакс при движении мыши
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.2)`;
            });
        });
    }
    
    // ЭФФЕКТЫ ПРИ СКРОЛЛЕ
    function initializeScrollEffects() {
        const navLinks = document.querySelectorAll('.nav-link');
        const sections = document.querySelectorAll('section[id]');
        
        // Плавный скролл с эффектом гравитации
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Эффект гравитации
                    document.body.style.animation = 'gravityScroll 1s';
                    setTimeout(() => {
                        document.body.style.animation = '';
                    }, 1000);
                    
                    // Плавный скролл
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Активная навигация при скролле
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPos = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
            
            // Эффект хедера при скролле
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Анимация элементов при скролле
        const animatedElements = document.querySelectorAll('.gallery-item, .section-title, .btn');
        
        function checkAnimation() {
            animatedElements.forEach(el => {
                const rect = el.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                
                if (rect.top < windowHeight * 0.85 && rect.bottom > 0) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }
            });
        }
        
        window.addEventListener('scroll', checkAnimation);
        checkAnimation();
    }
    
    // ФОРМА ОБРАТНОЙ СВЯЗИ
    function initializeForm() {
        const contactForm = document.getElementById('contactForm');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Сбор данных формы
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Эффект успешной отправки
            const submitBtn = this.querySelector('.form-submit');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Verzonden!';
            submitBtn.style.background = 'rgba(76, 175, 80, 0.2)';
            submitBtn.style.borderColor = 'rgba(76, 175, 80, 0.5)';
            
            // Анимация успеха
            submitBtn.style.animation = 'buttonPress 0.5s';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.borderColor = '';
                submitBtn.style.animation = '';
                this.reset();
                
                // Показать уведомление
                showNotification('Bedankt voor uw aanvraag! We nemen zo snel mogelijk contact met u op.');
            }, 2000);
            
            // Здесь обычно отправка на сервер
            console.log('Form data:', data);
        });
    }
    
    // УВЕДОМЛЕНИЕ
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: rgba(255, 102, 0, 0.9);
            color: white;
            padding: 20px 30px;
            border-radius: 10px;
            z-index: 3000;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            transform: translateX(100%);
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 400px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 3000);
    }
    
    // ДОПОЛНИТЕЛЬНЫЕ ЭФФЕКТЫ
    // Эффект мрамора
    const marbleElements = document.querySelectorAll('.marble-effect');
    marbleElements.forEach(el => {
        el.style.background = `linear-gradient(45deg, 
            rgba(26,26,26,0.8) 0%, 
            rgba(51,51,51,0.6) 25%, 
            rgba(77,77,77,0.4) 50%, 
            rgba(102,102,102,0.6) 75%, 
            rgba(128,128,128,0.8) 100%
        )`;
    });
    
    // Эффект частиц для премиального ощущения
    createParticles();
    
    function createParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 100;
            overflow: hidden;
        `;
        document.body.appendChild(particlesContainer);
        
        // Создаем частицы мраморной пыли
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 3 + 1}px;
                height: ${Math.random() * 3 + 1}px;
                background: rgba(255, 255, 255, ${Math.random() * 0.1});
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                --tx: ${(Math.random() - 0.5) * 100}px;
                --ty: ${(Math.random() - 0.5) * 100}px;
                --r: ${Math.random() * 360}deg;
                animation: particlesFloat ${Math.random() * 10 + 10}s infinite linear;
            `;
            particlesContainer.appendChild(particle);
        }
    }
});