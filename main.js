
let studentsLocalStorage = JSON.parse(localStorage.getItem(`initialStudentsData`));
let INITIAL_STUDENT_DATA = studentsLocalStorage ? studentsLocalStorage : [];

// const INITIAL_STUDENT_DATA = [
//     {
//       name: 'Vardas 1',
//       surname: 'Pavarde 1',
//       age: 20,
//       phone: '+370654654654',
//       email: 'vardas1@imone.lt',
//       itKnowledge: 5,
//       group: `TYPE 2`,
//       interests: [
//         'TypeScript',
//         'Node',
//         'React Native'
//       ]
//     },
//     {
//       name: 'Vardas 2',
//       surname: 'Pavarde 2',
//       age: 35,
//       phone: '+37000000000',
//       email: 'vardas2@imone.lt',
//       itKnowledge: 5,
//       group: `TYPE 2`,
//       interests: [
//         'JavaScript',
//         'TypeScript',
//         'Node',
//         'React Native'
//       ]
//     },
//     {
//       name: 'Vardas 3',
//       surname: 'Pavarde 3',
//       age: 32,
//       phone: '+37000000000',
//       email: 'vardas3@imone.lt',
//       itKnowledge: 5,
//       group: `TYPE 3`,
//       interests: [
//         'JavaScript',
//         'TypeScript',
//         'Node',
//       ]
//     },
//     {
//       name: 'Vardas 4',
//       surname: 'Pavarde 4',
//       age: 25,
//       phone: '+37000000000',
//       email: 'vardas4@imone.lt',
//       itKnowledge: 5,
//       group: `TYPE 1`,
//       interests: [
//         'JavaScript',
//         'TypeScript',
//         'React Native',
//       ]
//     },
//     {
//       name: 'Vardas 5',
//       surname: 'Pavarde 5',
//       age: 18,
//       phone: '+37000000000',
//       email: 'vardas5@imone.lt',
//       itKnowledge: 5,
//       group: `TYPE 3`,
//       interests: [
//         'JavaScript',
//         'TypeScript',
//         'Node',
//         'React Native',
//         `C++`
//       ]
//     },
//   ];
let studentForm = document.querySelector('#student-form');

let editStudent = null;

