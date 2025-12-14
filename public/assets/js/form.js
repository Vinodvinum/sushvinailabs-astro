document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll('form[action*="web3forms"]');

  console.log("Web3Forms detected:", forms.length);

  forms.forEach((form) => {
    const successMessage = form.querySelector(".success-message");

    console.log("Success message found:", !!successMessage);

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      successMessage?.classList.remove("show");

      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
        });

        console.log("Web3Forms response:", response.status);

        if (!response.ok) throw new Error();

        form.reset();
        successMessage?.classList.add("show");

        setTimeout(() => {
          successMessage?.classList.remove("show");
        }, 5000);
      } catch (err) {
        console.error(err);
        alert("❌ Something went wrong. Please try again.");
      }
    });
  });
});