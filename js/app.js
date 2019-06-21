// Variables
const   addExpenseForm = document.querySelector('#add-expense'),
        budgetTotal = document.querySelector('span#total'),
        budgetLeft = document.querySelector('span#left');
let budget, userBudget;
// Classes
class Budget{
    constructor(budget){
        this.budget = Number(budget);
        this.budgetLeft = this.budget;
    }
    soDuSauChiTieu(amount){
        return this.budgetLeft -= amount;
    }
}
class HTML{
    insertBudget(amount){
        // insert vào HTML
        budgetTotal.innerHTML = `${amount}`;
        budgetLeft.innerHTML = `${amount}`;
    }
    // hiển thị message
    printMessage(message, className){
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('text-center', 'alert', className);
        messageWrapper.appendChild(document.createTextNode(message));
        // Insert vào HTML
        document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);
        // clear the error
        setTimeout(function(){
            document.querySelector('.primary .alert').remove();
            //addExpenseForm.reset();
        },2000);
    }
    // hiển thị danh sách chi tiêu
    addExpenseToList(name, amount){
        const expenseList = document.querySelector('#expenses ul');
        // tạo thẻ li
        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        // tạo template hiển thị
        li.innerHTML = `
            ${name}
            <span class="badge badge-primary badge-pill">${amount}đ</span>
        `
        // insert html
        expenseList.appendChild(li);
    }

    trackBudget(amount){
        const soTienDu = budget.soDuSauChiTieu(amount);
        //console.log(soTienDu);
        budgetLeft.innerHTML = `
        ${soTienDu}
        `;
        // check warning số tiền dư
        if(budget.budget / 4 > soTienDu){
            budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');
            budgetLeft.parentElement.parentElement.classList.add('alert-danger');
        } else if(budget.budget / 2 > soTienDu){
            budgetLeft.parentElement.parentElement.classList.remove('alert-success');
            budgetLeft.parentElement.parentElement.classList.add('alert-warning');
        }
    }
}
// khởi tạo class HTML
const html = new HTML();
// Event Listeners
eventListeners();
function eventListeners(){
    
    document.addEventListener('DOMContentLoaded', function(){
        userBudget = prompt('Nhập vào ngân sách của bạn cho tuần này:');
        // validate budget
        if(userBudget === null || userBudget === '' || userBudget === '0'){
            window.location.reload();
        }else{
            // khởi tạo lớp Budget sau khi xác thực
            budget = new Budget(userBudget);
            // thực hiện insert
            //console.log(budget);
            html.insertBudget(budget.budget);
        }
    });
    // Khi có chi phí đc thêm vào
    addExpenseForm.addEventListener('submit', function(e){
        e.preventDefault();

        //Đọc value input
        const expenseName = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;

        if(expenseName === '' || amount === ''){
            html.printMessage('Vui lòng nhập vào các trường!', 'alert-danger');
        }else{
            html.addExpenseToList(expenseName, amount);
            html.trackBudget(amount);
            html.printMessage('Thêm thành công!', 'alert-success');
        }
    });
}
