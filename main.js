const characterMap = {
    'á': 'a',
    'à': 'a',
    'ạ': 'a',
    'ả': 'a',
    'ã': 'a',
    'Á': 'A',
    'À': 'A',
    'Ạ': 'A',
    'Ả': 'A',
    'Ã': 'A',
    'â': 'a',
    'ấ': 'a',
    'ầ': 'a',
    'ậ': 'a',
    'ẩ': 'a',
    'Â': 'A',
    'Ấ': 'A',
    'Ầ': 'A',
    'Ậ': 'A',
    'Ẩ': 'A',
    'Ẫ': 'A',
    'ă': 'a',
    'ắ': 'a',
    'ằ': 'a',
    'ặ': 'a',
    'ẳ': 'a',
    'ẵ': 'a',
    'Ă': 'A',
    'Ắ': 'A',
    'Ằ': 'A',
    'Ặ': 'A',
    'Ẳ': 'A',
    'Ẵ': 'A',
    'í': 'i',
    'ị': 'i',
    'ỉ': 'i',
    'ĩ': 'i',
    'ì': 'i',
    'Í': 'I',
    'Ì': 'I',
    'Ị': 'I',
    'Ỉ': 'I',
    'Ĩ': 'I',
    'ú': 'u',
    'ù': 'u',
    'ụ': 'u',
    'ủ': 'u',
    'ũ': 'u',
    'Ú': 'U',
    'Ù': 'U',
    'Ụ': 'U',
    'Ủ': 'U',
    'Ũ': 'U',
    'ư': 'u',
    'ứ': 'u',
    'ừ': 'u',
    'ự': 'u',
    'ử': 'u',
    'ữ': 'u',
    'Ư': 'U',
    'Ứ': 'U',
    'Ừ': 'U',
    'Ự': 'U',
    'Ử': 'U',
    'Ữ': 'U',
    'é': 'e',
    'è': 'e',
    'ẹ': 'e',
    'ẻ': 'e',
    'ẽ': 'e',
    'É': 'E',
    'È': 'E',
    'Ẹ': 'E',
    'Ẻ': 'E',
    'Ẽ': 'E',
    'ê': 'e',
    'ế': 'e',
    'ề': 'e',
    'ệ': 'e',
    'ể': 'e',
    'ễ': 'e',
    'Ê': 'E',
    'Ế': 'E',
    'Ề': 'E',
    'Ệ': 'E',
    'Ể': 'E',
    'Ễ': 'E',
    'ó': 'o',
    'ò': 'o',
    'ọ': 'o',
    'ỏ': 'o',
    'õ': 'o',
    'Ó': 'O',
    'Ò': 'O',
    'Ọ': 'O',
    'Ỏ': 'O',
    'Õ': 'O',
    'ô': 'o',
    'ố': 'o',
    'ồ': 'o',
    'ộ': 'o',
    'ổ': 'o',
    'ỗ': 'o',
    'Ô': 'O',
    'Ố': 'O',
    'Ồ': 'O',
    'Ộ': 'O',
    'Ổ': 'O',
    'Ỗ': 'O',
    'ơ': 'o',
    'ớ': 'o',
    'ờ': 'o',
    'ợ': 'o',
    'ở': 'o',
    'ỡ': 'o',
    'Ơ': 'O',
    'Ớ': 'O',
    'Ờ': 'O',
    'Ợ': 'O',
    'Ở': 'O',
    'Ỡ': 'O',
    'đ': 'd',
    'Đ': 'D'
}
const listTasksContainerElement = document.getElementById('list-tasks-container');
let currentTab = 'all'; // done | undone
let storageKey = 'todoList';
let owner;
let userFieldIndex = [];
let isCheckAll = true;
login();

// Check xem nếu trong trường hợp không có gì: null thì phải trở về string []. vì nếu localStorage chỉ nhận string
let todoList = JSON.parse(localStorage.getItem(storageKey)) ? JSON.parse(localStorage.getItem(storageKey)) : [];
// Tạo 1 mảng để lưu những content !== với searchTasksContent
let hiddenItemIndexes = [];
updateView();

function updateView() {
    // Xoá dữ liệu cũ và update lại data từ updateTodoListView()
    listTasksContainerElement.innerHTML = '';
    updateTodoListView();
}

let pressEnterAdd = document.getElementById('myListContent');
// Bắt sự kiện khi nhấn Enter
pressEnterAdd.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addContentElement();
    }
});

