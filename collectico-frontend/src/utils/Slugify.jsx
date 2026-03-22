const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // ลบอักขระพิเศษ
    .replace(/[\s_-]+/g, "-") // แปลงเว้นวรรคหรือขีดล่างเป็นขีดกลาง
    .replace(/^-+|-+$/g, ""); // ลบขีดกลางที่ขึ้นต้น/ลงท้าย

export default slugify;
