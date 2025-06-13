// عناصر DOM الرئيسية
const mainWebsites = document.querySelectorAll('.main-website');

// متغير عام لتتبع الحالة الكلية لمانع الإعلانات
let isAdBlockerGloballyActive = null;

// خريطة لتخزين عناصر التحذير المرتبطة بكل موقع
const warningElementsMap = new Map();

// --- دوال الكشف (detectAdBlocker, detectDNSAdBlocking) تبقى كما هي من الإصدار السابق ---
// كشف مانع الإعلانات التقليدي
function detectAdBlocker() {
    return new Promise((resolve) => {
        const ad = document.createElement('div');
        ad.innerHTML = ' ';
        ad.className = 'adsbox adbanner advertisement ad-unit text-ad googleads'; 
        ad.style.height = '1px';
        ad.style.width = '1px';
        ad.style.position = 'absolute';
        ad.style.left = '-9999px';
        ad.style.top = '-9999px';
        ad.style.zIndex = '-9999';
        
        document.body.appendChild(ad);
        
        setTimeout(() => {
            const computedStyle = window.getComputedStyle(ad);
            const isBlocked = ad.offsetHeight === 0 || 
                             ad.offsetWidth === 0 ||
                             computedStyle.getPropertyValue('display') === 'none' || 
                             computedStyle.getPropertyValue('visibility') === 'hidden' ||
                             computedStyle.getPropertyValue('opacity') === '0';

            if (ad.parentNode) {
                document.body.removeChild(ad);
            }
            resolve(isBlocked);
        }, 250); 
    });
}

// كشف DNS الذي يحجب الإعلانات
async function detectDNSAdBlocking() {
    try {
        const testUrl = 'https://monetag.com/js/ads.js?t=' + Date.now();
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        await fetch(testUrl, {
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-store',
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        return false;
    } catch (error) {
        return true;
    }
}
// --- نهاية دوال الكشف ---


// إنشاء عنصر الرسالة التحذيرية (مع تعديلات طفيفة على النمط ليتناسب مع التراكب)
function createWarningElementFor(websiteElement) {
    const warningWrapper = document.createElement('div');
    warningWrapper.className = 'adblock-warning-overlay';
    // النمط الأساسي للتراكب
    // قد تحتاج إلى تعديل هذا ليتناسب مع تصميم موقعك
    warningWrapper.style.position = 'absolute';
    warningWrapper.style.top = '0';
    warningWrapper.style.left = '0';
    warningWrapper.style.width = '100%';
    warningWrapper.style.height = '100%';
    warningWrapper.style.zIndex = '10'; // تأكد أنه فوق المحتوى الأصلي
    warningWrapper.style.display = 'none'; // يبدأ مخفيًا
    warningWrapper.style.alignItems = 'center'; // لتوسيط الرسالة
    warningWrapper.style.justifyContent = 'center'; // لتوسيط الرسالة
    warningWrapper.style.background = 'rgba(255, 255, 255, 0.8)'; // خلفية شبه شفافة إذا أردت

    warningWrapper.innerHTML = `
        <div style="padding: 20px; background: #fff3f3; border: 1px solid #ffcccc; border-radius: 5px; text-align: center;">
            <h3 style="color: #d32f2f; margin-top:0;">أنت تستعمل مانع الإعلانات</h3>
            <p style="color:black">لتصفح الموقع بشكل صحيح، يرجى تعطيل مانع الإعلانات وتحديث الصفحة</p>
        </div>
    `;

    // يجب أن يكون العنصر الأب لـ websiteElement ذو position: relative أو absolute أو fixed
    // لكي يعمل position: absolute الخاص بالتحذير بشكل صحيح بالنسبة له.
    if (window.getComputedStyle(websiteElement.parentNode).getPropertyValue('position') === 'static') {
        websiteElement.parentNode.style.position = 'relative';
    }
    
    websiteElement.parentNode.insertBefore(warningWrapper, websiteElement.nextSibling);
    warningElementsMap.set(websiteElement, warningWrapper); // تخزين مرجع لعنصر التحذير
    return warningWrapper;
}

// دالة لتحديث عرض المواقع بناءً على حالة مانع الإعلانات
function updateWebsitesVisibility(shouldShowWarning) {
    mainWebsites.forEach(website => {
        let warningElement = warningElementsMap.get(website);
        if (!warningElement) {
            warningElement = createWarningElementFor(website);
        }

        if (shouldShowWarning) {
            website.style.opacity = '0.2'; // اجعل المحتوى الأصلي شبه شفاف أو شفاف تمامًا
            website.style.pointerEvents = 'none'; // اجعله غير قابل للتفاعل
            warningElement.style.display = 'flex'; // أظهر رسالة التحذير (flex للتوسيط)
        } else {
            website.style.opacity = '1';
            website.style.pointerEvents = 'auto'; // اجعله قابلاً للتفاعل
            warningElement.style.display = 'none'; // أخفِ رسالة التحذير
        }
    });
}

// فحص شامل لمانع الإعلانات وتطبيق التغييرات فقط إذا تغيرت الحالة
async function checkAndApplyAdBlockerState() {
    const traditionalBlocker = await detectAdBlocker();
    const dnsBlocker = await detectDNSAdBlocking();
    const newGlobalBlockerState = traditionalBlocker || dnsBlocker;

    if (newGlobalBlockerState !== isAdBlockerGloballyActive) {
        // console.log(`Global ad blocker state changed from ${isAdBlockerGloballyActive} to ${newGlobalBlockerState}. Updating UI.`);
        isAdBlockerGloballyActive = newGlobalBlockerState;
        updateWebsitesVisibility(isAdBlockerGloballyActive);
    } else {
        // console.log("Global ad blocker state unchanged. No UI update needed.");
    }
}

// عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    // نهيئة عناصر التحذير مسبقًا (لكن مخفية)
    mainWebsites.forEach(website => {
        if (!warningElementsMap.has(website)) {
             createWarningElementFor(website);
        }
    });

    setTimeout(checkAndApplyAdBlockerState, 700); 
    setInterval(checkAndApplyAdBlockerState, 10000); 
});