const ABAFunc = require('./func')

console.log(ABAFunc.passwordResetHash("1234"));
// console.log("Email Validate")
// console.log(ABAFunc.isValidEmail("JTJISGOD"));
// console.log(ABAFunc.isValidEmail("jtisgod@gmail.com"));

console.log("Is Valid Username")
console.log(ABAFunc.isValidUsername("jt!jisgod"))
console.log(ABAFunc.isValidUsername("jtjisgod"))
console.log(ABAFunc.isValidUsername("jtji sgod"))
console.log(ABAFunc.isValidUsername("jtjis-god"))
console.log(ABAFunc.isValidUsername("jtji_sgod"))
console.log(ABAFunc.isValidUsername("jt!jis0god"))
console.log(ABAFunc.isValidUsername("jtjis0god"))
console.log(ABAFunc.isValidUsername("jtji0 sgod"))
console.log(ABAFunc.isValidUsername("jtj0is-god"))
console.log(ABAFunc.isValidUsername("jt0ji_sgod"))

// console.log(ABAFunc.passwordHash("JTJISGOD"));
