const draggableList = document.querySelector("#draggable-list");
const check = document.querySelector("#check");

const richestPeople = [
    'Jeff Bezos',
    'Elon Musk',
    'Bernard Arnault',
    'Mark Zuckerberg',
    'Bill Gates',
    'Larry Page',
    'Sergey Brin',
    'Larry Ellison',
    'Warren Buffett',
    'Steve Ballmer'
];

// store list items
const listItems = [];

let dragStartIndex;

createList();

// insert list items into DOM
function createList() {
    [...richestPeople]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement("li");
            listItem.setAttribute('data-index', index);
            listItem.innerHTML = `
                            <span class="number">${index + 1}</span>
                            <div class="draggable" draggable="true">
                                <p class="person-name">${person}</p>
                                <i class="fa fa-dollar"></i>
                            </div>`;
            listItems.push(listItem);
            draggableList.appendChild(listItem);

        });

    addEventListener();
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}

function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(e) {
    e.preventDefault();
}

function dragDrop() {
    const dragEndIndx = +this.closest('li').getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndx);
    this.classList.remove('over');
}


//swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
    listItems[fromIndex].append(itemTwo);
    listItems[toIndex].append(itemOne);
}

// check the order of list items
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();
        if (personName !== richestPeople[index])
            listItem.classList.add('wrong');
        else {
            listItem.classList.add('right');
            listItem.classList.remove('wrong');
        }

    })
}

function addEventListener() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });
    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}


check.addEventListener('click', checkOrder);