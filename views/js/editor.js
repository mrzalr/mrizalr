const editBtn = document.querySelector("button#edit-btn");
const previewBtn = document.querySelector("button#preview-btn");
const contentTxArea = document.querySelector("textarea#content");
const contentWrapper = document.querySelector("#contentWrapper");

let state = 0;

editBtn.addEventListener("click", (ev) => {
  ev.preventDefault();

  if (state === 0) return;
  editBtn.classList.remove("text-black/60");
  previewBtn.classList.add("text-black/60");
  contentWrapper.classList.toggle("h-[22rem]");

  contentWrapper.innerHTML = "";
  contentWrapper.appendChild(contentTxArea);

  state = 0;
});

previewBtn.addEventListener("click", async (ev) => {
  ev.preventDefault();

  if (state === 1) return;

  const response = await fetch("/dashboard/write/parse", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: contentTxArea.value }),
  });

  editBtn.classList.add("text-black/60");
  previewBtn.classList.remove("text-black/60");
  contentWrapper.classList.toggle("h-[22rem]");

  const result = await response.json();
  contentWrapper.innerHTML = result.result;

  state = 1;
});
