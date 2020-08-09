/* NOTE: TESTANDO ARMAZENAR MENSAGENS */

const getjSONMessages = function () {

    // Capturando todas as mensagens do link por GET
    fetch("https://staging.mtr.center/api/chat/message/")
        .then(messages => messages.json())
        .then(messages => messagesFilter(messages));


    const arrayMessages = []; // Recebe todas as mensagens do "Projeto 6"
    // Filtrando apenas as mensagens do "Projeto 6"
    function messagesFilter(messages) {
        messages.filter((message) => {
            if (message.project === 6 && message.date != null) arrayMessages.push(message);
        });

        // Formatando a data recebida e retornando o array já modificado
        parseData(arrayMessages);
        //console.log(arrayMessages)

        // Agrupar mensagens de acordo com a data
        groupMessages(arrayMessages);

    }

    // Função para formatar data recebida pelo JSON e retornar o array modificado
    function parseData(array) {
        array.forEach(element => {
            const modifyDate = new Date(element.date);
            element.date = modifyDate.toString();
        });
        return array;
    }

    // Função para agrupar as mensagens de acordo com a data
    const newArray = [];
    function groupMessages(array) {

        /* FORMATA A DATA PARA FACILITAR AGRUPAMENTO POR DD/MM/AAAA */
        for (let index = 0; index < array.length; index++) {
            array[index].date = array[index].date.substring(0, 15);
            newArray.push(array[index]);
        }

        /* MAPEIA AS MENSAGENS DE ACORDO COM A DATA (DD/MM/AAAA) */
        function groupBy(array, keyGetter) {
            const map = new Map();
            array.forEach((message) => {
                const key = keyGetter(message);
                const collection = map.get(key);
                if (!collection) {
                    map.set(key, [message]);
                } else {
                    collection.push(message);
                }
            });

            // FUNÇÃO QUE TRANSFORMA O MAP EM ARRAY DE ARRAY E PEGA INDIVIDUALMENTE CADA LINHA DO OBJETO
            const arr = Array.from(map);
            arr.forEach(element => {
                const dia = element[0]; // PEGA A DATA REFERENTE AS MENSAGENS
                console.log(dia)
                console.log(dia.length)
                document.querySelector('.data-message').textContent = dia; // pega apenas o ultimo

                // PEGA CADA MENSAGEM DO DIA
                element[1].forEach(item => {
                    const imprimir = "Meu id é: " + item.id +
                        "Meu nome é: " + item.name +
                        "Menssagem é: " + item.message +
                        "Status da mensagem: " + item.read;
                        document.querySelector('.day-messages').append(imprimir);
                })

                //TODO: CRIAR DIV DO DIA E DIV A CADA MENSAGEN COM A FUNÇÃO ACIMA
            });

            return map;
        }

        /* ORDENA O ARRAY PELO ID DO ELEMENTO DE FORMA DECRESCENTE */
        function sortByID(a, b) {
            if (a.id < b.id) return 1;
            if (a.id > b.id) return -1;
            return 0;
        }

        // RETORNA UMA 'PILHA' DE MENSAGEM, ONDE A PRIMEIRA É A MAIS RECENTE!
        const groupedMessageByDate = groupBy(newArray.sort(sortByID), message => message.date);
    }

}

getjSONMessages();


// function createDayMessages() {
//     const divContainer = document.querySelector(".container-scroll");
//      const divDayMessages = '<div class="day-messages"><p class="data-message">' + 'message.data' + '</p>';
//       const pDataMessage = document.createElement("p").classList.add("data-message"); //todo: adicionar texto
//       const divMessageItem = document.createElement("div").classList.add("message-item");
//         const div = document.createElement("div").style.display = "flex";
//           const pClientName = document.createElement("p").classList.add("client-name"); //todo: adicionar texto
//           const pMessageTime = document.createElement("p").classList.add("message-time"); //todo: adicionar texto
//         const divCheckButton = document.createElement("div").classList.add("check-button");
//           const svgButton = '<span class="iconify" data-icon="bi:check" data-inline="false" style="color: #DBE3F9;" data-width="40px" data-height="40px"></span>';
//         //divCheckButton.innerHTML = svgButton;


//         divContainer.innerHTML  = divDayMessages;

        
//         // <div class="message-item checked"><div style="display: flex;"><p class="client-name">Marcos</p><p class="message-time">12:02</p></div><p class="message-content">Lorem ipsum dolor sit amet?</p><div class="check-button checked-button"><span class="iconify" data-icon="bi:check" data-inline="false" style="color: #DBE3F9;" data-width="40px" data-height="40px"></span></div></div>';
        

// }