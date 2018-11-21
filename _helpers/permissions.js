module.exports = {
    check: check,
    throw: error
};

function check(req, permissions) {
    return !req.user.permissions.includes(permissions);
}

function error(res) {
    return res.send("denied");
}