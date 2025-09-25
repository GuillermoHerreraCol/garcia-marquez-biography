// Enhanced scroll animations
function handleScrollAnimations() {
    const sections = document.querySelectorAll('.section');
    const workCards = document.querySelectorAll('.work-card');
    const achievementItems = document.querySelectorAll('.achievement-item');
    const timelineEvents = document.querySelectorAll('.timeline-event');

    // Section animations
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 200); // Staggered animation
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '-50px 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));

    // Work cards animations
    const workCardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.3 });

    workCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        workCardObserver.observe(card);
    });

    // Achievement items animations
    const achievementObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });

    achievementItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        achievementObserver.observe(item);
    });

    // Timeline events animations
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 300);
            }
        });
    }, { threshold: 0.3 });

    timelineEvents.forEach(event => {
        event.style.opacity = '0';
        event.style.transform = 'translateY(30px)';
        event.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        timelineObserver.observe(event);
    });

    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Add subtle parallax to sections with background
        sections.forEach(section => {
            if (section.style.background && section.style.background.includes('gradient')) {
                section.style.backgroundPosition = `center ${rate * 0.1}px`;
            }
        });
    });
}

// Timeline functionality
function initTimeline() {
    const timelineEvents = document.querySelectorAll('.timeline-event');

    timelineEvents.forEach(event => {
        event.addEventListener('click', () => {
            // Remove expanded class from all events
            timelineEvents.forEach(e => e.classList.remove('expanded'));
            // Add expanded class to clicked event
            event.classList.add('expanded');
        });
    });
}

// Modern Charts functionality
function initCharts() {
    // Awards chart - Modern horizontal bar chart
    const awardsContainer = document.getElementById('awards-chart');
    awardsContainer.innerHTML = `
        <div class="chart-header">
            <h4>Premios y Reconocimientos</h4>
        </div>
        <div class="modern-bar-chart">
            <div class="bar-item">
                <div class="bar-label">Premio Nobel de Literatura</div>
                <div class="bar-container">
                    <div class="bar-fill nobel-bar" style="width: 100%"></div>
                    <div class="bar-value">1982</div>
                </div>
            </div>
            <div class="bar-item">
                <div class="bar-label">Premio Rómulo Gallegos</div>
                <div class="bar-container">
                    <div class="bar-fill award-bar" style="width: 80%"></div>
                    <div class="bar-value">1972</div>
                </div>
            </div>
            <div class="bar-item">
                <div class="bar-label">Premio Cervantes</div>
                <div class="bar-container">
                    <div class="bar-fill award-bar" style="width: 60%"></div>
                    <div class="bar-value">1982</div>
                </div>
            </div>
        </div>
    `;

    // Works chart - Modern vertical bar chart with data visualization best practices
    const worksContainer = document.getElementById('works-chart');
    worksContainer.innerHTML = `
        <div class="chart-header">
            <h4>Copias Vendidas (Millones)</h4>
        </div>
        <div class="modern-vertical-chart">
            <div class="chart-grid">
                <div class="grid-line" style="bottom: 0%"></div>
                <div class="grid-line" style="bottom: 25%"></div>
                <div class="grid-line" style="bottom: 50%"></div>
                <div class="grid-line" style="bottom: 75%"></div>
                <div class="grid-line" style="bottom: 100%"></div>
            </div>
            <div class="vertical-bars">
                <div class="vertical-bar-item">
                    <div class="vertical-bar-container">
                        <div class="vertical-bar-fill cien-anos-bar" style="height: 100%"></div>
                        <div class="vertical-bar-value">50M+</div>
                    </div>
                    <div class="vertical-bar-label">Cien años de soledad</div>
                </div>
                <div class="vertical-bar-item">
                    <div class="vertical-bar-container">
                        <div class="vertical-bar-fill amor-bar" style="height: 60%"></div>
                        <div class="vertical-bar-value">30M+</div>
                    </div>
                    <div class="vertical-bar-label">El amor en los tiempos del cólera</div>
                </div>
                <div class="vertical-bar-item">
                    <div class="vertical-bar-container">
                        <div class="vertical-bar-fill otras-bar" style="height: 40%"></div>
                        <div class="vertical-bar-value">20M+</div>
                    </div>
                    <div class="vertical-bar-label">Otras obras</div>
                </div>
            </div>
        </div>
        <div class="chart-footer">
            <div class="data-source">Datos aproximados basados en ventas globales</div>
        </div>
    `;

    // Add animation to bars on scroll
    animateBarsOnScroll();
}

function animateBarsOnScroll() {
    const barFills = document.querySelectorAll('.bar-fill, .vertical-bar-fill');

    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.transform = 'scaleX(1)';
                    entry.target.style.opacity = '1';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });

    barFills.forEach(fill => {
        fill.style.transform = 'scaleX(0)';
        fill.style.opacity = '0';
        fill.style.transformOrigin = 'left center';
        fill.style.transition = 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.6s ease';
        barObserver.observe(fill);
    });
}


// Map tooltips
function initMapTooltips() {
    const markers = document.querySelectorAll('.country-marker');

    markers.forEach(marker => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = marker.dataset.tooltip;
        document.body.appendChild(tooltip);

        marker.addEventListener('mouseenter', (e) => {
            const rect = marker.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 + 'px';
            tooltip.style.top = rect.top - 40 + 'px';
            tooltip.style.opacity = '1';
            tooltip.style.visibility = 'visible';
        });

        marker.addEventListener('mouseleave', () => {
            tooltip.style.opacity = '0';
            tooltip.style.visibility = 'hidden';
        });
    });
}

