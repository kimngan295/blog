const testEJS = async (req, res) => {
    res.render('test', {
        title: 'Test EJS'
    })
}

export default testEJS