// 1. مصفوفة السلة (المخزن المشترك بين كل الصفحات)
let cart = JSON.parse(localStorage.getItem('PERFUME_CART')) || [];

// جعل وظيفة المسح "عالمية" عشان تشتغل مع الـ onclick في الـ HTML
window.removeFromCart = function(index) {
    cart.splice(index, 1);
    localStorage.setItem('PERFUME_CART', JSON.stringify(cart));
    updateCartUI();
};

document.addEventListener('DOMContentLoaded', () => {
    // 2. قراءة اسم الماركة من الرابط (URL)
    const params = new URLSearchParams(window.location.search);
    const brandParam = params.get('brand'); 

    // 3. تغيير العنوان وصورة الخلفية
    if (brandParam) {
        const brandTitle = document.getElementById('brand-title');
        if(brandTitle) brandTitle.innerText = brandParam.toUpperCase() + " COLLECTION";

        let bgImage = "";
        const brandLower = brandParam.toLowerCase();

        if (brandLower === 'boss') bgImage = "Boss.jpg";
        else if (brandLower === 'dior') bgImage = "ddior.jpg";
        else if (brandLower === 'chanel') bgImage = "chanl.jpg";
        else if (brandLower === 'jeanpaul') bgImage = "Jean-paul.jpg";

        if (bgImage !== "") {
            document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.85), rgba(0,0,0,0.85)), url('${bgImage}')`;
            document.body.style.backgroundSize = "cover";
            document.body.style.backgroundPosition = "center";
            document.body.style.backgroundAttachment = "fixed";
        }
    }

    // 4. قاعدة البيانات (الـ 32 عطر - حافظنا على أسماء الصور تبعتك)
    const perfumes = [
        // --- BOSS ---
        { brand: 'Boss', name: 'The Scent Magnetic', price: '$145', img: 'mag.jpg' },
        { brand: 'Boss', name: 'Bottled Night', price: '$120', img: 'night.jpg' },
        { brand: 'Boss', name: 'Bottled Infinite', price: '$115', img: 'infinite.jpg' },
        { brand: 'Boss', name: 'The Scent Absolute', price: '$135', img: 'intense.jpg' },
        { brand: 'Boss', name: 'The Scent Private', price: '$150', img: 'scent-perfum.jpg' },
        { brand: 'Boss', name: 'Boss Bottled Eau', price: '$110', img: 'tonic.jpg' },
        { brand: 'Boss', name: 'The Scent Elixir', price: '$165', img: 'elixer.jpg' },
        { brand: 'Boss', name: 'Hugo Man Extreme', price: '$95', img: 'beyond.jpg' },
        // --- DIOR ---
        { brand: 'Dior', name: 'Sauvage Elixir', price: '$180', img: 'sauvage-elixer.jpg' },
        { brand: 'Dior', name: 'Homme Intense', price: '$150', img: 'intense.jpeg' },
        { brand: 'Dior', name: 'Sauvage Parfum', price: '$165', img: 'kk.jpg' },
        { brand: 'Dior', name: 'Fahrenheit Intense', price: '$110', img: 'fah.jpg' },
        { brand: 'Dior', name: 'Dior Dune', price: '$125', img: 'dune.jpg' },
        { brand: 'Dior', name: 'Dior Poison', price: '$135', img: 'poison.jpg' },
        { brand: 'Dior', name: 'Miss Dior Rose', price: '$140', img: 'miss.jpg' },
        { brand: 'Dior', name: 'Jadore Parfum', price: '$170', img: 'jadore.jpg' },
        // --- CHANEL ---
        { brand: 'Chanel', name: 'Bleu Parfum', price: '$160', img: 'exclusif.jpg' },
        { brand: 'Chanel', name: 'Allure Sport', price: '$130', img: 'sport.jpg'},
        { brand: 'Chanel', name: 'Bleu EDP', price: '$145', img: 'edp.jpg' },
        { brand: 'Chanel', name: 'Platinum Égoïste', price: '$125', img: 'platinum.jpg' },
        { brand: 'Chanel', name: 'No. 5 Parfum', price: '$180', img: 'nb5.jpg' },
        { brand: 'Chanel', name: 'Coco Mademoiselle', price: '$165', img: 'coco.jpg' },
        { brand: 'Chanel', name: 'Chance Tendre', price: '$140', img: 'tendre.jpg' },
        { brand: 'Chanel', name: 'Gabrielle Chanel', price: '$155', img: 'gabrielle.jpg' },
        // --- JEAN PAUL ---
        { brand: 'JeanPaul', name: 'Scandal Pour Homme', price: '$130', img: 'gaultier.jpg' },
        { brand: 'JeanPaul', name: 'Le Male Elixir', price: '$145', img: 'male.jpg' },
        { brand: 'JeanPaul', name: 'Scandal Le Parfum', price: '$135', img: 'leparfum.jpg' },
        { brand: 'JeanPaul', name: 'Ultra Male', price: '$120', img: 'ultra.jpg' },
        { brand: 'JeanPaul', name: 'Le Beau Parfum', price: '$140', img: 'beau.jpg' },
        { brand: 'JeanPaul', name: 'La Belle Paradise', price: '$150', img: 'paradise.jpg' },
        { brand: 'JeanPaul', name: 'Scandal Gold', price: '$160', img: 'gold.jpg' },
        { brand: 'JeanPaul', name: 'Scandal gaultier', price: '$115', img: 'scandalher.jpg' }
    ];

    // 5. فلترة العطور وعرضها
    const itemsGrid = document.getElementById('items-grid');
    if (itemsGrid && brandParam) {
        const filtered = perfumes.filter(p => p.brand.toLowerCase() === brandParam.toLowerCase());
        
        filtered.forEach(p => {
            const card = `
                <div class="product-card">
                    <div class="product-img-box">
                        <img src="${p.img}" alt="${p.name}">
                        <div class="quick-view add-btn">Add to Cart</div>
                    </div>
                    <div class="product-details">
                        <span class="brand-name">${p.brand.toUpperCase()}</span>
                        <div class="name-price">
                            <h3>${p.name}</h3>
                            <span class="price">${p.price}</span>
                        </div>
                    </div>
                </div>
            `;
            itemsGrid.innerHTML += card;
        });
    }

    // 6. تشغيل السلة (تحديث الواجهة + فتح/إغلاق)
    updateCartUI();
    const cartBtn = document.getElementById('cart-btn');
    const closeBtn = document.getElementById('close-cart');
    const sidebar = document.getElementById('cart-sidebar');

    if(cartBtn) cartBtn.onclick = (e) => { e.preventDefault(); sidebar.classList.add('open'); };
    if(closeBtn) closeBtn.onclick = () => sidebar.classList.remove('open');

    // 7. منطق الـ Add to Cart من الكروت المفلترة
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-btn')) {
            const card = e.target.closest('.product-card');
            const product = {
                id: Date.now(),
                name: card.querySelector('h3').innerText,
                price: card.querySelector('.price').innerText,
                img: card.querySelector('img').src
            };
            addToCart(product);
        }
    });

    // 8. كود السيرش داخل المجموعة
    const searchInput = document.getElementById('searchInput');
    const noResults = document.getElementById('no-results');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const val = e.target.value.toLowerCase();
            const cards = document.querySelectorAll('.product-card');
            let found = false;

            cards.forEach(c => {
                const name = c.querySelector('h3').innerText.toLowerCase();
                if (name.includes(val)) {
                    c.style.display = "block";
                    found = true;
                } else {
                    c.style.display = "none";
                }
            });
            if (noResults) noResults.style.display = found ? "none" : "block";
        });
    }
});

// وظائف السلة الأساسية
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('PERFUME_CART', JSON.stringify(cart));
    updateCartUI();
    document.getElementById('cart-sidebar').classList.add('open'); // تفتح السلة فوراً
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
        total += parseFloat(item.price.replace('$', ''));
        container.innerHTML += `
            <div class="cart-item" style="display:flex; gap:10px; margin-bottom:15px; align-items:center;">
                <img src="${item.img}" style="width:50px; height:50px; object-fit:cover;">
                <div class="item-info">
                    <h4 style="font-size:11px; margin:0; color:white;">${item.name}</h4>
                    <span style="color:#e2d1b1; font-size:10px;">${item.price}</span>
                    <br>
                    <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer; font-size:9px; padding:0;">Remove</button>
                </div>
            </div>
        `;
    });
    if(totalEl) totalEl.innerText = `$${total.toFixed(2)}`;
}