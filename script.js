// كشف مانع الإعلانات التقليدي
function detectAdBlocker() {
    return new Promise((resolve) => {
        const ad = document.createElement('div');
        ad.innerHTML = '&nbsp;';
        ad.className = 'ad-class';
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

// كشف DNS الذي يحجب الإعلانات باستخدام monetag.com
async function detectDNSAdBlocking() {
    try {
        const response = await fetch('https://monetag.com/?monetag=test', {
            method: 'GET',
            mode: 'no-cors',
            cache: 'no-store'
        });
        
        // إذا وصلنا هنا، لم يتم حجب الطلب
        return false;
    } catch (error) {
        // إذا فشل الطلب، قد يكون بسبب مانع DNS
        return true;
    }
}

// كشف VPN عن طريق IP والعنوان
async function detectVPN() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const userIP = data.ip;
        
        // يمكنك إضافة المزيد من الفحوصات هنا مثل:
        // - مقارنة مع قائمة IPs معروفة لـ VPN
        // - التحقق من مزود خدمة الإنترنت
        // - التحقق من الموقع الجغرافي
        
        // مثال بسيط للتحقق من بعض مزودي VPN المشهورين
        const vpnProviders = [
            'vpn', 'proxy', 'tor', 'expressvpn', 'nordvpn', 
            'surfshark', 'ipvanish', 'hotspotshield', 'privateinternetaccess'
        ];
        
        const ipResponse = await fetch(`https://ipapi.co/${userIP}/json/`);
        const ipData = await ipResponse.json();
        
        const org = (ipData.org || '').toLowerCase();
        const isVPN = vpnProviders.some(provider => org.includes(provider));
        
        return isVPN;
    } catch (error) {
        console.error('Error detecting VPN:', error);
        return false;
    }
}

// فحص شامل لمانع الإعلانات
async function checkAdBlocker() {
    const traditionalBlocker = await detectAdBlocker();
    const dnsBlocker = await detectDNSAdBlocking();
    
    if (traditionalBlocker || dnsBlocker) {
        document.getElementById('blockerWarning').style.display = 'block';
        document.getElementById('mainContent').style.display = 'none';
        document.getElementById('vpnWarning').style.display = 'none';
        
        console.warn('تم اكتشاف مانع إعلانات أو DNS يحجب الإعلانات');
        return true;
    } else {
        document.getElementById('blockerWarning').style.display = 'none';
        return false;
    }
}

// فحص VPN
async function checkVPN() {
    const isVPN = await detectVPN();
    
    if (isVPN) {
        document.getElementById('vpnWarning').style.display = 'block';
        document.getElementById('mainContent').style.display = 'none';
        document.getElementById('blockerWarning').style.display = 'none';
        
        console.warn('تم اكتشاف اتصال VPN');
        return true;
    } else {
        document.getElementById('vpnWarning').style.display = 'none';
        return false;
    }
}

// فحص شامل عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', async () => {
    const hasBlocker = await checkAdBlocker();
    
    if (!hasBlocker) {
        await checkVPN();
    }
    
    // فحص دوري كل 10 ثواني
    setInterval(async () => {
        if (!document.getElementById('blockerWarning').style.display === 'block') {
            await checkAdBlocker();
        }
        
        if (!document.getElementById('vpnWarning').style.display === 'block') {
            await checkVPN();
        }
    }, 10000);
});