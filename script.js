const tipButtons = document.querySelector(".selectTipButtons");
const calculate = document.querySelector(".calcButton");
const reset = document.querySelector(".resetButton");
const tipAmountValue = document.querySelector(".tipAmountValue");
const totalAmountValue = document.querySelector('.totalAmountValue');
const billValue = document.getElementById("billValue");
const peopleAmount = document.getElementById("peopleAmount");
const billErrorText = document.getElementById("billErrorText");
const customErrorText = document.getElementById("customErrorText");
const peopleErrorText = document.getElementById("peopleErrorText");
const billValueBox = document.querySelector(".billValueBox");
const customTip = document.getElementById("customValue");
const peopleAmountBox = document.querySelector(".peopleAmountBox");

custom = false ;

//When one button is clicked, make the other buttons not clicked.
tipButtons.addEventListener("click", function(e) {
    const children = tipButtons.children
    for(const child of children) {
        if (child == e.target) {
            if (child.tagName == 'INPUT') {
                custom = true;
                continue
            }
            child.classList.remove("default");
            child.classList.add("active");
            customTip.value = "";
            custom = false;
        } else {
            if (child.tagName == 'INPUT') {
                continue
            }
            child.classList.add("default");
            child.classList.remove("active");
        }
    }
});

//Logic for the calculations
calculate.addEventListener("click", function () {
    let buttonpercentage;
    let customPercentage;
    for (const child of tipButtons.children) {
        if (child.classList.contains("active")) {
            const childText = child.innerText
            buttonpercentage = Number(childText.replace("%", "")) / 100
            let tipAmountValueCalculation = Number(billValue.value) * buttonpercentage / Number(peopleAmount.value);
            tipAmountValue.innerText = `$${tipAmountValueCalculation.toFixed(2)}`;
            let totalAmountValueCalculation = Number(billValue.value) * (1 + buttonpercentage) / Number(peopleAmount.value);
            totalAmountValue.innerText = `$${totalAmountValueCalculation.toFixed(2)}`;
            break
        } else if (child.tagName == "INPUT") {
            customPercentage = Number(child.value) / 100
            let tipAmountValueCalculation = Number(billValue.value) * customPercentage / Number(peopleAmount.value);
            tipAmountValue.innerText = `$${tipAmountValueCalculation.toFixed(2)}`;
            let totalAmountValueCalculation = Number(billValue.value) * (1 + customPercentage) / Number(peopleAmount.value);
            totalAmountValue.innerText = `$${totalAmountValueCalculation.toFixed(2)}`;
            break
        }
    }
    if (billValue.value < 1) {
        tipAmountValue.innerText = "$0.00";
        totalAmountValue.innerText = "$0.00";
        billErrorText.style.display = "block";
        billValueBox.classList.add("error");
    } else {
        billErrorText.style.display = "none";
        billValueBox.classList.remove("error");
    }
    if (custom == true && customTip.value < 1) {
        tipAmountValue.innerText = "$0.00";
        totalAmountValue.innerText = "$0.00";
        customErrorText.style.display = "block";
        customTip.classList.add("error");
    } else {
        customErrorText.style.display = "none";
        customTip.classList.remove("error");
    }
    if (peopleAmount.value < 1) {
        tipAmountValue.innerText = "$0.00";
        totalAmountValue.innerText = "$0.00";
        peopleErrorText.style.display = "block";
        peopleAmountBox.classList.add("error");
    } else {
        peopleErrorText.style.display = "none";
        peopleAmountBox.classList.remove("error");
    }
})

//Logic for resetting
reset.addEventListener("click", function () {
    const children = tipButtons.children
    for(const child of children) {
        if (child.tagName == 'INPUT') {
                continue
            }
        child.classList.remove("active");
        child.classList.add("default");
        customTip.value = "";
    }

    const calcButtonBoxChildren = document.querySelector(".calcButtonBox").children
    for (const child of calcButtonBoxChildren) {
        child.classList.add("mainButtonStyle")
        child.classList.remove("buttonHoverStyle");
    }
    
    const errorBoxes = [billValueBox, customTip, peopleAmountBox]
    for (const item of errorBoxes) {
        item.classList.remove("error");
    }

    const errorTexts = [billErrorText, customErrorText, peopleErrorText]
    for (const items of errorTexts) {
        items.style.display = "none"
    }

    const values = [customTip, billValue, peopleAmount]
    for (const value of values) {
        value.value = "";
    }

    tipAmountValue.innerText = "$0.00";
    totalAmountValue.innerText = "$0.00";

    custom = true;
})

//If the values have something in it, then light up the calculate button. If not, remove the light up
const lightUp = function (input) {
    input.addEventListener("input", function () {
        if (input.value !== "") {
            calculate.classList.remove("mainButtonStyle")
            reset.classList.remove("mainButtonStyle");
            calculate.classList.add("buttonHoverStyle");
            reset.classList.add("buttonHoverStyle");
        } else {
            calculate.classList.add("mainButtonStyle")
            reset.classList.add("mainButtonStyle");
            calculate.classList.remove("buttonHoverStyle");
            reset.classList.remove("buttonHoverStyle");
        }
    })
}

lightUp(billValue)
lightUp(customTip)
lightUp(peopleAmount)