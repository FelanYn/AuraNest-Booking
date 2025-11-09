// Handle page-link interception for smooth page switches and simple animations

(function(){
    // Helper: animate class for element
    function animateOnce(el, cls){
        el.classList.remove(cls);
        // force reflow
        void el.offsetWidth;
        el.classList.add(cls);
        setTimeout(()=> el.classList.remove(cls), 900);
    }

    // Intercept internal link clicks to play a fade-out animation before navigating
    document.querySelectorAll('a.link-intercept').forEach(a=>{
        a.addEventListener('click', function(e){
            var href = a.getAttribute('href');
            // allow external or anchor links
            if(!href || href.startsWith('http') || href.startsWith('#')) return;
            e.preventDefault();
            document.documentElement.classList.add('page-exit');
            setTimeout(()=> { window.location = href; }, 350);
        });
    });

    // Hero search validation with animated error
    var searchForm = document.getElementById('hero-search');
    if(searchForm){
        var dest = document.getElementById('destination');
        var checkin = document.getElementById('checkin');
        var checkout = document.getElementById('checkout');
        var errorBox = document.getElementById('hero-error');

        function showError(msg){
            errorBox.textContent = msg;
            errorBox.hidden = false;
            errorBox.classList.remove('error-pop');
            void errorBox.offsetWidth;
            errorBox.classList.add('error-pop');
            setTimeout(()=> { errorBox.classList.remove('error-pop'); }, 1000);
        }

        searchForm.addEventListener('submit', function(e){
            // basic checks
            if(!dest.value.trim()){
                e.preventDefault();
                showError('Please enter a destination.');
                dest.focus();
                animateOnce(dest, 'input-shake');
                return;
            }
            if(checkin.value && checkout.value && checkin.value > checkout.value){
                e.preventDefault();
                showError('Check-out must be after check-in.');
                animateOnce(checkout, 'input-shake');
                return;
            }
            // allow submission otherwise
            // add a quick button click animation
            var btn = searchForm.querySelector('button[type=submit]');
            btn.classList.add('btn-click');
            setTimeout(()=> btn.classList.remove('btn-click'), 400);
        });

        // Instant feedback on invalid date selection
        checkin.addEventListener('change', function(){
            if(checkout.value && checkin.value > checkout.value){
                showError('Selected check-in is after check-out.');
            }
        });
    }

    // Main search page form validation and animation
    var mainForm = document.getElementById('main-search');
    if(mainForm){
        var dest = document.getElementById('destination-main');
        var checkin = document.getElementById('checkin-main');
        var checkout = document.getElementById('checkout-main');
        var errorBox = document.getElementById('main-error');

        function showError(msg){
            errorBox.textContent = msg;
            errorBox.hidden = false;
            errorBox.classList.remove('error-pop');
            void errorBox.offsetWidth;
            errorBox.classList.add('error-pop');
            setTimeout(()=> { errorBox.classList.remove('error-pop'); }, 1000);
        }

        mainForm.addEventListener('submit', function(e){
            if(!dest.value.trim()){
                e.preventDefault();
                showError('Please enter a destination.');
                dest.focus();
                animateOnce(dest, 'input-shake');
                return;
            }
            if(checkin.value && checkout.value && checkin.value > checkout.value){
                e.preventDefault();
                showError('Check-out must be after check-in.');
                animateOnce(checkout, 'input-shake');
                return;
            }
            var btn = mainForm.querySelector('button[type=submit]');
            btn.classList.add('btn-click');
            setTimeout(()=> btn.classList.remove('btn-click'), 400);
        });
        checkin.addEventListener('change', function(){
            if(checkout.value && checkin.value > checkout.value){
                showError('Selected check-in is after check-out.');
            }
        });
    }

    // Button ripple effect for all .btn elements
    document.querySelectorAll('.btn').forEach(btn=>{
        btn.addEventListener('click', function(e){
            var rect = btn.getBoundingClientRect();
            var ripple = document.createElement('span');
            ripple.className = 'ripple';
            var size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
            btn.appendChild(ripple);
            setTimeout(()=> ripple.remove(), 600);
        });
    });

})();
