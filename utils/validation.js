const validateEmail = (email) => {
    // console.log(email)
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const isEmpty = (data) => {
    // console.log("is Empty");
    // console.log(data)
    // console.log(!data);
    // console.log(data.length === 0);
    return (!data || data.length === 0 );
};

const trimString = (data) => {
    // console.log("trim String");
    // console.log(data)
    // console.log(data.trim());
    data.trim();
    return true;
};

module.exports = {
    validateEmail,
    isEmpty,
    trimString
}