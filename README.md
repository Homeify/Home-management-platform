<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="frontend/public/LogoSample_ByTailorBrands.jpg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Home-management-platform</h3>

  <p align="center">
   A web app that makes organising your housework easily.
    <br />
    <a href="https://github.com/Homeify/Home-management-platform/issues">Report Bug</a>
    ·
    <a href="https://github.com/Homeify/Home-management-platform/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#run-tests">Tests</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project
The purpose of the application is to make household activities easier. <br>
The application aims to create a dashboard-type work environment to which only family members or friends/flatmates can access. This should allow users to create groups where other members can join.
Access to groups is conditionated by a code. All members of a group can create tasks within it. 
A user that completes many tasks receives awards and can exchange tasks using its awards.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This section should list any major frameworks/libraries used to bootstrap your project.

* [Django](https://www.djangoproject.com/)
* [Django REST Framework](https://www.django-rest-framework.org/)
* [React.js](https://reactjs.org/)
* [Redux](https://react-redux.js.org/)
* [Chakra-ui](https://chakra-ui.com/docs/components)
* [SqlLite](https://www.sqlite.org/index.html)
![image](https://miro.medium.com/max/1400/1*lAMsvtB6afHwTQYCNM1xvw.webp)
<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
### Prerequisites

* ```python3```
* ```npm```
* ```npx```
* ```Node.js - at least v. 15.0```

### Installation
_Use a terminal for the following steps:_
1. Clone the repo
   ```sh
   git clone git@github.com:Homeify/Home-management-platform.git
   ```
#### Open backend django app 
2. Install pip packages
    ```sh
    pip install -r requirements.txt
    ```
3. Run migrations
    ````sh
     python manage.py makemigrations
     ````
    ```sh
   python manage.py migrate
    ```
4. Open django admin app
    ```sh 
    python manage.py runserver
    ```
    Open server in a browser (optional). <br>
    _To access adminhomeify pannel (contains info about all modules) access /admin from django server and add admin credentials._
#### Open frontend app
5. ```sh
    cd frontend
    ```
6. Install NPM packages
   ```sh
   npm install
   ```
7. Open react app
   ```sh
   npm run start
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage
### API Documentation: 
Visit [swagger folder](https://github.com/Homeify/Home-management-platform/tree/main/homeify/swagger_documentation) for HTML documentation for each endpoint.

### Useful phyton commands:
* ```python manage.py create super user``` - creates an admin that can access administration backend platform (can see/add/edit entities)
* ```pip freeze > requirements.txt``` - add local requirements in requirements.txt file



<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Run tests
* ```python manage.py tests```
* ```coverage run manage.py test```
* ```coverage run manage.py test```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- [x] JWT login system
- [x] Groups
- [x] Admin actions on group
- [x] Tasks
- [x] Customise tasks
- [x] Comments
- [x] Receive rewards in a group and decline task
- [x] Frontend
- [ ] User badges
- [ ] Multi-language Support

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Iuga Paula  - iuga.paula@my.fmi.unibuc.ro

Project Link: [https://github.com/Homeify/Home-management-platform](https://github.com/Homeify/Home-management-platform)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Use this space to list resources you find helpful and would like to give credit to. I've included a few of my favorites to kick things off!

* [Postman](https://www.postman.com/)
* [Postman to swagger](https://metamug.com/article/api-integration/postman-to-swagger.html)
* [Redoc CLI](https://redocly.com/docs/redoc/deployment/cli/)
* [Swagger open api](https://swagger.io/)
* [GitHub Pages](https://pages.github.com)
* [Font Awesome](https://fontawesome.com)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

