// Menu Mobile Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuMobile = document.querySelector('.menu-mobile');
    const menu = document.querySelector('.menu');
    
    if (menuMobile) {
        menuMobile.addEventListener('click', function() {
            menu.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.menu') && !event.target.closest('.menu-mobile') && menu.classList.contains('active')) {
            menu.classList.remove('active');
        }
    });
    
    // Formulário de Contato
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Resetar mensagens de erro
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(message => {
                message.textContent = '';
            });
            
            // Obter valores dos campos
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const mensagem = document.getElementById('mensagem').value.trim();
            
            let isValid = true;
            
            // Validar nome
            if (nome === '') {
                document.getElementById('nome-error').textContent = 'Por favor, informe seu nome';
                isValid = false;
            }
            
            // Validar email
            if (email === '') {
                document.getElementById('email-error').textContent = 'Por favor, informe seu e-mail';
                isValid = false;
            } else if (!isValidEmail(email)) {
                document.getElementById('email-error').textContent = 'Por favor, informe um e-mail válido';
                isValid = false;
            }
            
            // Validar mensagem
            if (mensagem === '') {
                document.getElementById('mensagem-error').textContent = 'Por favor, escreva sua mensagem';
                isValid = false;
            }
            
            // Se tudo estiver válido, enviar o formulário
            if (isValid) {
                // Aqui você normalmente enviaria os dados para um servidor
                // Como é apenas uma demonstração, vamos mostrar uma mensagem de sucesso
                
                // Criar elemento de mensagem de sucesso
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                successMessage.style.backgroundColor = '#d4edda';
                successMessage.style.color = '#155724';
                successMessage.style.padding = '15px';
                successMessage.style.borderRadius = '4px';
                successMessage.style.marginBottom = '20px';
                
                // Inserir antes do formulário
                contactForm.parentNode.insertBefore(successMessage, contactForm);
                
                // Limpar formulário
                contactForm.reset();
                
                // Remover mensagem após 5 segundos
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);
            }
        });
        
        // Validação em tempo real
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Limpar mensagem de erro quando o usuário começa a digitar
                const errorElement = document.getElementById(`${this.id}-error`);
                if (errorElement) {
                    errorElement.textContent = '';
                }
            });
        });
    }
});

// Função para validar email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para validar campos individuais
function validateField(field) {
    const fieldId = field.id;
    const fieldValue = field.value.trim();
    const errorElement = document.getElementById(`${fieldId}-error`);
    
    if (!errorElement) return;
    
    switch (fieldId) {
        case 'nome':
            if (fieldValue === '') {
                errorElement.textContent = 'Por favor, informe seu nome';
            }
            break;
        case 'email':
            if (fieldValue === '') {
                errorElement.textContent = 'Por favor, informe seu e-mail';
            } else if (!isValidEmail(fieldValue)) {
                errorElement.textContent = 'Por favor, informe um e-mail válido';
            }
            break;
        case 'mensagem':
            if (fieldValue === '') {
                errorElement.textContent = 'Por favor, escreva sua mensagem';
            }
            break;
    }
}