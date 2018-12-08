const ABAFunc = require('./func')

console.log("Email Validate")
console.log(ABAFunc.isValidEmail("JTJISGOD"));
console.log(ABAFunc.isValidEmail("jtisgod@gmail.com"));

console.log(ABAFunc.passwordHash("JTJISGOD"));