// Quotes functionality with typewriter effect
function initQuotes() {
    const quotes = [
        "Lo que importa en la vida no es lo que te sucede sino lo que recuerdas y cómo lo recuerdas.",
        "La vida no es sino una continua sucesión de oportunidades para sobrevivir.",
        "No hay medicina que cure lo que no cura la felicidad.",
        "El problema no es hacer que las cosas sean perfectas, el problema es que la gente piensa que no lo son."
    ];

    let currentQuoteIndex = 0;
    const quoteElement = document.getElementById('quote-1');

    function updateQuote() {
        // Typewriter effect
        typeWriter(quoteElement, quotes[currentQuoteIndex], 80);
    }

    function typeWriter(element, text, speed) {
        element.textContent = '';
        element.classList.add('quote-typing');
        let i = 0;

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                element.classList.remove('quote-typing');
                // Auto-advance to next quote after 4 seconds
                setTimeout(() => {
                    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
                    updateQuote();
                }, 4000);
            }
        }

        type();
    }

    // Initialize first quote
    updateQuote();
}

// Smooth scrolling for navigation (if needed)
function initSmoothScrolling() {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth';
}

// Biography cards interactivity
function initBiographyCards() {
    const bioCards = document.querySelectorAll('.bio-card');

    bioCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active class from all cards
            bioCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            card.classList.add('active');
        });

        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', () => {
            if (!card.classList.contains('active')) {
                card.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
}

// Real interactive map
function initRealMap() {
    // Initialize the map centered on Latin America
    const map = L.map('world-map').setView([10, -70], 3);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 18,
    }).addTo(map);

    // Custom icon function
    function createCustomIcon(color) {
        return L.divIcon({
            className: 'custom-marker',
            html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
        });
    }

    // Add markers for significant locations
    const locations = [
        {
            coords: [10.46, -74.78], // Aracataca, Colombia
            title: 'Aracataca, Colombia',
            description: 'Lugar de nacimiento de Gabriel García Márquez. La ciudad inspiró el pueblo ficticio de Macondo en "Cien años de soledad".',
            color: '#00c7be'
        },
        {
            coords: [19.43, -99.13], // Mexico City, Mexico
            title: 'Ciudad de México, México',
            description: 'Lugar de residencia durante muchos años y donde falleció el 17 de abril de 2014.',
            color: '#2ca7e0'
        },
        {
            coords: [59.33, 18.07], // Stockholm, Sweden
            title: 'Estocolmo, Suecia',
            description: 'Ciudad donde recibió el Premio Nobel de Literatura en 1982.',
            color: '#ffb547'
        }
    ];

    locations.forEach(location => {
        const marker = L.marker(location.coords, {
            icon: createCustomIcon(location.color)
        }).addTo(map);

        marker.bindPopup(`
            <div class="map-popup">
                <h4>${location.title}</h4>
                <p>${location.description}</p>
            </div>
        `);

        // Add click animation
        marker.on('click', () => {
            map.setView(location.coords, 6, { animate: true });
        });
    });

    // Add a connecting line between the locations
    const latlngs = locations.map(loc => loc.coords);
    L.polyline(latlngs, {
        color: '#00c7be',
        weight: 2,
        opacity: 0.7,
        dashArray: '10, 10'
    }).addTo(map);

    // Fit map to show all markers
    const group = new L.featureGroup(locations.map(loc => L.marker(loc.coords)));
    map.fitBounds(group.getBounds().pad(0.1));
}

// Vertical Navigation functionality
function initVerticalNav() {
    const navNodes = document.querySelectorAll('.nav-node');
    const sections = document.querySelectorAll('.section');
    const mobileToggle = document.getElementById('mobile-nav-toggle');
    const verticalNav = document.getElementById('vertical-nav');

    // Smooth scroll to section when clicking nav nodes
    navNodes.forEach((node, index) => {
        node.addEventListener('click', () => {
            const targetSection = sections[index];
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 100; // Offset for better positioning
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    verticalNav.classList.remove('mobile-open');
                    mobileToggle.classList.remove('mobile-nav-active');
                }
            }
        });

        // Keyboard navigation
        node.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                node.click();
            }
        });
    });

    // Highlight current section on scroll
    function updateActiveSection() {
        const scrollPosition = window.scrollY + window.innerHeight / 2;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all nodes
                navNodes.forEach(node => node.classList.remove('active'));
                // Add active class to current section node
                navNodes[index].classList.add('active');
            }
        });
    }

    // Throttle scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                updateActiveSection();
                scrollTimeout = null;
            }, 50);
        }
    });

    // Mobile menu toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            verticalNav.classList.toggle('mobile-open');
            mobileToggle.classList.toggle('mobile-nav-active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 &&
            !verticalNav.contains(e.target) &&
            !mobileToggle.contains(e.target)) {
            verticalNav.classList.remove('mobile-open');
            mobileToggle.classList.remove('mobile-nav-active');
        }
    });

    // Initialize active section
    updateActiveSection();
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    handleScrollAnimations();
    initTimeline();
    initCharts();
    initBiographyCards();
    initRealMap();
    initQuotes();
    initVerticalNav();
    initSmoothScrolling();
});

// Add tooltip styles dynamically
const tooltipStyles = `
.tooltip {
    position: absolute;
    background: rgba(36, 41, 45, 0.9);
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-family: Montserrat, sans-serif;
    pointer-events: none;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
    z-index: 1000;
    white-space: nowrap;
}

.tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: rgba(36, 41, 45, 0.9);
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = tooltipStyles;
document.head.appendChild(styleSheet);
