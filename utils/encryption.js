const bcrypt = require ('bcrypt');

const saltRounds = 10;

const generateHash = async (data) => {
    const hashedData = await bcrypt.hash(data, saltRounds);
    return hashedData.toString();
};

const compareHash = async (data, hash) => {
    const result = await bcrypt.compare(data, hash);
    return result;
};

module.exports = {
    generateHash,
    compareHash
}