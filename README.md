# Stb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.12.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Backend server

The backend is now implemented with **ASP.NET Core Web API**. A SQL Server schema is provided at `Backend/Database/schema.sql`.

1. Install Node dependencies for the Angular frontend:

   ```bash
   npm install
   ```

2. Configure the database connection in `Backend/appsettings.json` if needed. By default it uses:

   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Server=localhost;Database=stb;User Id=sa;Password=password;TrustServerCertificate=True;"
     }
   }
   ```

3. Start the backend API:

   ```bash
   npm run server
   ```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
