let totalCount = 0;
let doneCount = 0;
let undoneCount = 0;
const myUL = document.getElementById('myUl');

function newElement() {
    
    // Tạo node div
    let taskDiv = document.createElement('div');
    // Lấy giá trị người dùng nhập
    let listTaskString = document.getElementById('myInput').value;   
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
    beforeElement.innerHTML = 'Up';
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
    downElement.innerHTML = 'Down';
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
//Tạo checkbox và thêm tính năng cho chúng
function clickElement(taskDiv) {
    // Tạo input - checkbox
    let checkBoxElement = document.createElement('input');
    // Cho input type = checkbox
    checkBoxElement.setAttribute('type', 'checkbox');
    // add vào đầu của taskDiv
    taskDiv.prepend(checkBoxElement);
    // Tạo button - nút Delete
    let tasksDelete = document.createElement('button');
    tasksDelete.className = 'my-delete-element';
    // add vào sau taskDiv
    taskDiv.append(tasksDelete);
    tasksDelete.innerHTML = 'Delete'; // <button onclick="process">Hello</button>
    // dùng addEvebtListener add sự kiện cho đối tượng 
    tasksDelete.addEventListener('click', function(event) {
        const isDone = checkBoxElement.checked;
        isDone ? --doneCount : --undoneCount;
        taskDiv.remove();
        --totalCount;
        updateDoneView();
    });

    // khi checkBoxElement (checkbox) được click thì sẽ gọi hàm 
    checkBoxElement.addEventListener('change', function(e) {
        // target là thằng cuối cùng mà mình click vào
        if (e.target.checked) {
            ++doneCount;
            undoneCount = totalCount - doneCount;
            taskDiv.style.color = 'blue';
        } else {
            --doneCount;
            undoneCount = totalCount - doneCount;
            taskDiv.style.color = 'black';
        }
        updateDoneView();
    });
    // In ra số lượng công việc đã add
    ++undoneCount;
    ++totalCount;
    updateDoneView();
}

function updateDoneView() {
    document.getElementById('total').innerHTML = 'Tất Cả : ' + totalCount;
    document.getElementById('done').innerHTML = 'Đã hoàn thành : ' + doneCount;
    document.getElementById('undone').innerHTML = 'Chưa hoàn thành : ' + undoneCount;
}

// document.addEventListener('dragstart', function(e) { // bắt đầu khi có sự kiện kéo - chỉ sảy ra 1 lần từ khi kích hoạt
//     e.dataTransfer.setData('myData', e.target.id);
//     // console.log('keo');
// });
// document.addEventListener('drag', function() { // bắt đầu khi thả chuột, kết thúc sự kiện kéo
//     // console.log('dang chay');
// });
// document.addEventListener('dragend', function() { // bắt đầu khi có sự kiện kéo - và chạy liên tục từ khi kích hoạt
//     console.log('nha chuot - ket thuc keo');
// });
// document.addEventListener('dragenter', function(e) {
//     if (e.target.id == 'myUL') {
//         console.log('hung su kien');
//     }
// });
// document.addEventListener('dragover', function(e) {
//     e.preventDefault();
//     // if (e.target.id == 'myUL') {
//     //     console.log('dang chay su kien hung drag');
//     // }
// });
// document.addEventListener('dragleave', function(e) {
//     if (e.target.id == 'myUL') {

//     }
//     // console.log('nha chuot ket thuc hung keo');
// });
// document.addEventListener('drop', function(e) {
//     e.preventDefault();
//     if (e.target.className == 'element') {
//         let data = e.dataTransfer.getData('myUL');
//         e.target.appendChild(document.getElementById(data));
//     };
//     console.log('nha thong tin');
// });