const form = document.querySelector("form");

const submitBtn = document.getElementById("submit");

const signatureContainer = document.getElementById("signature-container");

const signatureCard = document.getElementById("signature-card");

const profileImg = document.getElementById("profile-img");
const nameRender = document.getElementById("name-render");
const jobRender = document.getElementById("job-render");
const meetingRender = document.getElementById("meeting-render");
const meetingIcon = document.getElementById("meeting-icon");
const emailRender = document.getElementById("email-render");
const phoneRender = document.getElementById("phone-render");
const cellRender = document.getElementById("cell-render");
const cellIcon = document.getElementById("cell-icon");

const copyBtn = document.getElementById("copy-button");
const hubspotBtn = document.getElementById("hubspot-copy");

function formatPhoneNumber(phoneNumber) {
    let numbers = phoneNumber.replace(/\D/g, ""); // Remove non-numeric characters
    let formattedNumber = "";

    if (numbers.length > 0) {
        formattedNumber = `(${numbers.substring(0, 3)}`;
    }
    if (numbers.length >= 4) {
        formattedNumber += `) ${numbers.substring(3, 6)}`;
    }
    if (numbers.length >= 7) {
        formattedNumber += `-${numbers.substring(6, 10)}`;
    }

    return formattedNumber;
}

document.getElementById("phone").addEventListener("input", (e) => {
    e.target.value = formatPhoneNumber(e.target.value);
});

document.getElementById("cell").addEventListener("input", (e) => {
    e.target.value = formatPhoneNumber(e.target.value);
});

form.addEventListener("submit", (e) => {
    e.preventDefault();

    //Form values
    const imageInput = document.getElementById("image").value;
    const nameInput = document.getElementById("name").value;
    const jobInput = document.getElementById("job").value;
    const emailInput = document.getElementById("email").value;
    const meetingInput = document.getElementById("meeting").value;
    const phoneInput = document.getElementById("phone").value;
    const cellInput = document.getElementById("cell").value;

    //Format phone number
    const formattedPhoneNumber = formatPhoneNumber(phoneInput);
    const formattedCell = formatPhoneNumber(cellInput);

    //Form render
    profileImg.src = imageInput;
    nameRender.textContent = nameInput;
    jobRender.textContent = jobInput;
    phoneRender.textContent = `${formattedPhoneNumber}`;
    phoneRender.href = `tel:${phoneInput}`;
    if(cellInput) {
        cellIcon.textContent = "📱";
        cellRender.textContent = `${formattedCell}`;
        cellRender.href = `tel:${cellInput}`;
    } else if (!cellInput) {
        cellIcon.textContent = "";
        cellRender.textContent = "";
        cellRender.href = "";
    }

    if(meetingInput) {
        meetingIcon.textContent = "🗓️";
        meetingRender.textContent = "Book a time to meet me";
        meetingRender.href = meetingInput;
    } else if (!meetingInput) {
        meetingIcon.textContent = "";
        meetingRender.textContent = "";
        meetingRender.href = "";
    }
    emailRender.textContent = `${emailInput}`;
    emailRender.href = `mailto:${emailInput}`;
    
    signatureContainer.classList.remove("hidden");
    copyBtn.classList.remove("hidden");
    hubspotBtn.classList.remove("hidden");

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


hubspotBtn.addEventListener("click", async () => {
    if (!signatureCard) {
        alert("Signature not found!");
        return;
    }

    try {
        await navigator.clipboard.writeText(signatureCard.outerHTML);
        alert("Signature HTML copied to clipboard!");
    } catch (err) {
        console.error("Failed to copy:", err);
        alert("Failed to copy the signature.");
    }
});