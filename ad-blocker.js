// --- عناصر DOM الرئيسية ---
const mainWebsites = document.querySelectorAll('.main-website');

// --- متغيرات الحالة العالمية ---
let currentGlobalAdBlockerState = null; // null: لم يفحص, true: فعال, false: غير فعال
let uiUpdateInProgress = false; // لمنع التحديثات المتزامنة لواجهة المستخدم

// --- دوال الكشف (تبقى كما هي من النسخة السابقة، يفترض أنها لا تسبب رمشًا بنفسها) ---
function detectAdBlocker() {
    return new Promise((resolve) => {
        const ad = document.createElement('div');
        ad.innerHTML = ' ';
        ad.className = 'adsbox adbanner advertisement ad-unit text-ad googleads';
        Object.assign(ad.style, {
            height: '1px',
            width: '1px',
            position: 'absolute',
            left: '-9999px',
            top: '-9999px',
            zIndex: '-9999',
            visibility: 'hidden', // تأكيد إضافي على الإخفاء
            display: 'block' // بعض الموانع قد تتفاعل مع display:none بشكل مختلف
        });
        
        document.body.appendChild(ad);
        
        // استخدام requestAnimationFrame لانتظار دورة الرسم التالية يمكن أن يساعد في الدقة
        // ولكن setTimeout هنا أكثر شيوعًا. زد المهلة إذا لزم الأمر.
        setTimeout(() => {
            let isBlocked = false;
            if (document.body.contains(ad)) { // تأكد من أن العنصر لا يزال موجودًا
                const computedStyle = window.getComputedStyle(ad);
                isBlocked = ad.offsetHeight === 0 || 
                            ad.offsetWidth === 0 ||
                            computedStyle.getPropertyValue('display') === 'none' || 
                            computedStyle.getPropertyValue('visibility') === 'hidden' ||
                            computedStyle.getPropertyValue('opacity') === '0';
                document.body.removeChild(ad);
            } else {
                // إذا تمت إزالة العنصر بطريقة أخرى (نادر جدًا)، اعتبره محجوبًا كاحتياط
                isBlocked = true;
            }
            resolve(isBlocked);
        }, 300); // زد المهلة قليلاً إلى 300ms
    });
}

async function detectDNSAdBlocking() {
    try {
        const testUrl = 'https://monetag.com/js/ads.js?t=' + Date.now();
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2500); // مهلة 2.5 ثانية

        const response = await fetch(testUrl, {
            method: 'HEAD',
            mode: 'no-cors',
            cache: 'no-store',
            signal: controller.signal
        });
        clearTimeout(timeoutId);
        // حتى مع no-cors، إذا وصل الرد (حتى لو كان opaque)، فهذا يعني أن DNS لم يحجبه
        return false; 
    } catch (error) {
        // console.warn("DNS ad blocking detection error:", error.name, error.message);
        return true; // أي خطأ (فشل DNS، timeout، إلخ) يشير إلى حجب محتمل
    }
}
// --- نهاية دوال الكشف ---

// --- إدارة واجهة المستخدم ---

// مخزن لحالة العرض الأصلية ورسائل التحذير
const websiteStates = new Map(); // K: websiteElement, V: { originalStyle: CSSStyleDeclaration, warningElement: HTMLElement | null }

function initializeWebsiteStates() {
    mainWebsites.forEach(website => {
        if (!websiteStates.has(website)) {
            // حفظ نسخة من خاصية style الأصلية بأكملها
            const originalStyle = document.createElement('div').style;
            originalStyle.cssText = website.style.cssText;

            websiteStates.set(website, {
                originalStyle: originalStyle, // تخزين كائن StyleDeclaration
                warningElement: null
            });
        }
    });
}

function createOrGetWarningElement(website) {
    let state = websiteStates.get(website);
    if (state && state.warningElement && document.body.contains(state.warningElement)) {
        return state.warningElement;
    }

    const warning = document.createElement('div');
    warning.className = 'adblock-warning-message'; // اسم كلاس مختلف لتجنب التعارض
    warning.style.display = 'none'; // يبدأ مخفيًا
    // ضمان أن يكون فوق المحتوى، ولكن مع مرونة في التموضع
    // يمكنك تخصيص هذه الأنماط بشكل كبير في ملف CSS الخاص بك
    warning.innerHTML = `
        <div style="padding: 20px; background: #fff3f3; border: 1px solid #ffcccc; border-radius: 5px; margin: 10px 0; text-align: center;">
            <h3 style="color: #d32f2f; margin-top:0;">أنت تستعمل مانع الإعلانات</h3>
            <p style="color:black; margin-bottom:0;">لتصفح الموقع بشكل صحيح، يرجى تعطيل مانع الإعلانات وتحديث الصفحة.</p>
        </div>
    `;
    
    // إدراج التحذير بعد العنصر مباشرة
    website.parentNode.insertBefore(warning, website.nextSibling);
    if (state) {
        state.warningElement = warning;
    } else { // حالة نادرة إذا لم يتم تهيئة العنصر
        const originalStyle = document.createElement('div').style;
        originalStyle.cssText = website.style.cssText;
        websiteStates.set(website, { originalStyle: originalStyle, warningElement: warning });
    }
    return warning;
}

