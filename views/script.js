const form = document.getElementById("urlForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const url = document.getElementById("urlInput").value;
    const resultDiv = document.getElementById("result");

    const response = await fetch("/url", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
    });

    const data = await response.json();

    if (data.id) {
        resultDiv.innerHTML = `
            <p>Short URL:</p>
            <a href="/${data.id}" target="_blank">
                http://localhost:8001/${data.id}
            </a>
        `;
    } else {
        resultDiv.innerHTML = `<p>${data.error}</p>`;
    }
});