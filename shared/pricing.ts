export function calculateAgreementTotal(noOfStudents: number, perStudentPrice: number, noOfYearPlan: number) {
  return Number((noOfStudents * perStudentPrice * noOfYearPlan).toFixed(2));
}
