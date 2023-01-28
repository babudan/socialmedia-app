const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (!value) return false
    return true;
};

//------------------------------- requestBody validation --------------------------------------------//

const isValidRequestBody = function (body) {
    return Object.keys(body).length > 0
}


//------------------------------- name regex --------------------------------------------//

const isValidUserName = function (value) {
    return /^[a-z0-9_\.]+$/i.test(value);
};

const isValidname = function (name) {
    return /^[a-z ,.'-]+$/i.test(name);
};
//------------------------------- email regex --------------------------------------------//

const isVAlidEmail = function (email) {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).test(email)
}
//------------------------------- password regex --------------------------------------------//


const isValidPassword = function (pass) {
    return /^.{8,15}$/.test(pass);
};




module.exports = {
    isValidUserName,
    isValid,
    isValidname,
    isValidPassword,
    isVAlidEmail,
    isValidRequestBody
}