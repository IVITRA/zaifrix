// عناصر DOM الرئيسية
const mainWebsites = document.querySelectorAll('.main-website');

// كشف مانع الإعلانات التقليدي
function detectAdBlocker() {
    return new Promise((resolve) => {
        const ad = document.createElement('div');
        ad.innerHTML = '&nbsp;';
        ad.className = 'adsbox';
        ad.style.height = '1px';
        ad.style.position = 'absolute';
        ad.style.left = '-9999px';
        ad.style.top = '-9999px';
        
        document.body.appendChild(ad);
        
        setTimeout(() => {
            const isBlocked = ad.offsetHeight === 0 || 
                             ad.style.display === 'none' || 
                             ad.style.visibility === 'hidden';
            
            document.body.removeChild(ad);
            resolve(isBlocked);
        }, 100);
    });
}

// كشف DNS الذي يحجب الإعلانات
async function detectDNSAdBlocking() {
    try {
        const testUrl = 'https://monetag.com/js/ads.js?t=' + Date.now();
        const response = await fetch(testUrl, {
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
    
    // حفظ العنصر الأصلي
    warning.dataset.originalElement = element.outerHTML;
    warning.dataset.originalDisplay = element.style.display;
    
    return warning;
}

// فحص شامل لمانع الإعلانات
async function checkAdBlocker() {
    const traditionalBlocker = await detectAdBlocker();
    const dnsBlocker = await detectDNSAdBlocking();
    const hasBlocker = traditionalBlocker || dnsBlocker;
    
    mainWebsites.forEach(website => {
        if (hasBlocker) {
            // إذا كان هناك مانع إعلانات، نستبدل العنصر برسالة التحذير
            if (!website.nextElementSibling || !website.nextElementSibling.classList.contains('adblock-warning')) {
                const warning = createWarningMessage(website);
                website.parentNode.insertBefore(warning, website.nextSibling);
                website.style.display = 'none';
            }
        } else {
            // إذا لم يكن هناك مانع إعلانات، نعيد العنصر الأصلي
            const warning = website.previousElementSibling;
            if (warning && warning.classList.contains('adblock-warning')) {
                website.style.display = warning.dataset.originalDisplay || 'block';
                warning.remove();
            }
        }
    });
    
    return hasBlocker;
}

// عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(checkAdBlocker, 300);
    setInterval(checkAdBlocker, 10000);
});