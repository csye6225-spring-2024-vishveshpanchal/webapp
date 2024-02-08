const healthz = async (req, res, next) => {
    try {
        // throw new ConnectionError();
        return res.status(200).end();
    } catch (error) {
        next(error);
    }
};

const methodNotAllowed = async (req, res, next) => {
    try {
        return res.status(405).end();
    } catch (error) {
        return res.status(400).end();
    }
};

module.exports = {
    healthz,
    methodNotAllowed
}
