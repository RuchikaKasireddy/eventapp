#GVSU EVENTS APP
<p>This is the present flow of the documentation for the GVSU APP</p>
<ul>
    <li>Brief Introduction of App and It's Functionalities</li>
    <li>Core Functional components used for the App</li>
</ul>

#Brief Introduction of App And It's Functionalities
<h1>THE GVSU EVENTS APP</h1>

<p>The GVSU Events App is a very easy to use application that list all the current events registered in the app database within the GVSU Community</p>

<p>GVSU community members (Staff and Students) and the general public can easily view and register attendance for the events available on Campus</p>

<p>The GVSU community members and the general public do not need to registered on the app to book attendance for an event</p>

<p>Authenticated administrator(s) can login with the right credentials and create events for public viewing and registration</p>

<p>The App enables the Administrator to do the following:</p>

<ul>
    <li>Create new events</li>
    <li>View all events</li>
    <li>Edit events information</li>
    <li>Delete Events</li>
    <li>View the number of registered attendance for the event</li>
    <li>View the graph of registered attendance for various event(with the event title abbreviated)</li>
    <li>View the names of registered attendance</li>
</ul>

<p>The GVSU community and general public can do the following on the App:</p>

<ul>
    <li>Register attendance for an event</li>
    <li>Cancel attendance for an event</li>
    <li>Share an event info to other social platform</li>
</ul>

<p>The general public and the GVSU community can view various events available on the App.</p>



#Core Functional components used for the App

<p>This app is developed using React Native(Expo)</p>
<p>React Native(Expo) is a javascript mobile application framework that enables the use of Javascript to quickly build mobile applications that is cross-platform (Android and IOS)</p>

<p>During the development phase of the app, other React Native dependencies were installed to provide other functionalities that the React Native framework did not provide out of the box</p>

<p>Some of the functional dependencies installed are:</p>

<ul>
    <li>
        <a href="https://docs.expo.dev/guides/using-firebase/" target="_blank">Firebase</a>
    </li>
    <li>
        <a href="https://hossein-zare.github.io/react-native-dropdown-picker-website/" target="_blank">Date-Time Picker</a>
    </li>
    <li>
        <a href="https://docs.expo.dev/versions/latest/sdk/imagepicker/" target="_blank">Image Picker</a>
    </li>
    <li>
        <a href="https://www.npmjs.com/package/react-native-chart-kit" target="_blank">Chart</a>
    </li>
    <li>
        <a href="https://docs.expo.dev/versions/v45.0.0/sdk/webview/" target="_blank">WebView</a>
    </li>
    <li>
        <a href="https://reactnavigation.org/" target="_blank">React Navigation</a>
    </li>
</ul>

#Firebase

<p>Firebase is a Google Cloud Platform that provide services ranging from Realtime Database, File Storage, Machine Learning just to mention a few</p>

<p>This cloud platform provides APIs to interact seamlessly with their services in any application, be it web or mobile</p>

<p>This application leverages especially on the Firebase Realtime Database API and Storage API to easily store data into the database and files on the Storage servers</p>

#Date-Time Picker

<p>The Date-Time Picker is a library installed in the app to enable Administrators to select a date and a time for a event they are creating. This library enable us to select between two modes; the date mode or a time mode</p>

#Image Picker
<p>The Image-Picker library installed in this appliication enables administrators to easily access the gallery from their phone and select an image that best describes or represent the event they are creating using GVSU Events APP</p>

#Chart
<p>The Chart kit library enable the display of various charts in an application ranging from Line Graph, Bar Graph, Pie etc and it was used in this application to display the number of attendance for an event across all registered events</p>

#WebView
<p>The WebView library enable us to display web content from a url and it is used in this App to display GVSU website content in the app to enable the community easily and immediately access information from GVSU website without existing the app.</p>

#React Navigation
<p>The React Navigation dependency provide a range of modules to install ranging from Stack Navigation, BottomTabBar Navigation etc. In this App, we used the createNativeStackNavigator and createMaterialTopTabNavigator for navigation between screens</p>