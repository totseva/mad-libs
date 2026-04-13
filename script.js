//Prompts array 
const prompts = {
    en: [
        "What’s your character’s name?",
        "What are they like? (adjective)",
        "Type a word (noun)."
    ],
    ru: [
        "Как зовут твоего персонажа?",
        "Опиши его личность(прилагательное)",
        "Придумай слово (существительное)."
    ]
};

const uiBtn = {
    en: {
        next: "Next"
    },
    ru: {
        next: "Далее"
    }
};

//Add up answers
let language = "en";
let currentPrompt = 0;
const answers = [];

const prompt = document.querySelector('.prompt');
const nextBtn = document.querySelector('#nextBtn');
const langBtn = document.querySelector('#langBtn');

//Language toggle 
langBtn.addEventListener('click', () => {
    //If language is "en", then set it to "ru", otherwise set it to "en"
    language = (language === "en") ? "ru" : "en";

    langBtn.textContent = (language === "en") ? "🇷🇺 RU" : "🇬🇧 EN";
    nextBtn.textContent = uiBtn[language].next;

    currentPrompt = 0;
    answers.length = 0;
    nextBtn.style.display = 'inline-block';

    nextPrompt();
});

//MAIN FLOW
//Saving answers and going to next
const nextPrompt = () => {

    //Language control visibility
    if (currentPrompt === 0) {
        langBtn.style.display = 'inline-block';
    } else {
        langBtn.style.display = 'none';
    }

    //1. Save previous answer
    const oldInput = document.querySelector('input');

    //if (weAlreadyAskedAQuestion && inputExists) {
    //saveWhatUserTyped();
    //}
    if (currentPrompt !== 0 && oldInput) {
        answers.push(oldInput.value);
    }

    // 2. Move forward or finish
    if (currentPrompt < prompts[language].length) {

        prompt.innerHTML = `
                ${prompts[language][currentPrompt]} <br>
                <input type="text" />
               `;

        //Autofocus 
        const newInput = document.querySelector('input');
        newInput.focus();

        //Keyboard enter 
        newInput.onkeydown = (e) => {
            if (e.key === 'Enter') {
                nextPrompt();
            }
        };

        currentPrompt++;

    } else {
        showFinal();
    }
};

//FINAL RESULT
const showFinal = () => {

    if (language === "en") {
        prompt.innerHTML = `
            <div class="story">
        Once upon a time, in a slightly strange little world,<br>

        there lived <span class="fill">${answers[0]}</span>,
        who was known for a curious<br> and unusually <span class="fill">${answers[1]}</span> nature.<br><br>

        One day, they met something — or someone —<br> described only as <span class="fill">${answers[2]}</span>.<br><br>

        And from that moment on, nothing in the story<br> was quite normal again...
    </div>
    `;
    } else {
        prompt.innerHTML = `
            <div class="story">
        Жил-был в одном слегка странном мире<br> человек по имени <span class="fill">${answers[0]}</span>,
        личность весьма <span class="fill">${answers[1]}</span>,<br>
        известная своей любознательностью.<br><br>

        Однажды этому персонажу встретилось нечто<br> загадочное,
        что можно было описать лишь словом — <span class="fill">${answers[2]}</span>.<br><br>

        И с этого момента мир уже никогда не был прежним...
    </div>
    `;
    }

    nextBtn.style.display = 'none';

    //Reset button
    const resetButton = document.createElement('button');
    resetButton.textContent = language === "en" ? "Start Over" : "Начать заново";

    resetButton.id = "resetBtn";

    document.body.appendChild(resetButton);
    resetButton.addEventListener('click', restart);
};

// RESTART
const restart = () => {
    answers.length = 0;
    currentPrompt = 0;

    nextBtn.style.display = 'inline-block'; //show Next button again
    document.querySelector('#resetBtn').remove(); //remove restart button

    nextPrompt(); //restart flow
};

//Start
nextBtn.addEventListener('click', nextPrompt);
nextPrompt(); //so that I have it on the screen from the start