const loadingSpinner = document.getElementById("loading-spinner")
const allCards = document.getElementById('allcards');




function loadIssues(){
    
    // showing spinner 
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");
    

    const url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

    fetch(url)
        .then(res=> res.json())
        .then(data=>{
            displayAllIssues(data)
            const issues = data.data;
            const count = issues.length;

            // loading spinner remove 
            loadingSpinner.classList.add("hidden");

            
            // issue count 
            document.getElementById("issue-count").innerText = count;
        } 

        
)};

// display all issues
function displayAllIssues(issues){
        


    

    issues.data.forEach(issue => {
        // updateing date 
        const date = new Date(issue.updatedAt);

        // status logic 
        let labelHTML = ''; 
        issue.labels.forEach(label =>{

            if (label === "bug") {
                labelHTML += `<span id="status" class="inline-block   text-red-500 border-2 px-6 py-1 rounded-2xl  text-center">BUG</span>`
            }
            if (label === "help wanted") {
                labelHTML += `
                            <span id="status" class="inline   text-orange-500 border-2 px-6 py-1 rounded-2xl  text-center">HELP WANTED</span>`
            }
            if (label === "enhancement") {
                labelHTML += `<span id="status" class="inline-block   text-green-500 border-2 px-6 py-1 rounded-2xl  text-center">ENHANCEMENT</span>`
                
            }
            if (label === "good first issue") {
                
                labelHTML += `
                            <span id="status" class="  text-green-500 border-2 px-6 py-1 rounded-2xl  ">GOOD FIRST ISSUE</span>`

            }
            if (label === "documentation") {
                
                labelHTML += `
                            <span id="status" class="  text-green-500 border-2 px-6 py-1 rounded-2xl  ">DOCUMENTATION</span>`

            }


        })

        // priority logic 
        let priorityHTML = '';

        if(issue.priority === "high"){
            priorityHTML = `<span class = "text-red-500 font-semibold">HIGH</span>`
        }else if (issue.priority === "medium") {
            priorityHTML = `<span class = "text-yellow-500 font-semibold">MEDIUM</span>`
        }else if (issue.priority === "low") {
            priorityHTML = `<span class = "text-gray-500 font-semibold">LOW</span>`
        }

        // open close status
        let statusHTML = ''
        if(issue.status === "open"){
            statusHTML = `
                <img src="./assets/Open-Status.png" alt="">

            `
        } else if(issue.status === "closed"){
            statusHTML = `
             <img src="./assets/Closed- Status .png" alt="">
                
            `
            
        }

        // border color 
        const borderColor = issue.status === "open"
         ? "border-green-600"
         : "border-purple-600";



        const card = document.createElement('div');
        card.innerHTML =`

            <div class="card p-4 border-t-4 ${borderColor} ">
                    <div class="card-content ">
                        <div class="card-priority flex justify-between">
                            <p> ${statusHTML}</p>
                            <p> ${priorityHTML}</p>
                        </div>
                        <div class="card-details">
                            <h2 class="card-title font-bold text-xl text-[#1F2937]">${issue.title}</h2>
                            <p class="card-description text-[#64748B] text-sm mt-2">${issue.description}</p>
                            
                        </div>
                        <div class="flex mt-4 gap-2 min-h-6">
                            ${labelHTML}
                        </div>

                    </div>

                    <div class="card-author p-4">
                        <p class="autor text-[#64748B]">${issue.author}</p>
                        <p class="date text-[#64748B]">${date.toLocaleDateString()}</p>
                        
                    </div>
                </div>
        
        `


        allCards.appendChild(card)

    });


}






loadIssues()
