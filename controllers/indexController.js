// loads homepage
async function getHomepage(req, res, next) {
    try {
        res.render('index', {
            title: 'Paldex File Storage',
            user: req.user,
        });
    } catch(error) {
        next(error)
    }
};

module.exports = {
    getHomepage,
}