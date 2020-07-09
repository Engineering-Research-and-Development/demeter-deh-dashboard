![](https://portal.ogc.org/files/?artifact_id=92076)
# Demeter DEH Dashboard

 

DEH Dashboard represents the DEH front-end application, which will be used by end-users or DEMETER Stakeholders for resource creation or discovery. The DEH resources are represented by a set of entities such as Component, Device, Service, Dataset, Platform which can be added via the DEH Dashboard or web-based UI (User Interface). 
DEH Dashboard functional module is in charge for User Interaction & Data Visualisation. It will allow users to login to DEH, discover, register and manage DEMETER Enablers.

 

## Table of contents
* [**Screenshots**](#screenshots)
* [**Technologies**](#technologies)
* [**Features**](#features)
* [**Requirements**](#requirements)
* [**Setup**](#setup)
* [**How to use**](#using)
* [**Contributors**](#contributors)
* [**Status**](#status)
* [**Licence**](#licence)

 

## Screenshots

 

 ** TO DO** 

 

## Technologies

 

| Description   | Language      | Version |
| ------------- |:-------------:| -------:|
| [Angular][1]  | JavaScript    | 10.0.2  |
| [Docker][2]   |               | 19.03.8 |

 


[1]: https://angular.io/
[2]: https://docs.docker.com/get-docker/

 

## Features

 

* User profile management
* Resource discovery through search API
* New resources creation and editing
* Resource compatibility checking
* Resource rating visualisation

 

## Requirements

 

This procedure assumes that you have Node.js (version >= 12) and Docker (version >= 18) installed in your environment.

 

## Setup

 

After pulling the source code, go to root folder and follow next steps:

 

### Run application using docker
------

 

* go to root folder where docker file (Dockerfile) is, type comand `docker build -t demeter/deh-dashboard .` to create docker image.
* in terminal type `docker run demeter/deh-dashboard` to start docker image.  

 

### Local development
------

 

##### Development server

 

* Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

 

##### Code scaffolding

 

* Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

 

##### Build

 

* Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

 

##### Running unit tests

 

* Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

 

##### Running end-to-end tests
* Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

 

##### Further help

 

* To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

 

## How to use

 

* Open an application in your browser at `localhost:8080/`

 

## Contributors

 

* [Marko Stojanovic](https://github.com/marest94) 
* [Slobodan Paunovic](https://github.com/slobodan82) 

 

## Status
Project is: _in progress_

 

## License
<!--- If you're not sure which open license to use see https://choosealicense.com/--->

 

This project uses the following license: [<license_name>](<link>).