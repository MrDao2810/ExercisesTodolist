const listTasksContainerElement = document.getElementById('list-tasks-container');
let todoList = [
        {content: 'dc nghi', status: false}
    ]

updateView();

function updateView() {
    listTasksContainerElement.innerHTML = '';
    updateTodoListView();
}

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
    let checkBox = document.createElement('input'); // check done/ not done
    textNode = document.createTextNode(task.content); // create text node
    checkBox.setAttribute('type', 'checkbox');// set checkBoxElement type = checkbox
    if (task.status) {
        checkBox.setAttribute('checked', true);
    }
    division.prepend(checkBox);
    division.appendChild(textNode);
    listTasksContainerElement.appendChild(division);
    createDeleteElement(division); 
}

function addContentElement() {
    let listTasksContent = document.getElementById('list-tasks-content').value;
    //Nếu input rỗng thì button add sẽ không hoạt động
    if (listTasksContent === '') {
        alert('Lỗi. Nhập lại');
        return;
    }
    const newTask = {content: listTasksContent, status: false}
    todoList.push(newTask); 
    updateView(); 
}    
let pressEnter = document.getElementById('list-tasks-content')
// Bắt sự kiện khi nhấn Enter
pressEnter.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addContentElement();
    }
});


function createDeleteElement(division) {
    // Tạo button - nút delete
    let taskDelete = document.createElement('button');
    // taskDelete.className = 'my-delete-element';
    // Thêm nút delete vào sau division
    division.append(taskDelete);
    taskDelete.innerHTML = '🗑️';
    // Dùng addEventListener để add sự kiện cho đối tượng (Xoá division)
    taskDelete.addEventListener('click', function(event){
        const confirmation = confirm('Bạn có chắc chắn muốn xoá không');
        if(!confirmation) return;
        division.remove();
    });
}

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
