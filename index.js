// Инициализируем массив для хранения пунктов расхода и дохода
let itemArr = [];

// Находим div для отображения пунктов
const allSpendingPoints = document.querySelector('.allSpendingPoints');

// Находим div для отображения суммы всех пунктов
const valueTotalEl = document.querySelector('[data-valueTotal]');


// Функция запускающая рендер пунктов и их суммы на страницу
function Render() {

        // Рендер пунктов
        allSpendingPoints.innerHTML = itemArr.map(item => 
            item.doRenderItem()).join('');
        
        // Вычисления суммы пунктов
        let valueTotal = 0;
        itemArr.forEach(function(item) {
            if (item.incomeExpenses === 'Income') {
                valueTotal += Number.parseFloat(item.amount);
            }
            if (item.incomeExpenses === 'Expenses') {
                valueTotal -= Number.parseFloat(item.amount);
            }
            return valueTotal;
        })

        // Рендер суммы пунктов
        valueTotalEl.textContent = `${valueTotal} $`;
}

// Создаем конструктор пункта расхода/дохода
class Item {
    constructor (incomeExpenses, amount, categories, date, comment) {
        this.incomeExpenses = incomeExpenses,
        this.amount = amount,
        this.categories = categories,
        this.date = date,
        this.comment = comment;
    }

    // Макет пункта для рендера
    doRenderItem() {
        return `
            <div class="spendingPointItem">
                <div>${this.incomeExpenses}</div>
                <div>${this.amount}</div>
                <div>${this.categories}</div>
                <div>${this.date}</div>
                <div>${this.comment}</div>
            </div>`
    }
}

// Объект со свойствами доход/расход
class IncomeOrExpenses {

    // Объект с категориями дохода
    income = {
        salary: 'Salary',
        pension: 'Pension',
        socialPayments: 'Social payments',
        donations: 'Donations',
        sellingThings: 'Selling things',
    }

    // Объект с категориями расхода
    expenses = {
        automobile: 'Automobile',
        house: 'House',
        health: 'Health',
        personalExpenses: 'Personal expenses',
        clothing: 'Сlothing',
        food: 'Food',
        present: 'Present',
        familyExpenses: 'Family expenses',
        technique: 'Technique',
        services: 'Services',
        utilities: 'Utilities',
    }
}

function doRenderCategories(item) {
        return `<option>${item}</option>`
}

const incomeOrExpenses = new IncomeOrExpenses();

// Находим форму с данными пункта
const formEl = document.querySelector('form');

// Отслеживаем клик 
document.addEventListener('click', event => {

    // Проверяем на какую кнопку был совершен клик
    if (event.target.classList.contains('btnAdd')) {

        // Проверяем наличие текста в главных полях
        if (document.querySelector('[data-amount]').value === '' || 
            document.querySelector('[data-date]').value === '') {
               // Сюда нужно добавить изменение рамки input на красный цвет
            return;
        }

        // Собираем данные из формы
        let incomeExpenses = document.querySelector('[data-incomeExpenses]').value;
        let amount = document.querySelector('[data-amount]').value;
        let categories = document.querySelector('[data-categories]').value;
        let date = document.querySelector('[data-date]').value;
        let comment = document.querySelector('[data-comment]').value;

        // Создаем новый пункт расхода/дохода на основе данных из формы и помещаем его в массив
        itemArr.push(new Item(incomeExpenses, amount, categories, date, comment));

        // Выводим массив в консоль (для удобства разработки)
        console.log(itemArr);

        // Рендерим массив на страницу
        Render();
    }
})

// Ищем поле выбора доход/расход
const dataIncomeExpenses = document.querySelector('[data-incomeExpenses]');

const dataCategories = document.querySelector('[data-categories]');
// Отслеживаем выбора
dataIncomeExpenses.addEventListener('input', function() {

    if (dataIncomeExpenses.value === '') {
        dataCategories.innerHTML = null;
    }
    // Проверяем доход или расход
    if (dataIncomeExpenses.value === 'Expenses') {

        let arr = Object.values(incomeOrExpenses.expenses);
        dataCategories.innerHTML = arr.map(item => 
            doRenderCategories(item)).join('');
    }
    if (dataIncomeExpenses.value === 'Income') {
        
        let arr = Object.values(incomeOrExpenses.income);
        dataCategories.innerHTML = arr.map(item => 
            doRenderCategories(item)).join('');
    }
});