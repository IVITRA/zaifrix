document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const body = document.body;
    const heroDynamicSubtitle = document.getElementById('hero-dynamic-subtitle');

    // ----- Dynamic Hero Subtitles -----
    const dynamicSubtitles = [
        "zelhoria، حيث تتحول الأفكار إلى تجارب رقمية فريدة تسافر بك عبر عوالم الابتكار.",
        "نصنع المستقبل الرقمي، كود بكود، بكسل ببكسل، في مجرة الإبداع اللامحدود.",
        "بوابتك لاستكشاف تقنيات الويب المتطورة وحلول برمجية تتجاوز التوقعات.",
        "من الأفكار الأولية إلى الإطلاق الكوني، نرافقك في كل خطوة نحو النجاح الرقمي.",
        "دعنا نحول رؤيتك إلى واقع ملموس يتألق في سماء الإنترنت الواسعة."
    ];
    let currentSubtitleIndex = 0;
    let subtitleInterval;

    function changeHeroSubtitle() {
        if (!heroDynamicSubtitle) return;
        heroDynamicSubtitle.classList.remove('animate-in');
        setTimeout(() => {
            currentSubtitleIndex = (currentSubtitleIndex + 1) % dynamicSubtitles.length;
            heroDynamicSubtitle.textContent = dynamicSubtitles[currentSubtitleIndex];
            heroDynamicSubtitle.classList.add('animate-in');
        }, 600);
    }

    // ----- بيانات المشاريع -----
    const allProjects = [
        // ... (بيانات المشاريع تبقى كما هي) ...
        {
            id: 1,
            name: 'مرصد البيانات (Dashboard)',
            type: 'large',
            description: 'لوحة تحكم متقدمة لعرض وتحليل البيانات مع واجهة مستخدم تفاعلية وتصميم مستقبلي مستوحى من الفضاء. تم استخدام أحدث التقنيات لضمان أداء عالٍ وتجربة مستخدم سلسة.',
            imageUrl: '',
            detailsImageUrl: '',
            languagesUsed: ['JavaScript', 'React', 'Node.js', 'CSS', 'D3.js', 'API'],
            liveDemoUrl: 'https://example.com/dashboard-demo',
            repoUrl: 'https://github.com/yourusername/dashboard-repo',
            codeSnippets: { /* ... */ }
        },
        {
            id: 2,
            name: 'محاكي الجاذبية الكونية',
            type: 'small',
            description: 'تجربة ويب تفاعلية صغيرة تحاكي تأثيرات الجاذبية بين الأجرام السماوية باستخدام Canvas API ورسم متجهات القوة.',
            imageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3Jhdml0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60',
            detailsImageUrl: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Z3Jhdml0eXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            languagesUsed: ['JavaScript', 'HTML', 'Canvas'],
            liveDemoUrl: null,
            repoUrl: 'https://github.com/yourusername/gravity-simulator',
            codeSnippets: { /* ... */ }
        },
         // ... (أضف باقي المشاريع هنا)
    ];

    // ----- بيانات المهارات (تم إزالة الوصف) -----
    const skillsData = [
        { name: "JavaScript", icon: "fab fa-js-square", level: 90, color: "#F7DF1E" },
        { name: "React", icon: "fab fa-react", level: 85, color: "#61DAFB" },
        { name: "Node.js", icon: "fab fa-node-js", level: 80, color: "#339933" },
        { name: "HTML5", icon: "fab fa-html5", level: 95, color: "#E34F26" },
        { name: "CSS3", icon: "fab fa-css3-alt", level: 90, color: "#1572B6" },
        { name: "Python", icon: "fab fa-python", level: 70, color: "#3776AB" },
        { name: "API Design", icon: "fas fa-cogs", level: 75, color: "#B0BEC5" },
        { name: "UI/UX", icon: "fas fa-drafting-compass", level: 80, color: "#7E57C2" },
        { name: "MongoDB", icon: "fas fa-database", level: 65, color: "#47A248" },
        { name: "Git & GitHub", icon: "fab fa-git-alt", level: 88, color: "#F05032"},
        { name: "TypeScript", icon: "fas fa-code", level: 70, color: "#3178C6"}, // ممكن استخدام أيقونة أفضل
        { name: "Figma", icon: "fab fa-figma", level: 75, color: "#F24E1E"}
    ];


    const ITEMS_PER_PAGE = 6;
    const VISIBLE_PAGINATION_BUTTONS_THRESHOLD = 7;

    const header = document.getElementById('main-header');
    const largeProjectsGrid = document.getElementById('large-projects-grid');
    const smallProjectsGrid = document.getElementById('small-projects-grid');
    const largeProjectsPagination = document.getElementById('large-projects-pagination');
    const smallProjectsPagination = document.getElementById('small-projects-pagination');
    const largeProjectsFilterContainer = document.querySelector('#large-projects-filter-content');
    const smallProjectsFilterContainer = document.querySelector('#small-projects-filter-content');
    const skillsGridContainer = document.getElementById('skills-grid-container');

    const welcomePopupOverlay = document.getElementById('welcome-popup');
    const sparkContainers = {
        top: document.getElementById('gate-spark-container-top'),
        bottom: document.getElementById('gate-spark-container-bottom'),
        left: document.getElementById('gate-spark-container-left'),
        right: document.getElementById('gate-spark-container-right')
    };

    const modal = document.getElementById('project-modal');
    const modalProjectTitle = document.getElementById('modal-project-title');
    const modalProjectDescription = document.getElementById('modal-project-description');
    const modalProjectImage = document.getElementById('modal-project-image');
    const modalCodeLanguageTabs = document.getElementById('code-language-tabs');
    const modalProjectCode = document.getElementById('modal-project-code');
    const lineNumbersContainer = document.getElementById('line-numbers-container');
    const codeDisplayArea = modalProjectCode ? modalProjectCode.closest('.code-display-area') : null;
    const copyCodeButton = document.getElementById('copy-code-button');
    const copyCodeButtonText = copyCodeButton ? copyCodeButton.querySelector('.copy-text') : null;
    const closeModalButton = modal ? modal.querySelector('.close-button') : null;
    const fullscreenCodeButton = document.getElementById('fullscreen-code-button');
    const modalProjectLinksContainer = document.getElementById('modal-project-links');

    const fullscreenModal = document.getElementById('fullscreen-image-modal');
    const fullscreenImage = document.getElementById('fullscreen-image');
    const closeFullscreenButton = fullscreenModal ? fullscreenModal.querySelector('.close-fullscreen-button') : null;

    const fullscreenCodeModal = document.getElementById('fullscreen-code-modal');
    const fullscreenCodeTabs = document.getElementById('code-language-tabs-fullscreen');
    const fullscreenCodeElement = document.getElementById('fullscreen-project-code');
    const fullscreenCodeLineNumbers = document.getElementById('line-numbers-container-fullscreen');
    const fullscreenCodeDisplayArea = fullscreenCodeElement ? fullscreenCodeElement.closest('.code-display-area-fullscreen') : null;
    const copyCodeButtonFullscreen = document.getElementById('copy-code-button-fullscreen');
    const copyCodeButtonFullscreenText = copyCodeButtonFullscreen ? copyCodeButtonFullscreen.querySelector('.copy-text') : null;
    const closeFullscreenCodeButton = fullscreenCodeModal ? fullscreenCodeModal.querySelector('.close-fullscreen-code-button') : null;

    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebarLinks = mobileSidebar ? mobileSidebar.querySelectorAll('.sidebar-link') : [];

    const cursorGlow = document.getElementById('cursor-glow');
    const clickEffectContainer = document.getElementById('click-effect-container');
    const currentYearSpan = document.getElementById('current-year');
    const currentYearSidebar = document.querySelector('.current-year-sidebar');

    const navHighlighter = document.querySelector('.desktop-nav .nav-highlighter');
    const allNavLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-sidebar .sidebar-link'); // For active section highlighting

    let currentLargeProjects = [];
    let currentSmallProjects = [];
    let currentPageLarge = 1;
    let currentPageSmall = 1;
    let activeLargeFilters = [];
    let activeSmallFilters = [];
    let currentModalProject = null;
    let isModalOpen = false;
    let isFullscreenModalOpen = false;
    let isFullscreenCodeModalOpen = false;
    let currentCodeLanguageInModal = '';


    if (typeof particlesJS !== 'undefined') {
        particlesJS.load('particles-js', 'particles-config.json', () => {
            // console.log('Cosmic dust initialized.');
        });
    } else {
        console.error('Particles.js library not found.');
    }

     if (cursorGlow) {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                cursorGlow.style.left = `${e.clientX}px`;
                cursorGlow.style.top = `${e.clientY}px`;
            });
        }, { passive: true });
     }

    if (clickEffectContainer) {
        document.addEventListener('click', (e) => {
            if (e.target.closest('button, a, input, textarea, .project-card, .skill-orb, .modal, .mobile-sidebar, .welcome-popup-gate, .faq-question-btn, .crypto-address-display input, .payment-id-display input')) {
                return;
            }

            const particleCount = Math.floor(Math.random() * 6) + 10;
            const angleIncrement = (Math.PI * 2) / particleCount;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('span');
                particle.className = 'click-particle';
                clickEffectContainer.appendChild(particle);

                const particleSize = Math.random() * 3 + 2.5;
                const travelDistance = Math.random() * 40 + 50;
                const angle = (i * angleIncrement) + (Math.random() * angleIncrement * 0.5 - angleIncrement * 0.25);
                const translateX = Math.cos(angle) * travelDistance;
                const translateY = Math.sin(angle) * travelDistance;
                const initialOffsetX = (Math.random() - 0.5) * 8;
                const initialOffsetY = (Math.random() - 0.5) * 8;

                particle.style.width = `${particleSize}px`;
                particle.style.height = `${particleSize}px`;
                particle.style.left = `${e.clientX - particleSize / 2 + initialOffsetX}px`;
                particle.style.top = `${e.clientY - particleSize / 2 + initialOffsetY}px`;
                particle.style.setProperty('--tx', `${translateX}px`);
                particle.style.setProperty('--ty', `${translateY}px`);

                particle.addEventListener('animationend', () => {
                    if (particle.parentElement) {
                        particle.remove();
                    }
                });
            }
        });
    }

    const year = new Date().getFullYear();
    if (currentYearSpan) currentYearSpan.textContent = year;
    if (currentYearSidebar) currentYearSidebar.textContent = year;


    function createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card anim-on-scroll';
        card.style.setProperty('--card-index', index);

        const languagesHtml = project.languagesUsed.map((lang, i) => {
            let iconClass = 'fas fa-code';
            const lowerLang = lang.toLowerCase();
            if (lowerLang.includes('javascript') || lowerLang === 'js') iconClass = 'fab fa-js-square';
            else if (lowerLang.includes('react')) iconClass = 'fab fa-react';
            else if (lowerLang.includes('node')) iconClass = 'fab fa-node-js';
            else if (lowerLang.includes('css')) iconClass = 'fab fa-css3-alt';
            else if (lowerLang.includes('html')) iconClass = 'fab fa-html5';
            else if (lowerLang.includes('python')) iconClass = 'fab fa-python';
            else if (lowerLang.includes('php')) iconClass = 'fab fa-php';
            else if (lowerLang.includes('java')) iconClass = 'fab fa-java';
            else if (lowerLang.includes('angular')) iconClass = 'fab fa-angular';
            else if (lowerLang.includes('vue')) iconClass = 'fab fa-vuejs';
            else if (lowerLang.includes('canvas')) iconClass = 'fas fa-palette';
            else if (lowerLang.includes('api')) iconClass = 'fas fa-cogs';
            else if (lowerLang.includes('typescript')) iconClass = 'fas fa-code';
            else if (lowerLang.includes('d3.js') || lowerLang.includes('d3')) iconClass = 'fas fa-chart-bar';
            else if (lowerLang.includes('mongodb')) iconClass = 'fas fa-database';
            else if (lowerLang.includes('storybook')) iconClass = 'fas fa-book-open';
            return `<div class="tech-tag" title="${lang}" style="--tag-index: ${i};"><i class="${iconClass}"></i> ${lang}</div>`;
        }).join('');

        let projectLinksHtml = '';
        if (project.liveDemoUrl || project.repoUrl) {
            projectLinksHtml += '<div class="project-links">';
            if (project.liveDemoUrl) {
                projectLinksHtml += `<a href="${project.liveDemoUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn"><i class="fas fa-eye"></i> معاينة</a>`;
            }
            if (project.repoUrl) {
                projectLinksHtml += `<a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn"><i class="fab fa-github"></i> الكود</a>`;
            }
            projectLinksHtml += '</div>';
        }

        card.innerHTML = `
            <div class="project-image-wrapper">
                <div class="image-placeholder-loader">
                    <div class="loader-spinner"></div>
                    <p>جارٍ تحميل الصورة...</p>
                </div>
                <img src="${project.imageUrl}" alt="${project.name}" loading="lazy" style="opacity:0;">
                <div class="project-image-overlay"></div>
            </div>
            <div class="project-card-content">
                <h4>${project.name}</h4>
                <p class="project-description">${project.description.substring(0, 90)}${project.description.length > 90 ? '...' : ''}</p>
                <div class="project-languages">
                     ${languagesHtml || `<div class="tech-tag">${project.languagesUsed.join(', ')}</div>`}
                 </div>
                 ${projectLinksHtml}
                <button class="btn show-details-btn" aria-label="عرض تفاصيل ${project.name}">
                    استكشف المشروع <i class="fas fa-arrow-left"></i>
                </button>
            </div>
        `;

        const imgElement = card.querySelector('img');
        const loaderElement = card.querySelector('.image-placeholder-loader');

        imgElement.onload = () => {
            if (loaderElement) loaderElement.style.display = 'none';
            imgElement.style.opacity = '1';
        };
        imgElement.onerror = () => {
            if (loaderElement) {
                loaderElement.innerHTML = '<p class="image-load-error"><i class="fas fa-exclamation-triangle"></i> فشل تحميل الصورة</p>';
            }
        };

        card.querySelector('.show-details-btn').addEventListener('click', () => openProjectModal(project));
        return card;
    }

    function displayProjects(projects, gridElement) {
        if (!gridElement) return;
        gridElement.classList.add('fade-out-grid');
        setTimeout(() => {
            gridElement.innerHTML = '';
            const noProjectsMessageElement = gridElement.querySelector('.no-projects-message') || document.createElement('p');
            noProjectsMessageElement.className = 'no-projects-message';
            noProjectsMessageElement.innerHTML = '<i class="fas fa-ghost"></i> لا توجد نتائج تطابق بحثك في هذا الكون.';
            
            if (projects.length === 0) {
                gridElement.appendChild(noProjectsMessageElement);
                noProjectsMessageElement.style.display = 'flex';
            } else {
                 if (gridElement.contains(noProjectsMessageElement)) noProjectsMessageElement.style.display = 'none';
                projects.forEach((project, index) => {
                    const card = createProjectCard(project, index);
                    gridElement.appendChild(card);
                    if (typeof animationObserver !== 'undefined' && animationObserver.observe) {
                        animationObserver.observe(card);
                    }
                });
            }
            gridElement.classList.remove('fade-out-grid');
        }, 300);
    }

    function getPaginationItems(currentPage, pageCount, threshold = VISIBLE_PAGINATION_BUTTONS_THRESHOLD) {
        if (pageCount <= threshold) {
            return Array.from({ length: pageCount }, (_, i) => i + 1);
        }
    
        const pageNumbers = [];
    
        pageNumbers.push(1); 
    
        const showPagesBeforeCurrent = currentPage <= 4;
        if (showPagesBeforeCurrent) {
            for (let i = 2; i <= Math.min(5, pageCount - 1); i++) { 
                pageNumbers.push(i);
            }
            if (pageCount > 5 && Math.min(5, pageCount -1) < pageCount -1) { 
                 pageNumbers.push('...');
            }
        } else {
            pageNumbers.push('...'); 
            pageNumbers.push(currentPage - 1);
            pageNumbers.push(currentPage);
            if (currentPage + 1 < pageCount) pageNumbers.push(currentPage + 1);
        }
    
        const isCurrentNearEnd = currentPage >= pageCount - 3;
        if (isCurrentNearEnd) {
            if (currentPage < pageCount - 1) { 
                for (let i = Math.max(2, pageCount - 4); i < pageCount; i++) {
                    if (!pageNumbers.includes(i)) pageNumbers.push(i);
                }
            }
        } else if (!showPagesBeforeCurrent && (currentPage + 1) < pageCount -1 ) { 
            pageNumbers.push('...');
        }
    
        if (pageCount > 1 && !pageNumbers.includes(pageCount)) pageNumbers.push(pageCount); 
    
        const finalItems = [];
        let lastPushed = null;
        for (const item of pageNumbers) {
            if (item === '...' && (lastPushed === '...' || lastPushed === null)) continue;
            if (typeof item === 'number' && item === lastPushed) continue;
            if (item === '...' && finalItems.length > 0 && typeof finalItems[finalItems.length - 1] === 'number') {
                const nextNumericIndex = pageNumbers.indexOf(item) + 1;
                if (nextNumericIndex < pageNumbers.length && typeof pageNumbers[nextNumericIndex] === 'number' &&
                    pageNumbers[nextNumericIndex] === finalItems[finalItems.length - 1] + 1) {
                    continue; 
                }
            }
            finalItems.push(item);
            lastPushed = item;
        }
        if (pageCount > 1 && !finalItems.includes(1)) finalItems.unshift(1);
        if (pageCount > 1 && !finalItems.includes(pageCount)) finalItems.push(pageCount);
        
        const uniqueFinalItems = [];
        const seen = new Set();
        for (const item of finalItems) {
            if (item === '...') {
                if (uniqueFinalItems.length > 0 && uniqueFinalItems[uniqueFinalItems.length - 1] === '...') continue;
                uniqueFinalItems.push(item);
            } else if (!seen.has(item)) {
                uniqueFinalItems.push(item);
                seen.add(item);
            }
        }
        let sortedAndCleaned = [];
        let tempChunk = [];
        for(const item of uniqueFinalItems) {
            if(typeof item === 'number') {
                tempChunk.push(item);
            } else {
                if(tempChunk.length > 0) {
                    sortedAndCleaned.push(...tempChunk.sort((a,b) => a-b));
                    tempChunk = [];
                }
                if (sortedAndCleaned.length === 0 || sortedAndCleaned[sortedAndCleaned.length - 1] !== '...') {
                     sortedAndCleaned.push(item);
                }
            }
        }
        if(tempChunk.length > 0) sortedAndCleaned.push(...tempChunk.sort((a,b) => a-b));
  
        let finalPassResult = [];
        for(let i=0; i<sortedAndCleaned.length; i++){
            if(sortedAndCleaned[i] === '...'){
                if(i > 0 && i < sortedAndCleaned.length -1 && 
                   typeof sortedAndCleaned[i-1] === 'number' && typeof sortedAndCleaned[i+1] === 'number' &&
                   sortedAndCleaned[i+1] === sortedAndCleaned[i-1] + 1){
                } else if (finalPassResult.length > 0 && finalPassResult[finalPassResult.length -1] === '...'){
                }
                 else {
                    finalPassResult.push(sortedAndCleaned[i]);
                }
            } else {
                finalPassResult.push(sortedAndCleaned[i]);
            }
        }
        if(finalPassResult.length > 0 && typeof finalPassResult[0] === 'number' && finalPassResult[0] !== 1 && pageCount > 0){
            if(!finalPassResult.includes(1)) {
                if(finalPassResult[0] === 2 && !finalPassResult.includes('...')){ 
                     finalPassResult.unshift(1);
                } else { 
                    finalPassResult.unshift(1);
                    if(finalPassResult[1] !== '...' && typeof finalPassResult[1] === 'number' && finalPassResult[1] > 2){
                        finalPassResult.splice(1,0,'...');
                    }
                }
            }
        }
        if(finalPassResult.length > 0 && typeof finalPassResult[finalPassResult.length-1] === 'number' && finalPassResult[finalPassResult.length-1] !== pageCount && pageCount > 1){
             if(!finalPassResult.includes(pageCount)){
                if(finalPassResult[finalPassResult.length-1] === pageCount -1 && !finalPassResult.includes('...')){
                    finalPassResult.push(pageCount);
                } else {
                    if (finalPassResult[finalPassResult.length-1] !== '...' && typeof finalPassResult[finalPassResult.length-1] === 'number' && finalPassResult[finalPassResult.length-1] < pageCount -1){
                         finalPassResult.push('...');
                    }
                    finalPassResult.push(pageCount);
                }
            }
        }
        return finalPassResult;
    }
  
    function setupPagination(totalItems, itemsPerPage, paginationElement, projectType, onPageChange) {
        if (!paginationElement) return;
        paginationElement.innerHTML = '';
        const paginationContainer = paginationElement.closest('.pagination-container');
        const pageCount = Math.ceil(totalItems / itemsPerPage);
  
        if (pageCount <= 1) {
             if(paginationContainer) paginationContainer.style.display = 'none';
             return;
        }
        if(paginationContainer) paginationContainer.style.display = 'flex';
  
        const currentPage = projectType === 'large' ? currentPageLarge : currentPageSmall;
  
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '<i class="fas fa-angle-double-right"></i>';
        prevButton.disabled = currentPage === 1;
        prevButton.setAttribute('aria-label', 'الصفحة السابقة');
        prevButton.addEventListener('click', () => {
            const newPage = projectType === 'large' ? currentPageLarge - 1 : currentPageSmall - 1;
            if (newPage >= 1) onPageChange(newPage);
        });
        paginationElement.appendChild(prevButton);
  
        const pageItems = getPaginationItems(currentPage, pageCount);
        pageItems.forEach(item => {
            if (typeof item === 'number') {
                const pageButton = document.createElement('button');
                pageButton.innerText = item;
                pageButton.setAttribute('aria-label', `صفحة ${item}`);
                if (item === currentPage) {
                    pageButton.classList.add('active');
                    pageButton.setAttribute('aria-current', 'page');
                }
                pageButton.addEventListener('click', () => onPageChange(item));
                paginationElement.appendChild(pageButton);
            } else { // '...'
                const ellipsisSpan = document.createElement('span');
                ellipsisSpan.classList.add('pagination-ellipsis');
                ellipsisSpan.innerHTML = '…';
                paginationElement.appendChild(ellipsisSpan);
            }
        });
        
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '<i class="fas fa-angle-double-left"></i>';
        nextButton.disabled = currentPage === pageCount;
        nextButton.setAttribute('aria-label', 'الصفحة التالية');
        nextButton.addEventListener('click', () => {
            const newPage = projectType === 'large' ? currentPageLarge + 1 : currentPageSmall + 1;
             if (newPage <= pageCount) onPageChange(newPage);
        });
        paginationElement.appendChild(nextButton);
    }
  
    function renderPaginatedProjects(projectType) {
        const projectsToPaginate = projectType === 'large' ? currentLargeProjects : currentSmallProjects;
        const currentPage = projectType === 'large' ? currentPageLarge : currentPageSmall;
        const gridElement = projectType === 'large' ? largeProjectsGrid : smallProjectsGrid;
        const paginationElement = projectType === 'large' ? largeProjectsPagination : smallProjectsPagination;
  
        if (!gridElement || !paginationElement) return;
  
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedItems = projectsToPaginate.slice(startIndex, endIndex);
  
        displayProjects(paginatedItems, gridElement);
        setupPagination(projectsToPaginate.length, ITEMS_PER_PAGE, paginationElement, projectType, (page) => {
            if (projectType === 'large') currentPageLarge = page;
            else currentPageSmall = page;
            renderPaginatedProjects(projectType);
            const sectionElement = document.getElementById(`${projectType}-projects-section`);
            if (sectionElement && header) {
                 const headerOffset = header.offsetHeight + 20;
                 const elementPosition = sectionElement.getBoundingClientRect().top;
                 const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                 window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    }
  
    function populateFilterOptions(projects, filterContainer, projectType, onFilterChange) {
        if (!filterContainer) return;
        const allLangs = new Set();
        const sourceProjects = allProjects.filter(p => p.type === projectType);
        sourceProjects.forEach(p => p.languagesUsed.forEach(lang => allLangs.add(lang)));
  
        filterContainer.innerHTML = ''; 
  
        if (allLangs.size === 0) return;
  
        allLangs.forEach(lang => {
            const button = document.createElement('button');
            button.classList.add('filter-btn');
            button.textContent = lang;
            button.dataset.lang = lang;
            const activeFilters = projectType === 'large' ? activeLargeFilters : activeSmallFilters;
            if (activeFilters.includes(lang)) {
                 button.classList.add('active');
            }
            button.addEventListener('click', () => {
                button.classList.toggle('active');
                updateActiveFilters(projectType);
                onFilterChange();
            });
            filterContainer.appendChild(button);
        });
    }
  
    function updateActiveFilters(projectType) {
        const filterContainer = projectType === 'large' ? largeProjectsFilterContainer : smallProjectsFilterContainer;
         if (!filterContainer) return;
        const activeButtons = filterContainer.querySelectorAll('button.filter-btn.active');
        const newActiveFilters = Array.from(activeButtons).map(btn => btn.dataset.lang);
  
        if (projectType === 'large') activeLargeFilters = newActiveFilters;
        else activeSmallFilters = newActiveFilters;
    }
  
    function filterProjects(projectType) {
        const baseProjects = allProjects.filter(p => p.type === projectType);
        const activeFilters = projectType === 'large' ? activeLargeFilters : activeSmallFilters;
        let filteredProjects;
  
        if (activeFilters.length === 0) {
            filteredProjects = baseProjects;
        } else {
            filteredProjects = baseProjects.filter(project =>
                activeFilters.every(filterLang => project.languagesUsed.includes(filterLang))
            );
        }
  
        if (projectType === 'large') {
            currentLargeProjects = filteredProjects;
            currentPageLarge = 1;
        } else {
            currentSmallProjects = filteredProjects;
            currentPageSmall = 1;
        }
        renderPaginatedProjects(projectType);
    }
  
    function addLineNumbers(codeElement, lineNumContainer) {
        if (!codeElement || !lineNumContainer) return;
        const codeText = codeElement.textContent || '';
        let lineCount = codeText.split('\n').length;
        if (codeText.endsWith('\n') && codeText.length > 0 && lineCount > 1) {
            lineCount -=1;
        }
        if(codeText.trim() === '' && lineCount > 0) lineCount = 1;
  
        lineNumContainer.innerHTML = '';
        for (let i = 1; i <= lineCount; i++) {
            const span = document.createElement('span');
            span.textContent = i;
            lineNumContainer.appendChild(span);
        }
    }
  
    function syncScroll(sourceScrollElement, targetScrollElement) {
        if (sourceScrollElement && targetScrollElement) {
            targetScrollElement.scrollTop = sourceScrollElement.scrollTop;
        }
    }
  
    if (codeDisplayArea) {
        codeDisplayArea.addEventListener('scroll', () => syncScroll(codeDisplayArea, lineNumbersContainer));
    }
    if (fullscreenCodeDisplayArea) { 
        fullscreenCodeDisplayArea.addEventListener('scroll', () => syncScroll(fullscreenCodeDisplayArea, fullscreenCodeLineNumbers));
    }
  
  
    function openProjectModal(project) {
        if (isModalOpen || !modal) return;
        isModalOpen = true;
        currentModalProject = project;
  
        modalProjectTitle.textContent = project.name;
        modalProjectDescription.innerHTML = project.description;
        
        const modalImageContainer = modalProjectImage.closest('.modal-image-container');
        const modalLoader = modalImageContainer ? modalImageContainer.querySelector('.image-placeholder-loader') : null;
        
        if (modalLoader) modalLoader.style.display = 'flex';
        modalProjectImage.style.opacity = '0'; 
        modalProjectImage.src = ''; 
  
        setTimeout(() => {
            modalProjectImage.src = project.detailsImageUrl || project.imageUrl;
            modalProjectImage.alt = project.name;
  
            modalProjectImage.onload = () => {
                if (modalLoader) modalLoader.style.display = 'none';
                modalProjectImage.style.opacity = '1';
            };
            modalProjectImage.onerror = () => {
                if (modalLoader) {
                    modalLoader.innerHTML = '<p class="image-load-error"><i class="fas fa-exclamation-triangle"></i> فشل تحميل الصورة</p>';
                }
            };
        }, 50);
  
  
        modalCodeLanguageTabs.innerHTML = '';
        modalProjectCode.textContent = '';
        if (lineNumbersContainer) lineNumbersContainer.innerHTML = '';
  
        const languages = Object.keys(project.codeSnippets || {});
        const codeActionsDiv = fullscreenCodeButton ? fullscreenCodeButton.closest('.code-actions') : null;
  
  
        if (languages.length > 0 && project.codeSnippets[languages[0]]) {
            if(codeActionsDiv) codeActionsDiv.style.display = 'flex';
            if(copyCodeButton) copyCodeButton.style.display = 'flex';
            if (fullscreenCodeButton) fullscreenCodeButton.style.display = 'flex';
  
            languages.forEach((lang, index) => {
                const tabButton = document.createElement('button');
                tabButton.textContent = lang;
                tabButton.addEventListener('click', (e) => switchCodeLanguage(lang, e.currentTarget));
                modalCodeLanguageTabs.appendChild(tabButton);
                if (index === 0) {
                    currentCodeLanguageInModal = lang; 
                    requestAnimationFrame(() => {
                        if(isModalOpen && currentModalProject === project && modalCodeLanguageTabs.firstChild) {
                           switchCodeLanguage(lang, modalCodeLanguageTabs.firstChild.nodeName === 'BUTTON' ? modalCodeLanguageTabs.firstChild : tabButton);
                        }
                    });
                }
            });
        } else {
             modalProjectCode.textContent = 'لا يوجد كود متاح لهذا المشروع.\n';
             modalProjectCode.className = 'hljs';
             delete modalProjectCode.dataset.highlighted;
             if (typeof hljs !== 'undefined') {
                hljs.highlightElement(modalProjectCode);
             }
             if (lineNumbersContainer) addLineNumbers(modalProjectCode, lineNumbersContainer);
             if(codeActionsDiv) codeActionsDiv.style.display = 'none';
             if(copyCodeButton) copyCodeButton.style.display = 'none';
             if (fullscreenCodeButton) fullscreenCodeButton.style.display = 'none';
        }

        // Add project links to modal
        if (modalProjectLinksContainer) {
            modalProjectLinksContainer.innerHTML = ''; 
            if (project.liveDemoUrl || project.repoUrl) {
                if (project.liveDemoUrl) {
                    const demoLink = document.createElement('a');
                    demoLink.href = project.liveDemoUrl;
                    demoLink.target = '_blank';
                    demoLink.rel = 'noopener noreferrer';
                    demoLink.className = 'project-link-btn btn btn-secondary';
                    demoLink.innerHTML = '<i class="fas fa-eye"></i> معاينة مباشرة';
                    modalProjectLinksContainer.appendChild(demoLink);
                }
                if (project.repoUrl) {
                    const repoLink = document.createElement('a');
                    repoLink.href = project.repoUrl;
                    repoLink.target = '_blank';
                    repoLink.rel = 'noopener noreferrer';
                    repoLink.className = 'project-link-btn btn btn-secondary';
                    repoLink.innerHTML = '<i class="fab fa-github"></i> الكود المصدري';
                    modalProjectLinksContainer.appendChild(repoLink);
                }
            }
        }
  
        modal.style.display = 'block';
        body.classList.add('modal-open');
        modal.scrollTop = 0;
        if (codeDisplayArea) codeDisplayArea.scrollTop = 0;
        if (lineNumbersContainer) lineNumbersContainer.scrollTop = 0;
        trapFocus(modal);
    }
  
    function closeModal() {
        if (!isModalOpen || !modal) return;
        isModalOpen = false;
        modal.classList.add('closing');
        modal.addEventListener('animationend', () => {
            modal.style.display = 'none';
            modal.classList.remove('closing');
            if (!isFullscreenModalOpen && !isFullscreenCodeModalOpen) {
                body.classList.remove('modal-open');
            }
            currentModalProject = null;
            if(modalProjectCode) modalProjectCode.textContent = '';
            if (lineNumbersContainer) lineNumbersContainer.innerHTML = '';
            currentCodeLanguageInModal = '';
        }, { once: true });
    }
    
    function _switchCodeLanguageSharedLogic(language, activeButton, targetCodeElement, targetLineNumbersContainer, targetCodeDisplayArea, project, tabsContainer) {
        if (!project || !project.codeSnippets || !targetCodeElement) {
            if (targetCodeElement) {
                targetCodeElement.textContent = 'لا توجد مقتطفات كود لهذا المشروع.\n';
                targetCodeElement.className = 'hljs';
                delete targetCodeElement.dataset.highlighted;
                if (typeof hljs !== 'undefined') hljs.highlightElement(targetCodeElement);
            }
            if (targetLineNumbersContainer) addLineNumbers(targetCodeElement, targetLineNumbersContainer);
            return;
        }
        
        const codeSnippet = project.codeSnippets[language];
    
        if (tabsContainer) {
            tabsContainer.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            if(activeButton) activeButton.classList.add('active');
        }
        
        targetCodeElement.textContent = codeSnippet || `الكود غير متوفر للغة ${language}.\n`;
        targetCodeElement.className = 'hljs'; 
        delete targetCodeElement.dataset.highlighted; 
    
        if (typeof hljs !== 'undefined') {
            hljs.highlightElement(targetCodeElement);
        }
    
        if (targetLineNumbersContainer) addLineNumbers(targetCodeElement, targetLineNumbersContainer);
        if (targetCodeDisplayArea) targetCodeDisplayArea.scrollTop = 0;
        if (targetLineNumbersContainer) targetLineNumbersContainer.scrollTop = 0;
    
        const associatedCopyButton = targetCodeElement.id.includes('fullscreen') ? copyCodeButtonFullscreen : copyCodeButton;
        const associatedCopyButtonTextElement = targetCodeElement.id.includes('fullscreen') ? copyCodeButtonFullscreenText : copyCodeButtonText;
        
        if (associatedCopyButton) {
            associatedCopyButton.classList.remove('copied');
            if (associatedCopyButtonTextElement) associatedCopyButtonTextElement.textContent = associatedCopyButton.id.includes('fullscreen') ? 'نسخ الكود' : 'نسخ';
            const iconElement = associatedCopyButton.querySelector('i');
            if (iconElement) iconElement.className = 'fas fa-copy';
             if (associatedCopyButton && !targetCodeElement.id.includes('fullscreen')) associatedCopyButton.setAttribute('aria-live', 'polite');
        }
    }
  
  
    function switchCodeLanguage(language, activeButton) {
        currentCodeLanguageInModal = language; 
        _switchCodeLanguageSharedLogic(language, activeButton, modalProjectCode, lineNumbersContainer, codeDisplayArea, currentModalProject, modalCodeLanguageTabs);
    }
  
  
    if (copyCodeButton) {
        copyCodeButton.addEventListener('click', () => {
            if(!modalProjectCode) return;
            const codeToCopy = modalProjectCode.textContent;
            if (codeToCopy && !codeToCopy.startsWith('لا يوجد كود') && !codeToCopy.startsWith('الكود غير متوفر')) {
                navigator.clipboard.writeText(codeToCopy)
                    .then(() => {
                        copyCodeButton.classList.add('copied');
                        if(copyCodeButtonText) copyCodeButtonText.textContent = 'تم النسخ!';
                        copyCodeButton.querySelector('i').className = 'fas fa-check-circle';
                        copyCodeButton.setAttribute('aria-live', 'assertive');
                        setTimeout(() => {
                             copyCodeButton.classList.remove('copied');
                             if(copyCodeButtonText) copyCodeButtonText.textContent = 'نسخ';
                             copyCodeButton.querySelector('i').className = 'fas fa-copy';
                             copyCodeButton.setAttribute('aria-live', 'polite');
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Failed to copy code: ', err);
                        if(copyCodeButtonText) copyCodeButtonText.textContent = 'خطأ';
                         copyCodeButton.querySelector('i').className = 'fas fa-times-circle';
                    });
            }
        });
    }
  
    if (modalProjectImage) {
        const interactiveImageContainer = modalProjectImage.closest('.interactive-image');
        if (interactiveImageContainer) {
            interactiveImageContainer.addEventListener('click', () => {
                 if (!isModalOpen || !modalProjectImage.src || !fullscreenModal) return;
                 isFullscreenModalOpen = true;
                 fullscreenImage.src = modalProjectImage.src;
                 fullscreenModal.style.display = 'flex';
                 body.classList.add('modal-open');
                 trapFocus(fullscreenModal);
            });
        }
    }
  
  
    function closeFullscreenModal() {
         if (!isFullscreenModalOpen || !fullscreenModal) return;
         isFullscreenModalOpen = false;
         fullscreenModal.classList.add('closing');
         fullscreenModal.addEventListener('animationend', () => {
             fullscreenModal.style.display = 'none';
             fullscreenModal.classList.remove('closing');
             if (!isModalOpen && !isFullscreenCodeModalOpen) {
                body.classList.remove('modal-open');
             }
             if (isModalOpen && modal) {
                  const imageContainer = modalProjectImage ? modalProjectImage.closest('.interactive-image') : null;
                  if (imageContainer) imageContainer.focus();
                  else modal.focus(); 
             } else if (document.activeElement === fullscreenModal || (fullscreenModal && fullscreenModal.contains(document.activeElement))) {
                document.body.focus(); // Fallback
             }
         }, { once: true });
    }
  
    function openFullscreenCodeModal() {
        if (!currentModalProject || isFullscreenCodeModalOpen || !fullscreenCodeModal) return;
        isFullscreenCodeModalOpen = true;
  
        fullscreenCodeTabs.innerHTML = ''; 
  
        const languages = Object.keys(currentModalProject.codeSnippets || {});
        let firstLangButtonToActivate = null;
        let languageToActivate = currentCodeLanguageInModal || (languages.length > 0 ? languages[0] : null);
  
  
        languages.forEach((lang) => {
            const tabButton = document.createElement('button');
            tabButton.textContent = lang;
            tabButton.addEventListener('click', (e) => switchCodeLanguageFullscreen(lang, e.currentTarget));
            fullscreenCodeTabs.appendChild(tabButton);
            if (lang === languageToActivate) {
                firstLangButtonToActivate = tabButton;
            }
        });
        
        fullscreenCodeModal.style.display = 'flex';
        body.classList.add('modal-open');
        
        if (languageToActivate && firstLangButtonToActivate) {
            requestAnimationFrame(() => { 
                 if (isFullscreenCodeModalOpen) {
                    switchCodeLanguageFullscreen(languageToActivate, firstLangButtonToActivate);
                 }
            });
        } else { 
            fullscreenCodeElement.textContent = 'لا يوجد كود متاح لهذا المشروع.\n';
            fullscreenCodeElement.className = 'hljs';
            delete fullscreenCodeElement.dataset.highlighted;
            if (typeof hljs !== 'undefined') hljs.highlightElement(fullscreenCodeElement);
            if (fullscreenCodeLineNumbers) addLineNumbers(fullscreenCodeElement, fullscreenCodeLineNumbers);
        }
        
        trapFocus(fullscreenCodeModal);
        if (fullscreenCodeDisplayArea) fullscreenCodeDisplayArea.scrollTop = 0;
        if (fullscreenCodeLineNumbers) fullscreenCodeLineNumbers.scrollTop = 0;
    }
  
    function closeFullscreenCodeModal() {
        if (!isFullscreenCodeModalOpen || !fullscreenCodeModal) return;
        isFullscreenCodeModalOpen = false;
        fullscreenCodeModal.classList.add('closing');
        fullscreenCodeModal.addEventListener('animationend', () => {
            fullscreenCodeModal.style.display = 'none';
            fullscreenCodeModal.classList.remove('closing');
            if (!isModalOpen && !isFullscreenModalOpen) {
                body.classList.remove('modal-open');
            }
            if (isModalOpen && modal && fullscreenCodeButton) {
                fullscreenCodeButton.focus();
            } else if (document.activeElement === fullscreenCodeModal || (fullscreenCodeModal && fullscreenCodeModal.contains(document.activeElement))) {
                 document.body.focus(); 
            }
        }, { once: true });
    }
  
    function switchCodeLanguageFullscreen(language, activeButton) {
        _switchCodeLanguageSharedLogic(language, activeButton, fullscreenCodeElement, fullscreenCodeLineNumbers, fullscreenCodeDisplayArea, currentModalProject, fullscreenCodeTabs);
    }
  
  
    if (fullscreenCodeButton) {
        fullscreenCodeButton.addEventListener('click', openFullscreenCodeModal);
    }
    if (closeFullscreenCodeButton) {
        closeFullscreenCodeButton.addEventListener('click', closeFullscreenCodeModal);
    }
  
    if (copyCodeButtonFullscreen) {
        copyCodeButtonFullscreen.addEventListener('click', () => {
            if(!fullscreenCodeElement) return;
            const codeToCopy = fullscreenCodeElement.textContent;
            if (codeToCopy && !codeToCopy.startsWith('لا يوجد كود') && !codeToCopy.startsWith('الكود غير متوفر')) {
                navigator.clipboard.writeText(codeToCopy)
                    .then(() => {
                        copyCodeButtonFullscreen.classList.add('copied');
                        if(copyCodeButtonFullscreenText) copyCodeButtonFullscreenText.textContent = 'تم النسخ!';
                        copyCodeButtonFullscreen.querySelector('i').className = 'fas fa-check-circle';
                        setTimeout(() => {
                             copyCodeButtonFullscreen.classList.remove('copied');
                             if(copyCodeButtonFullscreenText) copyCodeButtonFullscreenText.textContent = 'نسخ الكود';
                             copyCodeButtonFullscreen.querySelector('i').className = 'fas fa-copy';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Failed to copy fullscreen code: ', err);
                        if(copyCodeButtonFullscreenText) copyCodeButtonFullscreenText.textContent = 'خطأ';
                        copyCodeButtonFullscreen.querySelector('i').className = 'fas fa-times-circle';
                    });
            }
        });
    }
  
  
    if(closeModalButton) closeModalButton.addEventListener('click', closeModal);
    if(closeFullscreenButton) closeFullscreenButton.addEventListener('click', closeFullscreenModal);
  
    window.addEventListener('click', (event) => {
        if (welcomePopupOverlay && welcomePopupOverlay.classList.contains('show') && event.target === welcomePopupOverlay) {
            hideWelcomePopup();
        } else if (isFullscreenCodeModalOpen && event.target === fullscreenCodeModal) {
            closeFullscreenCodeModal();
        } else if (isFullscreenModalOpen && event.target === fullscreenModal) {
            closeFullscreenModal();
        } else if (isModalOpen && event.target === modal) {
            closeModal();
        }
        
        if (mobileSidebar && mobileSidebar.classList.contains('active') && event.target === sidebarOverlay) {
            closeSidebar();
        }
    });
  
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (welcomePopupOverlay && welcomePopupOverlay.classList.contains('show')) {
                hideWelcomePopup();
            } else if (isFullscreenCodeModalOpen) {
                closeFullscreenCodeModal();
            } else if (isFullscreenModalOpen) {
                closeFullscreenModal();
            } else if (isModalOpen) {
                closeModal();
            } else if (mobileSidebar && mobileSidebar.classList.contains('active')) {
                closeSidebar();
            }
        }
    });
  
    function openSidebar() {
        if (!mobileSidebar || mobileSidebar.classList.contains('active')) return;
        body.classList.add('sidebar-open-transition');
        mobileSidebar.style.display = 'flex';
        requestAnimationFrame(() => {
            mobileSidebar.classList.add('active');
            if(sidebarOverlay) sidebarOverlay.classList.add('active');
        });
        if(mobileMenuToggle) {
          mobileMenuToggle.classList.add('active');
          mobileMenuToggle.setAttribute('aria-expanded', 'true');
        }
        mobileSidebar.setAttribute('aria-hidden', 'false');
        body.classList.add('sidebar-open');
        trapFocus(mobileSidebar);
    }
  
    function closeSidebar() {
        if (!mobileSidebar || !mobileSidebar.classList.contains('active')) return;
        if(mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        mobileSidebar.classList.remove('active');
        if(sidebarOverlay) sidebarOverlay.classList.remove('active');
        if(mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileSidebar.setAttribute('aria-hidden', 'true');
  
        let sidebarClosed = false;
        const onSidebarTransitionEnd = (event) => {
            if (event.target === mobileSidebar && (event.propertyName === 'transform' || event.propertyName === 'opacity')) {
                if (sidebarClosed) return;
                sidebarClosed = true;
                
                body.classList.remove('sidebar-open');
                body.classList.remove('sidebar-open-transition');
                mobileSidebar.style.display = 'none';
            }
        };
        mobileSidebar.addEventListener('transitionend', onSidebarTransitionEnd, {once: true});
        
        setTimeout(() => {
            if (!mobileSidebar.classList.contains('active') && !sidebarClosed) {
                if (mobileSidebar.style.display !== 'none') { 
                    body.classList.remove('sidebar-open');
                    body.classList.remove('sidebar-open-transition');
                    mobileSidebar.style.display = 'none';
                }
            }
        }, 500); 
  
  
        if(mobileMenuToggle && (document.activeElement === mobileSidebar || (mobileSidebar && mobileSidebar.contains(document.activeElement)))) {
            mobileMenuToggle.focus();
        }
    }
  
    if(mobileMenuToggle) {
      mobileMenuToggle.addEventListener('click', () => {
          if (mobileSidebar && mobileSidebar.classList.contains('active')) {
              closeSidebar();
          } else {
              openSidebar();
          }
      });
    }
    if(closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
  
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            const targetHref = this.getAttribute('href');
            sidebarLinks.forEach(sLink => sLink.classList.remove('active'));
            this.classList.add('active');

            allNavLinks.forEach(navLink => { // Use allNavLinks for broader update
                 navLink.classList.toggle('active', navLink.getAttribute('href') === targetHref);
            });
             if (navHighlighter) updateNavHighlighter(); 
            if (mobileSidebar && mobileSidebar.classList.contains('active')) {
                closeSidebar();
            }
        });
    });
  
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, { threshold: 0.05 });
  
    function updateNavHighlighter() {
        if (!navHighlighter || window.innerWidth < 769) { 
            if(navHighlighter) navHighlighter.style.opacity = '0';
            return;
        }
        const activeDesktopLink = document.querySelector('.desktop-nav .nav-link.active');
        if (activeDesktopLink) {
            const linkLi = activeDesktopLink.parentElement; 
            if (linkLi && navHighlighter.parentElement === linkLi.parentElement) { // Ensure highlighter is child of UL
                navHighlighter.style.width = `${linkLi.offsetWidth}px`;
                navHighlighter.style.left = `${linkLi.offsetLeft}px`;
                navHighlighter.style.opacity = '1';
            } else {
                 navHighlighter.style.opacity = '0';
            }
        } else {
            navHighlighter.style.opacity = '0'; 
        }
    }
  
    // Section observer for active nav link - REVISED AND IMPROVED
    const sectionsForNavHighlight = [ // Use the correct IDs from your HTML
        document.getElementById('hero'),
        document.getElementById('projects'), // This should be the main projects section container if filters apply to sub-sections
        document.getElementById('skills-galaxy'),
        document.getElementById('faq'),
        document.getElementById('support-me'),
        document.getElementById('contact')
    ].filter(section => section !== null);

    if (sectionsForNavHighlight.length > 0) {
        const navObserverOptions = {
            root: null, // observes intersections relative to the viewport
            rootMargin: `-${(header ? header.offsetHeight : 65) + 30}px 0px -${window.innerHeight - (header ? header.offsetHeight : 65) - 150}px 0px`, // Top offset for header, bottom offset to make it more "centered"
            threshold: 0 // Trigger as soon as any part enters/leaves the "detection zone"
        };

        let lastActiveSectionId = null; // To avoid flickering

        const navObserverCallback = (entries) => {
            entries.forEach(entry => {
                const sectionId = entry.target.id;
                if (entry.isIntersecting) {
                    lastActiveSectionId = sectionId;
                }
            });

            // If no section is actively intersecting (e.g., scrolling fast between sections),
            // we might still have a lastActiveSectionId. If not, default to hero if at top.
            let finalActiveId = lastActiveSectionId;
            if (!finalActiveId && window.pageYOffset < (sectionsForNavHighlight[0]?.offsetTop || 200) / 2) {
                 finalActiveId = 'hero';
            }


            allNavLinks.forEach(link => {
                const linkHref = link.getAttribute('href');
                if (linkHref === `#${finalActiveId}`) {
                    link.classList.add('active');
                    if (link.closest('.desktop-nav')) {
                        updateNavHighlighter();
                    }
                } else {
                    link.classList.remove('active');
                }
            });
            // If no section is deemed active (e.g. after fast scroll and lastActiveSectionId is null)
            // and navHighlighter is visible, hide it.
            const anyDesktopLinkActive = document.querySelector('.desktop-nav .nav-link.active');
            if (!anyDesktopLinkActive && navHighlighter) {
                 navHighlighter.style.opacity = '0';
            }
        };

        const navObserver = new IntersectionObserver(navObserverCallback, navObserverOptions);
        sectionsForNavHighlight.forEach(section => navObserver.observe(section));
    }


    function handleScrollStyling() { // Renamed from handleScroll
        const scrollY = window.pageYOffset;
        const isScrolled = scrollY > 30;
        body.classList.toggle('scrolled', isScrolled);
  
        if (header) {
            if (isScrolled) {
                header.classList.remove('floating-header-initial');
            } else {
                header.classList.add('floating-header-initial');
            }
        }
    }
    let scrollStylingTimeout; // Renamed from scrollTimeout
    window.addEventListener('scroll', () => {
        clearTimeout(scrollStylingTimeout);
        scrollStylingTimeout = setTimeout(handleScrollStyling, 50); // Call the renamed function
    }, { passive: true });
    if(header) header.classList.add('floating-header-initial');
  
  
    function trapFocus(element) {
         if(!element) return;
         const focusableEls = element.querySelectorAll(
             'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="email"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
         );
         
         let firstFocusableEl = focusableEls[0];
         if (focusableEls.length === 0 && element === welcomePopupOverlay && element.hasAttribute('tabindex')) {
             firstFocusableEl = element;
         } else if (focusableEls.length === 0) {
             return; 
         }
         const lastFocusableEl = focusableEls.length > 0 ? focusableEls[focusableEls.length - 1] : firstFocusableEl;
  
         setTimeout(() => {
            if (element.style.display !== 'none' && 
                (element.classList.contains('show') || element.classList.contains('active') || element === modal || element === fullscreenModal || element === fullscreenCodeModal) && 
                firstFocusableEl && typeof firstFocusableEl.focus === 'function') {
                if(!element.contains(document.activeElement) || document.activeElement === body ) { 
                    firstFocusableEl.focus(); 
                 }
            }
         }, 250); 
  
  
         element.addEventListener('keydown', function(e) {
             const isTabPressed = e.key === 'Tab' || e.keyCode === 9;
             if (!isTabPressed) return;
  
             if (e.shiftKey) {
                 if (document.activeElement === firstFocusableEl) {
                     lastFocusableEl.focus();
                     e.preventDefault();
                 }
             } else {
                 if (document.activeElement === lastFocusableEl) {
                     firstFocusableEl.focus();
                     e.preventDefault();
                 }
             }
         });
    }
  
    function populateSkillsGalaxy() {
        if (!skillsGridContainer) return;
        skillsData.forEach((skill, index) => {
            const skillElement = document.createElement('div');
            skillElement.className = 'skill-orb anim-on-scroll';
            skillElement.style.setProperty('--skill-index', index);
            skillElement.style.setProperty('--skill-color', skill.color || 'var(--deep-purple-accent)');
  
            // Removed skill.description from here
            skillElement.innerHTML = `
                <div class="skill-icon"><i class="${skill.icon}"></i></div>
                <div class="skill-name">${skill.name}</div>
                <div class="skill-level-bar-container">
                    <div class="skill-level-bar" style="width: ${skill.level || 0}%;"></div>
                </div>
            `;
            skillsGridContainer.appendChild(skillElement);
            if (typeof animationObserver !== 'undefined' && animationObserver.observe) {
              animationObserver.observe(skillElement);
            }
        });
    }
  
    // ----- Cosmic Gate Welcome Popup Logic -----
    function createGateSpark(container, side) {
        if (!container) return;
        const spark = document.createElement('div');
        spark.classList.add('gate-spark');

        const size = Math.random() * 3 + 1; 
        spark.style.width = `${size}px`;
        spark.style.height = `${size}px`;
        
        let tx, ty, initialX, initialY;

        switch(side) {
            case 'top':
                initialX = `${Math.random() * 100}%`;
                initialY = `0%`;
                tx = `${(Math.random() - 0.5) * 60}px`; 
                ty = `${Math.random() * -30 - 10}px`;   
                break;
            case 'bottom':
                initialX = `${Math.random() * 100}%`;
                initialY = `100%`;
                tx = `${(Math.random() - 0.5) * 60}px`;
                ty = `${Math.random() * 30 + 10}px`;    
                break;
            case 'left':
                initialX = `0%`;
                initialY = `${Math.random() * 100}%`;
                tx = `${Math.random() * -30 - 10}px`;   
                ty = `${(Math.random() - 0.5) * 60}px`; 
                break;
            case 'right':
                initialX = `100%`;
                initialY = `${Math.random() * 100}%`;
                tx = `${Math.random() * 30 + 10}px`;    
                ty = `${(Math.random() - 0.5) * 60}px`;
                break;
        }
        
        spark.style.left = initialX;
        spark.style.top = initialY;
        spark.style.setProperty('--tx', tx);
        spark.style.setProperty('--ty', ty);
        spark.style.animationDelay = `${Math.random() * 0.5 + 0.8}s`; 

        container.appendChild(spark);

        spark.addEventListener('animationend', () => {
            if (spark.parentElement) spark.remove();
        });
    }

    function triggerGateSparks() {
        const sparksPerSide = 15;
        Object.keys(sparkContainers).forEach(side => {
            const container = sparkContainers[side];
            if (container) {
                for (let i = 0; i < sparksPerSide; i++) {
                    createGateSpark(container, side);
                }
            }
        });
    }
 
    function showWelcomePopup() {
        if (!welcomePopupOverlay) return;
        body.classList.add('modal-open'); 
        welcomePopupOverlay.style.display = 'flex'; 
        
        setTimeout(() => { 
            welcomePopupOverlay.classList.add('show');
            setTimeout(triggerGateSparks, 1000); 
            setTimeout(() => trapFocus(welcomePopupOverlay), 1200); 
        }, 50); 
    }
 
    function hideWelcomePopup() {
        if (!welcomePopupOverlay || !welcomePopupOverlay.classList.contains('show')) return;
        
        if (!isModalOpen && !isFullscreenModalOpen && !isFullscreenCodeModalOpen) { 
            body.classList.remove('modal-open');
        }
        welcomePopupOverlay.classList.remove('show'); 
        
        const onPopupHide = (event) => {
            if (event.target === welcomePopupOverlay && event.propertyName === 'opacity') {
                if (parseFloat(window.getComputedStyle(welcomePopupOverlay).opacity) === 0) {
                    welcomePopupOverlay.style.display = 'none';
                    welcomePopupOverlay.removeEventListener('transitionend', onPopupHide);
                    startHeroAnimations(); 
                }
            }
        };
        welcomePopupOverlay.addEventListener('transitionend', onPopupHide);
        
        setTimeout(() => {
            if (!welcomePopupOverlay.classList.contains('show') && welcomePopupOverlay.style.display !== 'none') {
                welcomePopupOverlay.style.display = 'none';
                startHeroAnimations(); 
            }
        }, 700); 
    }

    // ----- FAQ Section Logic -----
    const faqQuestionButtons = document.querySelectorAll('.faq-question-btn');
    const faqAnswerContentDisplay = document.getElementById('faq-answer-content-display');
    const faqInitialMessage = document.querySelector('.faq-answer-area .faq-initial-message');

    if (faqQuestionButtons.length > 0 && faqAnswerContentDisplay && faqInitialMessage) {
        faqQuestionButtons.forEach(button => {
            button.addEventListener('click', () => {
                faqQuestionButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                faqInitialMessage.style.display = 'none';
                const answerId = button.dataset.answerId;
                const answerTemplate = document.getElementById(answerId);
                if (answerTemplate) {
                    faqAnswerContentDisplay.innerHTML = answerTemplate.innerHTML;
                    faqAnswerContentDisplay.classList.remove('active-answer'); 
                    void faqAnswerContentDisplay.offsetWidth; 
                    faqAnswerContentDisplay.classList.add('active-answer');
                } else {
                    faqAnswerContentDisplay.innerHTML = '<p>عفواً، لم يتم العثور على إجابة لهذا السؤال.</p>';
                    faqAnswerContentDisplay.classList.add('active-answer');
                }
            });
        });
    }

    // ----- Support Me - Copy Address/ID Logic -----
    const allCopyButtons = document.querySelectorAll('.copy-address-btn, .copy-id-btn');

    allCopyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const dataToCopy = button.dataset.address || button.dataset.id;
            const copyTextSpan = button.querySelector('.copy-btn-text');
            const originalButtonText = copyTextSpan ? copyTextSpan.textContent : 'نسخ';
            const iconElement = button.querySelector('i');
            const originalIconClass = iconElement ? iconElement.className : 'fas fa-copy';

            navigator.clipboard.writeText(dataToCopy).then(() => {
                if (copyTextSpan) copyTextSpan.textContent = 'تم النسخ!';
                if (iconElement) iconElement.className = 'fas fa-check';
                button.classList.add('copied');

                setTimeout(() => {
                    if (copyTextSpan) copyTextSpan.textContent = originalButtonText;
                     if (iconElement) iconElement.className = originalIconClass;
                    button.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                const inputField = button.closest('.crypto-address-display, .payment-id-display').querySelector('input[type="text"]');
                if (inputField) {
                    inputField.select();
                    inputField.setSelectionRange(0, 99999);
                    try {
                        document.execCommand('copy');
                        if (copyTextSpan) copyTextSpan.textContent = 'تم النسخ!';
                        if (iconElement) iconElement.className = 'fas fa-check';
                        button.classList.add('copied');
                        setTimeout(() => {
                            if (copyTextSpan) copyTextSpan.textContent = originalButtonText;
                             if (iconElement) iconElement.className = originalIconClass;
                            button.classList.remove('copied');
                        }, 2000);
                    } catch (execErr) {
                        console.error('Fallback copy failed: ', execErr);
                        alert('فشل النسخ. يرجى النسخ يدوياً.');
                    }
                } else {
                    alert('فشل النسخ. يرجى النسخ يدوياً.');
                }
            });
        });
    });


    function init() {
         currentLargeProjects = allProjects.filter(p => p.type === 'large');
         currentSmallProjects = allProjects.filter(p => p.type === 'small');
  
        if (largeProjectsFilterContainer) {
            populateFilterOptions(currentLargeProjects, largeProjectsFilterContainer, 'large', () => filterProjects('large'));
        }
        if (smallProjectsFilterContainer) {
            populateFilterOptions(currentSmallProjects, smallProjectsFilterContainer, 'small', () => filterProjects('small'));
        }
  
        populateSkillsGalaxy();
        renderPaginatedProjects('large');
        renderPaginatedProjects('small');
        
        document.querySelectorAll('.mobile-filter-accordion summary').forEach(summary => {
            summary.addEventListener('click', () => { 
                const detailsElement = summary.closest('details');
                if (detailsElement) {
                    setTimeout(() => {
                        const isOpen = detailsElement.open;
                        summary.setAttribute('aria-expanded', isOpen.toString());
                        const content = detailsElement.querySelector('.filter-container');
                        if (content) {
                            content.setAttribute('aria-hidden', (!isOpen).toString());
                        }
                    }, 0);
                }
            });
            const detailsElement = summary.closest('details');
             if (detailsElement) {
                const isOpen = detailsElement.hasAttribute('open');
                summary.setAttribute('aria-expanded', isOpen.toString());
                const content = detailsElement.querySelector('.filter-container');
                if (content) {
                    content.setAttribute('aria-hidden', (!isOpen).toString());
                }
            }
        });
  
  
        document.querySelectorAll('.anim-on-scroll').forEach(el => {
          if (typeof animationObserver !== 'undefined' && animationObserver.observe) {
              animationObserver.observe(el);
          }
        });
  
        handleScrollStyling(); 
        if (navHighlighter) updateNavHighlighter(); 
        // Remove the click listener from navLinksForHighlighter as IntersectionObserver handles it better.
        // navLinksForHighlighter.forEach(link => {
        //     link.addEventListener('click', function() { /* ... */ });
        // });
  
  
        if (modal) modal.style.display = 'none';
        if (fullscreenModal) fullscreenModal.style.display = 'none';
        if (fullscreenCodeModal) fullscreenCodeModal.style.display = 'none';
        if (welcomePopupOverlay) welcomePopupOverlay.style.display = 'none'; 
        isModalOpen = false;
        isFullscreenModalOpen = false;
        isFullscreenCodeModalOpen = false;
  
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const targetId = this.getAttribute('href');
                if (targetId.length > 1 && targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        e.preventDefault();
  
                        if (mobileSidebar && mobileSidebar.classList.contains('active') && mobileSidebar.contains(this)) {
                            closeSidebar();
                        }
                        
                        let headerOffset = header ? header.offsetHeight : 65;
                        if (header && !body.classList.contains('scrolled')) {
                           headerOffset += parseInt(getComputedStyle(header).getPropertyValue('--header-top-margin'), 10) || 0;
                        }
                        headerOffset += 25; 
  
                        const elementPosition = targetElement.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                        
                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                         setTimeout(() => {
                             targetElement.setAttribute('tabindex', '-1'); 
                             targetElement.focus({ preventScroll: true }); 
                         }, 700); 
                    }
                }
            });
        });
  
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.querySelectorAll('input, textarea').forEach(input => {
                const label = input.nextElementSibling;
                if (label && label.tagName === 'LABEL' && label.classList.contains('form-label-terminal')) {
                    input.addEventListener('focus', () => label.classList.add('active'));
                    input.addEventListener('blur', () => {
                        if (input.value === '' || input.value === input.placeholder) { 
                            label.classList.remove('active');
                        }
                    });
                    if (input.value !== '' && input.value !== input.placeholder) {
                        label.classList.add('active');
                    }
                }
            });
  
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const buttonText = submitButton.querySelector('.btn-text');
                const buttonIcon = submitButton.querySelector('.btn-icon-transmit i');
  
                submitButton.disabled = true;
                submitButton.classList.add('submitting');
                if (buttonText) buttonText.textContent = 'جاري الإرسال...';
                if (buttonIcon) buttonIcon.className = 'fas fa-spinner fa-spin';
  
                setTimeout(() => {
                    alert('تم إرسال إشارتك بنجاح عبر الفضاء!'); 
                    contactForm.reset();
                    contactForm.querySelectorAll('.form-label-terminal.active').forEach(label => label.classList.remove('active'));
                    contactForm.querySelectorAll('input, textarea').forEach(input => {
                          const label = input.nextElementSibling;
                          if (label && label.tagName === 'LABEL' && label.classList.contains('form-label-terminal')) {
                               if (input.value === '' || input.value === input.placeholder) {
                                  label.classList.remove('active');
                              } else {
                                  label.classList.add('active'); 
                              }
                          }
                      });
  
  
                    submitButton.disabled = false;
                    submitButton.classList.remove('submitting');
                    if (buttonText) {
                        buttonText.innerHTML = 'إرسال الإشارة <span class="transmit-dots">...</span>';
                    }
                    if (buttonIcon) buttonIcon.className = 'fas fa-space-shuttle';
                }, 2000);
            });
        }
        console.log("zelhoria Portfolio - Cosmic Genesis Initialized!");
    }
  
    function startHeroAnimations() {
        const heroTitle = document.querySelector('.hero-title-animated');
        const heroCtaLinks = document.querySelectorAll('.hero-cta-animated'); 
        
        if (heroTitle) setTimeout(() => heroTitle.classList.add('animate-in'), 0);
        if (heroDynamicSubtitle) setTimeout(() => heroDynamicSubtitle.classList.add('animate-in'), 200);
        heroCtaLinks.forEach((cta, index) => { 
            setTimeout(() => cta.classList.add('animate-in'), 400 + (index * 150)); 
        });
        
        if (heroDynamicSubtitle) {
            if (subtitleInterval) clearInterval(subtitleInterval); 
            subtitleInterval = setInterval(changeHeroSubtitle, 7000);
        }
    }
  
  
    function hidePreloader() {
        if (preloader) {
            let preloaderHidden = false; 

            const onActualPreloaderHidden = () => {
                if (preloaderHidden) return;
                preloaderHidden = true;

                if (window.preloaderFallbackTimeoutId) {
                    clearTimeout(window.preloaderFallbackTimeoutId);
                    delete window.preloaderFallbackTimeoutId;
                }
                
                if (preloader && preloader.parentElement) {
                    preloader.remove();
                }
                if (welcomePopupOverlay) {
                    showWelcomePopup();
                } else {
                    startHeroAnimations();
                }
            };

            preloader.classList.add('loaded');

            const handleTransitionEnd = (event) => {
                if (event.target === preloader && event.propertyName === 'opacity') {
                    if (parseFloat(window.getComputedStyle(preloader).opacity) < 0.01) {
                        onActualPreloaderHidden();
                    }
                }
            };
            
            preloader.addEventListener('transitionend', handleTransitionEnd, { once: true });
            window.preloaderFallbackTimeoutId = setTimeout(() => {
                if (!preloaderHidden && preloader.classList.contains('loaded')) { 
                    console.warn('Preloader fallback: Forcing hide after timeout because transitionend did not fire or complete as expected.');
                    onActualPreloaderHidden();
                }
            }, 1200);

        } else { 
            if (welcomePopupOverlay) {
                showWelcomePopup();
            } else {
                startHeroAnimations();
            }
        }
    }
  
    window.addEventListener('load', () => {
        let minPreloadTime = 2200;
        const loadStartTime = performance.now();

        const checkParticlesAndInit = (callback) => {
            if (!window.particleCheckCount) window.particleCheckCount = 0;
            window.particleCheckCount++;

            const particlesReady = (typeof particlesJS !== 'undefined' && 
                                   window.pJSDom && 
                                   window.pJSDom[0] && 
                                   window.pJSDom[0].pJS && 
                                   window.pJSDom[0].pJS.particles && 
                                   window.pJSDom[0].pJS.particles.array.length > 0);
            
            const particlesNotUsed = (typeof particlesJS === 'undefined');

            if (particlesReady || particlesNotUsed) {
                if (window.particleCheckCount) delete window.particleCheckCount; 
                callback();
            } else if (window.particleCheckCount > 50) { 
                console.warn("Particles.js did not initialize fully after 5 seconds. Proceeding without them fully loaded.");
                if (window.particleCheckCount) delete window.particleCheckCount; 
                callback(); 
            } else {
                setTimeout(() => checkParticlesAndInit(callback), 100);
            }
        };

        checkParticlesAndInit(() => {
            init(); 
            const timeElapsed = performance.now() - loadStartTime;
            const remainingTime = Math.max(0, minPreloadTime - timeElapsed);
            
            setTimeout(hidePreloader, remainingTime);
        });
    });
  
  });