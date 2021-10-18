![pic1](https://github.com/MiDeshay/HotSpot/blob/main/HotSpot%20pics/Screen%20Shot%202021-10-17%20at%206.27.09%20PM.png)

HotSpot is a social media app in whic users can join groups then create and share events with members of those groups. 

Some key features include being able to search for and join a group, being able create and edit an event you created, and being able to view a profile page of a group as well as any of the group's members.

![](https://github.com/MiDeshay/HotSpot/blob/main/HotSpot%20pics/Screen%20Shot%202021-10-17%20at%206.23.34%20PM.png)

This project uses Mongodb to maintain the backend servers and uses React/Redux to present content to the user in a single web page format.

The biggest feature of this app is its ability create events. These events are only visible to the members of the group the event is posted to.  

![pic1](https://github.com/MiDeshay/HotSpot/blob/main/HotSpot%20pics/Screen%20Shot%202021-10-17%20at%206.15.08%20PM.png)

Some of the biggest challenges in creating this feature included properly formatting the frontend stateshape to allow give us access to the content of each event that we wanted to display. Additionally, we had to format the responses of our Mongodb backend server to return information from more than one model to allow multiple types of information to be rendered in our group show page. Close communication with each other as teammamtes as well as strong understanding of the concepts of react state shape and mongodb response formatting allowed us to overcome these challenges.

![](https://github.com/MiDeshay/HotSpot/blob/main/HotSpot%20pics/Screen%20Shot%202021-10-17%20at%206.20.45%20PM.png)

There are a few stand out code snippets highlight the problem solving process involved throughout the creation of this application. 

```
   // Spawns markers on the map with a delayed animation inbetween.
   addMarkerWithTimeout(pin, timeout) {
      window.setTimeout(() => {
         const marker = new this.google.maps.Marker({
            position: {
               lat: parseFloat(pin.mapLat.$numberDecimal),
               lng: parseFloat(pin.mapLng.$numberDecimal),
            },
            map: this.map,
            animation: this.google.maps.Animation.DROP,
            label: pin.title[0],
         })
         marker.eventDetails = pin;
         this.initMarkerWindow(marker);
         this.markers[marker.eventDetails._id] = marker;
      }, timeout);
   }
  ```
  In the snippet above written by Kenny La, pins fetched from the backend database are placed on the map with a slight delay. This helped make the distribution process of pins much more satisfying and visually clear for the user while feeling fast and responsive. 
  
 
 
 ```
   <div>
        <div className={`${isSearching ? "modal-screen " : ""}none`} onClick={this.handleClick}/>
        <input className="drop-down-input" type="text" value={searchTerm} onClick={this.handleClick} onChange=          {this.updateInput('searchTerm')} placeholder="Search Groups" />
        <ul className="drop-down-list">
          {!isSearching || searchTerm !== "" ? null : <li key="group-create" className="drop-down-item link"><Link to={'/groups/create'}>Create a group</Link></li>}
          {!isSearching ? null : Object.values(groups).map((group, i) => this.filter(group) ? <li key={`group-${i}`} className="drop-down-item"><Link to={`/groups/${group.name}`} onClick={this.handleLink(group.id)}><div>{group.name}</div></Link></li> : null)}
        </ul>
 </div>
 ```
 
 The snippet above written by Ian McGrath produces a group search bar which filters resluts based on the current input of the text in the search bar along with a create group button which effectively allows user to create and search for groups all in one location on the page.
 
 
 
 ```
  router.get('/', (req, res) => {
    User.find({}, {
        firstName: 1,
        lastName: 1,
        username: 1,
        email: 1,
        id: 1,
        groupsJoined: 1
    }, (err, users) => {
        res.json(users)
    })
})
                            
```
Finally, the snippet above written by Michael Deshay, the mongodb backend route to fetch all users is formatting to only return specific fields for each user returned. This reduced the overall size of the frontend state shape while ensuring that sensistive information such as the a user's password digest was not sent up to the frontend.

Please visit our live site to see everything in action, thanks! [https://hotspot-mern.herokuapp.com/](https://hotspot-mern.herokuapp.com/)

![](https://github.com/MiDeshay/HotSpot/blob/main/HotSpot%20pics/Screen%20Shot%202021-10-17%20at%206.21.29%20PM.png)

