const checkbox = document.querySelector('input[type="checkbox"]');
checkbox.addEventListener("change", (ev) => {
  ev.target.value = ev.target.checked ? "true" : "false";
});

const saveBtn = document.querySelector("button#save-btn");
const loadingSave = saveBtn.childNodes[1];

const form = document.querySelector("form#write-form");
form.addEventListener("submit", async (ev) => {
  ev.preventDefault();

  loadingSave.classList.remove("hidden");
  saveBtn.disabled = true;

  const data = {};
  const formData = new FormData(ev.target);
  formData.forEach((value, key) => {
    data[key] = value;
  });

  if (!data.Published) data.Published = false;
  else data.Published = true;

  const response = await fetch(
    `/dashboard/write/${form.getAttribute("data-note-id")}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();

  if (result.error) {
    const errorEl = document.createElement("div");
    errorEl.classList =
      "fixed top-2 left-2 sm:left-1/2 sm:-translate-x-1/2 right-2 sm:right-auto sm:w-1/2 bg-red-200 p-4 rounded-lg border-[1px] border-red-400 duration-200 opacity-100";
    errorEl.innerHTML = `<p class="text-sm font-medium flex items-center gap-3"><i class='bx bx-error text-xl'></i> ${result.error}</p>`;

    wrapper.insertAdjacentElement("beforeend", errorEl);

    loadingSave.classList.add("hidden");
    saveBtn.disabled = false;

    setTimeout(() => {
      errorEl.classList.replace("opacity-100", "opacity-0");
    }, 1000);
    setTimeout(() => {
      wrapper.removeChild(errorEl);
    }, 1200);
    return;
  }

  window.location = `/dashboard/write/${result.id}`;
});

saveBtn.addEventListener("click", async () => {
  form.requestSubmit();
});
