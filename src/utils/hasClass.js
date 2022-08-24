module.exports.hasClass = function (el, class_to_check) {
    if(!el || !el.classList)
        return false
    return el.classList.contains(class_to_check)
}