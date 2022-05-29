const listTasksContainerElement = document.getElementById('list-tasks-container');
const myTasksContainer = document.getElementById('list-tasks-container');
let todoList = [
        {content: 'dc nghi', status: false}
    ]

updateView();

function updateView() {
    // Xoá dữ liệu cũ và update lại data từ updateTodoListView()
    listTasksContainerElement.innerHTML = '';
    updateTodoListView();
}

let pressEnter = document.getElementById('myListContent');
// Bắt sự kiện khi nhấn Enter
pressEnter.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addContentElement();
    }
});

function updateTodoListView() {
    for (let i = 0; i < todoList.length; i++) {
        addOneTaskView(todoList[i]);
    }
}
// Thêm một TaskView vào todoList
function addOneTaskView(task) {
    // !task check null, check task.value null, check task.value =''
    // if (!task || !task.content || task.content === '') {
    //     return;
    // }
    let division = document.createElement('div');   // create div
    textNode = document.createTextNode(task.content); // create text node
    division.appendChild(textNode);
    listTasksContainerElement.appendChild(division);
    createDeleteElement(division, task); 
    createOnTopElement(division, task);
    createStaticCheckBox(division, task);
    createBottomElement(division, task);
    createUpElement(division, task);
    createDownElement(division, task);
    updateDoneView();
}
// Vô hiệu hóa button add nếu để trống.
myDiv.addEventListener('input', () => {
    if (myListContent.value.length > 2) {
        myBtn.removeAttribute('disabled');
    } else {
        myBtn.setAttribute('disabled', 'disabled');
    }
});
function addContentElement() {
    let listTasksContent = document.getElementById('myListContent').value;
    //Nếu input rỗng thì button add sẽ không hoạt động
    if (listTasksContent === '') {
        alert('Lỗi. Nhập lại');
        return;
    }

    for (let i = 0; i < todoList.length; i++) {
        if (listTasksContent === todoList[i].content) {
            alert('Nhập lại');
            // delete giá trị thẻ input sau khi nhập
            document.getElementById('myListContent').value = '';
            return;
        }
    }
    const newTask = {content: listTasksContent, status: false}
    todoList.push(newTask); 
    // delete giá trị thẻ input sau khi nhập
    document.getElementById('myListContent').value = '';
    updateView(); 
}    
// Tạo checkbox
function createStaticCheckBox(division, task) {
    let done = [];
    let checkBox = document.createElement('input'); // check done/ not done
    checkBox.setAttribute('type', 'checkbox');// set checkBoxElement type = checkbox
    if (task.status) {
        checkBox.setAttribute('checked', true);
        division.style.color = 'blue';
        division.style.textDecoration = 'line-through';
        done = todoList.length - 1;
    } else {
        division.style.color = 'black';
    }
    // Khi checkbox được click thì gọi hàm 
    checkBox.addEventListener('change', function(e){
        // Target Nhận phần tử cuối cùng khi click vào checkbox
        task.status = e.target.checked;
        const taskIndex = todoList.indexOf(task);
        todoList.splice(taskIndex, 1);
        if (task.status) {
            // Nếu tich vào checkbox thì truyền task vào todoList tức là xuống cuối
            todoList.push(task);
        } else {
            // Nếu không thì ngược lại đưa lại lên đầu
            todoList.unshift(task);
        }
        updateView();
    });
    division.prepend(checkBox);
}
// Tạo button delete
function createDeleteElement(division, task) {
    // Tạo button - nút delete
    let taskDelete = document.createElement('button');
    taskDelete.className = 'my-delete-element';
    // Thêm nút delete vào sau division
    division.append(taskDelete);
    taskDelete.innerHTML = '🗑️';
    // Dùng addEventListener để add sự kiện cho đối tượng (Xoá division)
    taskDelete.addEventListener('click', function(event){
        // Nếu nhấn đồng ý (chắc chắn uốn xoá) thì sẽ chạy tiếp 
        const confirmation = confirm('Bạn có chắc chắn muốn xoá không');
        if(!confirmation) return;
        // Tìm vị trí của task trong todoList
        const taskIndex = todoList.indexOf(task);
        // Dùng Splice để xoá phần tử được xác định taskIndex trong mảng 
        todoList.splice(taskIndex, 1);
        updateView();        
    });
}
// Tạo chức năng lên trên cùng cho một element
function createOnTopElement(division, task) {
    // Tạo button lên top
    let taskTopElement = document.createElement('button');
    // Tên class của button
    taskTopElement.className = 'my-top-element';
    taskTopElement.innerHTML = 'Top';
    division.append(taskTopElement);
    // Nếu vị trí của phần tử === 0 thì taskTopElement true còn không thì trả về false
    if (todoList.indexOf(task) === 0) {
        taskTopElement.disabled = true;
    }

    // Nếu click vào button thì sẽ đưa element lên trên đầu divison
    taskTopElement.addEventListener('click', function(){
        // Tìm vị trí của task trong todoList
        const taskIndex = todoList.indexOf(task);
        // Dùng Splice để xoá phần tử được xác định taskIndex trong mảng 
        todoList.splice(taskIndex, 1);
        // Đưa task lên đầu mảng todoList
        todoList.unshift(task);
        updateView();
        // Sau khi lên đầu thì vo hiệu hoá button đó
    });
}
// Tạo chức năng xuống cuối cùng cho một Element
function createBottomElement(division, task) {
    // Tạo button bottom
    let taskBotElement = document.createElement('button');
    // Tên class của button
    taskBotElement.className = 'my-bot-element';
    taskBotElement.innerHTML = 'Bot';
    division.prepend(taskBotElement);
    // Vô hiệu hoá bottpom khi ở vị trí dưới cùng của todoList
    if (todoList.indexOf(task) === todoList.length - 1) {    
        taskBotElement.disabled = true;
    }
    // Bắt sự kiện button đưa element xuống cuối cùng
    taskBotElement.addEventListener('click', function(){
        // tìm vị trí của task trong todoList
        const taskIndex = todoList.indexOf(task);
        // Dùng Splice để xoá phần tử được xác định taskIndex trong mảng
        todoList.splice(taskIndex, 1);
        // Đưa tas xuống cuối cùng mảng
        todoList.push(task);
        updateView();
    });
}
// Tạo chức năng tiến lên 1 bậc cho todoList
function createUpElement(division, task) {
    // Tạo button Up
    let taskUpElement = document.createElement('button');
    // Tên class của button
    taskUpElement.className = 'my-before-element';
    taskUpElement.innerHTML = 'Up';
    division.prepend(taskUpElement);
    // Vô hiệu hoá Up khi tới vị trí trên cùng
    if (todoList.indexOf(task) === 0) {
        taskUpElement.disabled = 'true';
    }
    // Bắt sự kiện button đưa element lên
    taskUpElement.addEventListener('click', function(){
        // Tìm vị trí của task trong todoList
        const taskIndex = todoList.indexOf(task);
        // Dùng đảo vị trí của phần tử trong mảng
        let temp = todoList[taskIndex];
        todoList[taskIndex] = todoList[taskIndex - 1];
        todoList[taskIndex - 1] = temp;
        updateView();
    });
}
// Tạo chức năng xuống 1 bậc cho todolist
function createDownElement(division, task) {
    // Tạo button down
    let taskDownElement = document.createElement('button');
    // Teen class cuar button
    taskDownElement.className = 'my-down-element';
    taskDownElement.innerText = 'Down';
    division.prepend(taskDownElement);
    // Vô hiệu hoá Down khi đi tới vị trí cuối cùng
    if (todoList.indexOf(task) === todoList.length - 1) {    
        taskDownElement.disabled = true;
    }
    // Bắt sự kiện button đưa element xuống
    taskDownElement.addEventListener('click', function(){
        // Tìm vị trí của task trong todoList
        const taskIndex = todoList.indexOf(task);
        // DÙng đảo vị trí của phần tử trong mảng
        let temp = todoList[taskIndex];
        todoList[taskIndex] = todoList[taskIndex + 1];
        todoList[taskIndex + 1] = temp;
        updateView();
    });
}
// Hiện tất cả các công việc đã thêm trong todolist
function updateDoneView() {
    document.getElementById('total').innerHTML = 'Tất cả ' + todoList.length;
    document.getElementById('done').innerHTML = 'Đã hoàn thành ';
    document.getElementById('undone').innerHTML = 'Chưa hoàn thành ';
}

