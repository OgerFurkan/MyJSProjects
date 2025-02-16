const firstDiv = document.querySelector(".first");
const secondDiv = document.querySelector(".second");
const firstInput = document.querySelector(".firstAmount");
const secondInput = document.querySelector(".secondAmount");
const selectFirst = document.querySelector(".selectFirst");
const selectSecond = document.querySelector(".selectSecond");
const exchange = document.querySelector(".exchange");
const btnSubmit = document.querySelector(".submit");
const btnReset = document.querySelector(".reset");
const icons = ["fas fa-dollar-sign", "fa-solid fa-euro-sign", "fa-solid fa-turkish-lira-sign"];
const currency = new Currency();

runEventListeners();

function runEventListeners() {
    btnSubmit.addEventListener("click", getExchange);
    exchange.addEventListener("click", exchangeCurrencies);
    selectFirst.addEventListener("change", changeIcon);
    selectSecond.addEventListener("change", changeIcon);
    [selectFirst, selectSecond].forEach(select => select.addEventListener("change", getExchange));
    btnReset.addEventListener("click", resetInputs);
}

function getExchange() {
    const firstAmountValue = Number(firstInput.value.trim());
    const firstSelectValue = selectFirst.value;
    const secondSelectValue = selectSecond.value;
    currency.exchange(firstAmountValue, firstSelectValue, secondSelectValue)
        .then(result => {
            secondInput.value = result.toFixed(2);
        })
        .catch(err => console.log(err));
}

function exchangeCurrencies() {
    [selectFirst.selectedIndex, selectSecond.selectedIndex] = [selectSecond.selectedIndex, selectFirst.selectedIndex];
    firstInput.value = Number(secondInput.value);
    getExchange();
    changeIcon();
}

function changeIcon() {
    firstDiv.children[1].className = icons[selectFirst.selectedIndex];
    secondDiv.children[1].className = icons[selectSecond.selectedIndex];
}

function resetInputs() {
    firstInput.value = "";
    secondInput.value = "";
    selectFirst.selectedIndex = 0;
    selectSecond.selectedIndex = 2;
    changeIcon();
}



