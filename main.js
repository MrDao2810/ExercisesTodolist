let totalCount = 0;
let doneCount = 0;
let undoneCount = 0;
const myList = document.getElementById('myUl'); // todo: Đổi lại tên cho ý nghĩa hơn vd: myList



//todo: tách nhỏ function
function elementCreate() {
    // Tạo node div
    let taskDiv = document.createElement('div');
    taskDiv.className = 'taskDiv'; //Thêm 1 class cho div
    // Lấy giá trị người dùng nhập
    let listTaskString = document.getElementById('myInput').value;   
    // Tạo dối tượng text node 
    let text = document.createTextNode(listTaskString); //todo: t nghĩa là text
    // delete giá trị thẻ input sau khi nhập
    document.getElementById('myInput').value = '';
    // Gán text node cho div vừa tạo
    taskDiv.appendChild(text);
    myList.appendChild(taskDiv);

    // Tạo input - checkbox
    let checkBoxElement = document.createElement('input');
    // Cho input type = checkbox
    checkBoxElement.setAttribute('type', 'checkbox');
    // add vào đầu của taskDiv
    taskDiv.prepend(checkBoxElement); 

    // Tạo button - nút Delete
    let tasksDelete = document.createElement('button');
    tasksDelete.className = 'taskDelete';
    // add vào sau taskDiv
    taskDiv.append(tasksDelete);
    tasksDelete.innerHTML = 'Delete'; // <button onclick="process">Hello</button>
    // dùng addEventListener add sự kiện cho đối tượng 
    tasksDelete.addEventListener('click', function(event) {
        const isDone = checkBoxElement.checked;
        isDone ? --doneCount : --undoneCount;
        taskDiv.remove();
        --totalCount;
        updateDoneView();
    });

    // Tạo Button - button lên top
    let topElement = document.createElement('button');
    topElement.innerHTML = 'Top';
    taskDiv.append(topElement);
    topElement.addEventListener('click', function() {
        myList.prepend(taskDiv);
    });

    // Tạo Button - button xuống dưới cùng
    let bottomElement = document.createElement('button');
    bottomElement.innerHTML = 'Bottom';
    taskDiv.append(bottomElement);
    bottomElement.addEventListener('click', function() {
        myList.append(taskDiv);
    });

    // Tạo button - button đổi chỗ element lên trên
    // Dùng childNodes để lấy tất cả các nút con của listTaskString
    const children = myList.childNodes; 
    let beforeElement = document.createElement('button');
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
    let afterElement = document.createElement('button');
    afterElement.innerHTML = 'After';
    taskDiv.append(afterElement);
    afterElement.addEventListener('click', function() {
        const i = Array.from(children).indexOf(taskDiv);
        if (i === 0) {
            return;
        } else {
            children[i].parentNode.insertBefore(children[i + 1], children[i]);
        }
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
