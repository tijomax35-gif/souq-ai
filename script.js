// SOUQ AI - Frontend JavaScript
// هذا الملف مسؤول عن تفاعلات الصفحة الرئيسية.
// ملاحظة: الذكاء الاصطناعي والدفع وقاعدة البيانات تحتاج خادم Backend.

document.addEventListener("DOMContentLoaded", () => {
  // زر "ابدأ الآن"
  document.querySelectorAll('a[href="#register"], a[href="#start"], .start-btn')
    .forEach(button => {
      button.addEventListener("click", () => {
        const section = document.querySelector("#register");
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    });

  // نموذج إنشاء الحساب
  const form = document.querySelector("#registerForm");
  const message = document.querySelector("#registerMessage");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const data = Object.fromEntries(new FormData(form));
      if (message) message.textContent = "جارٍ إنشاء المتجر...";

      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "تعذر إنشاء الحساب");
        }

        if (message) {
          message.textContent = "تم إنشاء حسابك بنجاح 🎉";
        }

        // الانتقال إلى لوحة التحكم بعد نجاح التسجيل
        setTimeout(() => {
          window.location.href = "/dashboard";
        }, 700);

      } catch (error) {
        if (message) message.textContent = error.message;
      }
    });
  }

  // زر القائمة في الهاتف
  const menuButton = document.querySelector("#menuButton");
  const mobileMenu = document.querySelector("#mobileMenu");

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });
  }

  // سنة حقوق النشر
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
});
