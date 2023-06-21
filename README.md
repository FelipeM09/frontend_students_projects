# Frontend Students Projects

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.5.

### Additional Installations
For the modifications made to the frontend of the "Students Projects" project, the following libraries need to be installed:

- ng-zorro-antd. To install it, open a command prompt, copy and paste the following command: `npm i ng-zorro-antd@12.1.1 --force`

- datatables.net. To install it, in the command prompt, copy and paste the following command: `npm i datatables.net@1.10.25 --force`

- @angular/animations. To install it, in the command prompt, copy and paste the following command: `npm i @angular/animations`

- ngx-toastr. To install it, in the command prompt, copy and paste the following command: `npm i ngx-toastr@15.2.1`. Then follow the instructions on the official ngx-toastr website. `Link`: ***https://www.npmjs.com/package/ngx-toastr/v/15.2.1?activeTab=readme***.


### Deployment

Once all the above libraries are installed, follow these steps:

1. Install the dependencies with `npm install --legacy-peer-deps` or `npm install --force`.

2. Run the command `ng serve` and then open `Link`: http://localhost:4200/students-projects.

### Other commands used

Other basic Angular commands were used in the modifications, such as:

- `ng g s <path or location>`. Used to create a service.
- `ng g c <path or location>`. Used to create a component in the project.

### Modifications Made

The main modifications were:

- Control and handling of errors in authentication services and databases.

For this, a service called "alerts" was created with a method called "handleAlerts" in which the types of alerts that occur in the project are validated, such as "error", "success" and "warning".

#### handleAlerts method

```
handleAlerts(message: string, typeAlert: string) {
    if (typeAlert.toLowerCase() === 'error') {
      this.toastr.error(message, '', undefined);
      return throwError(new Error(message));
    } else if (typeAlert.toLowerCase() === 'success') {
      this.toastr.success(message, '', undefined);
      return (message);
    } else {
      this.toastr.warning(message, '', undefined);
      return (message);
    }
  }
```

- List of applications or projects for the administrator to stop.

For this modification, it was handled within the dashboard component which is called "analytics.component.ts" Here the methods "loadProjects", "toggleRunningState" and "trackByFn" are implemented.

#### loadProjects Method

Access the projects of the administrator or user. (This is the same method that is in list.component.ts.)

```
private loadProjects(): void {
     const id = this.authService.getCurrentUserSubject().id;
     this.projectsService
       .getProjects(id)
       .subscribe((res: IProject[]) => {
         this.projects = res;
       });
   }

```

#### toggleRunningState method

Used to change the status of the project ("true" or "false").

```
public toggleRunningState(app: any) {
     app.running = !app.running;
   }

```

#### trackByFn method

Gets the ID of a project.

```
public trackByFn(index: number, item: IProject): number {
     return item.id;
   }

```

###End
