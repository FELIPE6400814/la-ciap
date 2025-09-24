document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.getElementById('mobileMenu');
    const body = document.body;

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('is-open');
            mobileMenuButton.setAttribute('aria-expanded', mobileMenu.classList.contains('is-open'));
            
            // Opcional: Cambiar el ícono de hamburguesa a una 'X' cuando está abierto
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('is-open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                body.style.overflow = 'hidden'; // Evita el scroll del body cuando el menú está abierto
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                body.style.overflow = ''; // Restaura el scroll
            }
        });

        // Cerrar el menú si se hace clic en un enlace (para SPAs o navegación en la misma página)
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileMenu.classList.contains('is-open')) {
                    mobileMenu.classList.remove('is-open');
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                    const icon = mobileMenuButton.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    body.style.overflow = '';
                }
            });
        });
    }

    // Código del seguidor del menú (asegúrate que solo aplique a .desktop-nav)
    const navLinks = document.querySelectorAll('.desktop-nav li a'); // Cambiado para apuntar a .desktop-nav
    const navList = document.querySelector('.desktop-nav'); // Cambiado para apuntar a .desktop-nav

    if (navList && navLinks.length > 0) { // Verificar que existan antes de añadir listeners
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                const rect = this.getBoundingClientRect();
                const parentRect = navList.getBoundingClientRect();
                navList.style.setProperty('--follower-left', `${rect.left - parentRect.left}px`);
                navList.style.setProperty('--follower-width', `${rect.width}px`);
            });
        });

        navList.addEventListener('mouseleave', function() {
            // Opcional: hacer que el seguidor vuelva a una posición por defecto o desaparezca
            // navList.style.setProperty('--follower-width', '0'); 
        });
    }

    const fadeElements = document.querySelectorAll('section, .feature-item, .investigator-item, footer'); // Selecciona todas las secciones y otros elementos que quieres animar

    const observerOptions = {
        root: null, // usa el viewport como root
        rootMargin: '0px',
        threshold: 0.1 // El elemento se considera visible cuando al menos el 10% está en pantalla
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                entry.target.classList.add('fade-in-element'); // Asegúrate de que tenga la clase base también
                observer.unobserve(entry.target); // Deja de observar el elemento una vez que es visible
            } else {
                // Opcional: si quieres que el efecto se repita cada vez que entra y sale
                // entry.target.classList.remove('is-visible');
                // Si solo quieres que aparezca una vez, no necesitas la parte 'else'
                // Para el efecto inicial, nos aseguramos que los elementos tengan la clase base
                if (!entry.target.classList.contains('fade-in-element')){
                    entry.target.classList.add('fade-in-element');
                }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    fadeElements.forEach(el => {
        el.classList.add('fade-in-element'); // Aplica la clase base inicialmente para que estén ocultos
        observer.observe(el);
    });

});
