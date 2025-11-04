# Automation Testing Basics – Login Feature

This repository is a continuation of my [Manual Testing Basics – Login](https://github.com/CzJanPac/1-Manual-Testing-Basics-Login) project.  
It demonstrates how to transform manual test cases into **automated test scripts** using **Playwright** and **TypeScript**.


## Project Overview

**Application Under Test:**  
[https://www.saucedemo.com/](https://www.saucedemo.com/)  

**Scope:**  
Automation of the login functionality based on defined test cases (TC_LOGIN_001 – TC_LOGIN_006).  
Each test case from the manual testing phase is implemented as a separate automated test in a single file.

**Framework:**  
[Playwright](https://playwright.dev/) with TypeScript


## Repository Structure


```bash
1-Automation-Testing-Basics-Login/
│
├── tests/
│   └── login.spec.ts
│        - Contains all Playwright automated tests for login feature.
│        - Each test case (TC_LOGIN_001–006) corresponds to one manual test case.
│
├── .github/
│   └── workflows/
│       └── playwright.yml
│            - GitHub Actions workflow configuration file.
│            - Defines how and when tests run automatically on GitHub (CI pipeline).
│
├── playwright.config.ts
│        - Central Playwright configuration file (browser, timeout, reporter, etc.).
│
├── package.json
│        - Node.js project file.
│        - Lists dependencies (Playwright, TypeScript, etc.) and npm scripts.
│
├── package-lock.json
│        - Automatically generated file tracking exact versions of dependencies.
│
├── .gitignore
│        - Lists folders and files to be ignored by Git (e.g., node_modules/, reports/).
│
├── README.md
│        - Project documentation.
│        - Describes purpose, structure, and mapping of manual test cases to automation.
│
└── test-results/ (🔜 Planned)
         - (Generated automatically after test run.)
         - Contains temporary logs, screenshots, and trace files.
         - Should be ignored by Git. 
```


## Implemented and Planned Test Cases

| Test Case ID | Title | Description | Status |
|---------------|--------|--------------|---------|
| **TC_LOGIN_001** | Login Page Loads | Verify that the login page loads correctly | ✅ Implemented |
| **TC_LOGIN_002** | Successful Login | Verify successful login redirects to the inventory page | ✅ Implemented |
| **TC_LOGIN_003** | Invalid Login Error | Verify invalid credentials display an error message | 🔜 Planned |
| **TC_LOGIN_004** | Empty Fields Validation | Verify login attempt without entering credentials shows appropriate message | 🔜 Planned |
| **TC_LOGIN_005** | Locked Out User | Verify that locked-out users cannot log in and proper error is shown | 🔜 Planned |
| **TC_LOGIN_006** | Performance Glitch User | Verify that login with performance glitch user still succeeds | 🔜 Planned |


## Key Learnings

- Translating manual test cases into automated scripts  
- Structuring Playwright tests using `test.describe()` and `test.beforeEach()`  
- Maintaining test independence through isolated browser contexts  
- Using assertions with `expect()` for verification steps  
- Writing maintainable, readable test scripts aligned with test case IDs  


## Author

**Jan Páč**  
📎 [GitHub Profile](https://github.com/CzJanPac) 

