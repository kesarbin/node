document.addEventListener("click", (event) => {
  if (event.target.dataset.type === "remove") {
    const id = event.target.dataset.id;
    remove(id).then(() => {
      event.target.closest("li").remove();
    });
  }
  if (event.target.dataset.type === "edit") {
    const id = event.target.dataset.id;
    let title = prompt("Edit");
    if (title !== null) {
      edit(id, title).then(() => {
        event.target.closest("li").querySelector(".title").innerText = title;
      });
    }
  }
});

async function remove(id) {
  await fetch(`/${id}`, { method: "DELETE" });
}
async function edit(noteId, newTitle) {
  await fetch(`/${noteId}+${newTitle}`, {
    method: "PUT",
    body: JSON.stringify({ title: `${newTitle}`, id: `${noteId}` }),
  });
}