// Hiện trạng thái công việc theo task 
// function doneTaskElement() {

// }
// let totalCount = 0;
// let doneCount = 0;
// let unDoneCount = 0;
// let today = new Date();
// let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
// let time = today.getHours() + ":" + today.getMinutes();
// let dateTime = date + ' ' + time;
// const myUL = document.getElementById('myUl');
// const inputElement = document.getElementById('myBtn');
// const input = document.getElementById('myInput');
// let node_list = document.getElementsByTagName('input');
// let content = [];

// function newElement() {            
//      Tạo node div
//      let taskDiv = document.createElement('div');
//      // Lấy giá trị người dùng nhập
//      let listTaskString = document.getElementById('myInput').value;   
//      // Nếu input rỗng thì button add sẽ không hoạt động
//      if (listTaskString === '') {
//     alert('Lỗi. Nhập lại');
//     return;
// }
//     // Tạo dối tượng text node 
//     let text = document.createTextNode(listTaskString);
//     // delete giá trị thẻ input sau khi nhập
//     document.getElementById('myInput').value = '';
//     // Gán text node cho div vừa tạo
//     taskDiv.appendChild(text);
//     myUL.appendChild(taskDiv);
//     // Tạo Button - button lên top
//     let topElement = document.createElement('button');
//     topElement.className = 'my-top-element'
//     topElement.innerHTML = 'Top';
//     taskDiv.append(topElement);
//     topElement.addEventListener('click', function() {
//         myUL.prepend(taskDiv);
//     });

//     // Tạo Button - button xuống dưới cùng
//     let bottomElement = document.createElement('button');
//     bottomElement.className = 'my-bot-element';
//     bottomElement.innerHTML = 'Bottom';
//     taskDiv.append(bottomElement);
//     bottomElement.addEventListener('click', function() {
//         myUL.append(taskDiv);
//     });

