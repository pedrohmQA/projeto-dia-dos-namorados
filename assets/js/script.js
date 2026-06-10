// ==================== CRONÔMETRO ====================
function atualizarCronometro() {
    // Data de início do namoro (ajuste conforme necessário)
    const dataInicio = new Date('2024-11-30'); // Exemplo: 15 de janeiro de 2023
    const agora = new Date();

    const diferenca = agora - dataInicio;

    // Cálculos
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
    const segundos = Math.floor((diferenca / 1000) % 60);

    // Atualizar elementos
    document.getElementById('dias').textContent = String(dias).padStart(2, '0');
    document.getElementById('horas').textContent = String(horas).padStart(2, '0');
    document.getElementById('minutos').textContent = String(minutos).padStart(2, '0');
    document.getElementById('segundos').textContent = String(segundos).padStart(2, '0');
}

// Atualizar cronômetro a cada segundo
atualizarCronometro();
setInterval(atualizarCronometro, 1000);

// ==================== PARALLAX EFFECT ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('parallax-visible');
        }
    });
}, observerOptions);

// Aplicar parallax nas imagens
document.addEventListener('DOMContentLoaded', () => {
    const memoryCards = document.querySelectorAll('.memory-card');
    
    memoryCards.forEach((card, index) => {
        observer.observe(card);
        
        // Adicionar efeito parallax no scroll
        card.style.position = 'relative';
    });
});

// ==================== FORMULÁRIO ====================
document.getElementById('casal-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const respostas = {
        engraçado: document.querySelector('input[name="engraçado"]:checked')?.value,
        ciumento: document.querySelector('input[name="ciumento"]:checked')?.value,
        bravo: document.querySelector('input[name="bravo"]:checked')?.value,
        romântico: document.querySelector('input[name="romântico"]:checked')?.value,
        paciente: document.querySelector('input[name="paciente"]:checked')?.value,
        prático: document.querySelector('input[name="prático"]:checked')?.value
    };

    // Validar se todas as perguntas foram respondidas
    const todasRespondidas = Object.values(respostas).every(v => v !== undefined);
    
    if (todasRespondidas) {
        // Mostrar resultado
        alert('Respostas registradas com sucesso! 💕\n\n' + 
              JSON.stringify(respostas, null, 2));
        
        // Scroll suave para a seção de presente
        setTimeout(() => {
            const presentSection = document.querySelector('.present-section');
            presentSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
    } else {
        alert('Por favor, responda todas as perguntas!');
    }
});

// ==================== BOTÃO DO PRESENTE ====================
document.getElementById('btn-present')?.addEventListener('click', () => {
    const modal = document.getElementById('modal-present');
    modal.classList.add('show');
    
    // Scroll para o topo quando o modal aparece
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==================== BOTÕES DO MODAL ====================
document.querySelector('.btn-sim')?.addEventListener('click', () => {
    alert('Eba! 🎉 Combinado então! Te amo! ❤️');
    fecharModal();
});

document.querySelector('.btn-nao')?.addEventListener('click', () => {
    alert('Que pena... 😔 Você tem certeza? 💔');
    // Tentar novamente após alguns segundos
    setTimeout(() => {
        alert('Deixe-me tentar novamente com um presente melhor! 🎁');
    }, 2000);
});

function fecharModal() {
    const modal = document.getElementById('modal-present');
    modal.classList.remove('show');
}

// Fechar modal ao clicar fora dele
document.getElementById('modal-present')?.addEventListener('click', (e) => {
    if (e.target.id === 'modal-present') {
        fecharModal();
    }
});

// ==================== NAVEGAÇÃO SUAVE ====================
document.addEventListener('DOMContentLoaded', () => {
    // Links com navegação suave (caso existam)
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ==================== SCROLL ANIMATIONS ====================
const scrollAnimateElements = document.querySelectorAll(
    '.memory-card, .form-section, .present-section'
);

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeIn 0.6s ease-out';
        }
    });
}, {
    threshold: 0.1
});

scrollAnimateElements.forEach(el => {
    scrollObserver.observe(el);
});

// ==================== SMOOTH SCROLL BEHAVIOR ====================
// Adicionar suporte para navegadores mais antigos
if (!('scrollBehavior' in document.documentElement.style)) {
    const html = document.documentElement;
    const body = document.body;
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const targetPosition = target.offsetTop;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;

                window.requestAnimationFrame(function step(timestamp) {
                    if (!start) start = timestamp;
                    const progress = timestamp - start;
                    const run = ease(progress, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    
                    if (progress < duration) {
                        window.requestAnimationFrame(step);
                    }
                });
            }
        });
    });

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
}

// ==================== PRELOAD IMAGES ====================
window.addEventListener('load', () => {
    const images = document.querySelectorAll('.memory-image');
    images.forEach(img => {
        img.style.opacity = '1';
    });
});


