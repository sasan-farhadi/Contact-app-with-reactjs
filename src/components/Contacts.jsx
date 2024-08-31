import { useState } from 'react'
import styled from '../../public/css/Contacts.module.css'
import ContactsList from './ContactsList'
import inputs from '../constant/inputs'


const Contacts = () => {

    const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem("contacts")) || [])
    const [contact, setContact] = useState({
        id: '', firstName: '', lastName: '', email: '', phone: ''
    })

    const changeHandler = event => {
        const name = event.target.name
        const value = event.target.value.toLowerCase()

        setContact(contact => ({ ...contact, [name]: value }))
    }

    const [message, setMessage] = useState("")
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    const saveLoaclstorage = () => {
        localStorage.setItem("contacts", JSON.stringify(contacts))
    }

    const addHandler = () => {
        if (!contact.firstName || !contact.lastName || !contact.email || !contact.phone) {
            setMessage("Please enter valid data !")
            setTimeout(() => {
                setMessage("")
            }, 4000);
            return
        } else if (!contact.email.toLowerCase().match(regex)) {
            setMessage(" Email is not valid!  -  For example : info@example.com")
            setTimeout(() => {
                setMessage("")
            }, 4000);
            return
        }
        setMessage("")

        const min = 10000000000000;
        const max = 99999999999999;
        let randomId = (Math.floor(Math.random() * (max - min + 1)) + min)
        const newContact = { ...contact, id: randomId }
        setContacts(contacts => ([...contacts, newContact]))
        saveLoaclstorage()
        // setContact({
        //     firstName: '', lastName: '', email: '', phone: ''
        // })
    }


    const editHandler = (id) => {
        setAddButtonName("Edit Contact")
        setButtonStyle(styled.editbutton)
        const contactEdit = contacts.find(x => x.id == id)
        setContact(
            {
                firstName: contactEdit.firstName,
                lastName: contactEdit.lastName,
                email: contactEdit.email,
                phone: contactEdit.phone
            })
    }

    const applyEditHandler = () => {
        
    }


    const [showModal, setShowModal] = useState("none")
    const [messageModal, setMessageModal] = useState("")
    const [deleteId, setDeleteId] = useState()
    const ModalHandler = () => {
        const newContacts = contacts.filter((contact) => contact.id !== deleteId)
        setContacts(newContacts)
        localStorage.setItem("contacts", JSON.stringify(newContacts))
        setShowModal("none")
    }
    const deleteHandler = (id) => {
        setDeleteId(id)
        setShowModal("block")
        setMessageModal("Are you sure you want delete this record?")
    }



    const [searchInput, setSearchInput] = useState()
    const searchHandler = () => {
        const byName = contacts.filter(x => x.firstName == searchInput)
        const byEmail = contacts.filter(x => x.email == searchInput)
        if (!byName.length && !byEmail.length) {
            setMessage(" Not Found !")
            setTimeout(() => {
                setMessage("")
            }, 4000);
            return
        } else {
            if (byName.length) setContacts(byName)
            else setContacts(byEmail)
        }
        setMessage("")
    }

    return (
        <div className='container'>
            <main>
                <div className={styled.alert} style={{ display: showModal }}>
                    <p>{messageModal}</p>
                    <button className={styled.ok} id='ok' onClick={ModalHandler}>OK</button>
                    <button className={styled.cancel} onClick={() => setShowModal("none")} >Cancel</button>
                </div>
                <section className={styled.sectioncontact}>
                    <div className={styled.side}>
                        <h2>Contact App With React</h2>
                        <h4>| Sasan Farhadi |</h4>
                        <img src="../../img/7.jpg" alt="" />
                        <a href="https://botostart.ir/" target="_blank">Bootcamp-FrontEnd | Botostart.ir</a>
                    </div>
                    <div className={styled.contact}>
                        {
                            inputs.map((input, index) => (<input
                                key={index}
                                type={input.type}
                                placeholder={input.placeholder}
                                name={input.name}
                                value={contact[input.name]}
                                onChange={changeHandler}
                            />))
                        }
                        <button className={styled.addbutton} onClick={addHandler} >Add Contact</button>
                        <button className={styled.editbutton} onClick={applyEditHandler} >Edit Contact</button>
                    </div>
                </section>
                <div className={styled.message}>
                    {message && <p style={{ fontWeight: "bold" }}>{message}</p>}
                </div>
                <header>
                    <input type="text" name="search" placeholder="Search by name or email" onChange={event => setSearchInput(event.target.value.toLowerCase().trim())} />
                    <button className={styled.search} onClick={searchHandler} > Search </button>
                    <button className={styled.allbutton} onClick={() => { window.location.reload(); }}>All</button>
                </header>
                <ContactsList contacts={contacts} deleteHandler={deleteHandler} editHandler={editHandler} />
            </main>

        </div>
    )
}
export default Contacts
