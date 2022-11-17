import throttle from "lodash.throttle";

const refs = {
    form: document.querySelector(".feedback-form"),
}
const STORAGE_KEY = "feedback-form-state";
let formData = {};

checkStorage();

function onFormInput(e) { 
    formData[e.target.name] = e.target.value;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }
    catch (error) { 
        console.log(error.name); 
        console.log(error.message); 
    }

    
};

function checkStorage() { 
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
        try {
            formData = JSON.parse(savedData);
             for (let elem in formData) { 
                refs.form.elements[elem].value = formData[elem];
            };
        }
        catch (error) { 
        } 
    };

};

function onFormSubmit(e) { 
    e.preventDefault();
    
    const { email, message } = e.currentTarget;
    const formInput = { email: email.value, message: message.value };

    console.log(formInput);

    e.currentTarget.reset(); //очищам поля формы после сабмита
    localStorage.removeItem(STORAGE_KEY);
};

refs.form.addEventListener("input", throttle(onFormInput));
refs.form.addEventListener("submit", onFormSubmit);

