
(function () {
  const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.mjs";
  let pyodidePromise = null;

  function loadPyodideOnce() {
    if (!pyodidePromise) {
      pyodidePromise = import(PYODIDE_URL).then(({ loadPyodide }) =>
        loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/"
        })
      );
    }
    return pyodidePromise;
  }

  function makePlayground(root) {
    const source = root.querySelector(".pyodide-code");
    if (!source) return;

    const code = source.textContent.replace(/^\n/, "").replace(/\s+$/, "");
    source.remove();

    const title = root.dataset.title || "main.py";

    const bar = document.createElement("div");
    bar.className = "playground-titlebar";
    bar.innerHTML = `
      <div class="window-dots">
        <span class="window-dot"></span>
        <span class="window-dot"></span>
        <span class="window-dot"></span>
      </div>
      <div class="playground-filename">${title}</div>
    `;

    const body = document.createElement("div");
    body.className = "playground-body";

    const editor = document.createElement("div");
    editor.className = "playground-editor";

    const textarea = document.createElement("textarea");
    textarea.spellcheck = false;
    textarea.value = code;
    textarea.setAttribute("aria-label", "Python code editor");

    const side = document.createElement("div");
    side.className = "playground-side";

    const run = document.createElement("button");
    run.className = "playground-run";
    run.textContent = "▶ Run";

    const label = document.createElement("div");
    label.className = "playground-output-label";
    label.textContent = "Output";

    const status = document.createElement("div");
    status.className = "playground-status";
    status.textContent = "Pyodide siap dimuat saat Run pertama.";

    const output = document.createElement("pre");
    output.className = "playground-output";
    output.textContent = "Klik Run untuk menjalankan kode.";

    editor.appendChild(textarea);
    side.appendChild(run);
    side.appendChild(label);
    side.appendChild(output);
    side.appendChild(status);

    body.appendChild(editor);
    body.appendChild(side);

    root.appendChild(bar);
    root.appendChild(body);

    textarea.addEventListener("keydown", (event) => {
      if (event.key === "Tab") {
        event.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.setRangeText("    ", start, end, "end");
      }
    });

    run.addEventListener("click", async () => {
      run.disabled = true;
      output.textContent = "";
      status.textContent = "Memuat Python WebAssembly...";

      try {
        const pyodide = await loadPyodideOnce();

        let stdout = "";
        let stderr = "";

        pyodide.setStdout({
          batched: (msg) => {
            stdout += msg + "\n";
          }
        });

        pyodide.setStderr({
          batched: (msg) => {
            stderr += msg + "\n";
          }
        });

        status.textContent = "Menjalankan...";

        await pyodide.runPythonAsync(textarea.value);

        const result = (stdout + stderr).replace(/\n$/, "");
        output.textContent = result || "(Program selesai tanpa output.)";
        status.textContent = "Selesai.";
      } catch (error) {
        output.textContent = String(error);
        status.textContent = "Terjadi error.";
      } finally {
        run.disabled = false;
      }
    });
  }

  function init() {
    document.querySelectorAll(".pyodide-playground").forEach(makePlayground);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
