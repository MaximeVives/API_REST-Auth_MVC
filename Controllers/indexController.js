// let id = parseInt(req.param.id) -> pour être sur de ne pas avoir de problème avec les paramètres

function index(req, res) {
    res.status(200).json({ message: "Hello world" });
}
function show(req, res) {
    res.status(200).json({ message: "Hello world" });
}
function create(req, res) {
    res.status(200).json({ message: "Hello world" });
}
function update(req, res) {
    res.status(200).json({ message: "Hello world" });
}

function deleteIndex(req, res) {
    res.status(204).json({});
}


module.exports = {
    index,
    show,
    create,
    update,
    deleteIndex
}