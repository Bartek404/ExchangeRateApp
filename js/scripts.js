const amountOne = document.querySelector('.amount-one')
const amountTwo = document.querySelector('.amount-two')
const currencyOne = document.querySelector('#currency-one')
const currencyTwo = document.querySelector('#currency-two')
const swapBtn = document.querySelector('.swap')
const rateInfo = document.querySelector('.rate-info')
const infoDate = document.querySelector('.date')

const calculate = () => {
	fetch(
		`https://api.exchangerate.host/convert?from=${currencyOne.value}&to=${currencyTwo.value}&amount=${amountOne.value}&source=ecb`
	)
		.then(res => res.json())
		.then(data => {
			const from = data.query.from
			const to = data.query.to
			const rate = data.info.rate
			const result = data.result
			amountTwo.value = result
			infoDate.textContent = data.date
			rateInfo.textContent = `1 ${from} = ${rate} ${to}`
		})
		.catch(err => console.error(err))
}

const swap = () => {
	const temp = currencyTwo.value
	currencyTwo.value = currencyOne.value
	currencyOne.value = temp
	calculate()
}

currencyOne.addEventListener('change', calculate)
currencyTwo.addEventListener('change', calculate)
amountOne.addEventListener('input', calculate)
swapBtn.addEventListener('click', swap)
calculate()
