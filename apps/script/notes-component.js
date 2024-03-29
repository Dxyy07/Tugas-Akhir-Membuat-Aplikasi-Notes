const notesData = [{
    id: 'notes-jT-jjsyz61J8XKiI',
    title: 'Welcome to Notes, Dimas!',
    body: 'Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.',
    createdAt: '2022-07-28T10:03:12.594Z',
    archived: false,
},
{
    id: 'notes-aB-cdefg12345',
    title: 'Meeting Agenda',
    body: 'Discuss project updates and assign tasks for the upcoming week.',
    createdAt: '2022-08-05T15:30:00.000Z',
    archived: false,
},
{
    id: 'notes-XyZ-789012345',
    title: 'Shopping List',
    body: 'Milk, eggs, bread, fruits, and vegetables.',
    createdAt: '2022-08-10T08:45:23.120Z',
    archived: false,
},
{
    id: 'notes-1a-2b3c4d5e6f',
    title: 'Personal Goals',
    body: 'Read two books per month, exercise three times a week, learn a new language.',
    createdAt: '2022-08-15T18:12:55.789Z',
    archived: false,
},
{
    id: 'notes-LMN-456789',
    title: 'Recipe: Spaghetti Bolognese',
    body: 'Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...',
    createdAt: '2022-08-20T12:30:40.200Z',
    archived: false,
},
{
    id: 'notes-QwErTyUiOp',
    title: 'Workout Routine',
    body: 'Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.',
    createdAt: '2022-08-25T09:15:17.890Z',
    archived: false,
},
{
    id: 'notes-abcdef-987654',
    title: 'Book Recommendations',
    body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
    createdAt: '2022-09-01T14:20:05.321Z',
    archived: false,
},
{
    id: 'notes-zyxwv-54321',
    title: 'Daily Reflections',
    body: 'Write down three positive things that happened today and one thing to improve tomorrow.',
    createdAt: '2022-09-07T20:40:30.150Z',
    archived: false,
},
{
    id: 'notes-poiuyt-987654',
    title: 'Travel Bucket List',
    body: '1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA',
    createdAt: '2022-09-15T11:55:44.678Z',
    archived: false,
},
{
    id: 'notes-asdfgh-123456',
    title: 'Coding Projects',
    body: '1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project',
    createdAt: '2022-09-20T17:10:12.987Z',
    archived: false,
},
{
    id: 'notes-5678-abcd-efgh',
    title: 'Project Deadline',
    body: 'Complete project tasks by the deadline on October 1st.',
    createdAt: '2022-09-28T14:00:00.000Z',
    archived: false,
},
{
    id: 'notes-9876-wxyz-1234',
    title: 'Health Checkup',
    body: 'Schedule a routine health checkup with the doctor.',
    createdAt: '2022-10-05T09:30:45.600Z',
    archived: false,
},
{
    id: 'notes-qwerty-8765-4321',
    title: 'Financial Goals',
    body: '1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.',
    createdAt: '2022-10-12T12:15:30.890Z',
    archived: false,
},
{
    id: 'notes-98765-54321-12345',
    title: 'Holiday Plans',
    body: 'Research and plan for the upcoming holiday destination.',
    createdAt: '2022-10-20T16:45:00.000Z',
    archived: false,
},
{
    id: 'notes-1234-abcd-5678',
    title: 'Language Learning',
    body: 'Practice Spanish vocabulary for 30 minutes every day.',
    createdAt: '2022-10-28T08:00:20.120Z',
    archived: false,
},
];

class NotesComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });

        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .notes-container {
                    display: grid;
                    grid-gap: 20px;
                    padding: 20px;
                    grid-template-columns: repeat(4, minmax(250px, 1fr));
                }
                .note-card {
                    border: 2px solid;
                    border-radius: 8px;
                    padding: 10px;
                    background-color: #141414;
                    min-height: 180px;
                    display: grid;
                }
                .note-title {
                    font-family: 'Rubik';
                    font-size: 24px;
                    text-align: center;
                    font-weight: bold;
                    margin-bottom: 15px;
                    color: #D3D3D3;
                }
                .note-body {
                    font-size: 18px;
                    color: #676767;
                }
                .note-created-at {
                    color: #D3D3D3;
                    align-self: flex-end;
                }
                @media screen and (max-width: 1200px) {
                    .notes-container {
                        grid-template-columns: repeat(3, minmax(250px, 1fr));
                    }
                }
                @media screen and (max-width: 767px) {
                    .notes-container {
                        grid-template-columns: repeat(2, minmax(250px, 1fr));
                    }
                }
                @media screen and (max-width: 480px) {
                    .notes-container {
                        grid-template-columns: repeat(1, minmax(250px, 1fr));
                    }
                }
            </style>
            <div class="notes-container"></div>
        `;
    
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.notesContainer = this.shadowRoot.querySelector('.notes-container');

        this.displayNotes();

        this.addEventListener('search', this.handleSearch.bind(this));

        document.addEventListener('noteadded', this.handleNoteAdded.bind(this));
    }
    
    displayNotes() {
        this.notesContainer.innerHTML = '';

        notesData.forEach(note => {
            const noteCard = this.createNoteCard(note);
            this.notesContainer.appendChild(noteCard);
        });
    }

    handleNoteAdded(event) {
        const newNote = event.detail;
        const newDate = new Date();
        newNote.createdAt = newDate.toISOString();
        notesData.unshift(newNote);
        const noteCard = this.createNoteCard(newNote);
        this.notesContainer.insertBefore(noteCard, this.notesContainer.firstChild);
    }


    handleSearch(event) {
        const searchText = event.detail;
        const filteredNotes = notesData.filter(note => note.title.toLowerCase().includes(searchText));
        this.renderFilteredNotes(filteredNotes);
    }

    renderFilteredNotes(filteredNotes) {
        this.notesContainer.innerHTML = '';

        filteredNotes.forEach(note => {
            const noteCard = this.createNoteCard(note);
            this.notesContainer.appendChild(noteCard);
        });
    }
    
    createNoteCard(note) {
        const noteCard = document.createElement('div');
        noteCard.classList.add('note-card');
        const createdAtDate = new Date(note.createdAt);
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
        const formattedDate = createdAtDate.toLocaleString('en-US', options);
        noteCard.innerHTML = `
            <div class="note-title">${note.title}</div>
            <div class="note-body">${note.body}</div>
            <div class="note-created-at">Created at: ${formattedDate}</div>
        `;
        return noteCard;
    }
}

customElements.define('notes-component', NotesComponent);


function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    return regex.test(dateString);
}


function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}
