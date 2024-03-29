const STUDENT_DATA_GROUP = [
    {
        id: Math.floor(Math.random() * 10000),
      name: 'Tomas',
      surname: 'Tomauskas',
      age: 20,
      phone: '+37061111111',
      email: 'tomas@email.lt',
      itKnowledge: 5,
      group: `TYPE 2`,
      interests: [
        'TypeScript',
        'Node',
        'React Native'
      ]
    },
    {
        id: Math.floor(Math.random() * 10000),
      name: 'Tadas',
      surname: 'Tadauskas',
      age: 35,
      phone: '+3762222222',
      email: 'tadas@email.lt',
      itKnowledge: 5,
      group: `TYPE 2`,
      interests: [
        'JavaScript',
        'TypeScript',
        'Node',
        'React Native'
      ]
    },
    {  
        id: Math.floor(Math.random() * 10000),
      name: 'Edita',
      surname: 'Ediauskienė',
      age: 32,
      phone: '+37063333333',
      email: 'vardas3@imone.lt',
      itKnowledge: 5,
      group: `TYPE 3`,
      interests: [
        'JavaScript',
        'TypeScript',
        'Node',
      ]
    },
    {
        id: Math.floor(Math.random() * 10000),
      name: 'Jonas',
      surname: 'Jonauskas',
      age: 25,
      phone: '+37064444444',
      email: 'jonas@email.lt',
      itKnowledge: 5,
      group: `TYPE 1`,
      interests: [
        'JavaScript',
        'TypeScript',
        'React Native',
      ]
    },
    {
        id: Math.floor(Math.random() * 10000),
      name: 'Dana',
      surname: 'Danauskaitė',
      age: 18,
      phone: '+37065555555',
      email: 'dana@email.lt',
      itKnowledge: 5,
      group: `TYPE 3`,
      interests: [
        'JavaScript',
        'TypeScript',
        'Node',
        'React Native',
        `C++`
      ]
    },
  ];
// Duomenu paemimas is local storage
let studentsLocalStorage = JSON.parse(localStorage.getItem(`initialStudentsData`));
// Pirminio saraso kintamasis
let INITIAL_STUDENT_DATA = studentsLocalStorage ? studentsLocalStorage : localStorage.setItem(`initialStudentsData`, JSON.stringify(STUDENT_DATA_GROUP));

let studentForm = document.querySelector('#student-form');
// Kintamasis redaguojamo studento nustatytmui

