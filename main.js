let totalCount = 0;
let doneCount = 0;
let undoneCount = 0;
    // let tasks = [
    //     {task: 'di hoc', checked: false},
    //     {task: 'choi game', checked: true},
    // ]

function newElement() {
    
    // Tạo node p
    let p = document.createElement('P');

    // Lấy giá trị người dùng nhập
    let listTaskString = document.getElementById('myInput').value;
    
    // Tạo dối tượng text node 
    let t = document.createTextNode(listTaskString);

    // Tạo thẻ input
    let checkBoxElement = document.createElement('input');

    // Cho input type = checkbox
    checkBoxElement.setAttribute('type', 'checkbox');

    // Thêm vào đầu của p
    p.prepend(checkBoxElement); 

    // Gán text node cho thẻ p vừa tạo
    p.appendChild(t);
    document.getElementById('myUL').appendChild(p);

    // tạo thẻ input
    let tasksDelete = document.createElement('button');

    tasksDelete.innerHTML = 'Delete'; // <button onclick="process">Hello</button>
    // dùng addEvebtListener truyền vào 1 callback vd: click ='function(event)' 
    tasksDelete.addEventListener('click', function(event) {
        const isDone = checkBoxElement.checked;
        isDone ? --doneCount : --undoneCount;
        p.remove();
        --totalCount;
        updateDoneView();
    });

    checkBoxElement.addEventListener('change', function(e) {
        if (e.target.checked) {
            ++doneCount;
            undoneCount = totalCount - doneCount;
            p.style.color = 'blue';
        } else {
            --doneCount;
            undoneCount = totalCount - doneCount;
            p.style.color = 'black';
        }
        updateDoneView();
    });
    // thêm vào sau p
    p.append(tasksDelete);
    // console.log(listTaskString);
    // Xoá giá trị thẻ input sau khi nhập
    document.getElementById('myInput').value = '';
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