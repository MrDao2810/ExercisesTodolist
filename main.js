let totalCount = 0;
let doneCount = 0;
let unDoneCount = 0;
const myUL = document.getElementById('myUl');
const inputElement = document.getElementById('addBtn');
function newElement() {    
    // Tạo node div
    let taskDiv = document.createElement('div');
    // Lấy giá trị người dùng nhập
    let listTaskString = document.getElementById('myInput').value;   
    // Nếu input rỗng thì button add sẽ không hoạt động
    if (listTaskString === '') {
        return;
    }
    // Tạo dối tượng text node 
    let text = document.createTextNode(listTaskString);
    // delete giá trị thẻ input sau khi nhập
    document.getElementById('myInput').value = '';
    // Gán text node cho div vừa tạo
    taskDiv.appendChild(text);
    myUL.appendChild(taskDiv);
    // Tạo Button - button lên top
    let topElement = document.createElement('button');
    topElement.className = 'my-top-element'
    topElement.innerHTML = 'Top';
    taskDiv.append(topElement);
    topElement.addEventListener('click', function() {
        myUL.prepend(taskDiv);
    });

    // Tạo Button - button xuống dưới cùng
    let bottomElement = document.createElement('button');
    bottomElement.className = 'my-bot-element';
    bottomElement.innerHTML = 'Bottom';
    taskDiv.append(bottomElement);
    bottomElement.addEventListener('click', function() {
        myUL.append(taskDiv);
    });

    // Tạo button - button đổi chỗ element lên trên
    // Dùng childNodes để lấy tất cả các nút con của listTaskString
    const children = myUL.childNodes; 
    let beforeElement = document.createElement('button');
    beforeElement.className = 'my-before-element';
    beforeElement.innerHTML = 'top';
    taskDiv.append(beforeElement);
    beforeElement.addEventListener('click', function() {
        const i = Array.from(children).indexOf(taskDiv);
        if (i === 0) {
            return;
        } else {
            children[i].parentNode.insertBefore(children[i], children[i - 1]);
        }
    });
    // Tạo button - button đổi chỗ element xuống dưới
    let downElement = document.createElement('button');
    downElement.className = 'my-down-element';
    downElement.innerHTML = 'down';
    taskDiv.append(downElement);
    downElement.addEventListener('click', function() {
        const i = Array.from(children).indexOf(taskDiv);
        if (i === 0) {
            return;
        } else {
            children[i].parentNode.insertBefore(children[i + 1], children[i]);
        }
    });
    clickElement(taskDiv);
}

// Tạo checkbox và thêm tính năng cho chúng
function clickElement(taskDiv) {
    // Tạo input - checkbox
    let checkBoxElement = document.createElement('input');
    // Cho input type = checkbox
    checkBoxElement.setAttribute('type', 'checkbox');
    // Add vào đầu của taskDiv
    taskDiv.prepend(checkBoxElement);
    // Tạo button - nút Delete
    let tasksDelete = document.createElement('button');
    tasksDelete.className = 'my-delete-element';
    // Add vào sau taskDiv
    taskDiv.append(tasksDelete);
    tasksDelete.innerHTML = '🗑️'; // <button onclick="process">Hello</button>
    // Dùng addEventListener add sự kiện cho đối tượng 
    tasksDelete.addEventListener('click', function(event) {
        const isDone = checkBoxElement.checked;
        isDone ? --doneCount : --unDoneCount;
        taskDiv.remove();
        --totalCount;
        updateDoneView();
    });
    // khi checkBoxElement (checkbox) được click thì sẽ gọi hàm 
    checkBoxElement.addEventListener('change', function(e) {
        // Target là thằng cuối cùng mà mình click vào
        if (e.target.checked) {
            ++doneCount;
            unDoneCount = totalCount - doneCount;
            taskDiv.style.color = 'blue';
        } else {
            --doneCount;
            unDoneCount = totalCount - doneCount;
            taskDiv.style.color = 'black';
        }
        updateDoneView();
    });
    // In ra số lượng công việc đã add
    ++unDoneCount;
    ++totalCount;
    updateDoneView();
}

// function allElement(source) {
//     let checkboxes = document.querySelectorAll('input[type="checkbox"]');
//     for (var i = 0; i < checkboxes.length; i++) {
//         if (checkboxes[i] != source)
//             checkboxes[i].checked = source.checked;
//     }
// }

function updateDoneView() {
    document.getElementById('total').innerHTML = 'Tất Cả : ' + totalCount;
    document.getElementById('done').innerHTML = 'Đã hoàn thành : ' + doneCount;
    document.getElementById('undone').innerHTML = 'Chưa hoàn thành : ' + unDoneCount;
}
function totalElement() {

}

function doneElement() {

}

function unDoneElement() {

}