// Studento kurimas
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
        id: Math.floor(Math.random() * 10000),
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
        alertMessage(`Studento (${studentFormData.name} ${studentFormData.surname}) duomenys pakoreguoti`);
        let studentItemIdLS = document.querySelector(`.edit`).attributes.getNamedItem(`data-user-id`).value;
        studentFormData.id = parseInt(studentItemIdLS);
        let itemsInLocalSorage = JSON.parse(localStorage.getItem(`initialStudentsData`));
        let filtered = itemsInLocalSorage.filter(item => item.id !== Number(studentItemIdLS));
        filtered.push(studentFormData)
        localStorage.setItem(`initialStudentsData`, JSON.stringify(filtered))
    } else {
        alertMessage(`Sukurtas naujas studentas: (${studentFormData.name} ${studentFormData.surname})`);
    }
    renderStudent(studentFormData);
    let studentsDataArray = [studentFormData, ...INITIAL_STUDENT_DATA];
    localStorage.setItem(`initialStudentsData`, JSON.stringify(studentsDataArray));
    INITIAL_STUDENT_DATA = JSON.parse(localStorage.getItem(`initialStudentsData`))

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
    let personID = studentData.id;
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
    studentItem.classList.add('student-item', `form-control`, `mw-50`, `mb-3`);
    studentItem.dataset.userId = personID;

    let studentIdEl = document.createElement(`p`);
    studentIdEl.innerHTML = `<h6>ID: </h6><span class="student-id">${personID}</span>`;
    let studentNameEl = document.createElement('p');
    studentNameEl.innerHTML = `<h6>Vardas: </h6><span class="student-name">${personName}</span>`;
    let studentSurnameEl = document.createElement('p');
    studentSurnameEl.innerHTML = `<h6>Pavardė: </h6><span class="student-surname">${personSurname}</span>`;
    let studentAgeEl = document.createElement('p');
    studentAgeEl.innerHTML = `<h6>Amžius: </h6><span class="student-age">${personAge}</span>`;
    let studentPhoneEl = document.createElement('p');
    studentPhoneEl.innerHTML = `<h6>Telefono numeris: </h6><span class="hidden-area">****</span>`;
    let studentEmailEl = document.createElement('p');
    studentEmailEl.innerHTML = `<h6>El. pašto adresas: </h6><span class="hidden-area">****</span>`;
    let studentItKnowledgeEl = document.createElement('p');
    studentItKnowledgeEl.innerHTML = `<h6>IT žinios: </h6><span class="student-it-knowledge">${personItKnowledge}</span>`;
    let studentGroupEl = document.createElement('p');
    studentGroupEl.innerHTML = `<h6>Grupė: </h6><span class="student-group">${personGroup}</span>`;
    let interestWrapperEl = document.createElement('div');
    let interestTitleEl = document.createElement('h6');
    interestTitleEl.textContent = 'Dominančios kalbos:';
    let studentInterestsEl = document.createElement('ul');
    studentInterestsEl.classList.add(`interests-list`)
    interests.forEach((interest) => {
        let interestItem = document.createElement('li');
        interestItem.textContent = interest;
        studentInterestsEl.append(interestItem);
    });
    interestWrapperEl.append(interestTitleEl, studentInterestsEl);

    let privateInfoButton = document.createElement('button');
    privateInfoButton.classList.add(`btn`, `btn-outline-secondary`, `btn-sm`, `mt-1`, `mr-1`, `col-6`)
    privateInfoButton.textContent = 'Rodyti duomenis';

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
    deleteStudentButton.classList.add(`btn`, `btn-outline-secondary`, `mt-1`, `btn-sm`, `mr-1`)
    deleteStudentButton.textContent = 'Ištrinti studentą';

    deleteStudentButton.addEventListener('click', () => {
        studentItem.remove();
        let studentItemIdLS = studentItem.querySelector(`.student-id`).textContent;
        let studentItemInLS = JSON.parse(localStorage.getItem(`initialStudentsData`));
        let filtered = studentItemInLS.filter(item => item.id !== Number(studentItemIdLS))
        localStorage.setItem(`initialStudentsData`, JSON.stringify(filtered))

        alertMessage(`Studentas (${personName} ${personSurname}) sėkmingai ištrintas.`);
    });

    let editStudentButton = document.createElement(`button`);
    editStudentButton.classList.add(`btn`, `btn-outline-secondary`, `btn-sm`, `mt-1`, `col-6`)
    editStudentButton.textContent = `Redaguoti duomenis`;

    editStudentButton.addEventListener(`click`, (element) => {
        studentForm.querySelector(`#student-name`).value = personName;
        studentForm.querySelector(`#student-surname`).value = personSurname;
        studentForm.querySelector(`#student-age`).value = personAge;
        studentForm.querySelector(`#student-email`).value = personEmail;
        studentForm.querySelector(`#student-phone`).value = personPhone;    
        studentForm.elements.group.value = personGroup;
        studentForm.querySelector(`#student-it-knowledge`).value = personItKnowledge;
        interests.map(singleInterest => {
            studentForm.elements.interest.forEach(formInterest => {
            if (singleInterest === formInterest.value) {
                formInterest.checked = true;
                }
            })
        })

        studentForm.querySelector(`[type=submit]`).value = `Išsaugoti pakeitimus`
        element.target.parentElement.classList.add(`edit`)
        editStudent = element.target.parentElement;
    })

    studentItem.append(studentIdEl, studentNameEl, studentSurnameEl, studentAgeEl, studentPhoneEl, studentEmailEl, studentItKnowledgeEl, studentGroupEl, interestWrapperEl, privateInfoButton, deleteStudentButton, editStudentButton);


    if (editStudent) {
        editStudent.replaceWith(studentItem);
        editStudent = null;
        studentForm.querySelector(`[type=submit]`).value = `Pateikti`;
    } else {
        studentsList.prepend(studentItem);
    }


}


function formErrorHandler(form) {
    let inputErrorMessages = form.querySelectorAll('.invalid-feedback');
    inputErrorMessages.forEach(message => message.remove());
    form.querySelectorAll('input.is-invalid').forEach(input => input.classList.remove('is-invalid'));
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
    inputElement.classList.add(`is-invalid`);
    alertMessage('Ne visi laukeliai yra užpildyti.', 'error-alert');
    let inputError = document.createElement('div');
    inputError.textContent = errorMessage;
    inputError.classList.add('invalid-feedback');
    inputElement.before(inputError);
}


renderInitialStudentData(JSON.parse(localStorage.getItem(`initialStudentsData`)));
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

