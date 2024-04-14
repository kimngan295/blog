const testEJS = async (req, res) => {
    res.render('test', {
        title: 'Test EJS'
    })
}

module.exports = testEJS