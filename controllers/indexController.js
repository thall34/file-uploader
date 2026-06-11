async function getHomepage(req, res, next) {
    try {
        res.render('index', {
            title: 'Paldex File Storage'
        });
    } catch(error) {
        next(error)
    }
};

module.exports = {
    getHomepage,
}