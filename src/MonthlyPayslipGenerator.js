class MonthlyPayslipGenerator {

  // Expect input in defined text format
  constructor(record) {
    const parsed = /^([a-zA-Z]+),([a-zA-Z]+),([0-9]+),([0-9]+)%,(.+)$/.exec(record);
    if (!parsed) throw new Error('Invalid record');

    // Set properties
    this.firstName = parsed[1];
    this.lastName = parsed[2];
    this.annualSalary = Number.parseInt(parsed[3]);
    this.superRate = Number.parseInt(parsed[4])/100;
    this.payPeriod = parsed[5];
  }

  calculateIncomeTax(taxBrackets) {
    let salaryRemaining = this.annualSalary;
    let taxAccrued = 0;

    /*
     * Iterate through each pre-defined tax bracket, taking the lesser of the remaining salary and the bracketed amount.
     * The highest (last) tax bracket does not have an upperLimit. In this case, just use the entire remaining salary.
     */
    taxBrackets.forEach((taxBracket) => {
      let salaryAmountToTax = taxBracket.upperLimit ?
        Math.min(salaryRemaining, taxBracket.upperLimit - (this.annualSalary - salaryRemaining)) :
        salaryRemaining;

      taxAccrued += salaryAmountToTax * taxBracket.rate;
      salaryRemaining -= salaryAmountToTax;
    });

    const monthlyGrossIncome = Math.floor(this.annualSalary / 12);
    const monthlyIncomeTax = Math.ceil(taxAccrued / 12);
    const monthlyNetIncome = monthlyGrossIncome - monthlyIncomeTax;
    const monthlySuper = Math.floor(monthlyGrossIncome * this.superRate);

    // Return output in defined text format
    return this.firstName + ' ' + this.lastName +
      ',' + this.payPeriod +
      ',' + monthlyGrossIncome +
      ',' + monthlyIncomeTax +
      ',' + monthlyNetIncome +
      ',' + monthlySuper;
  }

}

module.exports = MonthlyPayslipGenerator;
