class Calculator {
    constructor(prevOperandTextElement, currentOperandTextElement, currentOperationTextElement) {
        this.prevOperandTextElement = prevOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.currentOperand = ''
        this.currentOperationTextElement = currentOperationTextElement
        this.currentOperation = ''

    }

    clear(){
        this.currentOperation = ''
        this.currentOperand = ''
        this.prevOperand = ''
        this.operation = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number){
        if( number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()

    }
    
    chooseOperation(operation){
        if (this.currentOperand === '') return
        if (this.prevOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currentOperand
        this.currentOperand = ''
        this.currentOperation = operation
    }

    compute(){
        let computation 
        const prev = parseFloat(this.prevOperand)
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.prevOperand = ''
        this.currentOperation = ''
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.prevOperandTextElement.innerText = this.prevOperand
        this.currentOperationTextElement.innerText = this.currentOperation
        if(typeof this.prevOperand === "undefined"){
            this.prevOperandTextElement.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevOperandTextElement = document.querySelector('[data-prev]')
const currentOperandTextElement = document.querySelector('[data-current]')
const currentOperationTextElement = document.querySelector('[data-operation]');


const calculator = new Calculator(prevOperandTextElement, currentOperandTextElement, currentOperationTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button =>{
    calculator.delete()
    calculator.updateDisplay()
})