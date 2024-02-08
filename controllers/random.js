const handleRandomUrls = async (req, res, next) => {
    try {
        console.log("Invalid URL");
        return res.status(404).end();
    } catch (error) {
        next(error);
    }
};

module.exports = {
    handleRandomUrls
}
