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
    // Xoá giá trị thẻ input sau khi nhập
    document.getElementById('myInput').value = '';
    // Gán text node cho thẻ p vừa tạo
    p.appendChild(t);
    document.getElementById('myUL').appendChild(p);

    // Tạo thẻ input
    let checkBoxElement = document.createElement('INPUT');
    // Cho input type = checkbox
    checkBoxElement.setAttribute('type', 'checkbox');
    // Thêm vào đầu của p
    p.prepend(checkBoxElement); 

    // tạo thẻ button 
    let tasksDelete = document.createElement('BUTTON');
    // thêm vào sau p
    p.append(tasksDelete);
    tasksDelete.innerHTML = 'Delete'; // <button onclick="process">Hello</button>
    // dùng addEvebtListener Thêm sự kiện cho đối tượng 
    tasksDelete.addEventListener('click', function(event) {
        const isDone = checkBoxElement.checked;
        isDone ? --doneCount : --undoneCount;
        p.remove();
        --totalCount;
        updateDoneView();
    });

    // khi checkBoxElement (checkbox) được click thì sẽ gọi hàm 
    checkBoxElement.addEventListener('change', function(e) {
        // target là thằng cuối cùng mà mình click vào
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
// document.addEventListener('dragenter', function(e){
//     if (e.target.id == 'myUL') {
//         console.log('hung su kien');
//     }
// });
// document.addEventListener('dragover', function(e){
//     e.preventDefault();
//     // if (e.target.id == 'myUL') {
//     //     console.log('dang chay su kien hung drag');
//     // }
// });
// document.addEventListener('dragleave', function(e){
//     if (e.target.id == 'myUL') {

//     }
//     // console.log('nha chuot ket thuc hung keo');
// });
// document.addEventListener('drop', function(e){
//     e.preventDefault();
//     if (e.target.className == 'element') {
//         let data = e.dataTransfer.getData('myUL');
//         e.target.appendChild(document.getElementById(data));
//     };
//     console.log('nha thong tin');
// });