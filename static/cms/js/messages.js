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
                    if (!arrDayMsg[index].read) {
                        const card = `<div class="message-item"><div style="display: flex;"><p class="client-name"> ${arrDayMsg[index].name} </p><p class="message-time"> ${arrDayMsg[index].time} </p><span class="id-msg" style="visibility: hidden;">${arrDayMsg[index].id}</span><span class="read-msg" style="visibility: hidden;">${arrDayMsg[index].read}</span></div><p class="message-content"> ${arrDayMsg[index].message} </p><div class="check-button"><span class="iconify" data-icon="bi:check" data-inline="false" style="color: #DBE3F9;"data-width="40px" data-height="40px"></span></div></div>`
                        divDayMessages.innerHTML += card;
                    }

                    else {
                        const card = `<div class="message-item checked"><div style="display: flex;"><p class="client-name"> ${arrDayMsg[index].name} </p><p class="message-time"> ${arrDayMsg[index].time} </p><span class="id-msg" style="visibility: hidden;">${arrDayMsg[index].id}</span><span class="read-msg" style="visibility: hidden;">${arrDayMsg[index].read}</span></div><p class="message-content"> ${arrDayMsg[index].message} </p><div class="check-button checked-button"><span class="iconify" data-icon="bi:check" data-inline="false" style="color: #DBE3F9;"data-width="40px" data-height="40px"></span></div></div>`
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


const readMsg = function () {
    setTimeout(function () {
        const ckbtn = document.querySelectorAll('.check-button');
        const msgitem = document.querySelectorAll('.message-item');
        const idmsg = document.querySelectorAll('.id-msg');
        const readmsg = document.querySelectorAll('.read-msg');
        for (let index = 0; index < ckbtn.length; index++) {
            const btn = ckbtn[index];
            const msg = msgitem[index];
            const id = idmsg[index].textContent;
            const read = readmsg[index];
            btn.onclick = function () {
                //ATUALIZAR ATRAVES DO PUT
                const url = `https://staging.mtr.center/api/chat/message/${id}/`;

                var data = {};
                data.read = checkMessage(btn, msg, read);
                var json = JSON.stringify(data);
                var xhr = new XMLHttpRequest();
                xhr.open("PUT", url, true);
                xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
                xhr.send(json);
            }

        }
    }, 5000);


    function checkMessage(btn, msg, read) {
        if (btn.classList.contains('checked-button')) {
            btn.classList.remove('checked-button');
            msg.classList.remove('checked');
            return read.textContent = false;
        } else {
            btn.classList.add('checked-button');
            msg.classList.add('checked');
            return read.textContent = true;
        }
    }
}
readMsg();

function startLiveUpdate() {
    const btnLive = document.querySelector('input[type=checkbox]');
    const statusLive = document.querySelector('.switch-status');
    const container = document.querySelector('.container-scroll');
    
    btnLive.onchange = function() {
        if(btnLive.checked) {
            statusLive.textContent = "Ativado";
            changeStatus(true);
            interval = setInterval(function() {
                container.innerHTML = '',
                getjSONMessages();
                readMsg();
            }, 10000);      
        } else {
            statusLive.textContent = "Desativado";
            changeStatus(false);
            clearInterval(interval)
        }
    }
    
    function changeStatus(status) {
        const url = 'https://staging.mtr.center/api/project/6/';
        const username = 'testefront';
        const password = 'frontendTesting@More';
        
        const data = {};
        data.is_live_active = status;
        const json = JSON.stringify(data);
        
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", url, true);
        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(username + ":" + password))
        xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
        xhr.send(json);
        //console.log(data)
    }

}

startLiveUpdate();

