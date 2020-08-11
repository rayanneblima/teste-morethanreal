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
            array[index].time = array[index].date.substring(16, 24); //ATRIBUI A HORA DA MSG
            array[index].date = array[index].date.substring(0, 15); //ATRIBUI DD/MM/AAAA
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


            //NOTE: FALTA MEXER AQUI!! PROBLEMA NO MAP PQ TROQUEI A FORMA DA DATA
            //NOTE: PROBLEMA NO CHECK BUTTON POR NAO ATUALIZAR O CLICK


            // FUNÇÃO QUE TRANSFORMA O MAP EM ARRAY DE ARRAY E PEGA INDIVIDUALMENTE CADA LINHA DO OBJETO
            const arr = Array.from(map);
            const divScroll = document.querySelector('.container-scroll');
            //arr = [dayMsg, arrDayMsg[0,1,2,3]]
            //arr = [index[0], index[1][]]
            for (let index = 0; index < arr.length; index++) {
                const dayMsg = arr[index][0];
                const arrDayMsg = arr[index][1];
                const divDayMessages = document.createElement('div');
                divDayMessages.classList.add('day-messages');
                divDayMessages.innerHTML = `<p class="data-message"> ${dayMsg} </p>`;
              
                for (let index = 0; index < arrDayMsg.length; index++) {
                    if(!arrDayMsg[index].read) {
                        const card = `<div class="message-item"><div style="display: flex;"><p class="client-name"> ${arrDayMsg[index].name} </p><p class="message-time"> ${arrDayMsg[index].time} </p></div><p class="message-content"> ${arrDayMsg[index].message} </p><div class="check-button"><span class="iconify" data-icon="bi:check" data-inline="false" style="color: #DBE3F9;"data-width="40px" data-height="40px"></span></div></div>`
                        divDayMessages.innerHTML += card;
                    }

                    else {
                        const card = `<div class="message-item checked"><div style="display: flex;"><p class="client-name"> ${arrDayMsg[index].name} </p><p class="message-time"> ${arrDayMsg[index].time} </p></div><p class="message-content"> ${arrDayMsg[index].message} </p><div class="check-button checked-button"><span class="iconify" data-icon="bi:check" data-inline="false" style="color: #DBE3F9;"data-width="40px" data-height="40px"></span></div></div>`
                        divDayMessages.innerHTML += card;
                    }
                }
                divScroll.append(divDayMessages); 
            }
            return map;
        }

        /* ORDENA O ARRAY PELO ID DO ELEMENTO DE FORMA DECRESCENTE */
        function sortByID(a, b) {
            if (a.id < b.id) return 1;
            if (a.id > b.id) return -1;
            return 0;
        }

        // RETORNA UMA PILHA DE MENSAGEM, ONDE A PRIMEIRA É A MAIS RECENTE!
        const groupedMessageByDate = groupBy(newArray.sort(sortByID), message => message.date);
    }

}

getjSONMessages();