document.addEventListener('DOMContentLoaded', function() {
    function mostrarPopupNotificacao() {
        // Obtém a mensagem do atributo 'mensagem' da tag <script>
        const scriptTag = document.querySelector('script[mensagem]');
        if (!scriptTag) return;

        
        //scriptTag.getAttribute('mensagem') ||

        const mensagem =  'Você tem uma nova notificação!';
        const popupKey = 'popupMensagemFechada';
        
        // Verifica se o pop-up já foi fechado ou se a mensagem foi alterada
        const mensagemAnterior = localStorage.getItem(popupKey);
        if (mensagemAnterior === mensagem) return;

        // Cria o contêiner do pop-up
        const popup = document.createElement('div');
        popup.id = 'notification-popup';
        popup.innerHTML = `
            <style>
                #notification-popup {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    width: 300px;
                    background-color: white;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                    padding: 15px;
                    z-index: 1000;
                    animation: slideIn 0.5s ease-out;
                }

                #notification-popup .content {
                    display: flex;
                    align-items: center;
                }

                #notification-popup .close-btn {
                    margin-left: auto;
                    background: none;
                    border: none;
                    cursor: pointer;
                }

                @keyframes slideIn {
                    from { 
                        opacity: 0; 
                        transform: translateX(100%); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateX(0); 
                    }
                }
            </style>
            <div class="content">
                <div>
                    <h3>Notificação</h3>
                    <p>${mensagem}</p>
                </div>
                <button class="close-btn">✕</button>
            </div>
        `;

        // Adiciona o pop-up ao final do body ou dentro da div app, se existir
        const targetDiv = document.getElementById('app');
        if (targetDiv) {
            targetDiv.appendChild(popup);
        } else {
            document.body.appendChild(popup);
        }

        // Função para fechar o pop-up
        popup.querySelector('.close-btn').addEventListener('click', function() {
            localStorage.setItem(popupKey, mensagem);
            popup.remove();
        });
    }

    // Chama a função de popup
    mostrarPopupNotificacao();
});