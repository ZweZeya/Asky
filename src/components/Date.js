
export default function dateFormat(str) {
    const date = new Date(str)
    const options = {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit"
    }
    return date.toLocaleString("en-GB", options)
}