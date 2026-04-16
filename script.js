document.addEventListener('DOMContentLoaded', () => {

    const filterButtons = document.querySelectorAll('.filter-btn');

    const skillCards = document.querySelectorAll('.skill-card');



    filterButtons.forEach(button => {

        button.addEventListener('click', () => {

            // 1. Active class badalne (color change sathi)

            filterButtons.forEach(btn => btn.classList.remove('active'));

            button.classList.add('active');



            // 2. Filter logic

            const filterValue = button.getAttribute('data-filter');



            skillCards.forEach(card => {

                const cardCategory = card.getAttribute('data-category');



                if (filterValue === 'all' || filterValue === cardCategory) {

                    card.style.display = 'flex'; // Skill dakhavne

                    card.style.opacity = '1';

                } else {

                    card.style.display = 'none'; // Skill लपवणे

                }

            });

        });

    });

});