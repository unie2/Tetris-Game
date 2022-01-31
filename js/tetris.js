import BLOCKS from "./blocks.js";

// DOM
const playground = document.querySelector(".playground > ul");
const gameText = document.querySelector(".game-text");
const scoreDisplay = document.querySelector('.score');
const restartButton = document.querySelector('.game-text > button');

// Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

// Variables
let score = 0; // 점수
let duration = 500; // 떨어지는 시간
let downInterval;
let tempMovingItem; 


const movingItem = { // 다음 블록의 타입 및 좌표 정보
    type: "",
    direction: 0,
    top: 0,
    left: 0,
};

init();

// Functions
function init() { // 화면 호출
    tempMovingItem = {...movingItem}; // movingItem 값만 가져옴

    for(let i=0; i<GAME_ROWS; i++) {
        prependNewLine();
    }
    // renderBlocks();
    generateNewBlock();
}

function prependNewLine() { // 라인 생성
    const li = document.createElement("li"); // li 생성
    const ul = document.createElement("ul"); // ul 생성
    for(let j=0; j<GAME_COLS; j++) {
        const matrix = document.createElement("li");
        ul.prepend(matrix); // ul에 매트릭스를 삽입
    }
    li.prepend(ul); // 10개가 담겨있는 ul을 li에 삽입
    playground.prepend(li); // li를 playground에 삽입
}

function renderBlocks(moveType="") {
    const { type, direction, top, left } = tempMovingItem;
    const movingBlocks = document.querySelectorAll(".moving"); // moving 클래스를 갖는 모든 요소를 가져옴
    movingBlocks.forEach(moving => {
        moving.classList.remove(type, "moving");
    })

    BLOCKS[type][direction].some(block => {
        const x = block[0] + left;
        const y = block[1] + top;
        const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : null;
        const isAvailable = checkEmpty(target);
        if (isAvailable) {
            target.classList.add(type, "moving");
        } else {
            tempMovingItem = { ...movingItem }; // 원상복구
            if (moveType === 'retry') {
                clearInterval(downInterval);
                showGameoverText(); //게임 종료 호출
            }
            setTimeout(()=> {
                renderBlocks('retry'); // 재귀호출
                if(moveType === "top") {
                    seizeBlock();
                }
            }, 0)
            return true;
        }
        
    }) // BLOCKS의 tree 타입에 접근
    movingItem.left = left;
    movingItem.top = top;
    movingItem.direction = direction;
}
function checkEmpty(target) {
    if (!target || target.classList.contains("seized")) {
        return false;
    }
    return true;
}

function seizeBlock() {
    const movingBlocks = document.querySelectorAll(".moving");
    movingBlocks.forEach(moving => {
        moving.classList.remove("moving");
        moving.classList.add("seized");
    })
    checkMatch()
}
function checkMatch() {
    const childNodes = playground.childNodes;
    childNodes.forEach(child => {
        let matched = true;
        child.children[0].childNodes.forEach(li => {
            if (!li.classList.contains("seized")) {
                matched = false;
            }
        })
        if (matched) {
            child.remove();
            prependNewLine()
            score ++;
            scoreDisplay.innerText = score;
        }
    })

    generateNewBlock()
}

function generateNewBlock() { // 다음 블록 생성
    clearInterval(downInterval);
    downInterval = setInterval(() => {
        moveBlock('top', 1)
    }, duration)

    const blockArray = Object.entries(BLOCKS);
    const randomIndex = Math.floor(Math.random() * blockArray.length);
    
    movingItem.type = blockArray[randomIndex][0]
    movingItem.top = 0;
    movingItem.left = 3;
    movingItem.direction = 0;
    tempMovingItem = {...movingItem};
    renderBlocks();
}


function moveBlock(moveType, amount) {
    tempMovingItem[moveType] += amount;
    renderBlocks(moveType);
}

function changeDirection() {
    const direction = tempMovingItem.direction;
    direction === 3 ? tempMovingItem.direction = 0 : tempMovingItem.direction += 1;
    renderBlocks();
}

function dropBlock() {
    clearInterval(downInterval);
    downInterval = setInterval(() => {
        moveBlock('top', 1)
    }, 10)
}

function showGameoverText() {
    gameText.style.display = "flex"
}

// Event Handling
// 방향키를 통한 위치 변경
document.addEventListener("keydown", e => {
    switch(e.keyCode) {
        case 39:
            moveBlock("left", 1);
            break;
        case 37:
            moveBlock("left", -1);
            break;
        case 40:
            moveBlock("top", 1);
            break;
        case 90:
            changeDirection();
            break;
        case 32:
            dropBlock();
            break;
        default:
            break
    }
})

restartButton.addEventListener("click", () => {
    playground.innerHTML = "";
    gameText.style.display = "none";
    init()
})