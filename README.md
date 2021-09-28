
You can run the application by executing:

    docker-compose up

You will also need to initialise the database (first time you use it or any time you want to reset it to initial state), to do so run:


    docker-compose run --rm api npm run db:reset

To clean up the application completely and start over, run:


    docker-compose down --remove-orphans

Cypress install:


    npm install cypress --save-dev

Open the Cypress:


    npx cypress open

Or run tests headless:


    npx cypress run
