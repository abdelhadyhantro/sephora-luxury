// 1. تعريف "مخزن" السلة وربطه بالمتصفح
let cart = JSON.parse(localStorage.getItem('PERFUME_CART')) || [];

// جعل وظيفة المسح "عالمية" عشان تشتغل مع الـ onclick
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    localStorage.setItem('PERFUME_CART', JSON.stringify(cart));
    updateCartUI();
};

document.addEventListener('DOMContentLoaded', () => {
    // تحديث الأرقام أول ما تفتح الصفحة
    updateCartUI();

    // 2. التحكم بفتح وإغلاق السلة
    const cartBtn = document.getElementById('cart-btn');
    const closeBtn = document.getElementById('close-cart');
    const sidebar = document.getElementById('cart-sidebar');

    if(cartBtn) {
        cartBtn.onclick = (e) => {
            e.preventDefault();
            sidebar.classList.add('open');
        };
    }

    if(closeBtn) {
        closeBtn.onclick = () => {
            sidebar.classList.remove('open');
        };
    }

    // 3. كود إضافة المنتج للسلة (Add to Cart)
    // رح نراقب أي ضغطة على كبسة "Quick View"
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-view')) {
            // منجيب بيانات "الكرت" اللي انضغط فيه الزر
            const card = e.target.closest('.product-card');
            if (card) {
                const product = {
                    id: Date.now(),
                    name: card.querySelector('h3').innerText,
                    price: card.querySelector('.price').innerText,
                    img: card.querySelector('img').src
                };
                addToCart(product);
            }
        }
    });

    // 4. كود تشغيل الفيديو (Hover) - شغال ثانتين
    const colCards = document.querySelectorAll('.col-card');
    colCards.forEach(card => {
        const video = card.querySelector('.card-video');
        let timer;

        card.addEventListener('mouseenter', () => {
            timer = setTimeout(() => {
                card.classList.add('video-active');
                if(video) video.play();
            }, 2000); 
        });

        card.addEventListener('mouseleave', () => {
            clearTimeout(timer);
            card.classList.remove('video-active');
            if(video) {
                video.pause();
                video.currentTime = 0;
            }
        });
    });

    // 5. كود السيرش
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('no-results');

    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            let found = false;
            colCards.forEach(card => {
                const brand = card.querySelector('.overlay-text').textContent.toLowerCase();
                if (brand.includes(val)) {
                    card.style.display = "block";
                    found = true;
                } else {
                    card.style.display = "none";
                }
            });
            if(noResults) noResults.style.display = found ? "none" : "block";
        });
    }
});

// وظائف السلة الأساسية
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('PERFUME_CART', JSON.stringify(cart));
    updateCartUI();
    // حركة احترافية: فتح السلة فوراً بعد الإضافة
    const sidebar = document.getElementById('cart-sidebar');
    if(sidebar) sidebar.classList.add('open');
}

function updateCartUI() {
    const countEl = document.getElementById('cart-count');
    const container = document.getElementById('cart-items-container');
    const totalEl = document.getElementById('cart-total');

    if(countEl) countEl.innerText = cart.length;
    if(!container) return;

    container.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        // تنظيف السعر من الـ $ وحسابه
        total += parseFloat(item.price.replace('$', ''));

        container.innerHTML += `
            <div class="cart-item" style="display:flex; gap:10px; margin-bottom:15px; align-items:center;">
                <img src="${item.img}" style="width:50px; height:50px; object-fit:cover; border-radius:2px;">
                <div class="item-info">
                    <h4 style="font-size:12px; margin:0; color:white;">${item.name}</h4>
                    <span style="color:#e2d1b1; font-size:11px;">${item.price}</span>
                    <br>
                    <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer; font-size:10px; padding:0;">Remove</button>
                </div>
            </div>
        `;
    });

    if(totalEl) totalEl.innerText = `$${total.toFixed(2)}`;
}