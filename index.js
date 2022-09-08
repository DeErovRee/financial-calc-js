let itemArr = [];

class Item {
    constructor (amount, categories, date, tag) {
        this.amount = amount,
        this.categories = categories,
        this.date = date,
        this.tag = tag;
    }

    doRenderItem() {
        return `
            <div class="spendingPointItem">
                <div>${this.amount}</div>
                <div>${this.categories}</div>
                <div>${this.date}</div>
                <div>${this.tag}</div>
            </div>`
    }
}

const formEl = document.querySelector('form');
document.addEventListener('click', event => {
    if (event.target.classList.contains('btnAdd')) {
        if (document.querySelector('[data-amount]').value === '' || 
            document.querySelector('[data-date]').value === '') {
            return;
        }
        let amount = document.querySelector('[data-amount]').value;
        let categories = document.querySelector('[data-categories]').value;
        let date = document.querySelector('[data-date]').value;
        let tag = document.querySelector('[data-tag]').value;

        itemArr.push(new Item(amount, categories, date, tag));

        console.log(itemArr);
    }
})