function updateTodoListView(task) {
    let count = 0;
    const taskCount = document.getElementById('total');
    const taskDone = document.getElementById('done');
    const taskNotDone = document.getElementById('notDone');
    for (task of todoList) {
        if (task.status) {
            ++count;
        }
    }
    taskCount.innerHTML = 'Total: ' + todoList.length;
    taskDone.innerHTML = 'Done: ' + count;
    taskNotDone.innerHTML = 'Not Done: ' + (todoList.length - count);
    taskCount.removeAttribute('class');
    taskDone.removeAttribute('class');
    taskNotDone.removeAttribute('class');
    // Đếm độ dài của mảng todoList rồi check nếu check sang all sẽ hiện tất cả, done sẽ hiện đã làm, không thì ngược lại
    for (let i = 0; i < todoList.length; i++) {
        // Tìm vị trí của i trong hiddenItemIndexes nếu !== -1 thì tiếp tục, có thì hiển thị nếu ko có thì ẩn đi
        if (hiddenItemIndexes.indexOf(i) !== -1) {
            continue;
        }
        if (currentTab === 'done' && todoList[i].status) {
            taskDone.setAttribute('class', 'tabColor');
            addOneTaskView(todoList[i]);
        } else if (currentTab === 'undone' && !todoList[i].status) {
            taskNotDone.setAttribute('class', 'tabColor');
            addOneTaskView(todoList[i]);
        } else if (currentTab === 'all') {
            taskCount.setAttribute('class', 'tabColor');
            addOneTaskView(todoList[i]);
        }
    }
}
// Thêm một TaskView vào todoList
function addOneTaskView(task) {
    let division = document.createElement('div'); // create div
    textNode = document.createTextNode(task.content + ' || Owner: ' + task.owner + ' || Date: ' + task.date); // create text node
    division.appendChild(textNode);
    listTasksContainerElement.appendChild(division);
    // Dùng localStorage để lưu data. setItem là 1 phương thức và là 1 function nên phải truyền vào 2 tham số
    localStorage.setItem(storageKey, JSON.stringify(todoList)); // 2 tham số truyền vào là: 1 Key (key muốn lưu) | 2: là giá trị  
    createStaticCheckBox(division, task);
    createDeleteElement(division, task); 
    createOnTopElement(division, task);
    createBottomElement(division, task);
    createUpElement(division, task);
    createDownElement(division, task);
   
}
// Vô hiệu hóa button add nếu để trống.
myDiv.addEventListener('input', function() {
    if (myListContent.value.length >= 1) {
        myBtn.removeAttribute('disabled');
    } else {
        myBtn.setAttribute('disabled', 'disabled');
    }
});
function addContentElement() {
    let listTasksContent = document.getElementById('myListContent').value;
    let dateView = document.getElementById('myDate').value;
    //Nếu input rỗng Hoặc nhập nguyên dấu cách thì button add sẽ không hoạt động
    if (listTasksContent === '' || !listTasksContent.trim()) {
        alert('Lỗi. Nhập lại');
        return;
    }
    // Nếu trùng công iệc thì nhập lại
    for (let i = 0; i < todoList.length; i++) {
        if (listTasksContent === todoList[i].content) {
            alert('Nhập lại');
            // delete giá trị thẻ input sau khi nhập
            document.getElementById('myListContent').value = '';
            return;
        }
    }
    const newTask = {content: listTasksContent, status: false, owner: owner, date: dateView}
    todoList.unshift(newTask); 
    // delete giá trị thẻ input sau khi nhập
    document.getElementById('myListContent').value = '';
    document.getElementById('myDate').value = '';
    updateView(); 
}
// Chọn tất cả các task và huỷ chọn
function createCheckBoxAll() {
    for (let i = 0; i < todoList.length; i++) {
        if (isCheckAll) { // Nếu là isCheckAll (Tức true) thì todoList[i].status = true;
            todoList[i].status = true;
        } else {
            todoList[i].status = false;
        }
    } 
    isCheckAll = !isCheckAll;
    // Nếu !isCheckAll (Tức false) thì todoList[i].status = false;
    updateView();  
}    
// Tạo checkbox
function createStaticCheckBox(division, task) {
    let checkBox = document.createElement('input'); // check done/ not done
    checkBox.setAttribute('type', 'checkbox');// set checkBoxElement type = checkbox
    division.prepend(checkBox);
    if (task.status) {
        checkBox.setAttribute('checked', true);
        division.style.color = 'blue';
        division.style.textDecoration = 'line-through';
    } else {
        division.style.color = 'black';
    }
    // Khi checkbox được click thì gọi hàm 
    checkBox.addEventListener('change', function(e) {
        // Target Nhận phần tử cuối cùng khi click vào checkbox
        task.status = e.target.checked;
        // Nếu có 1 checkBox trong todoList = false(task.status = false) thì checkAll === false;
        if (!task.status) {
            document.getElementById('check-all').checked = false;
            // Nếu checkAll = false thì thằng isCheckAll phải bằng lại true
            isCheckAll = true;
        }
        // Đặt 1 biến mới isAllChecked = true
        let isAllChecked = true;
        // dùng vòng lặp for đếm. Dùng if đăt điều kiện nếu checkBox trong todoList = false thì isAllChecked = false đổi lại ischeckAll = false;
        for ( let i = 0; i < todoList.length; i++) {
            if (!todoList[i].status) {
                isAllChecked = false;
                break;
            }
        }
        // Dùng toán tử 3 ngôi để đặt checkAll = true or false 
        document.getElementById('check-all').checked = isAllChecked ? true : false;

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
    taskDelete.addEventListener('click', function(event) {
        // Nếu nhấn đồng ý (chắc chắn muốn xoá) thì sẽ chạy tiếp 
        const confirmation = confirm('Are you sure you want to delete ?');
        if (!confirmation) return;
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
    taskTopElement.innerHTML = '⊼';
    division.append(taskTopElement);
    // Nếu vị trí của phần tử === 0 thì taskTopElement true còn không thì trả về false
    if (todoList.indexOf(task) === 0) {
        taskTopElement.disabled = true;
    }
    // Nếu click vào button thì sẽ đưa element lên trên đầu divison
    taskTopElement.addEventListener('click', function() {
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
    taskBotElement.innerHTML = '⊻';
    division.prepend(taskBotElement);
    // Vô hiệu hoá bottpom khi ở vị trí dưới cùng của todoList
    if (todoList.indexOf(task) === todoList.length - 1) {    
        taskBotElement.disabled = true;
    }
    // Bắt sự kiện button đưa element xuống cuối cùng
    taskBotElement.addEventListener('click', function() {
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
    taskUpElement.innerHTML = '⇧';
    division.prepend(taskUpElement);
    // Vô hiệu hoá Up khi tới vị trí trên cùng
    if (todoList.indexOf(task) === 0) {
        taskUpElement.disabled = true;
    }
    // Bắt sự kiện button đưa element lên
    taskUpElement.addEventListener('click', function() {
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
    taskDownElement.innerHTML = '⇩';
    division.prepend(taskDownElement);
    // Vô hiệu hoá Down khi đi tới vị trí cuối cùng
    if (todoList.indexOf(task) === todoList.length - 1) {    
        taskDownElement.disabled = true;
    }
    // Bắt sự kiện button đưa element xuống
    taskDownElement.addEventListener('click', function() {
        // Tìm vị trí của task trong todoList
        const taskIndex = todoList.indexOf(task);
        // DÙng đảo vị trí của phần tử trong mảng
        let temp = todoList[taskIndex];
        todoList[taskIndex] = todoList[taskIndex + 1];
        todoList[taskIndex + 1] = temp;
        updateView();
    });
}

// Hiện tất cả công việc 
function totalTaskElement() {
    currentTab = 'all';
    updateView();
}
// Hiện tất cả công việc đã hoàn thành
function doneTaskElement() {
    currentTab = 'done';
    updateView();
}
// Hiện tất cả công việc chưa hoàn thành
function notDoneTaskElement() {
    currentTab = 'undone';
    updateView();
}
// Button xoá tất cả các task
function createRemoveAllTask() {
    const confirmation = confirm('Do you want to delete out ?');
    if (!confirmation) return;
    // Xoá từ vị trí 0 đến vị trí cuối cùng (là độ dài mảng todoList.length) 
    todoList.splice(0, todoList.length);
    updateView();
}
// Search công việc 
function searchTask() {
    hiddenItemIndexes = [];
    // Lấy nội dung cần tìm trong input search
    let searchTasksContent = document.getElementById('mySearch').value;
    if (searchTasksContent === '') {
        hiddenItemIndexes = [];
        updateView();
        return;
    }
    for (let i = 0; i < todoList.length; i++) {
        // Nếu trong todoList nội dung nào không giống với searchTasksContent thì đưa vào hiddenItemIndexes
        if (!todoList[i].content.toUpperCase().includes(searchTasksContent.toUpperCase())) {
            hiddenItemIndexes.push(i);
        }
    }
    updateView();
}
// Thêm chức năng người dùng
function login() { 
    owner = prompt('Nhập tên người dùng: ');
    document.getElementById('myOwner').innerHTML = owner;
    if (!owner) {
        login();
    }
}
// Đổi string có dấu thành ko dấu 
function removeAccents(str) {
    for (let accented in characterMap) {
      if (characterMap.hasOwnProperty(accented)) {
        str = str.replace(new RegExp(accented, 'g'), characterMap[accented]);
      }
    }
    return str;
}
function addDateTask() {

}