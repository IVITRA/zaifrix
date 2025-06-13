// عناصر DOM الرئيسية
const mainWebsites = document.querySelectorAll('.main-website');

// متغير عام لتتبع الحالة الكلية لمانع الإعلانات
// null: لم يتم الفحص بعد, true: فعال, false: غير فعال
let isAdBlockerGloballyActive = null;

// خريطة لتخزين حالة العرض الأصلية لكل موقع
const originalDisplayStates = new Map();

// كشف مانع الإعلانات التقليدي
function detectAdBlocker() {
    return new Promise((resolve) => {
        const ad = document.createElement('div');
        ad.innerHTML = ' ';
        // استخدام مجموعة من الكلاسات التي تستهدفها موانع الإعلانات عادةً
        ad.className = 'adsbox adbanner advertisement ad-unit text-ad googleads'; 
        ad.style.height = '1px';
        ad.style.width = '1px'; // بعض الموانع تتحقق من العرض أيضًا
        ad.style.position = 'absolute';
        ad.style.left = '-9999px';
        ad.style.top = '-9999px';
        ad.style.zIndex = '-9999'; // لضمان عدم ظهوره أبدًا
        
        document.body.appendChild(ad);
        
        // زد المهلة قليلاً لإعطاء فرصة لموانع الإعلانات للتصرف
        setTimeout(() => {
            const computedStyle = window.getComputedStyle(ad);
            const isBlocked = ad.offsetHeight === 0 || 
                             ad.offsetWidth === 0 || // تحقق من العرض أيضًا
                             computedStyle.getPropertyValue('display') === 'none' || 
                             computedStyle.getPropertyValue('visibility') === 'hidden' ||
                             computedStyle.getPropertyValue('opacity') === '0'; // بعض الموانع تستخدم الشفافية

            if (ad.parentNode) { // تأكد من أن العنصر لا يزال موجودًا قبل إزالته
                document.body.removeChild(ad);
            }
            resolve(isBlocked);
        }, 250); // زيادة المهلة إلى 250ms
    });
}

// كشف DNS الذي يحجب الإعلانات
async function detectDNSAdBlocking() {
    try {
        const testUrl = 'https://monetag.com/js/ads.js?t=' + Date.now();
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000); // مهلة 2 ثانية للطلب

        await fetch(testUrl, {
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-store',
            signal: controller.signal // لإلغاء الطلب إذا استغرق وقتًا طويلاً
        });
        clearTimeout(timeoutId);
        return false; // نجح الطلب = لا يوجد حجب DNS
    } catch (error) {
        // إذا كان الخطأ بسبب الإلغاء (Timeout) أو فشل الشبكة، اعتبره حجبًا
        // console.warn("DNS ad blocking detection error or timeout:", error.name, error.message);
        return true;
    }
}

// إنشاء عنصر الرسالة التحذيرية
function createWarningMessageElement() {
    const warning = document.createElement('div');
    warning.className = 'adblock-warning';
    warning.innerHTML = `
        <div style="padding: 20px; background: #fff3f3; border: 1px solid #ffcccc; border-radius: 5px; margin: 10px 0;">
            <h3 style="color: #d32f2f;">أنت تستعمل مانع الإعلانات</h3>
            <p style="color:black">لتصفح الموقع بشكل صحيح، يرجى تعطيل مانع الإعلانات وتحديث الصفحة</p>
        </div>
    `;
    return warning;
}

// دالة لتحديث عرض المواقع بناءً على حالة مانع الإعلانات
function updateWebsitesDisplay(shouldShowWarning) {
    mainWebsites.forEach(website => {
        // حفظ حالة العرض الأصلية إذا لم تكن محفوظة من قبل
        if (!originalDisplayStates.has(website)) {
            originalDisplayStates.set(website, window.getComputedStyle(website).getPropertyValue('display') || 'block');
        }

        const warningElement = website.nextElementSibling;
        const isCurrentlyShowingWarning = warningElement && warningElement.classList.contains('adblock-warning');

        if (shouldShowWarning) {
            // إذا يجب عرض التحذير ولم يكن معروضًا حاليًا
            if (!isCurrentlyShowingWarning) {
                // console.log(`Showing warning for: ${website.className}`);
                const newWarning = createWarningMessageElement();
                website.parentNode.insertBefore(newWarning, website.nextSibling);
                website.style.display = 'none';
            }
        } else {
            // إذا لا يجب عرض التحذير وكان معروضًا حاليًا
            if (isCurrentlyShowingWarning) {
                // console.log(`Hiding warning for: ${website.className}`);
                website.style.display = originalDisplayStates.get(website); // استعادة العرض الأصلي
                warningElement.remove();
            }
        }
    });
}

// فحص شامل لمانع الإعلانات وتطبيق التغييرات فقط إذا تغيرت الحالة
async function checkAndApplyAdBlockerState() {
    const traditionalBlocker = await detectAdBlocker();
    const dnsBlocker = await detectDNSAdBlocking();
    const newGlobalBlockerState = traditionalBlocker || dnsBlocker;

    // console.log(`Detection - Traditional: ${traditionalBlocker}, DNS: ${dnsBlocker}, CurrentGlobalState: ${newGlobalBlockerState}, PrevGlobalState: ${isAdBlockerGloballyActive}`);

    // تحديث الـ DOM فقط إذا تغيرت الحالة الكلية لمانع الإعلانات
    if (newGlobalBlockerState !== isAdBlockerGloballyActive) {
        // console.log(`Global ad blocker state changed from ${isAdBlockerGloballyActive} to ${newGlobalBlockerState}. Updating UI.`);
        isAdBlockerGloballyActive = newGlobalBlockerState;
        updateWebsitesDisplay(isAdBlockerGloballyActive);
    } else {
        // console.log("Global ad blocker state unchanged. No UI update needed.");
    }
}

// عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    // تأخير الفحص الأولي قليلاً لإعطاء الصفحة فرصة للاستقرار الكامل
    setTimeout(checkAndApplyAdBlockerState, 700); 

    // الفحص الدوري، يمكن زيادة هذه الفترة إذا استمر الرمش
    setInterval(checkAndApplyAdBlockerState, 10000); 
});