export default function hasClass(el: Element, class_to_check: string) {
    if(!el || !el.classList)
        return false
    return el.classList.contains(class_to_check)
}