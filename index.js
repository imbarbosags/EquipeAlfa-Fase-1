document.addEventListener('DOMContentLoaded', () => {
    
    const hamburgerButton = document.querySelector('.hamburger-button');
    const navMenu = document.querySelector('.main-nav');

    if (hamburgerButton && navMenu) {
        hamburgerButton.addEventListener('click', () => {
            const isActive = navMenu.classList.toggle('active');
            hamburgerButton.classList.toggle('active');
            hamburgerButton.setAttribute('aria-expanded', isActive ? 'true' : 'false');
        });
    }

    
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const id = link.getAttribute('href');
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();

            const headerOffset = 80;
            const y = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;

            window.scrollTo({ top: y, behavior: 'smooth' });

            
            if (navMenu?.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburgerButton?.classList.remove('active');
                hamburgerButton?.setAttribute('aria-expanded', 'false');
            }
        });
    });

    
    const form = document.getElementById('form-contato');
    const feedback = document.getElementById('form-feedback');

    const setFeedback = (msg, ok = false) => {
        if (!feedback) return;
        feedback.textContent = msg;
        feedback.style.color = ok ? '#10b981' : '#ff6b6b'; 
    };

    form?.addEventListener('submit', e => {
        e.preventDefault();
        const data = new FormData(form);

        const nome = (data.get('nome') || '').toString().trim();
        const email = (data.get('email') || '').toString().trim();
        const mensagem = (data.get('mensagem') || '').toString().trim();

        if (!nome) return setFeedback('Por favor, informe seu nome.');
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) return setFeedback('Digite um e-mail válido.');
        if (!mensagem || mensagem.length < 10) return setFeedback('Sua mensagem deve ter pelo menos 10 caracteres.');

    
        setFeedback('Mensagem enviada com sucesso! ✅', true);
        form.reset();
    });

    
    const year = document.getElementById('ano-atual');
    if (year) year.textContent = new Date().getFullYear();
});