async function updateUIVisibility(showWarning) {
    if (uiUpdateInProgress) {
        // console.log("UI update already in progress, skipping.");
        return;
    }
    uiUpdateInProgress = true;

    // استخدام requestAnimationFrame لتجميع التغييرات في DOM
    // هذا قد يساعد في سلاسة الانتقالات البصرية
    return new Promise(resolve => {
        requestAnimationFrame(() => {
            mainWebsites.forEach(website => {
                const state = websiteStates.get(website);
                if (!state) return; // يجب أن يكون قد تم تهيئته

                const warningElement = createOrGetWarningElement(website);

                if (showWarning) {
                    // إخفاء الموقع الأصلي بطريقة تقلل إعادة التخطيط
                    website.style.visibility = 'hidden';
                    website.style.height = '0px'; // أو قيمة صغيرة جدًا
                    website.style.overflow = 'hidden';
                    website.style.opacity = '0'; // إضافي
                    website.style.position = 'absolute'; // إخراجه من التدفق تمامًا
                    website.style.zIndex = '-1';


                    warningElement.style.display = 'block'; // أو 'flex' إذا كنت تستخدم flexbox للتوسيط
                } else {
                    // استعادة نمط الموقع الأصلي
                    website.style.cssText = state.originalStyle.cssText;
                    // تأكد من أن الخصائص التي تم تعديلها لإخفائه قد تمت استعادتها
                    // قد تحتاج إلى استعادة display الأصلي إذا تم تغييره
                    // website.style.display = state.originalDisplay || 'block'; // إذا كنت قد حفظت display الأصلي

                    warningElement.style.display = 'none';
                }
            });
            uiUpdateInProgress = false;
            resolve();
        });
    });
}


// --- الفحص الرئيسي وتطبيق التغييرات ---
async function performAdBlockCheck() {
    // console.log("Performing ad block check...");
    const traditionalBlocked = await detectAdBlocker();
    const dnsBlocked = await detectDNSAdBlocking();
    const newDetectedState = traditionalBlocked || dnsBlocked;

    // console.log(`Detection results - Traditional: ${traditionalBlocked}, DNS: ${dnsBlocked}. New state: ${newDetectedState}`);

    if (newDetectedState !== currentGlobalAdBlockerState) {
        // console.log(`Ad blocker state changed from ${currentGlobalAdBlockerState} to ${newDetectedState}. Requesting UI update.`);
        currentGlobalAdBlockerState = newDetectedState;
        await updateUIVisibility(currentGlobalAdBlockerState);
    } else {
        // console.log("Ad blocker state unchanged. No UI update needed.");
    }
}

// --- التهيئة والتشغيل ---
window.addEventListener('DOMContentLoaded', () => {
    initializeWebsiteStates(); // تهيئة حالات العناصر مرة واحدة

    // الفحص الأولي بعد فترة قصيرة للسماح للصفحة بالاستقرار
    // زد هذه المهلة إذا كنت تشك أن الصفحة لا تزال تُحمّل مواردًا بشكل كبير
    setTimeout(performAdBlockCheck, 1000); 

    // الفحص الدوري. إذا استمر الرمش، فالمشكلة قد تكون في استقرار الكشف
    // أو في كيفية تأثير التغييرات البسيطة على أداء المتصفح في الجوالات
    setInterval(performAdBlockCheck, 10000); 
});

// ملاحظة هامة:
// إذا كنت تستخدم CSS Transitions أو Animations على عناصر .main-website أو على الرسالة التحذيرية،
// فقد تساهم هذه أيضًا في "الرمش" أو التأخيرات البصرية. تأكد من أن الانتقالات سلسة
// أو قم بتعطيلها مؤقتًا أثناء الاختبار لمعرفة ما إذا كانت هي السبب.