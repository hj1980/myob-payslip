const assert = require('assert');

const TaxBrackets = require('./TaxBrackets');

const testCases = [{
  in: 'David,Rudd,60050,9%,01 March – 31 March',
  out: 'David Rudd,01 March – 31 March,5004,922,4082,450'
}, {
  in: 'Ryan,Chen,120000,10%,01 March – 31 March',
  out: 'Ryan Chen,01 March – 31 March,10000,2696,7304,1000'
}];



describe("MonthlyPayslipGenerator", () => {
  const MonthlyPayslipGenerator = require('./MonthlyPayslipGenerator');

  it("should throw unless instantiated with a record.", () => {
    assert.throws(() => {
      new MonthlyPayslipGenerator();
    });
  });

  it("should accept valid records.", () => {
    testCases.forEach((testCase) => {
      new MonthlyPayslipGenerator(testCase.in);
    });
  });

  it("should correctly calculate payslips using FY2013 tax rates.", () => {
    testCases.forEach((testCase) => {
      assert.equal(new MonthlyPayslipGenerator(testCase.in).calculateIncomeTax(TaxBrackets.FY2013), testCase.out);
    });
  });

});
