let nowMoney = 0;
let nowButton = 0;
let nowShop = 0;
let nowMouse = 0;
let workerTime = 1000;
let feverTime = 100;
let nowFeverMain = 0;

function addMoney() {
    nowMoney += mouses[nowMouse].cash
    document.getElementById('nowMoney').innerHTML = nowMoney;
}

function upgrade() {
    if (nowMoney >= buttons[nowButton + 1].cost) {
        nowMoney -= buttons[nowButton + 1].cost;
        document.getElementById('btn').innerHTML = buttons[nowButton + 1].id;
        document.getElementById('nowMoney').innerHTML = nowMoney;
        nowButton ++;
    } else {
        alert('강화실패');
    }
}

function formatWorkers() {
    document.getElementById('workerShop').innerHTML = '';
    for (let i = 0; i < workers.length; i++) {
        document.getElementById('workerShop').innerHTML += `<div class="workers" id="worker${i}" onclick="buyWorker(${i});">${workers[i].id}<span style='float: right;'>${workers[i].count}</span></div>`
    }
}

function buyWorker(n) {
    if (nowMoney >= workers[n].cost) {
        workers[n].count ++;
        nowMoney -= workers[n].cost;
        document.getElementById('nowMoney').innerHTML = nowMoney;
        formatWorkers();
    } else {
        alert('구매실패');
    }   
}

formatWorkers(); // HTML 처음 실행 시 일꾼 구매 버튼 생성

function formatUpgrade() {
    document.getElementById('upgrade0').innerHTML = `${mouses[nowMouse].id} -> ${mouses[nowMouse + 1].id}`
    document.getElementById('upgrade1').innerHTML = `${workerTime / 1000}s -> ${(workerTime - 100) / 1000}s`
    document.getElementById('upgrade2').innerHTML = `${feverTime / 10}s -> ${(feverTime - 10) / 10}s`
}


    function buyUpgrade(n) {
        if (n == 0) {
            if (nowMoney >= mouses[nowMouse + 1].cost) {
                nowMoney -= mouses[nowMouse + 1].cost;
                nowMouse ++;
                document.getElementById('nowMoney').innerHTML = nowMoney;
                formatUpgrade();
            } else {
                alert('강화실패');
            }    
        } else if (n == 1) {
            if (nowMoney >= 10) {
                nowMoney -= 10;
                document.getElementById('nowMoney').innerHTML = nowMoney;
                formatUpgrade();
                updateWorkerTime(workerTime - 100);
            } else {
                alert('강화실패');
            } 
        } else if (n == 2) {
            if (nowMoney >= 10) {
                nowMoney -= 10;
                document.getElementById('nowMoney').innerHTML = nowMoney;
                formatUpgrade();
                updateFeverTime(feverTime - 10);
            } else {
                alert('강화실패');
            } 
        }
    }


formatUpgrade();

function changeShop() {
    if (nowShop == 0) {
        document.getElementById('workerShop').style.display = 'none';
        document.getElementById('upgradeShop').style.display = 'block';
        document.getElementById('changeShop').innerHTML = 'W';
        nowShop = 1;
    } else if (nowShop == 1) {
        document.getElementById('workerShop').style.display = 'block';
        document.getElementById('upgradeShop').style.display = 'none';
        document.getElementById('changeShop').innerHTML = 'U';
        nowShop = 0;
    }
}
function autoWorker() {
    let autoCash = 0;
    for (let i = 0; i < workers.length; i++) {
        autoCash += (workers[i].count * workers[i].cash);
    }
    nowMoney += autoCash;
    document.getElementById('nowMoney').innerHTML = nowMoney;
}

function fever() {
    nowFeverMain += 1;
    document.getElementById('feverMainInner').style.width = `${nowFeverMain}%`;
    if (nowFeverMain >= 100) {
        nowFeverMain = 0;
    }
}

let workerInterval = setInterval(autoWorker, workerTime); // 자동 일꾼 함수 workerTime 마다 반복
let feverInterval = setInterval(fever, feverTime); // 자동 피버 함수 feverTime 마다 반복

function updateWorkerTime(time) {
    workerTime = time;
    clearInterval(workerInterval);
    workerInterval = setInterval(autoWorker, workerTime);
}
function updateFeverTime(time) {
    feverTime = time;
    clearInterval(feverInterval);
    feverInterval = setInterval(fever, feverTime);
}