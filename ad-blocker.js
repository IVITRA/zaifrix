// عناصر DOM الرئيسية
const mainWebsites = document.querySelectorAll('.main-website');

// خريطة لتتبع حالة التحذير لكل موقع
const warningStates = new Map(); // سيخزن: websiteElement -> { isWarningShown: boolean }

// كشف مانع الإعلانات التقليدي
function detectAdBlocker() {
    return new Promise((resolve) => {
        const ad = document.createElement('div');
        ad.innerHTML = ' ';
        ad.className = 'adsbox'; // يجب أن يكون هذا الكلاس مستهدفًا من قبل موانع الإعلانات
        ad.style.height = '1px';
        ad.style.position = 'absolute';
        ad.style.left = '-9999px';
        ad.style.top = '-9999px';
        
        document.body.appendChild(ad);
        
        setTimeout(() => {
            const isBlocked = ad.offsetHeight === 0 || 
                             window.getComputedStyle(ad).getPropertyValue('display') === 'none' || 
                             window.getComputedStyle(ad).getPropertyValue('visibility') === 'hidden';
            
            document.body.removeChild(ad);
            resolve(isBlocked);
        }, 100);
    });
}

// كشف DNS الذي يحجب الإعلانات
async function detectDNSAdBlocking() {
    try {
        const testUrl = 'https://monetag.com/js/ads.js?t=' + Date.now(); // <-- تم إرجاع النطاق الأصلي هنا
        await fetch(testUrl, {
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-store'
        });
        return false;
    } catch (error) {
        return true;
    }
}

// إنشاء عنصر الرسالة التحذيرية
function createWarningMessage(element) {
    const warning = document.createElement('div');
    warning.className = 'adblock-warning';
    warning.innerHTML = `
        <div style="padding: 20px; background: #fff3f3; border: 1px solid #ffcccc; border-radius: 5px; margin: 10px 0;">
            <h3 style="color: #d32f2f;">أنت تستعمل مانع الإعلانات</h3>
            <p style="color:black">لتصفح الموقع بشكل صحيح، يرجى تعطيل مانع الإعلانات وتحديث الصفحة</p>
        </div>
    `;
    
    warning.dataset.originalDisplay = element.style.display || window.getComputedStyle(element).getPropertyValue('display');
    
    return warning;
}

// فحص شامل لمانع الإعلانات
async function checkAdBlocker() {
    const traditionalBlocker = await detectAdBlocker();
    const dnsBlocker = await detectDNSAdBlocking();
    const hasBlocker = traditionalBlocker || dnsBlocker;
    
    mainWebsites.forEach(website => {
        let currentState = warningStates.get(website);
        if (!currentState) {
            currentState = { isWarningShown: false };
            warningStates.set(website, currentState);
        }

        if (hasBlocker) {
            if (!currentState.isWarningShown) {
                const warning = createWarningMessage(website);
                website.parentNode.insertBefore(warning, website.nextSibling);
                website.style.display = 'none';
                currentState.isWarningShown = true;
            }
        } else {
            if (currentState.isWarningShown) {
                const warning = website.nextElementSibling;
                if (warning && warning.classList.contains('adblock-warning')) {
                    website.style.display = warning.dataset.originalDisplay || 'block';
                    warning.remove();
                }
                currentState.isWarningShown = false;
            }
        }
    });
}

// عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(checkAdBlocker, 500);
    setInterval(checkAdBlocker, 10000); 
});