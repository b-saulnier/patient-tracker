export function getAge(dateString: string) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

export function getDayString(date: Date) {
    // return a string MM/DD/YYYY
    var day = date.getDate();
    var month = date.getMonth() + 1; // January is 0
    var year = date.getFullYear();
    return month + "/" + day + "/" + year;
}

export function getTimeOfDay(date: Date) {
    // return a string HH:MM AM/PM
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var period = hours >= 12 ? "PM" : "AM";
    if (hours > 12) {
        hours -= 12;
    }
    var minutesStr = "";
    var hoursStr = "";

    hoursStr = (hours < 10) ? '0' + hours : hours.toString();
    minutesStr = (minutes < 10) ? '0' + minutes : minutes.toString();

    return hoursStr + ":" + minutesStr + " " + period;
}