// כתובת ה-API של ה-Web App
const API_URL = "https://script.google.com/macros/s/AKfycbwx2aCa_0KdkLY8Gb5n77sEWgAIMLA5as0y1NUKvzKmIWOCKYcRVTSddoeFF03c8VK0MA/exec";

// זמני תפילות
const prayerTimes = [
  { hour: 5, minute: 11 },  // פאג'ר
  { hour: 11, minute: 44 }, // ד'והר
  { hour: 14, minute: 29 }, // עאסר
  { hour: 16, minute: 49 }, // מגריב
  { hour: 18, minute: 19 }  // עישה
];

// פונקציה לבדוק אם בתוך טווח הזמן המותר
function isWithinPrayerTime() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  for (const prayer of prayerTimes) {
    const prayerMinutes = prayer.hour * 60 + prayer.minute;
    if (currentMinutes >= prayerMinutes - 30 && currentMinutes <= prayerMinutes + 30) {
      return true;
    }
  }
  return false;
}

// טיפול בטופס
document.getElementById('attendanceForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  if (!isWithinPrayerTime()) {
    document.getElementById('message').innerText = "האתר אינו זמין כעת.";
    return;
  }

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;

  // שליחת הנתונים ל-API
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      phone: phone,
      points: 1
    })
  });

  if (response.ok) {
    document.getElementById('message').innerText = "تم تسجيل حضورك بنجاح!";
    setTimeout(() => {
      window.location.href = "https://instagram.com/good.traces";
    }, 2000);
  } else {
    document.getElementById('message').innerText = "حدث خطأ. حاول مرة أخرى.";
  }
});