// Инициализируем массив для хранения пунктов расхода и дохода
let itemArr = [];

// Находим div для отображения пунктов
const allSpendingPoints = document.querySelector('.allSpendingPoints');

// Находим div для отображения суммы всех пунктов
const valueTotalEl = document.querySelector('[data-valueTotal]');


// Функция запускающая рендер пунктов и их суммы на страницу
function Render(arr = itemArr) {

        // Рендер пунктов
        allSpendingPoints.innerHTML = arr.map(item => 
            item.doRenderItem()).join('');
        
        // Вычисления суммы пунктов
        let valueTotal = 0;
        arr.forEach(function(item) {
            if (item.incomeExpenses === 'income') {
                valueTotal += Number.parseFloat(item.amount);
            }
            if (item.incomeExpenses === 'expenses') {
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

itemArr = [
    new Item('income', '1000', 'Salary', '2022-09-08', 'from other job'),
    new Item('income', '1250', 'Pension', '2022-08-08', 'from homework'),
    new Item('income', '99', 'Donations', '2022-07-08', 'from carwash'),
    new Item('expenses', '200', 'House', '2022-09-08', 'buy new table'),
    new Item('expenses', '99', 'Food', '2022-08-08', 'buy food to home'),
    new Item('expenses', '990', 'Technique', '2022-07-08', 'buy new iphone'),
];

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

        dataFilterIoR.value = 'nothnig';
        dataFilterCategories.value = 'nothnig';
    }

    if (event.target.classList.contains('btnAddCategories')) {
        const newCategorieTitle = prompt('Income or Expenses?');
        const newCategorie = prompt('Введите название новой категории')
        if (newCategorieTitle === 'income') {
            incomeOrExpenses.income[`${newCategorie}`] = newCategorie;
        }

        if (newCategorieTitle === 'expenses') {
            incomeOrExpenses.income[`${newCategorie}`] = newCategorie;
        }
    }
})

// Ищем поле выбора доход/расход
const dataIncomeExpenses = document.querySelector('[data-incomeExpenses]');

// Ищем поле для вывода строк расхода/дохода
const dataCategories = document.querySelector('[data-categories]');

// Отслеживаем выбор
dataIncomeExpenses.addEventListener('input', function() {

    if (document.querySelector('[data-remove]')) {
        document.querySelector('[data-remove]').remove();
    }

    // Проверяем доход или расход
    if (dataIncomeExpenses.value === 'expenses') {

        let arr = Object.values(incomeOrExpenses.expenses);
        dataCategories.innerHTML = arr.map(item => 
            doRenderCategories(item)).join('');
    }
    if (dataIncomeExpenses.value === 'income') {
        
        let arr = Object.values(incomeOrExpenses.income);
        dataCategories.innerHTML = arr.map(item => 
            doRenderCategories(item)).join('');
    }
});

// Находим форму фильтра
const SpendingPointFilter_Form = document.querySelector('.SpendingPointFilter_Form');

// Находим элемент в котором пользователь будет делать выбор
const dataFilterIoR = document.querySelector('[data-filterIoR]')

// Находим элемент куда будут помещаться элементы исходя из предыдущего выбора
const dataFilterCategories = document.querySelector('[data-filterCategories]')

// Инициализируем переменные для обеих фильтров
let firstFilter;
let secondFilter;
let filteredArr = [];

// Отслеживаем выбор
SpendingPointFilter_Form.addEventListener('input', event => {
    
    // Проверяем input в первом поле
    if (event.target.hasAttribute('data-filterIoR')) {

        // Записываем выбор в первом поле в переменную

        // Выводим категории если выбран income
        if (dataFilterIoR.value === 'nothing') {
            dataFilterCategories.innerHTML = 
            '<option data-filterRemove value="nothing"></option>';
            Render();
        } else {
            dataFilterCategories.innerHTML = 
            '<option data-filterRemove value="nothing"></option>' + 
            Object.values(incomeOrExpenses[dataFilterIoR.value]).map(item => 
                doRenderCategories(item)).join('');
            Render(Find(dataFilterIoR.value));
        }
    }
    
    // Проверяем input во втором поле
    if (event.target.hasAttribute('data-filterCategories')) {


        // Записываем выбор во втором поле в переменную
        console.log(dataFilterCategories.value)
        if (dataFilterCategories.value === 'nothing') {
            Render(Find(dataFilterIoR.value));
        } else {
            Render(Find(dataFilterCategories.value, itemArr));
        }
    }
})

function Find(settings, arr = itemArr) {
    let newArr = [];
    console.log(arr)
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].incomeExpenses === `${settings}`) {
            newArr.push(arr[i])
        } else if(arr[i].categories === `${settings}`) {
            newArr.push(arr[i])
        }
    }
    console.log(newArr)
    return newArr;
};

document.addEventListener('load', Render())
