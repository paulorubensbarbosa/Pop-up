(function() {
    // Defina a mensagem com quebras de linha manuais usando <br>
    //const mensagem = 'Esta é uma notificação personalizada com um link!<br>Clique <a href="https://seulink.com" target="_blank">aqui</a> para saber mais.<br>Esta mensagem usa quebras de linha manuais.';
    const scriptTag = document.currentScript;
    const mensagem = scriptTag.getAttribute('msg') || ''

    const popupKey = 'popupMensagemFechada';

    // Verifica se o pop-up já foi fechado anteriormente
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
                max-width: 500px;
                text-align: left;
                background-color: white;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                padding: 15px;
                z-index: 1000;
                animation: slideIn 0.5s ease-out;
                word-wrap: break-word;
            }

            #notification-popup .content {
                display: flex;
                align-items: center;
                flex-direction: column;
                text-align: left;
            }

            #notification-popup .close-btn {
                align-self: flex-end;
                background: none;
                border: none;
                cursor: pointer;
                font-size: 16px;
            }

            #notification-popup p.titulo {
                color: #1f2937;
                font-family: Roboto, sans-serif;
                font-style: normal;
                font-weight: 500;
                font-size: 25px;
                line-height: 29px;
                margin: 0;
            }

            #notification-popup p.mensagem {
                margin: 10px 0 0;
                white-space: pre-wrap;
            }

            #notification-popup a {
                color: blue;
                text-decoration: underline;
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
            <button class="close-btn">✕</button>
            <div>
                <p class="titulo">Notificação</p>
                <p class="mensagem">${mensagem}</p>
            </div>
        </div>
    `;

    // Adiciona o pop-up ao final do body ou dentro da div com ID 'app' se ela existir
    const targetDiv = document.getElementById('app');
    if (targetDiv) {
        targetDiv.appendChild(popup);
    } else {
        document.body.appendChild(popup);
    }

    // Função para fechar o pop-up e armazenar o fechamento no localStorage
    popup.querySelector('.close-btn').addEventListener('click', function() {
        localStorage.setItem(popupKey, mensagem);
        popup.remove();
    });
})();
