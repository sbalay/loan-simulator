# Loan simulator

## TODO

- Compare against funds.

## Nice to have

- Typeform like steps for loan fields, and then editable panel to change settings.
- Persist different settings with name

## SEB example

With a loan amount of SEK 1,000,000, a straight-line repayment of 50 years, an interest rate of 2.09 percent
and automatic payment, the effective interest rate will be 2.11 percent.
The first monthly payment will then be SEK 3,409.

If the interest rate is unchanged during the loan's repayment period (50 years),
the total amount you pay will be SEK 1,523,267 before tax reduction.
After a tax reduction of 30 percent, the total amount will be SEK 1,366,287.
The number of installments has then been 600.

### Script

```js
const amount = 1000000;
const amort = 0.02;
const int = 0.0209;

const it = new Array(12 * 50).fill();

let totalInt = 0;
let totalAmort = 0;

it.forEach(() => {
  const monthAmort = (amount * amort) / 12;

  const monthInt = ((amount - totalAmort) * int) / 12;

  totalAmort += Math.ceil(monthAmort * 100) / 100;
  totalInt += Math.ceil(monthInt * 100) / 100;
});

console.log("totalAmort");
console.log(totalAmort);
console.log("totalInt");
console.log(totalInt);
```
