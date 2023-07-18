export class Visit {

    constructor(doctor, purpose, description, priority, name, id) {
        this.doctor = doctor;
        this.purpose = purpose;       
        this.description = description;
        this.priority = priority;
        this.name = name;
        this.id = id;
    }
    
    async deleteCard() {
		try {
			const response = await fetch(`https://ajax.test-danit.com/api/v2/cards/${this.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            });

			if (response.ok) {
				const cardElement = document.querySelector(`[data-id="${this.id}"]`);
				cardElement.remove();
			} else {
				console.error('Error:', response.status);
			}
		} catch (error) {
			console.error('Error:', error);
		}
	}
}


export class VisitCardiologist extends Visit {
    constructor(doctor, purpose, description, priority, name, id, pressure, bodyMassIndex, heart, age) {
        super(doctor, purpose, description, priority, name, id);
        this.pressure = pressure;
        this.bodyMassIndex = bodyMassIndex;
        this.heart = heart;
        this.age = age;
    }

    render() {
		const cardElement = document.createElement('div');
			cardElement.classList.add('card');
			cardElement.innerHTML = `
				<h3>Name: ${this.name}</h3>				
				<p>Doctor: ${this.doctor}</p>
				<p>Purpose of visit: ${this.purpose}</p>
				<p>Description of visit: ${this.description}</p>
				<p>Priority: ${this.priority}</p>
				<p>Pressure: ${this.pressure}</p>
				<p>Body mass index: ${this.bodyMassIndex}</p>
				<p>Diseases of heart: ${this.heart}</p>
				<p>Age: ${this.age}</p>
                <p>ID: ${this.id}</p>
				<button class="card-button">Delete</button>
			`;
		const btnDelete = cardElement.querySelector('.card-button');
		btnDelete.addEventListener('click', () => {
			this.deleteCard();
		});

		return cardElement;
    }
}

export class VisitDentist extends Visit {
    constructor(doctor, purpose, description, priority, name, id, lastVisit) {
        super(doctor, purpose, description, priority, name, id);
        this.lastVisit = lastVisit;
    }

    render() {
		const cardElement = document.createElement('div');
			cardElement.classList.add('card');
			cardElement.innerHTML = `
				<h3>Name: ${this.name}</h3>				
				<p>Doctor: ${this.doctor}</p>
				<p>Purpose of visit: ${this.purpose}</p>
				<p>Description of visit: ${this.description}</p>
				<p>Priority: ${this.priority}</p>
				<p>Last visit: ${this.lastVisit}</p>
                <p>ID: ${this.id}</p>
				<button class="card-button">Delete</button>
			`;
		const btnDelete = cardElement.querySelector('.card-button');
		btnDelete.addEventListener('click', () => {
			this.deleteCard();
		});

		return cardElement;
    }
}

export class VisitTherapist extends Visit {
    constructor(doctor, purpose, description, priority, name, id, age) {
        super(doctor, purpose, description, priority, name, id);
        this.age = age;
    }

    render() {
		const cardElement = document.createElement('div');
			cardElement.classList.add('card');
			cardElement.innerHTML = `
				<h3>Name: ${this.name}</h3>				
				<p>Doctor: ${this.doctor}</p>
				<p>Purpose of visit: ${this.purpose}</p>
				<p>Description of visit: ${this.description}</p>
				<p>Priority: ${this.priority}</p>
				<p>Age: ${this.age}</p>
                <p>ID: ${this.id}</p>
				<button class="card-button">Delete</button>
			`;
		const btnDelete = cardElement.querySelector('.card-button');
		btnDelete.addEventListener('click', () => {
			this.deleteCard();
		});

		return cardElement;
    }
}