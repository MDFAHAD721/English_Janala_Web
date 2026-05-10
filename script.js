const createElement = (syn) =>{
    const create = syn.map((syno)=> `<span class="btn btn-soft btn-primary">${syno}</span>`);

    return(create.join(" "));
}


const showLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => {
        
        displayLesson(json.data)

    });
}

const removeClass = () => {
    const removes = document.querySelectorAll(".lesson-btn");
    for(const remove of removes ){
        remove.classList.remove("active");
    }
}

const displayWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url).
    then((res)=>res.json()).
    then((json)=> {

        removeClass();
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active");
        displayCard(json.data);
        
    });
}

const loadWordDetail = (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`

    fetch(url).then((res)=>res.json()).then(json=>showWordDetail(json.data));
}

const showWordDetail = (details) => {
    // console.log(details);
    
    const detailsBox = document.getElementById("details-container");

    detailsBox.innerHTML = `

  <div class="space-y-5 rounded-3xl border border-[#C6BDBD] p-4 ">
        <h2 class="text-2xl font-semibold">${details.word} (<i class="fa-solid fa-microphone-lines"></i>:${details.pronunciation})</h2>
    <div class="space-y-2">
        <h1 class="text-xl font-semibold">Meaning</h1>
        <span class="hind-siliguri-font text-xl ">${details.meaning ? details.meaning : "অর্থ পাওয়া যায় নি"}</span>
    </div>

    <div class="space-y-2">
        <h1 class="text-xl font-semibold">Example</h1>
        <p class="text-xl">${details.sentence}</p>
    </div>

    <div class="space-y-2">
        <h2 class="hind-siliguri-font text-xl font-semibold">সমার্থক শব্দ গুলো</h2>
        <div class="flex flex-wrap gap-2">
              ${details.synonyms ? createElement(details.synonyms) : "সমার্থক শব্দ পাওয়া যায় নি"}
        </div>
    </div>
  </div>
    ` 
    document.getElementById("my_modal_5").showModal()
}

const displayCard = (words) => {
    const wordContainer = document.getElementById("word-container");

    wordContainer.innerHTML = "";

    if(words.length == 0){
        wordContainer.innerHTML = `
    <div class="col-span-4 row-span-4 mx-auto text-center space-y-3">
        <img class="mx-auto" src="assets/alert-error.png" alt="">
        <h3 class="text-xl font-light hind-siliguri-font">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h3>
        <h2 class="hind-siliguri-font text-4xl font-semibold">নেক্সট Lesson এ যান</h2>
    </div>
        `;
        return;
    }
    
    for(let word of words) {
        const allCards = document.createElement("div");
        allCards.innerHTML = `
        <div class="bg-white text-center py-5 h-full shadow-xl rounded-3xl">
            <div class="text-xl font-semibold space-y-3">
            <h1>${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</h1>
            <h3>Meaning/Pronounciation</h3>
            <h2>"${word.meaning ? word.meaning :"অর্থ পাওয়া যায় নি"}/${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায় নি"}"</h2>
            </div>
            <div class="flex justify-between mt-6 mx-8">
            <div onclick="loadWordDetail(${word.id})" class="bg-gray-100 card-btn px-2 py-1.5 rounded-lg">
                <i class="fa-solid fa-info"></i>
            </div>
            <div class="bg-gray-100 card-btn px-2 py-1.5 rounded-lg flex items-center">
                <i class="fa-solid fa-volume-high"></i>
            </div>
            </div>
        </div>
        `
        wordContainer.appendChild(allCards);
    }
}

const displayLesson = (lessons) => {
    // console.log(lessons);
    const levelContainer = document.getElementById("level-container");

    levelContainer.innerHTML = "";

    for(let lesson of lessons){
        const lessonDiv = document.createElement("div");

        lessonDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="displayWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>           
        `
        levelContainer.appendChild(lessonDiv);
    }
}

showLesson();

// VOCABULARY SEARCH SECTION
document.getElementById("search-btn").addEventListener("click",()=>{
    removeClass();
    const input = document.getElementById("input-btn");
    const inputValue = input.value.trim().toLowerCase();
    console.log(inputValue);

    const url = "https://openapi.programming-hero.com/api/words/all"

    fetch(url)
    .then((res)=> res.json())
    .then((json)=> {
        const allWords  = (json.data);

        const filterWords = allWords.filter(words => words.word.
            toLowerCase().includes(inputValue)
        );

        displayCard(filterWords);
    });
})