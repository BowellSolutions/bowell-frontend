## File Structure

```
.github/
    - workflows/                                    # definitions of Github Action workflows
        - test-build-deploy.yml                     # CI/CD workflow
        - tests.yml                                 # unit and e2e tests
cypress/                                            # directory with cypress related files
    - fixtures                                      # file for potential fixtures (data used in tests)
    - integrations/...                              # e2e tests, run with yarn e2e
    - plugins/...                                   # file for potential cypress config overriding
    - support/...                                   # integration with installed packages, additional commands
    - tsconfig.json                                 # Typescript support specific to this directory
jest/                                               # directory with jest related files
    - __mocks__/...                                 # file, style, Redux store mocks, msw test server (api mock)
    - redux/...                                     # testing actions, reducers, store
    - jest.setup.js                                 # jest setup, mocking settings and loading testing library package
public/                                             # images and favicons
    - assets/...                                    # directory with images used mostly on landing page
    - favicon.ico
    - logo.png
src/
    - api/
        - auth.ts                                   # axios functions for calling auth related endpoints
        - axiosClient.ts                            # axios instance with custom config
        - examinations.ts                           # axios functions for calling examinations related endpoints
        - files.ts                                  # axios functions for calling recordings related endpoints
        - statistics.ts                             # axios functions for calling doctor statistics endpoint
        - types.ts                                  # types and interfaces used globally, mostly api responses shapes
        - users.ts                                  # axios functions for calling users related endpoints
    - components/
        - card/                                     # boxes extended with custom themes
            - Card.tsx
            - CardBody.tsx
            - CardHeader.tsx
        - configurator/
            - Configurator.tsx                      # sidebar with options to change sidebar and header types, to toggle light/dark mode
        - context/
            - DashboardContext.tsx                  # context to prevent prop drilling in dashboard components (only one value inside)
            - WebsocketContext.tsx                  # websocket connection initialization and message handling, proving sendMessage in context
        - dashboard/
            - AttachRecordingForm.tsx               # form for attaching recording to a chosen examination
            - AttachRecordingModal.tsx              # modal with attach recording form
            - ConfirmDetachModal.tsx                # modal to confirm recording detachment from examination
            - EditExaminationForm.tsx               # form for editing examination details
            - EditExaminationModal.tsx              # modal with edit examination modal
            - ExaminationCard.tsx                   # examination card used in patient dashboard
            - ExaminationDetailInfo.tsx             # component with examination details
            - ExaminationForm.tsx                   # form for creating new examination
            - ExaminationModal.tsx                  # modal with examination form
            - FileUpload.tsx                        # drop zone with file upload feature
            - ProbabilityPlot.tsx                   # plot showing probabilities of having a bowel sound
            - ProfileExaminations.tsx               # examinations in doctor's profile
            - ProfileForm.tsx                       # form in patient profile which currently only displays data 
            - ProfileHeader.tsx                     # header present in doctor and patient profile
            - ProfileInfo.tsx                       # user details displayed in doctor's profile
            - ProfilePatients.tsx                   # patients displayed in doctor's profile
            - RecentExaminations.tsx                # recent examinations in doctor dashboard
            - RecentPatients.tsx                    # recently added patients in doctor dashboard
            - RecentRecordings.tsx                  # recetly processed recordings in doctor dashboard
            - StatisticsBoxes.tsx                   # styled boxes with doctor statistics in dashboard
        - footer/
            - Footer.tsx                            # footer component in dashboard and auth routes
        - icons/
            - IconBox.tsx                           # flex box extended with custom theme
        - layouts/                                  # higher order components - styled wrappers
            - AuthLayout.tsx                        # layout in auth routes
            - DashboardLayout.tsx                   # layout in dashboard
            - MainLayout.tsx                        # layout on landing page
        - menu/
            - ItemContent.tsx                       # menu item
            - Notifications.tsx                     # menu with up to 5 recent notifications from store
        - navbar/
            - AuthNavbar.tsx                        # navbar in /login and /register routes
            - AuthNavbarLinks.tsx                   # styled links in auth navbar
            - DashboardNavbar.tsx                   # navbar in any dashboard route
            - DashboardNavbarLinks.tsx              # styled links in dashboard navbar
        - panels/                                   # boxes extended with custom themes
            - MainPanel.tsx
            - PanelContainer.tsx
            - PanelContent.tsx
        - sidebar/
            - Button.tsx                            # styled button
            - ButtonActiveLink.tsx                  # styled button link when activated
            - ButtonLink.tsx                        # styled button link
            - Sidebar.tsx                           # dashboard sidebar
            - SidebarLinks.tsx                      # styled links in normal sidebar
            - SidebarResponsive.tsx                 # dashboard sidebar on mobile devices
            - SidebarResponsiveLinks.tsx            # styled links in mobile sidebar
        - tables/
            - ExaminationsTableRow.tsx              # examination card used in doctor dashboard
            - PatientsTableRow.tsx                  # table row in patients table
            - RecordingsTableRow.tsx                # table row in recordings table with attached drop zone for quick file upload
        - utils/
            - RecordingDetails.tsx                  # details about recording in rows
            - ScrollToTopButton.tsx                 # button which scrolls to top of the page on click
            - Separator.tsx                         # simple horizontal line used as separator
        - views/                                    # representational components rendered in corresponding routes
            - doctor/                               # doctor's perspective in dashboard
                - Dashboard.tsx                     # main view with recent examinations, patients, recordings, statistics
                - ExaminationDetail.tsx             # examination details, analysis result and probability plot
                - Examinations.tsx                  # all examinations
                - Patients.tsx                      # patients table
                - Profile.tsx                       # doctor's profile - differs from patient's
                - Recordings.tsx                    # recordings table and file upload dropzone below
            - home/                                 # home page components
                - CallToActionSection.tsx           # section at the bottom with a call to action slogan
                - Carousel.tsx                      # clickable carousel for patient and doctor section
                - DoctorSection.tsx                 # doctor section with images and descriptions
                - FeaturesSection.tsx               # section with 12 boxes showing features
                - HeaderSection.tsx                 # landing page header
                - HomeFooter.tsx                    # landing page footer
                - MobileSection.tsx                 # section with phone mockup
                - MoreSection.tsx                   # section with details about the system and cooperation with experts
                - PatientSection.tsx                # patient section with images and descriptions
                - WelcomeSection.tsx                # welcome section with colourful title and image of the dashboard
            - patient/                              # patient's perspective in dashboard
                - Dashboard.tsx                     # patient dashbaord
                - ExaminationDetail.tsx             # examination details, state stepper, fetching analysis results
                - Examinations.tsx                  # patient's examinations table
                - Profile.tsx                       # patient's profile with a disabled form
            - utils/
                - DispatchLayout.tsx                # layout which renders either patient or doctor specific components
                - format.ts                         # functions returning formatted data (e.g date)
            - 404.tsx                               # custom 404 component
            - Home.tsx                              # component rendered in home page, consists of multiple smaller components
            - Login.tsx                             # representational component with login logic
            - Register.tsx                          # representational component with registration logic
        - routes.tsx                                # routes available in dashboard's sidebar
    - hooks/                                        # custom hooks
        - useTableFilter.ts                         # hook for handling table rows filtering
    - pages/                                        # Next.js file based routing
        - dashboard/                                
            - examinations/                         
                - [id].tsx                          # /dashboard/examinations/[id] handler
                - index.tsx                         # /dashboard/examinations handler
            - patients/
                - [id].tsx                          # /dashboard/patients/[id] handler
                - index.tsx                         # /dashboard/patients handler
            - profile/
                - [id].tsx                          # /dashboard/profile/[id] handler
                - index.tsx                         # /dashboard/profile handler
            - recordings/
                - index.tsx                         # /dashboard/recordings handler
            - index.tsx                             # /dashboard handler
        - 404.tsx                                   # custom 404 page automatically rendered by Next.js
        - _app.tsx                                  # component used for Next.js page initialization
        - index.tsx                                 # home page handler
        - login.tsx                                 # /login handler
        - register.tsx                              # /register handler
    - redux/                                        # Redux store, actions, reducers for global state management
        - actions/                                  # action is an object with type and payload, which is dispatched to invoke state change
            - auth.ts                               # auth action creators
            - dashboard.ts                          # dashboard action creators
        - reducers/                                 # reducer is a function which merges states in store 
            - auth.ts                               # auth reducer
            - dashboard.ts                          # dashboard reducer
            - index.ts                              # combined auth and dashboard reducers
        - hooks.ts                                  # typed versions of Redux hooks
        - store.ts                                  # Redux store setup
    - styles/...                                    # scss files with global and local styles
    - theme/                                        # Chakra-UI theme configuration, global styles, variants etc.
        - components/                               
            - additions/                            # custom components
            - builtins/                             # overriding exists Chakra-UI components' styles or adding variants
            - plugins/                              # components from installed packages that have their own chakra compatible styles
        - foundations/
            - breakpoints.ts                        # definitions of viewports
            - fonts.ts                              # chosen fonts               
        - styles.ts                                 # global styles
        - theme.ts                                  # combining all components, foundations etc. into one theme
    - config.ts                                     # file with globally available config variables
.babelrc                                            # babel configuration - required to disable SWC which is not stable yet
.dockerignore           
.editorconfig                                       # uniform code formatting
.eslintrc.json                                      # eslint config
.gitignore
cypress.json                                        # cypress config
docker-compose.yml                                  # docker-compose for local development, contains app service and volumes definitions
Dockerfile                                          # main dockerfile
Dockerfile.prod                                     # production ready dockerfile - optimised
jest.config.js                                      # jest config
next.config.js                                      # Next.js config - webpack hot reload, env variables, disabled swc
next-env.d.ts                                       # required for Typescript integrations with Next.js
package.json                                        # scripts and dependencies
README.md
tsconfig.json                                       # Typescript config
yarn.lock                                           # lock file
```
