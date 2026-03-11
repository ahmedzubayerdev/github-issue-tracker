 
const loadingSpinner = document.getElementById("loading-spinner");
const allCards = document.getElementById("allcards");
const tabButtons = document.querySelectorAll(".tab-btn");
const search = document.getElementById("Search")

// Modal elements
const modal = document.getElementById("issue-modal");
const modalTitle = document.getElementById("modal-title");
const modalStatus = document.getElementById("modal-status");
const modalOpenAssignee = document.getElementById("modal-open-assignee");
const modalDate = document.getElementById("modal-date");
const modalLabelContainer = document.getElementById("modal-label-container");
const modalDescription = document.getElementById("modal-description");
const modalAssignee = document.getElementById("modal-assignee");
const modalPriority = document.getElementById("modal-priority");
const closeModalBtn = document.getElementById("close-modal");

let issues = [];

// Close modal
closeModalBtn.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", () => modal.classList.add("hidden"));
modal.querySelector(":scope > div").addEventListener("click", e => e.stopPropagation());

// Load issues from API
function loadIssues() {
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");

    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then(res => res.json())
        .then(data => {
            issues = data.data;
            renderIssues("all");
            loadingSpinner.classList.add("hidden");
        })
        .catch(err => {
            console.error("Error loading issues:", err);
            loadingSpinner.classList.add("hidden");
        });
}

// Render cards
function renderIssues(tab) {
    let filtered = issues;
    if (tab === "open") filtered = issues.filter(i => i.status === "open");
    else if (tab === "closed") filtered = issues.filter(i => i.status === "closed");

    document.getElementById("issue-count").innerText = filtered.length;
    allCards.innerHTML = "";

    filtered.forEach(issue => {
        const date = new Date(issue.updatedAt);
        // Labels with dynamic color
        const labelHTML = issue.labels.map(label => {
            let classes = "px-2 py-1 border rounded-2xl text-xl mr-1 "; 

            switch(label.toLowerCase()){
                case "bug":
                    classes += "text-red-500 bg-red-300 border-red-500";
                    break;
                case "help wanted":
                    classes += "text-orange-500 bg-orange-300 border-orange-500";
                    break;
                case "enhancement":
                    classes += "text-green-500 bg-green-300 border-green-500";
                    break;
                case "good first issue":
                    classes += "text-blue-500 bg-blue-300 border-blue-500";
                    break;
                case "documentation":
                    classes += "text-purple-500 bg-purple-300 border-purple-500";
                    break;
                default:
                    classes += "text-gray-500 border-gray-500";
            }

            return `<span class="${classes}">${label.toUpperCase()}</span>`;
        }).join("");

            
        const priorityHTML = `<span class="${issue.priority==='high'?'text-red-500':issue.priority==='medium'?'text-yellow-500':'text-gray-500'} font-semibold ">${issue.priority.toUpperCase()}</span>`;
        const statusHTML = issue.status==="open"?`<img src="./assets/Open-Status.png">`:`
        <img src="./assets/Closed- Status .png" alt="">`;
        const borderColor = issue.status==="open"?"border-green-600":"border-purple-600";

        const card = document.createElement("div");
        card.className = `card p-4 border-t-4 ${borderColor} cursor-pointer`;
        card.innerHTML = `
            <div class="card-priority flex justify-between">
                <p>${statusHTML}</p>
                <p>${priorityHTML}</p>
            </div>
            <div class="card-details">
                <h2 class="card-title font-bold text-xl">${issue.title}</h2>
                <p class="card-description text-gray-600 mt-2">${issue.description}</p>
            </div>
            <div class="flex mt-2 gap-2">${labelHTML}</div>
            <div class="card-author mt-2 text-gray-500">
                <p>${issue.author}</p>
                <p>${date.toLocaleDateString()}</p>
            </div>
        `;

        card.addEventListener("click", () => openModal(issue));
        allCards.appendChild(card);
    });
}

// Open modal
function openModal(issue) {
    modalTitle.innerText = issue.title;
    modalOpenAssignee.innerText = issue.assignee;
    modalAssignee.innerText = issue.assignee;
    modalDescription.innerText = issue.description;
    modalPriority.innerText = issue.priority;

    // add status in modal 
    modalStatus.innerText = issue.status.toUpperCase();
    modalStatus.className = "px-2 py-1 rounded font-semibold " + 
        (issue.status.toLowerCase() === "open" 
            ? "bg-green-500 text-white" 
            : "bg-purple-500 text-white");

    // add label in modal 
    modalLabelContainer.innerHTML = issue.labels.map(label => {
            let classes = "px-2 py-1 border rounded-2xl text-xl mr-1 "; 

            switch(label.toLowerCase()){
                case "bug":
                    classes += "text-red-500 bg-red-300 border-red-500";
                    break;
                case "help wanted":
                    classes += "text-orange-500 bg-orange-300 border-orange-500";
                    break;
                case "enhancement":
                    classes += "text-green-500 bg-green-300 border-green-500";
                    break;
                case "good first issue":
                    classes += "text-blue-500 bg-blue-300 border-blue-500";
                    break;
                case "documentation":
                    classes += "text-purple-500 bg-purple-300 border-purple-500";
                    break;
                default:
                    classes += "text-gray-500 border-gray-500";
            }

            return `<span class="${classes}">${label.toUpperCase()}</span>`;
        }).join("");

    // add priority in modal 
    modalPriority.innerHTML = `<span class="${issue.priority==='high'?'text-red-500':issue.priority==='medium'?'text-yellow-500':'text-gray-500'} font-semibold  ">${issue.priority.toUpperCase()}</span>`;

    const date = new Date(issue.updatedAt);
    modalDate.innerText = date.toLocaleDateString();

    modal.classList.remove("hidden");
    modal.classList.add("flex");
}

// Tabs
tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        tabButtons.forEach(b => {
            b.classList.remove("primary-btn");
            b.classList.add("bg-gray-200");
        });
        btn.classList.add("primary-btn");

        const tab = btn.getAttribute("data-tab");
        renderIssues(tab);
    });
});

loadIssues();




