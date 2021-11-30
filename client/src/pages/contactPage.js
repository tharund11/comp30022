import Header from '../components/contactPage/Header'
import Contact from '../components/contactPage/Contact';
import { useState, useEffect} from 'react'
import AddContact from '../components/contactPage/AddContact';
import backgroundVideo from "../resources/backgroundVideo.mp4"
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';
import axios from 'axios'

function App() {

  const [showAddContact, setShowAddContact] = useState (false)
  const [work, setWork] = useState (0)
  const [contacts, setContacts] = useState()
  const [searchString, setSearchString] = useState("")
  

  const filterContactList = (state,string) => {
      if (state === 0){return contacts.filter(contact => contact.firstName.includes(string) || contact.lastName.includes(string))}
      if (state === 1){return contacts.filter(contact => contact.socialTag === "work").filter(contact => contact.firstName.includes(string) || contact.lastName.includes(string))}
      if (state === 2){return contacts.filter(contact => contact.socialTag === "social").filter(contact => contact.firstName.includes(string) || contact.lastName.includes(string))}
  }

  const setTitle = (state) => { 
    if (state === 0){return 'Both'}
    if (state === 1){return 'Work'}
    if (state === 2){return 'Social'}
  }

  //states are immutable, so use "setContacts" to change the state (list)
  
 useEffect(() => {
    axios({method: 'post',
      data: {
        id : localStorage.getItem('userId')
      },
      withCredentials: true,
      url: "https://team-ion-backend.herokuapp.com/contacts"
    }).then( (allContacts) => {
      console.log(allContacts.data);
      if(allContacts.data != null){
        setContacts(allContacts.data);
      }
    })
  }, []);
  
    
  
    

  
  //   [
  //   {
  //       id: "616297dc831eda69012c25ea",
  //       firstName: 'Tom',
  //       lastName: 'Cruise',
  //       phone: [11112222],
  //       email: ["TomCruise@gmail.com"],
  //       work: true,
  //       eventsid: [99, 105],
  //       roleAtEvent: 'guest',
  //       note: 'Mission impossible'
  //   },
  //   {
  //       id: "2",
  //       firstName: 'Lionel',
  //       lastName: 'Messi',
  //       phone: [33334444],
  //       email: ["LionelMessi@gmail.com"],
  //       work: true,
  //       eventsid: [808, 1003],
  //       roleAtEvent: 'Cleaner',
  //       note: 'Dem Kicks'
  //   },
  //   {
  //       id: "3",
  //       firstName: 'Howard',
  //       lastName: 'Duck',
  //       phone: [55556666, 99998888],
  //       email: ["HowardDuck@gmail.com"],
  //       work: false,
  //       eventsid: [1, 2, 3, 4],
  //       roleAtEvent: 'Food',
  //       note: 'Eaten already'
  //   },
  //   {
  //     id: "4",
  //     firstName: 'Tony',
  //     lastName: 'Stark',
  //     phone: [77778888],
  //     email: ["TonyStark@gmail.com", "StarkIndustries@yahoomail.com"],
  //     work: false,
  //     eventsid: 46,
  //     roleAtEvent: 'No idea',
  //     note: 'gets killed so many times'
  // }]


  

    const setWorkTrue = () => {
        setWork(1);
        setTitle(1);
    }
    const setPersonal = () => {
        setWork(2);
        setTitle(2);
    }
    const setBoth = () => {
      setWork(0);
      setTitle(0);
    }
    

  // Add contact
  const addContact = (contact) => {
    const id = Math.floor(Math.random() * 100) + 1 //Random ID
    const newContact = {id, ...contact}
    console.log(newContact)
    setContacts([...contacts, newContact])
  }

  // Delete contact
  const deleteContact = (id) => {
  
    axios({method: 'delete',
      data: {
        userID : localStorage.getItem('userId'),
        contactID : id
      },
      withCredentials: true,
      url: "https://team-ion-backend.herokuapp.com/contacts/delete"
    }).then( () => {
      window.location.reload(false);
    })

    setContacts(contacts.filter((contact) => contact.id !== id))
    //axios.delete(`http://localhost:5000/contacts/${id}`).then( () => {
      //window.location.reload(false);
    //axios.delete(`http://localhost:5000/contacts/${id}`)
    //})
  }

  const handleChange = (event) => {
    setSearchString(event.target.value);
  }

    return (
      <div className="App contactPage"> 
        <video autoPlay loop muted
          style = {{
              position: "absolute",
              width: "100%",
              left: "0%",
              top: "0%",
              height: "100%",
              objectFit: "cover",
              // transform: "translate(-50%,-50%)",
              zIndex: "-1",
              opacity: "90%"
          }}
          >
            <source src = {backgroundVideo} type ="video/mp4"></source>
          </video>
        <Header/>
  
        {/* UtilityBar */}
        <div>
            <div className = 'contactTag'> 
                <div className = 'tagName'>Contacts </div>
            </div>
            <div className = 'searchBox'>
                <input type = 'text' placeholder = 'Type something...' onChange = {handleChange}></input>
                <div className = 'dropbox'>
                    <DropdownButton id="dropdown-basic-button" title={setTitle(work)}>
                    <Dropdown.Item href="#Work-1" onClick = {setWorkTrue}>Work</Dropdown.Item>
                    <Dropdown.Item href="#/Personal-2" onClick = {setPersonal}>Social</Dropdown.Item>
                    <Dropdown.Item href="#/Both-3" onClick = {setBoth}>Both</Dropdown.Item>
                    </DropdownButton>
                </div>
                {/* <Button> Search </Button> */}
                <Link to ='/events'>
                  <Button className = 'btn-event'> Change to events</Button>
                </Link>
            </div>
        </div>

        {showAddContact && <AddContact onAdd = {addContact}/>}

        {/* Contacts list */}
        <div className = 'contactList grid-container'> 
            {contacts && filterContactList(work,searchString).map((contact) => (
              <Contact key = {contact._id} contact = {contact}
              onDelete = {()=>deleteContact(contact._id)} />
          ))}
        </div>

        {/* {contacts.length > 0 ? <Contacts filter = {work} contacts = {contacts} onDelete = {deleteContact}/> : 'No contacts registered'} */}
      </div>
    );
  }
export default App;
