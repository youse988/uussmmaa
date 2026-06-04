const translations = {
    fr: {
        nav_home: "Accueil",
        nav_shop: "Boutique",
        nav_contact: "Contact",
        front: "Face",
        back: "Dos",
        title: "T-Shirt Domicile USMA 2026",
        price: "3000 DA",
        description: "T-shirt USMA haute finition et de bonne qualité. Bienvenue chez USMA Store DZ !",
        form_title: "Finaliser la commande",
        fullname: "Nom Complet",
        fullname_placeholder: "Ex: Mohamed Ali",
        phone: "Numéro de Téléphone",
        wilaya: "Wilaya",
        wilaya_placeholder: "Choisir une wilaya",
        commune: "Commune",
        commune_placeholder: "Choisir ou saisir une commune",
        size: "Taille",
        quantity: "Quantité",
        submit: "Commander Maintenant",
        contact_title: "Contactez-nous",
        contact_address: "Stade Omar Hamadi, Bologhine, Alger",
        success_title: "Commande Réussie !",
        success_desc: "Merci pour votre achat. Notre équipe vous contactera bientôt pour la livraison.",
        close: "Fermer",
        processing: "Traitement...",
        delivery_method: "Mode de Livraison",
        home_delivery: "À Domicile",
        office_delivery: "Bureau (Stop Desk)",
        shipping_cost: "Frais de livraison:",
        total_amount: "Total à payer:",
        select_sizes: "Choisir les tailles et quantités",
        order_now: "Commander"
    },
    ar: {
        nav_home: "الرئيسية",
        nav_shop: "المتجر",
        nav_contact: "اتصل بنا",
        front: "من الأمام",
        back: "من الخلف",
        title: "تيشيرت بولو اتحاد العاصمة 2026",
        price: "3000 دج",
        description: "تيشيرت اتحاد العاصمة بجودة عالية وإتقان ممتاز. مرحباً بكم في متجر USMA Store DZ !",
        form_title: "إتمام الطلب",
        fullname: "الاسم الكامل",
        fullname_placeholder: "مثال: محمد أمين",
        phone: "رقم الهاتف",
        wilaya: "الولاية",
        wilaya_placeholder: "اختر الولاية",
        commune: "البلدية",
        commune_placeholder: "اختر أو اكتب البلدية",
        size: "المقاس",
        quantity: "الكمية",
        submit: "تأكيد الطلب",
        contact_title: "اتصل بنا",
        contact_address: "ملعب عمر حمادي، بولوغين، الجزائر",
        success_title: "تم تسجيل طلبك بنجاح!",
        success_desc: "شكراً لثقتكم بنا. سيتصل بكم فريقنا قريباً لتأكيد التوصيل.",
        close: "إغلاق",
        processing: "جاري المعالجة...",
        delivery_method: "طريقة التوصيل",
        home_delivery: "توصيل إلى المنزل",
        office_delivery: "توصيل إلى المكتب (Stop Desk)",
        shipping_cost: "تكلفة التوصيل:",
        total_amount: "المبلغ الإجمالي:",
        select_sizes: "اختر المقاسات والكميات",
        order_now: "اطلب الآن"
    }
};

let currentLang = 'fr';

