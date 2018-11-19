module.exports = {
    check: checkPermission,
    throw: permissionError
};

function checkPermission(req, permission) {
    return !req.user.permissions.includes(permission);
}

function permissionError(res) {
    return res.status(401).json({ message: 'Permission not found' });
}