studentForm.addEventListener('submit', (event) => {
event.preventDefault();
let validForm = formErrorHandler(studentForm);
if (!validForm) {
    return;
}
let formInterests = document.querySelectorAll('input[name=interest]:checked');
let interestValues = [...formInterests].map(element => {
    return element.value;
});
let studentFormData = {
    name: document.querySelector('input[name=name]').value,
    surname: document.querySelector('#student-surname').value,
    age: event.target.elements.age.value,
    phone: studentForm.querySelector('#student-phone').value,
    email: document.querySelector('#student-email').value,
    itKnowledge: event.target.elements['it-knowledge'].value,
    group: event.target.elements.group.value,
    interests: interestValues,
};



if (editStudent) {
    alertMessage(`Student edited (${studentFormData.name} ${studentFormData.surname})`);
} else {
    alertMessage(`Student created (${studentFormData.name} ${studentFormData.surname})`);
}
renderStudent(studentFormData);

let studentsDataArray = [studentFormData, ...INITIAL_STUDENT_DATA];
localStorage.setItem(`initialStudentsData`, JSON.stringify(studentsDataArray));

studentForm.reset();
itKnowledgeOutputReset();
});
function itKnowledgeOutputReset() {
let itKnowledgeElement = document.querySelector('#student-it-knowledge');
let itKnowledgeOutput = document.querySelector('#it-knowledge-output');

itKnowledgeOutput.textContent = itKnowledgeElement.value;

itKnowledgeElement.addEventListener('input', () => {
    itKnowledgeOutput.textContent = itKnowledgeElement.value;
});
}
function alertMessage(text, elementClass = '') {
let alertElement = document.querySelector('#alert');
alertElement.textContent = text;
if (elementClass) {
    alertElement.classList.add(elementClass);
}
setTimeout(() => {
    alertElement.textContent = '';
    if (elementClass) {
    alertElement.classList.remove(elementClass);
    }
}, 5000);
}
function renderInitialStudentData(students) {
    if (!students) {
        return;
    }
    students.map((student) => {
    renderStudent(student);
    });
}
function renderStudent(studentData) {

let personName = studentData.name;
let personSurname = studentData.surname;
let personAge = studentData.age;
let personPhone = studentData.phone;
let personEmail = studentData.email;
let personItKnowledge = studentData.itKnowledge;
let personGroup = studentData.group;
let interests = studentData.interests;
let studentsList = document.querySelector('#students-list');
let studentItem = document.createElement('div');
studentItem.classList.add('student-item');
let studentNameEl = document.createElement('p');
studentNameEl.innerHTML = `<h4>Name: </h4><span class="student-name">${personName}</span>`;
let studentSurnameEl = document.createElement('p');
studentSurnameEl.innerHTML = `<h4>Surname: </h4><span class="student-surname">${personSurname}</span>`;

let studentAgeEl = document.createElement('p');
studentAgeEl.innerHTML = `<h4>Age: </h4><span class="student-age">${personAge}</span>`;

let studentPhoneEl = document.createElement('p');
studentPhoneEl.innerHTML = `<h4>Phone: </h4><span class="hidden-area">****</span>`;

let studentEmailEl = document.createElement('p');
studentEmailEl.innerHTML = `<h4>Email: </h4><span class="hidden-area">****</span>`;

let studentItKnowledgeEl = document.createElement('p');
studentItKnowledgeEl.innerHTML = `<h4>IT Knowledge: </h4><span class="student-it-knowledge">${personItKnowledge}</span>`;

let studentGroupEl = document.createElement('p');
studentGroupEl.innerHTML = `<h4>Group: </h4><span class="student-group">${personGroup}</span>`;
let interestWrapperEl = document.createElement('div');
let interestTitleEl = document.createElement('h4');
interestTitleEl.textContent = 'Interests:';
let studentInterestsEl = document.createElement('ul');
studentInterestsEl.classList.add(`interests-list`)
interests.forEach((interest) => {
    let interestItem = document.createElement('li');
    interestItem.textContent = interest;
    studentInterestsEl.append(interestItem);
});
interestWrapperEl.append(interestTitleEl, studentInterestsEl);
let privateInfoButton = document.createElement('button');
privateInfoButton.textContent = 'Rodyti asmens duomenis';
privateInfoButton.addEventListener('click', () => {
    if (privateInfoButton.classList.contains('hide')) {
    studentPhoneEl.querySelector('.hidden-area').textContent = '****';
    studentEmailEl.querySelector('.hidden-area').textContent = '****';
    privateInfoButton.textContent = 'Rodyti asmens duomenis';
    } else {
    studentPhoneEl.querySelector('.hidden-area').textContent = personPhone;
    studentEmailEl.querySelector('.hidden-area').textContent = personEmail;
    privateInfoButton.textContent = 'Slėpti asmens duomenis';
    }
    privateInfoButton.classList.toggle('hide');
});
let deleteStudentButton = document.createElement('button');
deleteStudentButton.textContent = 'Ištrinti studentą';
deleteStudentButton.addEventListener('click', () => {
    studentItem.remove();
    alertMessage(`Studentas (${personName} ${personSurname}) sėkmingai ištrintas.`);
});

let editStudentButton = document.createElement(`button`);

editStudentButton.textContent = `redaguoti`
editStudentButton.addEventListener(`click`, () => {
    studentForm.querySelector(`#student-name`).value = personName;
    studentForm.querySelector(`#student-surname`).value = personSurname;
    studentForm.querySelector(`#student-age`).value = personAge;
    studentForm.querySelector(`#student-email`).value = personEmail;
    studentForm.querySelector(`#student-phone`).value = personPhone;    
    studentForm.elements.group.value = personGroup;
    studentForm.querySelector(`#student-it-knowledge`).value = personItKnowledge;
    interests.map(singleInterest => {
        console.log(singleInterest)
        console.log(studentForm.elements.interest)
        studentForm.elements.interest.forEach(formInterest => {
          if (singleInterest === formInterest.value) {
            formInterest.checked = true;
          }
        })
      })

    studentForm.querySelector(`[type=submit]`).value = `Save changes`;

    editStudent = studentItem;
})


studentItem.append(studentNameEl, studentSurnameEl, studentAgeEl, studentPhoneEl, studentEmailEl, studentItKnowledgeEl, studentGroupEl, interestWrapperEl, privateInfoButton, deleteStudentButton, editStudentButton);


if (editStudent) {
editStudent.replaceWith(studentItem);
editStudent = null;
studentForm.querySelector(`[type=submit]`).value = `Submit`;
} else {
    studentsList.prepend(studentItem);
}


}
function formErrorHandler(form) {
let inputErrorMessages = form.querySelectorAll('.input-error-message');
inputErrorMessages.forEach(message => message.remove());
form.querySelectorAll('input.input-error').forEach(input => input.classList.remove('input-error'));
let requiredInputs = form.querySelectorAll('input.required');
let formValid = true;
requiredInputs.forEach(input => {
    if (!input.value) {
    formValid = false;
    inputErrorMessage(input, 'Šis laukelis yra privalomas');
    } else {
    if (input.name === 'name') {
        if (input.value.length < 3) {
        inputErrorMessage(input, 'Vardas yra per trumpas. Jis turėtų būti bent 3 simbolių ilgio.');
        formValid = false;
        }
    }
    if (input.name === 'surname') {
        if (input.value.length < 3) {
        inputErrorMessage(input, 'Pavardė yra per trumpa. Ji turėtų būti bent 3 simbolių ilgio.');
        formValid = false;
        }
    }
    if (input.name === 'age') {
        if (input.value < 0) {
        inputErrorMessage(input, 'Amžius privalo būti teigiamas skaičius.');
        formValid = false;
        }
        
        if (input.value > 120) {
        inputErrorMessage(input, 'Įvestas amžius yra per didelis. Maksimalus amžius yra 120 metų.');
        formValid = false;
        } 
    }
    if (input.name === 'phone') {
        if (input.value.length < 9 || input.value.length > 12) {
        inputErrorMessage(input, 'Įvestas telefono numeris yra neteisingas');
        formValid = false;
        }
    }
    if (input.name === 'email') {
        if (!input.value.includes('@')) {
        inputErrorMessage(input, 'Įvestas elektroninis paštas yra neteisingas');
        formValid = false;
        }
    }
    }
})
return formValid;
}
function inputErrorMessage(inputElement, errorMessage) { 
inputElement.classList.add('input-error');
alertMessage('Ne visi laukeliai yra užpildyti.', 'error-alert');
let inputError = document.createElement('span');
inputError.textContent = errorMessage;
inputError.classList.add('input-error-message');
inputElement.before(inputError);
}
renderInitialStudentData(INITIAL_STUDENT_DATA);
itKnowledgeOutputReset();
  
