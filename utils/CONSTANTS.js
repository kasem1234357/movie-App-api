export const REPORT_STATES = {
    NOT_READ: 1,
    IN_PROGRESS: 2,
    FIXED: 3,
  };
export const GET_VERIFIED_EMAIL_MASSEGE = (code)=>{
   return `the code for verfication is \n ${code}`
}
export const SET_VERIFIED_EMAIL_MASSEGE =()=>{
  return `you are verified now `
}
module.exports = {
  REPORT_STATES,
  GET_VERIFIED_EMAIL_MASSEGE,
  SET_VERIFIED_EMAIL_MASSEGE
}