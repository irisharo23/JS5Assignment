class Animal {
    constructor(name) {
        this.name = name;
    }

    describe() {
        return `${this.name} is a pet.`;
    }
}

class Pet {
    constructor(name) {
        this.name = name;
        this.animals = [];
    }

    addAnimal(animal) {
        if (animal instanceof Animal) {
            this.animals.push(animal);
        } else {
            throw new Error(`You can only add an instance of Animal. Argument is not an animal: ${animal}`);
        }
    }

    describe() {
        return `${this.name} has ${this.animals.length} animals.`;
    }
}

class Menu {
    constructor() {
        this.pets = [];
        this.selectedPet = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection !== '0') {
            switch (selection) {
                case '1':
                    this.createPet();
                    break;
                case '2':
                    this.viewPet();
                    break;
                case '3':
                    this.deletePet();
                    break;
                case '4':
                    this.displayPets();
                    break;
                default:
                    selection = '0';
            }
            selection = this.showMainMenuOptions();

            
        }
    }

    showMainMenuOptions() {
        return prompt(`
         0) Exit
         1) Create New Pet
         2) View Pet
         3) Delete Pet
         4) Display All Pets
        `);
    }

    showTeamMenuOptions(petInfo) {
        return prompt(`
        0) Back
        1) Create animal
        2) Delete animal
        ----------------
        ${petInfo}
        `);
    }

    displayPets() {
        let petString = '';
        for (let i = 0; i < this.pets.length; i++) {
            petString += i + ') ' + this.pets[i].name + '\n';
        }
        alert(petString);
    }

    createPet() {
        let name = prompt('Enter name for new pet:');
        this.pets.push(new Pet(name));
    }

    viewPet() {
        let index = prompt('Enter the index of the pet you wish to view:');
        if (index > -1 && index < this.pets.length) {
            this.selectedPet = this.pets[index];
            let description = ' Pet Name: ' + this.selectedPet.name + '\n';

            for (let i = 0; i < this.selectedPet.animals.length; i++) {
                description += i + ') ' + this.selectedPet.animals[i].
                    name + '\n';
            }

            let selection = this.showTeamMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createAnimal();
                    break;
                case '2':
                    this.deleteAnimal();
            }
        }
    }

    deletePet() {
        let index = prompt('Enter the index of the pet you want to delete:');
        if (index > -1 && index < this.pets.length) {
            this.pets.splice(index, 1);
        }
    }

    createAnimal() {
        let name = prompt('Enter name for Animal:');
        this.selectedPet.animals.push(new Animal(name));
    }

    deleteAnimal() {
        let index = prompt('Enter the index of the animal you want to delete:');
        if (index > -1 && index < this.selectedPet.animals.length) {
            this.selectedPet.animals.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();