let searchForm = document.querySelector(`#search`);

searchForm.addEventListener(`submit`, event => {
event.preventDefault();
let searchInput = searchForm.querySelector(`input[type=text]`).value;
let studentsList = document.querySelectorAll(`.student-item`);
studentsList.forEach(element => {
    let studentName = element.querySelector(`.student-name`).textContent.toLocaleLowerCase();
    let studentSurname = element.querySelector(`.student-surname`).textContent.toLowerCase();
    let studentAge = element.querySelector(`.student-age`).textContent.toLowerCase();
    let studentGroup = element.querySelector(`.student-group`).textContent.toLowerCase();
    let studentItKnowledge = element.querySelector(`.student-it-knowledge`).textContent.toLowerCase();
    let studentInterests = element.querySelectorAll(`.interests-list li`);

    if (studentName.includes(searchInput.toLowerCase()) && searchForm.querySelector(`option[value=name]`)) {
    element.style.display = `block`;
    } else if (studentSurname.includes(searchInput.toLowerCase()) && searchForm.querySelector(`#search-option`).value===`surname`) {
    element.style.display = `block`;
    } else if (studentAge.includes(searchInput.toLowerCase()) && searchForm.querySelector(`#search-option`).value===`age`) {
    element.style.display = `block`;
    } else if (studentGroup.includes(searchInput.toLowerCase()) && searchForm.querySelector(`#search-option`).value===`group`) {
    element.style.display = `block`;
    } else if (studentItKnowledge.includes(searchInput.toLowerCase()) && searchForm.querySelector(`#search-option`).value===`it-knowledge`) {
    element.style.display = `block`;
    } else if (searchForm.querySelector(`#search-option`).value===`interests`) {
    studentInterests.forEach(e=>{
        if (e.textContent.toLowerCase().includes(searchInput.toLowerCase())) {
        console.log(element)
            element.style.display = `block`;
        } else {
        element.style.display = `none`;
        }
    });
    } else {
    element.style.display = `none`;
    }
})
    
  })
studentForm.addEventListener(`change`, () => {
    let studentFormData = {
        name: document.querySelector('#student-name').value,
        surname: document.querySelector('#student-surname').value,
        age: document.querySelector(`#student-age`).value,
        phone: studentForm.querySelector('#student-phone').value,
        email: document.querySelector('#student-email').value,
        itKnowledge: document.querySelector('#student-it-knowledge').value,
        group: studentForm.elements.group.value,
        interests: [...document.querySelectorAll('input[name=interest]:checked')].map(element=>{return element.id}),
    }
    let studentFormLS = JSON.stringify(studentFormData);
    localStorage.setItem(`student`, studentFormLS)
})
  
let studentLS = JSON.parse(localStorage.getItem(`student`))
console.log(studentLS)
document.querySelector(`#student-name`).value = studentLS.name;
document.querySelector(`#student-surname`).value = studentLS.surname;
document.querySelector(`#student-age`).value = studentLS.age;
document.querySelector(`#student-phone`).value = studentLS.phone;
document.querySelector(`#student-email`).value = studentLS.email;
document.querySelector(`#student-it-knowledge`).value = studentLS.itKnowledge;
studentForm.elements.group.value = studentLS.group;
studentLS.interests.forEach(element => {
document.querySelector(`input[id=${element}]`).checked = true;
})
// Studento kūrimo ir redagavimo metu reikia sukurti visų studentų masyvą (tokiu pačiu formatu kaip ir INITIAL_STUDENT_DATA).
// let studentsData = document.querySelectorAll(`.student-item`);
// studentsData.forEach(element => {
//     console.log(element)
//     let student = {
//         name: element.querySelector(`span.student-name`).textContent,
//         surname: element.querySelector(`span.student-surname`).textContent,
//         age: element.querySelector(`span.student-age`).textContent,
//         phone: element.target.phone.value, // kaip gauti reiksme
//         email: element.querySelector(`span.student-email`).textContent,
//         group: element.querySelector(`span.student-group`).textContent,
//     };
//     console.log(student)
// })
// 2. Šį masyvą pridėti į localStorage.
// 3. Puslapio perkrovimo metu iš localStorage esančio masyvo sukurti studentų sąrašą (pradinių studentų sukūrimo funkcionalumas).