//     // Tạo button - button đổi chỗ element lên trên
//     // Dùng childNodes để lấy tất cả các nút con của listTaskString
//     const children = myUL.childNodes; 
//     let beforeElement = document.createElement('button');
//     beforeElement.className = 'my-before-element';
//     beforeElement.innerHTML = 'Up';
//     taskDiv.append(beforeElement);
//     beforeElement.addEventListener('click', function() {
//         const i = Array.from(children).indexOf(taskDiv);
//         if (i === 0) {
//             return;
//         } else {
//             children[i].parentNode.insertBefore(children[i], children[i - 1]);
//         }
//     });

//     // Tạo button - button đổi chỗ element xuống dưới
//     let downElement = document.createElement('button');
//     downElement.className = 'my-down-element';
//     downElement.innerHTML = 'Down';
//     taskDiv.append(downElement);
//     downElement.addEventListener('click', function() {
//         const i = Array.from(children).indexOf(taskDiv);
//         if (i === 0) {
//             return;
//         } else {
//             children[i].parentNode.insertBefore(children[i + 1], children[i]);
//         }
//     });
//     // let dateElement = document.createElement('div');
//     // document.getElementById('my-date').innerHTML = dateTime;
//     createCheckBox(taskDiv);
// }

// // Bắt sự kiện khi nhấn Enter
// input.addEventListener('keypress', function(event) {
//     if (event.key === 'Enter') {
//         newElement();
//     }
// });

// // Tạo checkbox và thêm tính năng cho chúng
// function createCheckBox(taskDiv) {
//     // Tạo input - checkbox
//     let checkBoxElement = document.createElement('input');
//     // Cho input type = checkbox
//     checkBoxElement.setAttribute('type', 'checkbox');
//     // Add vào đầu của taskDiv
//     taskDiv.prepend(checkBoxElement);
//     // Tạo button - nút Delete
//     let tasksDelete = document.createElement('button');
//     tasksDelete.className = 'my-delete-element';
//     // Add vào sau taskDiv
//     taskDiv.append(tasksDelete);
//     tasksDelete.innerHTML = '🗑️'; // <button onclick="process">Hello</button>
//     // Dùng addEventListener add sự kiện cho đối tượng 
//     tasksDelete.addEventListener('click', function(event) {
//         const confirmation = confirm('Bạn có chắc chắn muốn xoá');
//         if (!confirmation) return;
//         const isDone = checkBoxElement.checked;
//         isDone ? --doneCount : --unDoneCount;
//         taskDiv.remove();
//         --totalCount;
//         updateDoneView();
//     });
//     // khi checkBoxElement (checkbox) được click thì sẽ gọi hàm 
//     checkBoxElement.addEventListener('change', function(e) {
//         // Target là thằng cuối cùng mà mình click vào
//         if (e.target.checked) {
//             ++doneCount;
//             unDoneCount = totalCount - doneCount;
//             taskDiv.style.color = 'blue';
//         } else {
//             --doneCount;
//             unDoneCount = totalCount - doneCount;
//             taskDiv.style.color = 'black';
//         }
//         updateDoneView();
//     });
//     // In ra số lượng công việc đã add
//     ++unDoneCount;
//     ++totalCount;
//     updateDoneView();
// }
// // Chọn tất cả checkbox và bỏ chọn tất cả checkbox
// function checkAllElements(taskDiv) {
//     const buttonCheckAll = document.getElementById('btn-check-all');
//     const isCheck = buttonCheckAll.getAttribute('name');
//     for (let i = 0; i < node_list.length; i++) 
//     {
//         let node = node_list[i];
//         if (node.getAttribute('type') == 'checkbox') 
//         {
//             if (isCheck === 'check') {
//                 node.setAttribute('checked', true);
//                 buttonCheckAll.setAttribute('name', 'uncheck');
//                 buttonCheckAll.innerHTML = 'Bỏ chọn tất cả';
//                 doneCount = totalCount;
//                 unDoneCount = 0;
//             } else {
//                 node.removeAttribute('checked');
//                 buttonCheckAll.setAttribute('name', 'check');
//                 buttonCheckAll.innerHTML = 'Chọn tất cả';
//                 node.style.color = 'black';
//                 unDoneCount = totalCount;
//                 doneCount = 0;
//             }
//             updateDoneView();
//         }
//     } 
// }
// function updateDoneView() {
//     document.getElementById('total').innerHTML = 'Tất Cả : ' + totalCount;
//     document.getElementById('done').innerHTML = 'Đã hoàn thành : ' + doneCount;
//     document.getElementById('undone').innerHTML = 'Chưa hoàn thành : ' + unDoneCount;
// }
// function searchTask() {
//     let listTaskText = document.getElementById('mySearch').value;
//     for (let i = 0; i <= content.length; i++) {
//         if (listTaskText === content[i]) {
//             console.log('co');
//             return;
//         }
//     } alert('Không có công việc nào trùng');
// }
