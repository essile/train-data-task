## Digitraffic task

A React.js application that shows arriving and departing trains and some of their details when you search by train station name.

You can view the app here: https://naughty-ramanujan-4a070f.netlify.com/

Data from Digitraffic, http requests trough axios, layout with reactstrap, autosuggest bar by [moroshko / react-autosuggest](https://github.com/moroshko/react-autosuggest).

### How does it work

You can search for existing stations - just start writing the name/city to the search bar and the app suggests stations. By clicking a station name you get trains arriving to that station and trains departing from the station.

If there is a live estimated time for a train you will see that time in red and a scheduled time under it. If a train is cancelled it is faded out and says 'Cancelled'.

The same train might be visible twice in case it comes and goes to/from station twice (f.ex. P and I in Pasila station).

### Future development

The current app is really simple but since it is a React application the features would be easy to extend after adding a router.