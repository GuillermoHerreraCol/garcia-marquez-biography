 // Gabriel García Márquez Interactive Biography - JavaScript
  document.addEventListener('DOMContentLoaded', function() {

      initSmoothScrolling();
      initTimelineAnimations();
      initQuotesCarousel();
      initAchievementsChart();
      initInteractiveMap();
      initMobileNavigation();
      initScrollEffects();

      function initSmoothScrolling() {
          const navLinks = document.querySelectorAll('.nav-link');

          navLinks.forEach(link => {
              link.addEventListener('click', function(e) {
                  e.preventDefault();
                  const targetId = this.getAttribute('href');
                  const targetElement = document.querySelector(targetId);

                  if (targetElement) {
                      const headerHeight = document.querySelector('.header').offsetHeight;
                      const targetPosition = targetElement.offsetTop - headerHeight;

                      window.scrollTo({
                          top: targetPosition,
                          behavior: 'smooth'
                      });
                  }
              });
          });

          const scrollIndicator = document.querySelector('.scroll-indicator');
          if (scrollIndicator) {
              scrollIndicator.addEventListener('click', function() {
                  const timelineSection = document.querySelector('#timeline');
                  if (timelineSection) {
                      const headerHeight = document.querySelector('.header').offsetHeight;
                      const targetPosition = timelineSection.offsetTop - headerHeight;

                      window.scrollTo({
                          top: targetPosition,
                          behavior: 'smooth'
                      });
                  }
              });
          }
      }

      function initTimelineAnimations() {
          const timelineItems = document.querySelectorAll('.timeline-item');

          const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                      entry.target.style.opacity = '1';
                  }
              });
          }, {
              threshold: 0.3,
              rootMargin: '-50px'
          });

          timelineItems.forEach(item => {
              item.style.opacity = '0';
              observer.observe(item);

              item.addEventListener('click', function() {
                  const content = this.querySelector('.timeline-content');
                  content.style.transform = 'scale(1.05)';
                  content.style.boxShadow = '0 20px 40px rgba(0, 199, 190, 0.2)';

                  setTimeout(() => {
                      content.style.transform = 'translateY(-5px)';
                      content.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                  }, 200);
              });
          });
      }

      function initQuotesCarousel() {
          const quoteItems = document.querySelectorAll('.quote-item');
          const quoteButtons = document.querySelectorAll('.quote-btn');
          let currentQuote = 0;
          let quoteInterval;

          function showQuote(index) {
              quoteItems.forEach(item => {
                  item.classList.remove('active');
              });

              quoteButtons.forEach(btn => {
                  btn.classList.remove('active');
              });

              setTimeout(() => {
                  quoteItems[index].classList.add('active');
                  quoteButtons[index].classList.add('active');

                  const quoteText = quoteItems[index].querySelector('.quote-text');
                  const originalText = quoteText.textContent;

                  quoteText.textContent = '';
                  let i = 0;
                  const typingInterval = setInterval(() => {
                      quoteText.textContent += originalText[i];
                      i++;
                      if (i >= originalText.length) {
                          clearInterval(typingInterval);
                      }
                  }, 50);

              }, 100);

              currentQuote = index;
          }

          function startAutoPlay() {
              quoteInterval = setInterval(() => {
                  currentQuote = (currentQuote + 1) % quoteItems.length;
                  showQuote(currentQuote);
              }, 5000);
          }

          function stopAutoPlay() {
              clearInterval(quoteInterval);
          }

          quoteButtons.forEach((btn, index) => {
              btn.addEventListener('click', () => {
                  stopAutoPlay();
                  showQuote(index);
                  setTimeout(startAutoPlay, 3000);
              });
          });

          showQuote(0);
          startAutoPlay();

          const quotesSection = document.querySelector('.quotes-section');
          quotesSection.addEventListener('mouseenter', stopAutoPlay);
          quotesSection.addEventListener('mouseleave', startAutoPlay);
      }

      function initAchievementsChart() {
          const canvas = document.getElementById('achievementsChart');
          if (!canvas) return;

          const ctx = canvas.getContext('2d');

          const chartData = {
              labels: ['Books Published', 'Languages Translated', 'Awards Won', 'Years Active'],
              values: [15, 40, 8, 47],
              colors: ['#00c7be', '#2ca7e0', '#FFB547', '#24292d']
          };

          canvas.width = 400;
          canvas.height = 300;

          const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      let progress = 0;
                      const animationDuration = 2000;
                      const startTime = Date.now();

                      function animate() {
                          const elapsed = Date.now() - startTime;
                          progress = Math.min(elapsed / animationDuration, 1);

                          const animatedData = {
                              ...chartData,
                              values: chartData.values.map(val => val * progress)
                          };

                          ctx.clearRect(0, 0, canvas.width, canvas.height);

                          const padding = 60;
                          const chartWidth = canvas.width - (padding * 2);
                          const chartHeight = canvas.height - (padding * 2);
                          const maxValue = Math.max(...chartData.values);
                          const barWidth = chartWidth / animatedData.values.length;

                          animatedData.values.forEach((value, index) => {
                              const barHeight = (value / maxValue) * chartHeight;
                              const x = padding + (index * barWidth) + (barWidth * 0.1);
                              const y = canvas.height - padding - barHeight;
                              const width = barWidth * 0.8;

                              const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
                              gradient.addColorStop(0, chartData.colors[index]);
                              gradient.addColorStop(1, chartData.colors[index] + '80');

                              ctx.fillStyle = gradient;
                              ctx.fillRect(x, y, width, barHeight);

                              ctx.fillStyle = '#ffffff';
                              ctx.font = 'bold 14px Poppins';
                              ctx.textAlign = 'center';
                              ctx.fillText(Math.round(value), x + width/2, y - 10);

                              ctx.fillStyle = '#ffffff';
                              ctx.font = '12px Montserrat';
                              ctx.textAlign = 'center';
                              const labelY = canvas.height - padding + 20;

                              const words = chartData.labels[index].split(' ');
                              if (words.length > 1) {
                                  ctx.fillText(words[0], x + width/2, labelY);
                                  ctx.fillText(words[1], x + width/2, labelY + 15);
                              } else {
                                  ctx.fillText(chartData.labels[index], x + width/2, labelY);
                              }
                          });

                          if (progress < 1) {
                              requestAnimationFrame(animate);
                          }
                      }

                      animate();
                      observer.unobserve(entry.target);
                  }
              });
          }, { threshold: 0.5 });

          observer.observe(canvas);
      }

      function initInteractiveMap() {
          const mapMarkers = document.querySelectorAll('.map-marker');
          const tooltip = document.getElementById('mapTooltip');

          const countryInfo = {
              colombia: {
                  title: 'Colombia - Birthplace',
                  description: 'Born in Aracataca, Colombia in 1927. The magical town that inspired Macondo in his novels.'
              },
              mexico: {
                  title: 'Mexico - Home',
                  description: 'Lived in Mexico City for many years, where he wrote his masterpieces and passed away in 2014.'
              },
              sweden: {
                  title: 'Sweden - Nobel Recognition',
                  description: 'Awarded the Nobel Prize in Literature in Stockholm in 1982 for his magical realism.'
              }
          };

          mapMarkers.forEach(marker => {
              marker.addEventListener('mouseenter', function(e) {
                  const country = this.getAttribute('data-country');
                  const info = countryInfo[country];

                  if (info && tooltip) {
                      tooltip.innerHTML = `<h4>${info.title}</h4><p>${info.description}</p>`;
                      tooltip.style.opacity = '1';

                      const rect = this.getBoundingClientRect();
                      const mapRect = this.closest('.world-map').getBoundingClientRect();

                      tooltip.style.left = (rect.left - mapRect.left + rect.width/2) + 'px';
                      tooltip.style.top = (rect.top - mapRect.top - 10) + 'px';

                      this.style.filter = 'drop-shadow(0 0 10px currentColor)';
                  }
              });

              marker.addEventListener('mouseleave', function() {
                  if (tooltip) {
                      tooltip.style.opacity = '0';
                  }
                  this.style.filter = '';
              });

              marker.addEventListener('click', function() {
                  const country = this.getAttribute('data-country');
                  const info = countryInfo[country];

                  if (info) {
                      const notification = document.createElement('div');
                      notification.style.cssText = `
                          position: fixed;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                          background: var(--dk-ink);
                          color: var(--dk-white);
                          padding: 2rem;
                          border-radius: 12px;
                          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                          z-index: 9999;
                          max-width: 400px;
                          text-align: center;
                      `;

                      notification.innerHTML = `
                          <h3 style="color: var(--dk-cyan); margin-bottom: 1rem;">${info.title}</h3>
                          <p style="margin-bottom: 1.5rem;">${info.description}</p>
                          <button onclick="this.parentElement.remove()"
                                  style="background: var(--dk-cyan); color: white; border: none;
                                         padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;">
                              Close
                          </button>
                      `;

                      document.body.appendChild(notification);

                      setTimeout(() => {
                          if (notification.parentElement) {
                              notification.remove();
                          }
                      }, 5000);
                  }
              });
          });
      }

      function initMobileNavigation() {
          const navToggle = document.querySelector('.nav-toggle');
          const navMenu = document.querySelector('.nav-menu');

          if (navToggle && navMenu) {
              navToggle.addEventListener('click', function() {
                  navMenu.classList.toggle('active');
                  this.classList.toggle('active');
              });

              const navLinks = document.querySelectorAll('.nav-link');
              navLinks.forEach(link => {
                  link.addEventListener('click', () => {
                      navMenu.classList.remove('active');
                      navToggle.classList.remove('active');
                  });
              });
          }
      }

      function initScrollEffects() {
          const header = document.querySelector('.header');

          window.addEventListener('scroll', function() {
              const scrolled = window.pageYOffset;

              if (scrolled > 100) {
                  header.style.background = 'rgba(255, 255, 255, 0.98)';
                  header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
              } else {
                  header.style.background = 'rgba(255, 255, 255, 0.95)';
                  header.style.boxShadow = 'none';
              }

              const hero = document.querySelector('.hero');
              if (hero) {
                  const heroHeight = hero.offsetHeight;
                  if (scrolled < heroHeight) {
                      hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                  }
              }
          });

          const animatedElements = document.querySelectorAll('.work-card, .stat-item, .legacy-item');

          const scrollObserver = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                      entry.target.style.opacity = '1';
                  }
              });
          }, {
              threshold: 0.2,
              rootMargin: '0px 0px -50px 0px'
          });

          animatedElements.forEach(element => {
              element.style.opacity = '0';
              scrollObserver.observe(element);
          });
      }

      const workCards = document.querySelectorAll('.work-card');
      workCards.forEach(card => {
          card.addEventListener('mouseenter', function() {
              this.style.transform = 'translateY(-10px) scale(1.02)';
          });

          card.addEventListener('mouseleave', function() {
              this.style.transform = 'translateY(0) scale(1)';
          });
      });

      const statItems = document.querySelectorAll('.stat-item');
      statItems.forEach(item => {
          item.addEventListener('click', function() {
              const number = this.querySelector('.stat-number');
              const originalValue = number.textContent;

              let current = 0;
              const target = parseInt(originalValue.replace(/\D/g, ''));
              const increment = target / 30;

              const counter = setInterval(() => {
                  current += increment;
                  if (current >= target) {
                      current = target;
                      clearInterval(counter);
                  }

                  let displayValue = Math.floor(current);
                  if (originalValue.includes('+')) {
                      displayValue += '+';
                  }
                  if (originalValue.includes('M')) {
                      displayValue = Math.floor(current) + 'M+';
                  }

                  number.textContent = displayValue;
              }, 50);
          });
      });

      window.addEventListener('load', function() {
          document.body.style.opacity = '0';
          document.body.style.transition = 'opacity 0.5s ease-in-out';

          setTimeout(() => {
              document.body.style.opacity = '1';
          }, 100);
      });

      console.log('Gabriel García Márquez Interactive Biography - All systems initialized! 🎨📚');
  });
