// كشف مانع الإعلانات التقليدي (محسّن)
function detectAdBlocker() {
    return new Promise((resolve) => {
        let detected = false;
        
        // الطريقة 1: محاولة تحميل ملف إعلاني معروف
        const adScript = document.createElement('script');
        adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
        adScript.onload = () => { detected = false; };
        adScript.onerror = () => { detected = true; };
        document.head.appendChild(adScript);
        
        // الطريقة 2: التحقق من عنصر إعلان مخفي
        setTimeout(() => {
            const testAd = document.createElement('div');
            testAd.innerHTML = '&nbsp;';
            testAd.className = 'adsbox';
            testAd.style.position = 'absolute';
            testAd.style.left = '-9999px';
            testAd.style.height = '1px';
            document.body.appendChild(testAd);
            
            setTimeout(() => {
                if (testAd.offsetHeight === 0 || 
                    window.getComputedStyle(testAd).display === 'none' || 
                    window.getComputedStyle(testAd).visibility === 'hidden') {
                    detected = true;
                }
                document.body.removeChild(testAd);
                resolve(detected);
            }, 100);
        }, 100);
    });
}

// كشف DNS-based ad blocking (مُحسّن)
async function detectDNSAdBlocking() {
    try {
        // قائمة بعناوين CDN وإعلانات مع احتمال الحجب
        const testUrls = [
            'https://www.googletagservices.com/tag/js/gpt.js',
            'https://securepubads.g.doubleclick.net/tag/js/gpt.js',
            'https://www.google-analytics.com/analytics.js',
            'https://connect.facebook.net/en_US/fbevents.js',
            'https://static.ads-twitter.com/uwt.js',
            'https://bat.bing.com/bat.js'
        ];

        const results = await Promise.allSettled(
            testUrls.map(url => fetch(url, { 
                method: 'HEAD',
                mode: 'no-cors',
                cache: 'no-store',
                redirect: 'error'
            }).catch(() => Promise.reject()))
        );

        const blockedCount = results.filter(
            result => result.status === 'rejected'
        ).length;

        // إذا تم حجب أكثر من نصف الطلبات
        return blockedCount > testUrls.length / 2;
    } catch (error) {
        console.error('Error in DNS detection:', error);
        return false;
    }
}

// كشف إضافي لـ DNS poisoning
async function detectDNSPoisoning() {
    try {
        // إنشاء iframe لتحميل صفحة معروفة تحتوي على إعلانات
        const iframe = document.createElement('iframe');
        iframe.src = 'https://www.example-with-ads.com/test.html';
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        
        return new Promise((resolve) => {
            setTimeout(() => {
                try {
                    // التحقق من محتوى الـ iframe
                    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                    const isBlocked = iframeDoc.body.innerHTML.includes('blocked') || 
                                     iframeDoc.body.innerHTML.includes('adblock') ||
                                     iframeDoc.body.textContent === '';
                    
                    document.body.removeChild(iframe);
                    resolve(isBlocked);
                } catch (e) {
                    // إذا حدث خطأ في الوصول إلى الـ iframe، قد يكون بسبب سياسة الأمان
                    document.body.removeChild(iframe);
                    resolve(false);
                }
            }, 2000);
        });
    } catch (error) {
        console.error('Error in DNS poisoning detection:', error);
        return false;
    }
}

// الفحص الشامل (مُحسّن)
async function checkAdBlocker() {
    try {
        const [traditionalBlocker, dnsBlocker, dnsPoisoning] = await Promise.all([
            detectAdBlocker(),
            detectDNSAdBlocking(),
            detectDNSPoisoning()
        ]);

        const isBlocked = traditionalBlocker || dnsBlocker || dnsPoisoning;
        
        if (isBlocked) {
            document.getElementById('blockerWarning').style.display = 'block';
            document.getElementById('mainContent').style.display = 'none';
            
            // إضافة معلومات إضافية للتصحيح
            console.warn('تم اكتشاف حجب إعلانات:', {
                traditionalBlocker,
                dnsBlocker,
                dnsPoisoning
            });
            
            // إرسال بيانات إلى الخادم لتسجيل الحادث (اختياري)
            try {
                await fetch('/log-blocker', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'ad_blocker',
                        traditional: traditionalBlocker,
                        dns: dnsBlocker,
                        poisoning: dnsPoisoning,
                        timestamp: new Date().toISOString()
                    })
                });
            } catch (e) {
                console.error('Failed to log blocker:', e);
            }
        } else {
            document.getElementById('blockerWarning').style.display = 'none';
            document.getElementById('mainContent').style.display = 'block';
        }
        
        return isBlocked;
    } catch (error) {
        console.error('Error in ad blocker check:', error);
        return false;
    }
}

// التهيئة والفحص الدوري
window.addEventListener('DOMContentLoaded', () => {
    checkAdBlocker();
    setInterval(checkAdBlocker, 30000); // فحص كل 30 ثانية
});

// يمكنك إضافة هذا للصفحات التي تستخدم iframes
window.addEventListener('load', () => {
    if (window.self === window.top) {
        checkAdBlocker();
    }
});