document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll('form[action*="web3forms"]');

  forms.forEach((form) => {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const successMessage = form.querySelector("#successMessage");

      // Hide message before submit
      if (successMessage) {
        successMessage.classList.remove("show");
      }

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
        });

        if (!response.ok) throw new Error();

        // Reset form
        form.reset();

        // Show success message
        if (successMessage) {
          successMessage.classList.add("show");

          // Auto-hide after 5 seconds (optional)
          setTimeout(() => {
            successMessage.classList.remove("show");
          }, 5000);
        }
      } catch (error) {
        alert("❌ Something went wrong. Please try again.");
      }
    });
  });
});