document.addEventListener('DOMContentLoaded', () => {
    // Language Switcher Logic
    const langBtns = document.querySelectorAll('.lang-btn');
    
    function setLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Update active button
        langBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.id === `lang-${lang}`) {
                btn.classList.add('active');
            }
        });

        // Translate text elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.textContent = translations[lang][key];
            }
        });

        // Translate placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        updateCommuneLabels();
    }

    // Add event listeners to language buttons
    document.getElementById('lang-fr').addEventListener('click', () => setLanguage('fr'));
    document.getElementById('lang-ar').addEventListener('click', () => setLanguage('ar'));

    // Image Switcher Logic
    const productImage = document.getElementById('product-image');
    const viewBtns = document.querySelectorAll('.view-btn');
    
    const images = {
        front: 'IMGE/USMAAVANT.jpeg',
        back: 'IMGE/USMAARRIER.jpeg'
    };

    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('active')) return;

            // Remove active class from all buttons
            viewBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const view = btn.getAttribute('data-view');
            
            // Add fade out effect
            productImage.classList.add('fade-out');
            
            // Wait for fade out to complete before changing source
            setTimeout(() => {
                productImage.src = images[view];
                // Remove fade out to trigger fade in
                productImage.classList.remove('fade-out');
            }, 300); // 300ms matches the transition duration in css
        });
    });

    // Commune par wilaya (liste + saisie libre)
    const wilayaSelect = document.getElementById('wilaya');
    const communeInput = document.getElementById('commune');
    const communesList = document.getElementById('communes-list');

    function resetCommuneField() {
        communeInput.value = '';
        communesList.innerHTML = '';
        communeInput.disabled = true;
    }

    function fillCommunesDatalist(wilayaCode) {
        communesList.innerHTML = '';
        if (!wilayaCode || typeof communesByWilaya === 'undefined' || !communesByWilaya[wilayaCode]) {
            return;
        }

        communesByWilaya[wilayaCode].forEach((commune) => {
            const option = document.createElement('option');
            option.dataset.fr = commune.fr;
            option.dataset.ar = commune.ar;
            option.value = currentLang === 'ar' ? commune.ar : commune.fr;
            communesList.appendChild(option);
        });
    }

    function populateCommunes(wilayaCode) {
        communeInput.value = '';
        fillCommunesDatalist(wilayaCode);
        communeInput.disabled = !wilayaCode;
    }

    function updateCommuneLabels() {
        const wilayaCode = wilayaSelect.value;
        const currentValue = communeInput.value.trim();

        if (currentValue && wilayaCode && communesByWilaya[wilayaCode]) {
            const matched = communesByWilaya[wilayaCode].find(
                (c) => c.fr === currentValue || c.ar === currentValue
            );
            if (matched) {
                communeInput.value = currentLang === 'ar' ? matched.ar : matched.fr;
            }
        }

        fillCommunesDatalist(wilayaCode);
    }

    wilayaSelect.addEventListener('change', () => {
        populateCommunes(wilayaSelect.value);
        checkDeliveryMethodAvailability();
        updatePrice();
    });

    resetCommuneField();
    checkDeliveryMethodAvailability();

    // Shipping Calculation Logic
    const deliveryMethods = document.querySelectorAll('input[name="deliveryMethod"]');
    const shippingDisplay = document.getElementById('shipping-display');
    const totalDisplay = document.getElementById('total-display');
    const basePrice = 3000;

    // Size and Quantity logic
    const sizeQtys = document.querySelectorAll('.size-qty');
    const plusBtns = document.querySelectorAll('.qty-btn.plus');
    const minusBtns = document.querySelectorAll('.qty-btn.minus');

    plusBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            sizeQtys[index].value = parseInt(sizeQtys[index].value) + 1;
            updatePrice();
        });
    });

    minusBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const val = parseInt(sizeQtys[index].value);
            if (val > 0) {
                sizeQtys[index].value = val - 1;
                updatePrice();
            }
        });
    });

    const shippingRates = {
        'default': { domicile: 700, bureau: 400 },
        '01': { domicile: 1500, bureau: 1000 }, // Adrar
        '02': { domicile: 800, bureau: 500 }, // Chlef
        '03': { domicile: 1000, bureau: 600 }, // Laghouat
        '04': { domicile: 800, bureau: 500 }, // Oum El Bouaghi
        '05': { domicile: 800, bureau: 500 }, // Batna
        '06': { domicile: 800, bureau: 500 }, // Béjaïa
        '07': { domicile: 1000, bureau: 600 }, // Biskra
        '08': { domicile: 1200, bureau: 800 }, // Béchar
        '09': { domicile: 600, bureau: 400 }, // Blida
        '10': { domicile: 700, bureau: 450 }, // Bouira
        '11': { domicile: 2000, bureau: 1500 }, // Tamanrasset
        '12': { domicile: 900, bureau: 600 }, // Tébessa
        '13': { domicile: 800, bureau: 500 }, // Tlemcen
        '14': { domicile: 900, bureau: 600 }, // Tiaret
        '15': { domicile: 700, bureau: 450 }, // Tizi Ouzou
        '16': { domicile: 500, bureau: 300 }, // Alger
        '17': { domicile: 1000, bureau: 600 }, // Djelfa
        '18': { domicile: 800, bureau: 500 }, // Jijel
        '19': { domicile: 800, bureau: 500 }, // Sétif
        '20': { domicile: 900, bureau: 600 }, // Saïda
        '21': { domicile: 800, bureau: 500 }, // Skikda
        '22': { domicile: 800, bureau: 500 }, // Sidi Bel Abbès
        '23': { domicile: 800, bureau: 500 }, // Annaba
        '24': { domicile: 900, bureau: 600 }, // Guelma
        '25': { domicile: 800, bureau: 500 }, // Constantine
        '26': { domicile: 700, bureau: 450 }, // Médéa
        '27': { domicile: 800, bureau: 500 }, // Mostaganem
        '28': { domicile: 800, bureau: 500 }, // M'Sila
        '29': { domicile: 800, bureau: 500 }, // Mascara
        '30': { domicile: 1100, bureau: 700 }, // Ouargla
        '31': { domicile: 800, bureau: 500 }, // Oran
        '32': { domicile: 1200, bureau: 800 }, // El Bayadh
        '33': { domicile: 1900, bureau: 1500 }, // Illizi
        '34': { domicile: 800, bureau: 500 }, // Bordj Bou Arréridj
        '35': { domicile: 600, bureau: 400 }, // Boumerdès
        '36': { domicile: 900, bureau: 600 }, // El Tarf
        '37': { domicile: 1700, bureau: 1000 }, // Tindouf
        '38': { domicile: 800, bureau: 500 }, // Tissemsilt
        '39': { domicile: 1100, bureau: 700 }, // El Oued
        '40': { domicile: 900, bureau: 600 }, // Khenchela
        '41': { domicile: 900, bureau: 600 }, // Souk Ahras
        '42': { domicile: 600, bureau: 400 }, // Tipaza
        '43': { domicile: 800, bureau: 500 }, // Mila
        '44': { domicile: 800, bureau: 500 }, // Aïn Defla
        '45': { domicile: 1200, bureau: 800 }, // Naâma
        '46': { domicile: 800, bureau: 500 }, // Aïn Témouchent
        '47': { domicile: 1100, bureau: 700 }, // Ghardaïa
        '48': { domicile: 800, bureau: 500 }, // Relizane
        '49': { domicile: 1100, bureau: null }, // El M'Ghair
        '50': { domicile: 1100, bureau: 800 }, // El Meniaa
        '51': { domicile: 1000, bureau: 600 }, // Ouled Djellal
        '52': { domicile: 2000, bureau: 1500 }, // Bordj Baji Mokhtar
        '53': { domicile: 1200, bureau: 800 }, // Beni Abbes
        '54': { domicile: 1500, bureau: 1000 }, // Timimoun
        '55': { domicile: 1100, bureau: 700 }, // Touggourt
        '56': { domicile: 2000, bureau: 1500 }, // Djanet
        '57': { domicile: 1800, bureau: 1200 }, // In Salah
        '58': { domicile: 2000, bureau: 1500 }, // In Guezzam
    };

    function checkDeliveryMethodAvailability() {
        const wilaya = wilayaSelect.value;
        const bureauRadio = document.querySelector('input[name="deliveryMethod"][value="bureau"]');
        const domicileRadio = document.querySelector('input[name="deliveryMethod"][value="domicile"]');
        
        if (wilaya && shippingRates[wilaya]) {
            const rates = shippingRates[wilaya];
            if (rates.bureau === null) {
                bureauRadio.disabled = true;
                bureauRadio.parentElement.classList.add('disabled');
                if (bureauRadio.checked) {
                    domicileRadio.checked = true;
                }
            } else {
                bureauRadio.disabled = false;
                bureauRadio.parentElement.classList.remove('disabled');
            }
        } else {
            bureauRadio.disabled = false;
            bureauRadio.parentElement.classList.remove('disabled');
        }
    }

    function updatePrice() {
        const wilaya = wilayaSelect.value;
        const method = document.querySelector('input[name="deliveryMethod"]:checked').value;
        
        let totalQty = 0;
        sizeQtys.forEach(input => {
            totalQty += parseInt(input.value) || 0;
        });

        let shipping = 0;
        let isAvailable = true;
        if (wilaya && totalQty > 0) {
            const rates = shippingRates[wilaya] || shippingRates['default'];
            shipping = rates[method];
            if (shipping === null) {
                isAvailable = false;
            }
        }

        const total = (basePrice * totalQty) + (isAvailable ? shipping : 0);
        
        if (!isAvailable) {
            shippingDisplay.textContent = currentLang === 'ar' ? 'غير متوفر' : 'Non disponible';
            totalDisplay.textContent = `${basePrice * totalQty} DA`;
        } else {
            shippingDisplay.textContent = `${shipping} DA`;
            totalDisplay.textContent = `${total} DA`;
        }
    }

    deliveryMethods.forEach(radio => radio.addEventListener('change', updatePrice));

    // Form Submission Logic
    const orderForm = document.getElementById('order-form');
    const modalOverlay = document.getElementById('success-modal');
    const closeModalBtn = document.getElementById('close-modal');

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let totalQty = 0;
        sizeQtys.forEach(input => {
            totalQty += parseInt(input.value) || 0;
        });

        if (totalQty === 0) {
            alert(currentLang === 'fr' ? 'Veuillez choisir au moins une taille.' : 'يرجى اختيار مقاس واحد على الأقل.');
            return;
        }

        // Calculate total order value for tracking/analytics
        const wilaya = wilayaSelect.value;
        const method = document.querySelector('input[name="deliveryMethod"]:checked').value;
        const rates = shippingRates[wilaya] || shippingRates['default'];
        const shipping = (rates && rates[method] !== null) ? rates[method] : 0;
        const purchaseValue = (basePrice * totalQty) + shipping;
        
        // Change button state
        const submitBtnSpan = orderForm.querySelector('.submit-btn span');
        const originalText = translations[currentLang].submit;
        submitBtnSpan.textContent = translations[currentLang].processing;
        orderForm.querySelector('.submit-btn').style.opacity = '0.7';
        
        // Prepare form data for Web3Forms
        const formData = new FormData(orderForm);
        formData.append("Prix_Total", totalDisplay.textContent);
        formData.append("Frais_Livraison", shippingDisplay.textContent);
        
        // API call to Web3Forms
        fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            body: formData
        })
        .then(async (response) => {
            const data = await response.json();
            if (data.success) {
                // Trigger Meta Pixel Purchase Event
                if (typeof fbq !== 'undefined') {
                    fbq('track', 'Purchase', {
                        value: purchaseValue,
                        currency: 'DZD',
                        content_name: 'T-Shirt POLO USMA 2026',
                        content_category: 'Apparel',
                        num_items: totalQty
                    });
                }

                // Reset form
                orderForm.reset();
                resetCommuneField();
                updatePrice(); // reset total text
                
                // Reset button
                submitBtnSpan.textContent = originalText;
                orderForm.querySelector('.submit-btn').style.opacity = '1';
                
                // Show success modal
                modalOverlay.classList.add('active');
            } else {
                alert(currentLang === 'fr' ? 'Une erreur est survenue lors de la commande. Veuillez réessayer.' : 'حدث خطأ أثناء الطلب. يرجى المحاولة مرة أخرى.');
                submitBtnSpan.textContent = originalText;
                orderForm.querySelector('.submit-btn').style.opacity = '1';
            }
        })
        .catch(error => {
            alert(currentLang === 'fr' ? 'Une erreur de connexion est survenue.' : 'حدث خطأ في الاتصال.');
            submitBtnSpan.textContent = originalText;
            orderForm.querySelector('.submit-btn').style.opacity = '1';
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    // Close modal on outside click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });
});
