const wrapper = document.querySelector("#wrapper");
const deleteModal = document.querySelector("#delete-modal");
const modalNoteTitle = deleteModal.querySelector("span#note-title");
let noteToDeleteID;

const cancelDeleteBtn = deleteModal.querySelector("button#cancel-del");
cancelDeleteBtn.addEventListener("click", () => {
  deleteModal.classList.replace("opacity-100", "opacity-0");
  deleteModal.classList.replace("pointer-events-auto", "pointer-events-none");
});

const confirmDeleteBtn = deleteModal.querySelector("button#confirm-del");
const loadingDelete = confirmDeleteBtn.childNodes[1];

confirmDeleteBtn.addEventListener("click", async () => {
  confirmDeleteBtn.disabled = true;
  loadingDelete.classList.remove("hidden");
  const response = await fetch(`/dashboard/notes/${noteToDeleteID}`, {
    method: "DELETE",
  });

  const result = await response.json();

  if (result.error) {
    const errorEl = document.createElement("div");
    errorEl.classList =
      "fixed top-2 left-2 sm:left-1/2 sm:-translate-x-1/2 right-2 sm:right-auto sm:w-1/2 bg-red-200 p-4 rounded-lg border-[1px] border-red-400 duration-200 opacity-100";
    errorEl.innerHTML = `<p class="text-sm font-medium flex items-center gap-3"><i class='bx bx-error text-xl'></i> ${result.error}</p>`;

    wrapper.insertAdjacentElement("beforeend", errorEl);

    loadingDelete.classList.add("hidden");
    confirmDeleteBtn.disabled = false;

    setTimeout(() => {
      errorEl.classList.replace("opacity-100", "opacity-0");
    }, 1000);
    setTimeout(() => {
      wrapper.removeChild(errorEl);
    }, 1200);
    return;
  }

  location.reload();
});

const deleteBtns = document.querySelectorAll("button#del-btn");
deleteBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    deleteModal.classList.replace("opacity-0", "opacity-100");
    deleteModal.classList.replace("pointer-events-none", "pointer-events-auto");
    modalNoteTitle.textContent = btn.getAttribute("data-note-title");
    noteToDeleteID = btn.getAttribute("data-note-id");
  });
});
