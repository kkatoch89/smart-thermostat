Purpose of project: Front End for smart home thermostat

Successfully implemented functions:
-The user should be able to access the  thermostat UI from both mobile and web.
-The user should be able to register their thermostat with our home automation backend.
-When users close their session/browser and open it again, they need to have access to their thermostat that was registered in B (don’t account for a case when a user decides to clear all local browser data)
-The user should be able to see the current temperature inside the room.
-The user should be able to switch the thermostat off.
-The user should be able to switch the thermostat to heating mode.
-The user should be able to switch the thermostat to cooling mode.

Functions still to be worked on:
-While thermostat is in an auto mode, a user wants to see if it is either
        heating if current temp < desired temp 
        or cooling/stand-by if desired < current. 
-The thermostat switches between heating and cooling in real time once the current temperature changes.
    User cannot switch thermostat to cooling if the current outside temperature is below 0˚C.
    If thermostat is in auto mode and the current temperature in the room is above the desired temperature set by a user, and the current outside temperature is below 0˚C thermostat goes to stand-by mode instead of cooling
-Vertical hover effect on live chart indicating data points of all 3 plotted lines at specific point

Note:
Thermostat dial was used from reenz/react-thermostat repo 