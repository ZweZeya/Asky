
export default function dateFormat(str) {
    const date = new Date(str)
    const options = {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit"
    }
    return date.toLocaleString("en-GB", options)
}

// export function dateSort(a, b) {
//     if (a.datePosted < b.datePosted) {
//         return 1;
//     } else if (a.datePosted > b.datePosted) {
//         return -1;
//     } else {
//         return 0;
//     }
// }