document.addEventListener('DOMContentLoaded', () => {
    const preloader = document.getElementById('preloader');
    const body = document.body;
    const heroDynamicSubtitle = document.getElementById('hero-dynamic-subtitle');

    const dynamicSubtitles = [
        "Zaifrix، حيث تتحول المعرفة إلى رؤى مضيئة تسافر بك عبر عوالم الاستكشاف.",
        "نصنع المستقبل الرقمي، فكرة بفكرة، نص بنص، في مجرة الإبداع اللامحدود.",
        "بوابتك لاستكشاف آفاق المعرفة وحلول فكرية تتجاوز التوقعات.",
        "من الأفكار الأولية إلى الإدراك الكوني، نرافقك في كل خطوة نحو التنوير.",
        "دعنا نحول رؤيتك إلى واقع ملموس يتألق في سماء الفكر الواسعة."
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
    
    const allTexts = [
        {
            id: 1, title: 'مقدمة في علوم الفضاء', level: 1, axis: 'علوم أساسية', 
            description: 'نص تأسيسي يستكشف المبادئ الأولية لعلوم الفضاء وتاريخ استكشاف الكون.',
            content: {
                introduction: "يهدف هذا النص إلى تزويد القارئ بفهم أساسي للمفاهيم الجوهرية في علوم الفضاء...",
                topic: [ { title: "الكواكب والأقمار", text: "يتعمق هذا الجزء في دراسة الكواكب..." }, { title: "الأقمار الصناعية", text: "يناقش هذا الجزء أهمية الأقمار الصناعية..." } ],
                units: "الوحدة الأولى: تاريخ استكشاف الفضاء...",
                questions: [ { questionTitle: "ما هي أهمية علوم الفضاء؟", answer: "تساهم دراسة علوم الفضاء..." } ]
            }
        },
        {
            id: 2, title: 'أساسيات البرمجة', level: 1, axis: 'تقنيات متقدمة',
            description: 'نص تعليمي يغطي المفاهيم الأساسية للبرمجة.',
            content: {
                introduction: "مرحبًا بك في عالم البرمجة!",
                topic: "سنتعلم عن المتغيرات، وأنواع البيانات...",
                units: "الوحدة 1: ما هي البرمجة؟...",
                questions: [ { questionTitle: "ما هو المتغير؟", answer: "المتغير هو اسم رمزي..." } ]
            }
        },
        {
            id: 3, title: 'تاريخ الحضارات المجرية', level: 2, axis: 'فلسفة كونية',
            description: 'استعراض لتاريخ الحضارات المتقدمة عبر المجرات.',
            content: {
                introduction: "يأخذنا هذا النص في رحلة عبر الزمن...",
                topic: [ { title: "الحضارات الرئيسية", text: "سنركز على ثلاث حضارات..." }, { title: "التأثير الثقافي", text: "سنتناول التأثيرات الثقافية..." } ],
                units: "الفصل الأول: فجر الحضارات...",
                questions: [ { questionTitle: "أبرز سمات حضارة الأوريون؟", answer: "اشتهرت بتقدمها الروحي..." } ]
            }
        },
        {
            id: 4, title: 'فيزياء الثقوب السوداء', level: 3, axis: 'علوم أساسية',
            description: 'مقدمة مبسطة للظواهر الفيزيائية المتعلقة بالثقوب السوداء.',
            content: {
                introduction: "استكشف أكثر الأجرام غموضًا في الكون.",
                topic: "سنتناول تكوين الثقوب السوداء، وأنواعها المختلفة...",
                units: "1. ما هو الثقب الأسود؟\n2. كيف تتكون الثقوب السوداء؟...",
                questions: [ { questionTitle: "ما هو أفق الحدث؟", answer: "أفق الحدث هو الحدود..." } ]
            }
        },
        { id: 5, title: 'النص الخامس مستوى 1', level: 1, axis: 'علوم أساسية', description: 'وصف للنص 5.', content: { introduction: 'مقدمة 5', topic: 'موضوع 5', units: 'وحدات 5', questions: [] } },
        { id: 6, title: 'النص السادس مستوى 1', level: 1, axis: 'تقنيات متقدمة', description: 'وصف للنص 6.', content: { introduction: 'مقدمة 6', topic: 'موضوع 6', units: 'وحدات 6', questions: [] } },
        { id: 7, title: 'النص السابع مستوى 2', level: 2, axis: 'فلسفة كونية', description: 'وصف للنص 7.', content: { introduction: 'مقدمة 7', topic: 'موضوع 7', units: 'وحدات 7', questions: [] } },
        { id: 8, title: 'النص الثامن مستوى 4', level: 4, axis: 'علوم أساسية', description: 'وصف للنص 8.', content: { introduction: 'مقدمة 8', topic: 'موضوع 8', units: 'وحدات 8', questions: [] } },
        { id: 9, title: 'النص التاسع مستوى 4', level: 4, axis: 'تقنيات متقدمة', description: 'وصف للنص 9.', content: { introduction: 'مقدمة 9', topic: 'موضوع 9', units: 'وحدات 9', questions: [] } },
        { id: 10, title: 'النص العاشر مستوى 1', level: 1, axis: 'علوم أساسية', description: 'وصف للنص 10.', content: { introduction: 'مقدمة 10', topic: 'موضوع 10', units: 'وحدات 10', questions: [] } },
        { id: 11, title: 'النص الحادي عشر مستوى 1', level: 1, axis: 'علوم أساسية', description: 'وصف للنص 11.', content: { introduction: 'مقدمة 11', topic: 'موضوع 11', units: 'وحدات 11', questions: [] } },
        { id: 12, title: 'النص الثاني عشر مستوى 1', level: 1, axis: 'فلسفة كونية', description: 'وصف للنص 12.', content: { introduction: 'مقدمة 12', topic: 'موضوع 12', units: 'وحدات 12', questions: [] } },
    ];


    const ITEMS_PER_PAGE = 6;
    const VISIBLE_PAGINATION_BUTTONS_THRESHOLD = 7; 

    const header = document.getElementById('main-header');
    const textGrids = {};
    const textPaginations = {};
    const textFilterContainers = {};
    const currentTextsByLevel = {};
    const currentPageByLevel = {};
    const activeFiltersByLevel = {};

    for (let i = 1; i <= 7; i++) {
        textGrids[`level${i}`] = document.getElementById(`level${i}-texts-grid`);
        textPaginations[`level${i}`] = document.getElementById(`level${i}-texts-pagination`);
        textFilterContainers[`level${i}`] = document.querySelector(`#level${i}-texts-filter-content`);
        currentTextsByLevel[`level${i}`] = [];
        currentPageByLevel[`level${i}`] = 1;
        activeFiltersByLevel[`level${i}`] = ['الكل']; 
    }

    const textModal = document.getElementById('text-modal');
    const modalTextTitle = document.getElementById('modal-text-title');
    const modalTextTabs = document.querySelectorAll('.modal-tab-btn');
    const modalTextContents = document.querySelectorAll('.modal-tab-content');
    
    const modalTopicOptions = document.getElementById('modal-topic-options');
    const modalTopicContentDisplayArea = document.getElementById('modal-topic-content-display-area');
    const modalTopicSelectedContent = document.getElementById('modal-topic-selected-content');

    const modalQuestionOptions = document.getElementById('modal-question-options');
    const modalQuestionAnswerArea = document.getElementById('modal-question-answer-area');
    const modalAnswerTextContent = document.getElementById('modal-answer-text-content');
    const closeTextModalButton = textModal ? textModal.querySelector('.close-button') : null;


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
    const navLinksForHighlighter = document.querySelectorAll('.desktop-nav .nav-link');
    
    const intersectionObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.05
    };
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, intersectionObserverOptions);

    let currentOpenText = null;
    let isTextModalOpen = false;

    // Cosmic Gate Welcome Popup Variables
    const welcomePopupOverlay = document.getElementById('welcome-popup');
    // closeWelcomePopupButton is removed
    const sparkContainers = {
        top: document.getElementById('gate-spark-container-top'),
        bottom: document.getElementById('gate-spark-container-bottom'),
        left: document.getElementById('gate-spark-container-left'),
        right: document.getElementById('gate-spark-container-right')
    };


    if (typeof particlesJS !== 'undefined') {
        particlesJS.load('particles-js', 'particles-config.json', () => {});
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
            // Prevent click effect if clicking inside the welcome gate itself
            if (e.target.closest('button, a, input, textarea, .text-card, .modal, .mobile-sidebar, .welcome-popup-gate')) {
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
                    if (particle.parentElement) particle.remove();
                });
            }
        });
    }

    const year = new Date().getFullYear();
    if (currentYearSpan) currentYearSpan.textContent = year;
    if (currentYearSidebar) currentYearSidebar.textContent = year;

    function createTextCard(textItem, index) {
        const card = document.createElement('div');
        card.className = 'text-card anim-on-scroll';
        card.style.setProperty('--card-index', index);

        const axisHtml = `<div class="axis-tag" title="المحور: ${textItem.axis}"><i class="fas fa-compass"></i> ${textItem.axis}</div>`;

        card.innerHTML = `
            <div class="text-card-content">
                <h4>${textItem.title}</h4>
                <p class="text-description">${textItem.description.substring(0, 100)}${textItem.description.length > 100 ? '...' : ''}</p>
                <div class="text-meta">
                     ${axisHtml}
                 </div>
                <button class="btn show-details-btn" aria-label="استعراض ${textItem.title}">
                    استعرض النص <i class="fas fa-arrow-left"></i>
                </button>
            </div>
        `;
        
        card.querySelector('.show-details-btn').addEventListener('click', () => openTextModal(textItem));
        return card;
    }

    function displayTexts(texts, gridElement) { 
        if (!gridElement) return;
        gridElement.classList.add('fade-out-grid');
        setTimeout(() => {
            gridElement.innerHTML = '';
            if (texts.length === 0) {
                const levelMatch = gridElement.id.match(/\d+/);
                const level = levelMatch ? parseInt(levelMatch[0]) : 0;
                const activeFilters = activeFiltersByLevel[`level${level}`] || ['الكل'];
                const baseTextsForLevel = allTexts.filter(t => t.level === level);

                if (baseTextsForLevel.length === 0) {
                    gridElement.innerHTML = '<p class="no-texts-message info-message"><i class="fas fa-hourglass-half"></i> سيتم توفير النصوص هنا قريبًا.</p>';
                } else if (activeFilters && activeFilters.length > 0 && !activeFilters.includes('الكل')) {
                    gridElement.innerHTML = '<p class="no-texts-message"><i class="fas fa-ghost"></i> لا توجد نصوص تطابق بحثك في هذا المحور.</p>';
                } else {
                     gridElement.innerHTML = '<p class="no-texts-message info-message"><i class="fas fa-hourglass-half"></i> يبدو أنه لا توجد نصوص حاليًا لهذا المستوى أو الفلتر.</p>';
                }
            } else {
                texts.forEach((textItem, index) => {
                    const card = createTextCard(textItem, index);
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


    function setupPaginationForLevel(level, totalItems, itemsPerPage, onPageChange) { 
        const paginationElement = textPaginations[`level${level}`];
        if (!paginationElement) return;
        paginationElement.innerHTML = '';
        const paginationContainer = paginationElement.closest('.pagination-container');
        const pageCount = Math.ceil(totalItems / itemsPerPage);

        if (pageCount <= 1) {
             if(paginationContainer) paginationContainer.style.display = 'none';
             return;
        }
        if(paginationContainer) paginationContainer.style.display = 'flex';

        const currentPage = currentPageByLevel[`level${level}`];

        const prevButton = document.createElement('button');
        prevButton.innerHTML = '<i class="fas fa-angle-double-right"></i>';
        prevButton.disabled = currentPage === 1;
        prevButton.setAttribute('aria-label', 'الصفحة السابقة');
        prevButton.addEventListener('click', () => {
            const newPage = currentPageByLevel[`level${level}`] - 1;
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
            } else { 
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
            const newPage = currentPageByLevel[`level${level}`] + 1;
             if (newPage <= pageCount) onPageChange(newPage);
        });
        paginationElement.appendChild(nextButton);
    }

    function renderPaginatedTexts(level) { 
        const textsToPaginate = currentTextsByLevel[`level${level}`];
        const currentPage = currentPageByLevel[`level${level}`];
        const gridElement = textGrids[`level${level}`];
        
        if (!gridElement ) return;

        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const paginatedItems = textsToPaginate.slice(startIndex, endIndex);

        displayTexts(paginatedItems, gridElement);
        setupPaginationForLevel(level, textsToPaginate.length, ITEMS_PER_PAGE, (page) => {
            currentPageByLevel[`level${level}`] = page;
            renderPaginatedTexts(level);
            const sectionElement = document.getElementById(`level${level}-texts-section`);
            if (sectionElement && header) {
                 const headerOffset = header.offsetHeight + 20;
                 const elementPosition = sectionElement.getBoundingClientRect().top;
                 const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                 window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    }

    function populateFilterOptionsForLevel(level, onFilterChange) {
        const filterContainer = textFilterContainers[`level${level}`];
        if (!filterContainer) return false;

        const textsForLevel = allTexts.filter(t => t.level === level);
        const detailsElement = filterContainer.closest('details.mobile-filter-accordion');

        if (textsForLevel.length === 0) { 
            if (detailsElement) detailsElement.style.display = 'none';
            
            const gridElement = textGrids[`level${level}`];
            if (gridElement) {
                gridElement.innerHTML = '<p class="no-texts-message info-message"><i class="fas fa-hourglass-half"></i> سيتم توفير النصوص هنا قريبًا.</p>';
            }
            
            const paginationForLevel = textPaginations[`level${level}`];
            if (paginationForLevel) {
                const paginationContainerElement = paginationForLevel.closest('.pagination-container');
                if (paginationContainerElement) paginationContainerElement.style.display = 'none';
            }
            return false; 
        } else if (detailsElement) {
            detailsElement.style.display = 'block'; 
        }

        const allAxes = new Set();
        textsForLevel.forEach(t => allAxes.add(t.axis));
        filterContainer.innerHTML = '';

        const allButton = document.createElement('button');
        allButton.classList.add('filter-btn');
        allButton.textContent = 'الكل';
        allButton.dataset.axis = 'الكل';
        if (activeFiltersByLevel[`level${level}`].length === 0 || activeFiltersByLevel[`level${level}`].includes('الكل')) {
            allButton.classList.add('active');
        }
        allButton.addEventListener('click', () => {
            filterContainer.querySelectorAll('button.filter-btn[data-axis]:not([data-axis="الكل"])').forEach(btn => btn.classList.remove('active'));
            if (!allButton.classList.contains('active')) {
                allButton.classList.add('active');
            }
            activeFiltersByLevel[`level${level}`] = ['الكل'];
            onFilterChange();
        });
        filterContainer.appendChild(allButton);

        const uniqueAxes = Array.from(allAxes);
        uniqueAxes.sort();

        uniqueAxes.forEach(axis => {
            const button = document.createElement('button');
            button.classList.add('filter-btn');
            button.textContent = axis;
            button.dataset.axis = axis;
            if (activeFiltersByLevel[`level${level}`].includes(axis) && !activeFiltersByLevel[`level${level}`].includes('الكل')) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => {
                const allBtnInContainer = filterContainer.querySelector('button.filter-btn[data-axis="الكل"]');
                if (allBtnInContainer) {
                    allBtnInContainer.classList.remove('active');
                }
                filterContainer.querySelectorAll('button.filter-btn[data-axis]:not([data-axis="الكل"])').forEach(btn => {
                    if (btn !== button) { 
                        btn.classList.remove('active');
                    }
                });
                if (!button.classList.contains('active')) {
                    button.classList.add('active');
                }
                activeFiltersByLevel[`level${level}`] = [button.dataset.axis];
                onFilterChange();
            });
            filterContainer.appendChild(button);
        });
        return true; 
    }

    function filterTextsByLevel(level) { 
        const baseTexts = allTexts.filter(t => t.level === level);
        const activeFilters = activeFiltersByLevel[`level${level}`]; 
        let filteredTexts;
        
        const gridElement = textGrids[`level${level}`]; 

        if (baseTexts.length === 0 && gridElement) { 
            gridElement.innerHTML = '<p class="no-texts-message info-message"><i class="fas fa-hourglass-half"></i> سيتم توفير النصوص هنا قريبًا.</p>';
            const paginationForLevel = textPaginations[`level${level}`];
            if (paginationForLevel) {
                const paginationContainerElement = paginationForLevel.closest('.pagination-container');
                if (paginationContainerElement) paginationContainerElement.style.display = 'none';
            }
            return;
        }

        if (activeFilters.length === 0 || activeFilters.includes('الكل')) {
            filteredTexts = baseTexts;
        } else {
            filteredTexts = baseTexts.filter(textItem =>
                activeFilters.includes(textItem.axis) 
            );
        }
        currentTextsByLevel[`level${level}`] = filteredTexts;
        currentPageByLevel[`level${level}`] = 1;
        renderPaginatedTexts(level);
    }

    function openTextModal(textItem) {
        if (isTextModalOpen || !textModal) return;
        isTextModalOpen = true;
        currentOpenText = textItem;

        if (modalTextTitle) modalTextTitle.textContent = textItem.title;

        const introductionContentEl = document.getElementById('modal-text-introduction-content');
        const topicOptionsGridEl = document.getElementById('modal-topic-options');
        const topicContentDisplayAreaEl = document.getElementById('modal-topic-content-display-area');
        const topicSelectedContentEl = document.getElementById('modal-topic-selected-content');
        const unitsContentEl = document.getElementById('modal-text-units-content');

        if(introductionContentEl) introductionContentEl.textContent = textItem.content.introduction;
        if(unitsContentEl) unitsContentEl.textContent = textItem.content.units;
        
        if(topicOptionsGridEl) topicOptionsGridEl.innerHTML = '';
        if(topicContentDisplayAreaEl) topicContentDisplayAreaEl.style.display = 'none';
        if(topicSelectedContentEl) topicSelectedContentEl.textContent = '';

        if (Array.isArray(textItem.content.topic)) { 
            if (topicOptionsGridEl) topicOptionsGridEl.style.display = 'grid';
            if (textItem.content.topic.length > 0) {
                textItem.content.topic.forEach((subTopic, index) => {
                    const topicButton = document.createElement('button');
                    topicButton.classList.add('topic-option-btn'); 
                    topicButton.textContent = subTopic.title;
                    topicButton.addEventListener('click', () => {
                        if(topicOptionsGridEl) topicOptionsGridEl.querySelectorAll('.topic-option-btn').forEach(btn => btn.classList.remove('active'));
                        topicButton.classList.add('active');
                        if(topicSelectedContentEl) topicSelectedContentEl.textContent = subTopic.text;
                        if(topicContentDisplayAreaEl) topicContentDisplayAreaEl.style.display = 'block';
                    });
                    if (topicOptionsGridEl) topicOptionsGridEl.appendChild(topicButton);
                    if (index === 0) { 
                        setTimeout(() => topicButton.click(), 0); 
                    }
                });
            } else if (topicOptionsGridEl) {
                topicOptionsGridEl.innerHTML = '<p>لا توجد مواضيع فرعية متاحة.</p>';
            }
        } else if (typeof textItem.content.topic === 'string') { 
            if(topicOptionsGridEl) topicOptionsGridEl.style.display = 'none'; 
            if(topicSelectedContentEl) topicSelectedContentEl.textContent = textItem.content.topic;
            if(topicContentDisplayAreaEl) topicContentDisplayAreaEl.style.display = 'block';
        }


        if (modalQuestionOptions) modalQuestionOptions.innerHTML = '';
        if (modalQuestionAnswerArea) modalQuestionAnswerArea.style.display = 'none';
        if(modalAnswerTextContent) modalAnswerTextContent.textContent = '';

        if (textItem.content.questions && textItem.content.questions.length > 0) {
            textItem.content.questions.forEach((q) => {
                const qButton = document.createElement('button');
                qButton.classList.add('question-option-btn');
                qButton.textContent = q.questionTitle;
                qButton.addEventListener('click', () => {
                    if (modalQuestionOptions) {
                        modalQuestionOptions.querySelectorAll('.question-option-btn').forEach(btn => btn.classList.remove('active'));
                    }
                    qButton.classList.add('active');
                    if(modalAnswerTextContent) modalAnswerTextContent.textContent = q.answer;
                    if (modalQuestionAnswerArea) modalQuestionAnswerArea.style.display = 'block';
                });
                if (modalQuestionOptions) modalQuestionOptions.appendChild(qButton);
            });
        } else if (modalQuestionOptions) {
            modalQuestionOptions.innerHTML = '<p>لا توجد أسئلة متاحة لهذا النص.</p>';
        }

        modalTextTabs.forEach(tab => tab.classList.remove('active'));
        modalTextContents.forEach(content => content.classList.remove('active-text-content'));
        
        const firstTabButton = modalTextTabs[0];
        if (firstTabButton) {
            firstTabButton.classList.add('active');
            const firstTabContentId = `modal-text-${firstTabButton.dataset.tabId}`;
            const firstTabContent = document.getElementById(firstTabContentId);
            if (firstTabContent) {
                firstTabContent.classList.add('active-text-content');
            }
        }
        
        textModal.style.display = 'block';
        body.classList.add('modal-open');
        textModal.scrollTop = 0; 
        trapFocus(textModal);
    }

    function closeTextModal() {
        if (!isTextModalOpen || !textModal) return;
        isTextModalOpen = false;
        textModal.classList.add('closing');
        textModal.addEventListener('animationend', () => {
            textModal.style.display = 'none';
            textModal.classList.remove('closing');
            body.classList.remove('modal-open');
            currentOpenText = null;
        }, { once: true });
    }

    modalTextTabs.forEach(tabButton => {
        tabButton.addEventListener('click', () => {
            modalTextTabs.forEach(btn => btn.classList.remove('active'));
            tabButton.classList.add('active');

            const tabTargetId = `modal-text-${tabButton.dataset.tabId}`;
            modalTextContents.forEach(content => {
                content.classList.remove('active-text-content');
                if (content.id === tabTargetId) {
                    content.classList.add('active-text-content');
                }
            });
            if (tabButton.dataset.tabId !== 'questions' && modalQuestionAnswerArea) {
                modalQuestionAnswerArea.style.display = 'none';
                if (modalQuestionOptions) {
                     modalQuestionOptions.querySelectorAll('.question-option-btn').forEach(btn => btn.classList.remove('active'));
                }
            }
            if (tabButton.dataset.tabId !== 'topic' && modalTopicContentDisplayArea) {
                modalTopicContentDisplayArea.style.display = 'none';
                 if (modalTopicOptions) {
                     modalTopicOptions.querySelectorAll('.topic-option-btn').forEach(btn => btn.classList.remove('active'));
                }
            }
        });
    });
    
    if(closeTextModalButton) closeTextModalButton.addEventListener('click', closeTextModal);


    window.addEventListener('click', (event) => {
        if (welcomePopupOverlay && welcomePopupOverlay.classList.contains('show') && event.target === welcomePopupOverlay) {
            hideWelcomePopup();
        } else if (isTextModalOpen && event.target === textModal) {
            closeTextModal();
        } else if (mobileSidebar && mobileSidebar.classList.contains('active') && event.target === sidebarOverlay) {
            closeSidebar();
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            if (welcomePopupOverlay && welcomePopupOverlay.classList.contains('show')) { 
                hideWelcomePopup();
            } else if (isTextModalOpen) {
                closeTextModal();
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
            if (sidebarOverlay) sidebarOverlay.classList.add('active');
        });
        if (mobileMenuToggle) {
            mobileMenuToggle.classList.add('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'true');
        }
        mobileSidebar.setAttribute('aria-hidden', 'false');
        body.classList.add('sidebar-open');
        trapFocus(mobileSidebar);
    }

    function closeSidebar() {
        if (!mobileSidebar || !mobileSidebar.classList.contains('active')) return;
        if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
        mobileSidebar.classList.remove('active');
        if (sidebarOverlay) sidebarOverlay.classList.remove('active');
        if (mobileMenuToggle) mobileMenuToggle.setAttribute('aria-expanded', 'false');
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
        link.addEventListener('click', () => {
            const targetHref = link.getAttribute('href');
            document.querySelectorAll('.desktop-nav .nav-link').forEach(navLink => {
                 navLink.classList.toggle('active', navLink.getAttribute('href') === targetHref);
            });
             if (navHighlighter) updateNavHighlighter(); 
            if (mobileSidebar && mobileSidebar.classList.contains('active')) {
                closeSidebar();
            }
        });
    });


    function updateNavHighlighter() {
         if (!navHighlighter || window.innerWidth < 769) { 
            if(navHighlighter) navHighlighter.style.opacity = '0';
            return;
        }
        const activeLink = document.querySelector('.desktop-nav .nav-link.active');
        if (activeLink) {
            const linkLi = activeLink.parentElement; 
            if (linkLi && navHighlighter.parentElement === linkLi.parentElement) {
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


    function handleScroll() {
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

        let currentSectionId = 'hero';
        const sections = document.querySelectorAll( 
            '#hero[id], main#texts-observatory[id], #contact[id]'
        );

        let headerHeightOffset = header ? header.offsetHeight : 65; 
        if (header && body.classList.contains('scrolled')) { 
             headerHeightOffset += 10;
        } else if (header) { 
            headerHeightOffset += (parseInt(getComputedStyle(header).getPropertyValue('--header-top-margin'), 10) || 0) + 10;
        }
        headerHeightOffset += 20; 

        sections.forEach(section => {
            if (section) {
                const sectionTop = section.offsetTop - headerHeightOffset;
                if (scrollY >= sectionTop) {
                    currentSectionId = section.getAttribute('id');
                }
            }
        });
        
        if (currentSectionId.startsWith('level') && currentSectionId.endsWith('-texts-section')) {
            currentSectionId = 'texts-observatory';
        }


        document.querySelectorAll('.nav-link, .sidebar-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
        if (navHighlighter) updateNavHighlighter();
    }
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(handleScroll, 50);
    }, { passive: true });
    if(header) header.classList.add('floating-header-initial');


    function trapFocus(element) {
         if (!element) return;
         const focusableEls = element.querySelectorAll(
             'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="email"]:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
         );
         
         let firstFocusableEl = focusableEls[0];
         if (focusableEls.length === 0 && element === welcomePopupOverlay) { // Specific for welcome popup if no internal focusable
             if (element.getAttribute('tabindex') === null) {
                 element.setAttribute('tabindex', '-1'); 
             }
             firstFocusableEl = element;
         } else if (focusableEls.length === 0) { // Generic for other modals
             return; // If no focusable elements, do nothing
         }

         const lastFocusableEl = focusableEls.length > 0 ? focusableEls[focusableEls.length - 1] : firstFocusableEl;


         setTimeout(() => {
            if (element.style.display !== 'none' && 
                (element.classList.contains('show') || element.classList.contains('active') || element.classList.contains('modal-open')) && 
                firstFocusableEl && typeof firstFocusableEl.focus === 'function') {
                if(!element.contains(document.activeElement) || document.activeElement === body ) { 
                    firstFocusableEl.focus(); 
                 }
            }
         }, 250); // Delay to allow animations to settle


         element.addEventListener('keydown', function(e) {
             const isTabPressed = e.key === 'Tab' || e.keyCode === 9;
             if (!isTabPressed) return;

             if (e.shiftKey) { // Shift + Tab
                 if (document.activeElement === firstFocusableEl) {
                     lastFocusableEl.focus();
                     e.preventDefault();
                 }
             } else { // Tab
                 if (document.activeElement === lastFocusableEl) {
                     firstFocusableEl.focus();
                     e.preventDefault();
                 }
             }
         });
    }

    // --- Cosmic Gate Welcome Popup Logic ---
    function createGateSpark(container, side) {
        if (!container) return;
        const spark = document.createElement('div');
        spark.classList.add('gate-spark');

        const size = Math.random() * 3 + 1; // 1px to 4px
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
                // Clear any previous sparks if re-triggering (though not expected here)
                // while (container.firstChild) {
                //     container.removeChild(container.firstChild);
                // }
                for (let i = 0; i < sparksPerSide; i++) {
                    createGateSpark(container, side);
                }
            }
        });
    }
 
    function showWelcomePopup() {
        if (!welcomePopupOverlay) return;
        body.classList.add('welcome-popup-open'); // was modal-open
        welcomePopupOverlay.style.display = 'flex'; 
        
        setTimeout(() => { 
            welcomePopupOverlay.classList.add('show');
            setTimeout(triggerGateSparks, 1000); // Delay sparks until gate animation is well underway
            setTimeout(() => trapFocus(welcomePopupOverlay), 1200); 
        }, 50); 
    }
 
    function hideWelcomePopup() {
        if (!welcomePopupOverlay || !welcomePopupOverlay.classList.contains('show')) return;
        
        body.classList.remove('welcome-popup-open'); // was modal-open
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
        }, 700); // Match or slightly exceed CSS transition time for opacity
    }
 
    // Removed closeWelcomePopupButton related code

    function init() {
        for (let i = 1; i <= 7; i++) {
            const sectionElement = document.getElementById(`level${i}-texts-section`);
            if (!sectionElement) continue;
    
            sectionElement.style.display = 'block'; 
    
            const filterContainer = textFilterContainers[`level${i}`];
            let levelHasContentOrFilterUI = false; 
    
            if (filterContainer) {
                levelHasContentOrFilterUI = populateFilterOptionsForLevel(i, () => filterTextsByLevel(i));
            } else {
                levelHasContentOrFilterUI = allTexts.some(t => t.level === i);
            }
    
            if (levelHasContentOrFilterUI) {
                filterTextsByLevel(i); 
            } else if (!filterContainer) {
                const gridElement = textGrids[`level${i}`];
                if (gridElement) {
                    gridElement.innerHTML = '<p class="no-texts-message info-message"><i class="fas fa-hourglass-half"></i> سيتم توفير النصوص هنا قريبًا.</p>';
                }
                const paginationForLevel = textPaginations[`level${i}`];
                if (paginationForLevel) {
                    const paginationContainerElement = paginationForLevel.closest('.pagination-container');
                    if (paginationContainerElement) paginationContainerElement.style.display = 'none';
                }
            }
        }
        
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

        handleScroll(); 
        if (navHighlighter) updateNavHighlighter(); 
        navLinksForHighlighter.forEach(link => {
            link.addEventListener('click', function() {
                navLinksForHighlighter.forEach(el => el.classList.remove('active'));
                this.classList.add('active');
                if (navHighlighter) {
                    setTimeout(updateNavHighlighter, 30); 
                }
            });
        });


        if (textModal) textModal.style.display = 'none';
        if (welcomePopupOverlay) welcomePopupOverlay.style.display = 'none';
        isTextModalOpen = false;

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
        console.log("Zaifrix Knowledge Base - Genesis Initialized!");
    }

    function startHeroAnimations() {
        const heroTitle = document.querySelector('.hero-title-animated');
        const heroCta = document.querySelector('.hero-cta-animated');

        if (heroTitle) setTimeout(() => heroTitle.classList.add('animate-in'), 0);
        if (heroDynamicSubtitle) setTimeout(() => heroDynamicSubtitle.classList.add('animate-in'), 200);
        if (heroCta) setTimeout(() => heroCta.classList.add('animate-in'), 400);
        
        if (heroDynamicSubtitle) {
            if (subtitleInterval) clearInterval(subtitleInterval); 
            subtitleInterval = setInterval(changeHeroSubtitle, 7000);
        }
    }

    // Updated hidePreloader function for Genesis Orb
    function hidePreloader() {
        if (preloader) {
            preloader.classList.add('loaded'); 
            const onPreloaderFadeEnd = () => {
                if (preloader.parentElement) {
                    preloader.remove();
                }
                if (welcomePopupOverlay) {
                    showWelcomePopup();
                } else {
                    startHeroAnimations(); 
                }
                if (preloader) preloader.removeEventListener('transitionend', onPreloaderFadeEnd);
            };

            preloader.addEventListener('transitionend', (event) => {
                 if (event.target === preloader && event.propertyName === 'opacity' && parseFloat(window.getComputedStyle(preloader).opacity) === 0) {
                    onPreloaderFadeEnd();
                }
            });
            
            setTimeout(() => { 
                if (preloader && preloader.parentElement && parseFloat(window.getComputedStyle(preloader).opacity) < 0.1) {
                    onPreloaderFadeEnd();
                }
            }, 2500); // Genesis Orb timeout
        } else {
            if (welcomePopupOverlay) {
                showWelcomePopup();
            } else {
                startHeroAnimations(); 
            }
        }
    }

    window.addEventListener('load', () => {
        let minPreloadTime = 2200; // Genesis Orb min time
        const loadStartTime = performance.now();

        const checkParticlesAndInit = (callback) => {
            if ( (typeof particlesJS !== 'undefined' && window.pJSDom && window.pJSDom[0] && window.pJSDom[0].pJS && window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array.length > 0) || 
                 (typeof particlesJS === 'undefined') ) { 
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