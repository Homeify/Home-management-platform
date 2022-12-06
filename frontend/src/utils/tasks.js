const TASKS = [
    {
        title: 'Dus gunoiul',
        description: 'Trebuie dus gunoiul din toate camerele din casa.',
        priority: 3,
        authorName: 'Ilie Vasile',
        status: 1,
        assigned: undefined,
        deadline: new Date('12 Dec 2022'),
        created: new Date('04 Dec 2022'),
        reward: 20,
    },
    {
        title: 'Curatat litiera pisicii',
        description:
            'Trebuie curatata litiera pisicii cat de curand posibil ... Va rog sa va ocupati de asta ca incepe sa miroasa chiar foarte rau. Multumesc.',
        priority: 3,
        authorName: 'Cristi Vasile',
        status: 0,
        assigned: 'Luminita Vasile',
        deadline: new Date('11 Dec 2022'),
        created: new Date('04 Dec 2022'),
        reward: 40,
    },
    {
        title: 'Cumparaturi',
        description:
            'Am ramas cu frigiderul gol. Daca nu face cineva cumparaturile, vom manca rabdare.',
        priority: 1,
        authorName: 'Ilie Vasile',
        status: 0,
        assigned: undefined,
        deadline: new Date('05 Dec 2022'),
        created: new Date('04 Dec 2022'),
        reward: 22,
    },
    {
        title: 'Sters praful',
        description:
            'Toata mobila este plina de praf. Trebuie sters tot praful.',
        priority: 2,
        authorName: 'Ilie Vasile',
        status: 0,
        assigned: undefined,
        deadline: new Date('05 Dec 2022'),
        created: new Date('04 Dec 2022'),
        reward: 15,
    },
    {
        title: 'Aspirat',
        description:
            'Dupa ce este tot praful sters, trebuie aspirat in toata casa.',
        priority: 2,
        authorName: 'Ilie Vasile',
        status: 1,
        assigned: 'Diana Vasile',
        deadline: new Date('12 Dec 2022'),
        created: new Date('04 Dec 2022'),
        reward: 15,
    },
];

export default TASKS;
