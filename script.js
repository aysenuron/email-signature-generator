const form = document.querySelector("form");

const submitBtn = document.getElementById("submit");

const signatureContainer = document.getElementById("signature-container");

const signatureCard = document.getElementById("signature-card");

const profileImg = document.getElementById("profile-img");
const nameRender = document.getElementById("name-render");
const jobRender = document.getElementById("job-render");
const emailRender = document.getElementById("email-render");
const phoneRender = document.getElementById("phone-render");

const copyBtn = document.getElementById("copy-button");


form.addEventListener("submit", (e) => {
    e.preventDefault();

    //Form values
    const imageInput = document.getElementById("image").value;
    const nameInput = document.getElementById("name").value;
    const jobInput = document.getElementById("job").value;
    const emailInput = document.getElementById("email").value;
    const phoneInput = document.getElementById("phone").value;

    //Form render
    profileImg.src = imageInput;
    nameRender.textContent = nameInput;
    jobRender.textContent = jobInput;
    phoneRender.textContent = `${phoneInput}`;
    phoneRender.href = `tel:${phoneInput}`;
    emailRender.textContent = `${emailInput}`;
    emailRender.href = `mailto:${emailInput}`;
    
    signatureContainer.classList.remove("hidden");
    copyBtn.classList.remove("hidden");

});

copyBtn.addEventListener("click", () => {

    if (!signatureCard) {
        alert("Signature not found!");
        return;
    }

    // Create a range to select the signature
    const range = document.createRange();
    range.selectNode(signatureCard);

    // Clear previous selection and select new content
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    // Execute the copy command
    try {
        document.execCommand("copy");
        alert("Signature copied successfully!");
    } catch (err) {
        alert("Failed to copy signature.");
    }

    // Clear selection after copying
    selection.removeAllRanges();
});