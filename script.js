// كشف مانع الإعلانات التقليدي
function detectAdBlocker() {
    return new Promise((resolve) => {
        // إنشاء عنصر إعلان وهمي
        const ad = document.createElement('div');
        ad.innerHTML = '&nbsp;';
        ad.className = 'ad-class';
        ad.style.height = '1px';
        ad.style.position = 'absolute';
        ad.style.left = '-9999px';
        ad.style.top = '-9999px';
        
        document.body.appendChild(ad);
        
        // التحقق بعد وقت قصير
        setTimeout(() => {
            const isBlocked = ad.offsetHeight === 0 || 
                             ad.style.display === 'none' || 
                             ad.style.visibility === 'hidden';
            
            document.body.removeChild(ad);
            resolve(isBlocked);
        }, 100);
    });
}

// كشف DNS الذي يحجب الإعلانات عن طريق طلب ملف من نطاقات معروفة لحجب الإعلانات
async function detectDNSAdBlocking() {
    try {
        const testUrls = [
            'https://monetag.com/'
        ];
        
        let blockedCount = 0;
        
        for (const url of testUrls) {
            try {
                const response = await fetch(url, {
                    method: 'HEAD',
                    mode: 'no-cors',
                    cache: 'no-store'
                });
                // إذا وصلنا هنا، لم يتم حجب الطلب
            } catch (error) {
                // إذا فشل الطلب، قد يكون بسبب مانع DNS
                blockedCount++;
            }
        }
        
        // إذا تم حجب أكثر من نصف الطلبات، نفترض وجود مانع DNS
        return blockedCount >= testUrls.length / 2;
    } catch (error) {
        console.error('Error detecting DNS ad blocking:', error);
        return false;
    }
}

// فحص شامل لمانع الإعلانات
async function checkAdBlocker() {
    const traditionalBlocker = await detectAdBlocker();
    const dnsBlocker = await detectDNSAdBlocking();
    
    if (traditionalBlocker || dnsBlocker) {
        // عرض رسالة التحذير وإخفاء المحتوى الرئيسي
        document.getElementById('blockerWarning').style.display = 'block';
        document.getElementById('mainContent').style.display = 'none';
        
        // إضافة رسالة إلى console للمطورين
        console.warn('تم اكتشاف مانع إعلانات أو DNS يحجب الإعلانات. يرجى تعطيله لاستخدام الموقع.');
        
        return true;
    } else {
        // إخفاء رسالة التحذير وإظهار المحتوى الرئيسي
        document.getElementById('blockerWarning').style.display = 'none';
        document.getElementById('mainContent').style.display = 'block';
        return false;
    }
}

// فحص مانع الإعلانات عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    checkAdBlocker();
    
    // يمكنك إضافة فحص دوري إذا أردت
    setInterval(checkAdBlocker, 10000);
});