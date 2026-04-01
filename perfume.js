
    const heart = document.getElementById('heartIcon');

    heart.addEventListener('click', function() {
        // 1. تبديل كلاس اللون الأحمر
        heart.classList.toggle('is-active');

        // 2. تبديل شكل القلب من مفرغ (regular) لـ مليان (solid)
        if (heart.classList.contains('fa-regular')) {
            heart.classList.replace('fa-regular', 'fa-solid');
        } else {
            heart.classList.replace('fa-solid', 'fa-regular');
        }
    });

    // هاد الكود بيفهم السلة في كل الصفحات
let cart = JSON.parse(localStorage.getItem('PERFUME_CART')) || [];

document.addEventListener('DOMContentLoaded', () => {
    // تحديث الرقم في الهيدر أول ما تفتح الصفحة
    updateCartUI();

    // فتح وإغلاق السلة
    const cartBtn = document.getElementById('cart-btn');
    const closeBtn = document.getElementById('close-cart');
    const sidebar = document.getElementById('cart-sidebar');

    if(cartBtn) {
        cartBtn.addEventListener('click', (e) => {
            e.preventDefault(); // عشان ما يعمل ريفريش
            sidebar.classList.add('open');
        });
    }

    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    }
});

// وظيفة لتحديث شكل السلة وحساب السعر
function updateCartUI() {
    const countEl = document.getElementById('cart-count');
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total');

    if(countEl) countEl.innerText = cart.length;
    if(!container) return; // لو مش بصفحة فيها سلة ما يكمل

    container.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        total += parseFloat(item.price.replace('$', ''));
        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}">
                <div class="item-details">
                    <h4 style="font-size:12px; margin:0;">${item.name}</h4>
                    <span style="color:#e2d1b1;">${item.price}</span>
                </div>
            </div>
        `;
    });

    if(totalEl) totalEl.innerText = `$${total.toFixed(2)}`;
}

// أضف هذا الكود بداخل DOMContentLoaded
const userBtn = document.getElementById('user-btn');
const profileSidebar = document.getElementById('profile-sidebar');
const closeProfile = document.getElementById('close-profile');

if(userBtn) {
    userBtn.onclick = (e) => {
        e.preventDefault();
        profileSidebar.classList.add('open');
    }
}

if(closeProfile) {
    closeProfile.onclick = () => profileSidebar.classList.remove('open');
}

// تحميل البيانات المحفوظة (إن وجدت)
document.getElementById('userName').value = localStorage.getItem('userName') || '';
document.getElementById('userEmail').value = localStorage.getItem('userEmail') || '';

// وظيفة حفظ البيانات
window.saveProfile = function() {
    const name = document.getElementById('userName').value;
    const email = document.getElementById('userEmail').value;
    
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    
    alert("Profile Saved Successfully!");
    profileSidebar.classList.remove('open');
} 

document.addEventListener('DOMContentLoaded', () => {
    // كود فتح وإغلاق البروفايل
    const userBtn = document.getElementById('user-btn');
    const profileSidebar = document.getElementById('profile-sidebar');
    const closeProfile = document.getElementById('close-profile');

    if(userBtn) {
        userBtn.onclick = (e) => {
            e.preventDefault();
            profileSidebar.classList.add('open');
        }
    }

    if(closeProfile) {
        closeProfile.onclick = () => {
            profileSidebar.classList.remove('open');
        }
    }

    // تعبئة البيانات تلقائياً لو كانت مسيفة قبل هيك
    if(document.getElementById('userName')) {
        document.getElementById('userName').value = localStorage.getItem('userName') || '';
        document.getElementById('userEmail').value = localStorage.getItem('userEmail') || '';
    }
});

// وظيفة الحفظ (خارج الـ DOMContentLoaded عشان الـ onclick يشوفها)


window.saveProfile = function() {
    const nameInput = document.getElementById('userName');
    const emailInput = document.getElementById('userEmail');
    const sidebar = document.getElementById('profile-sidebar');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    // 1. فحص إذا الخانات فاضية
    if (name === "" || email === "") {
        alert("Please fill in both name and email fields.");
        return;
    }

    // 2. فحص صيغة الإيميل (Regex) - بيتأكد من وجود @ ونقطة ونص بينهم
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address (e.g., name@example.com)");
        return;
    }

    // 3. إذا كل شي صح.. يسيف
    localStorage.setItem('userName', name);
    localStorage.setItem('userEmail', email);
    
    alert("Welcome to Sephora, " + name + "! Your profile has been saved.");
    if(sidebar) sidebar.classList.remove('open');
}