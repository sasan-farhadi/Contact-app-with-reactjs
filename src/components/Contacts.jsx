import { useEffect, useState } from 'react'
import styled from '../../public/css/Contacts.module.css'
import ContactsList from './ContactsList'
import inputs from '../constant/inputs'


const Contacts = () => {
    const [message, setMessage] = useState("")
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const regexEn = /^[a-zA-Z@._0-9\s]*$/

    const [contacts, setContacts] = useState(JSON.parse(localStorage.getItem("contacts")) || [])
    const [contact, setContact] = useState({
        id: '', firstName: '', lastName: '', email: '', phone: ''
    })
    //change Handler
    const changeHandler = event => {
        const name = event.target.name
        const value = event.target.value.toLowerCase()
        if (regexEn.test(value)) {
            setContact(contact => ({ ...contact, [name]: value }))
        } else {
            setMessage("Please set your keyboard to English language")
            return
        }
        setMessage("")
    }


    //save to localstorage function
    const saveLoaclstorage = () => {
        localStorage.setItem("contacts", JSON.stringify(contacts))
    }


    //Use use effect to avoid storing empty array in local storage
    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts))
    })

    //add record handler
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

        const min = 10000000000000;
        const max = 99999999999999;
        let randomId = (Math.floor(Math.random() * (max - min + 1)) + min)

        const newContact = { ...contact, id: randomId }
        setContacts(contacts => ([...contacts, newContact]))
        saveLoaclstorage()

        setContact(({
            id: '', firstName: '', lastName: '', email: '', phone: ''
        })
        )
        // setShowModal("block")
        // setMessageModal("do you want save form?")
    }




    //record edit handler  and apply edit 
    const [changeBtnAddStyle, setChangeBtnAddStyle] = useState("block")
    const [changeBtnEditStyle, setChangeBtnEditStyle] = useState("none")
    const [editRecordId, setEditRecordId] = useState()
    const editHandler = (id) => {

        setChangeBtnAddStyle("none")
        setChangeBtnEditStyle("block")
        const contactEdit = contacts.find(x => x.id == id)
        setContact(
            {
                firstName: contactEdit.firstName,
                lastName: contactEdit.lastName,
                email: contactEdit.email,
                phone: contactEdit.phone
            })
        setEditRecordId(contactEdit.id)
    }
    const applyEditHandler = () => {
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

        const newEditContact = contacts.find(x => x.id == editRecordId)
        newEditContact.firstName = contact.firstName
        newEditContact.lastName = contact.lastName
        newEditContact.email = contact.email
        newEditContact.phone = contact.phone


        setContacts(contacts => ([...contacts]))
        saveLoaclstorage()
        setChangeBtnAddStyle("block")
        setChangeBtnEditStyle("none")

        setContact(({
            id: '', firstName: '', lastName: '', email: '', phone: ''
        })
        )
    }



    //modal handler 
    const [showModal, setShowModal] = useState("none")
    const [messageModal, setMessageModal] = useState("")
    const [deleteId, setDeleteId] = useState()
    const ModalHandler = () => {
        const newContacts = contacts.filter((contact) => contact.id !== deleteId)
        setContacts(newContacts)
        localStorage.setItem("contacts", JSON.stringify(newContacts))
        setShowModal("none")
    }





    //delete selection record handler
    const [check, setCheck] = useState([])
    const selectHandler = (event) => {
        const id = event.target.id
        if (event.target.checked) {
            setCheck(check => ([...check, id]))
        } else {
            let index = check.findIndex((x) => x === id);
            console.log(index)
            check.splice(index, 1);
            setCheck([...check]);
        }

    }

    const deleteHandler = (id) => {
        setDeleteId(id)
        setShowModal("block")
        setMessageModal("Are you sure you want delete this record?")
    }

    const deleteSelectionRecordHandler = () => {
        const newContacts = contacts.filter((contact) => !check.includes(contact.id.toString()))
        setContacts(newContacts)
        localStorage.setItem("contacts", JSON.stringify(newContacts))
        location.reload();
    }



    //search handler with name and email
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
                        <button className={styled.addbutton} style={{ display: changeBtnAddStyle }} onClick={addHandler} >Add Contact</button>
                        <button className={styled.editbutton} style={{ display: changeBtnEditStyle }} onClick={applyEditHandler} >Edit Contact</button>
                    </div>
                </section>
                <div className={styled.message}>
                    {message && <p style={{ fontWeight: "bold" }}>{message}</p>}
                </div>
                <header>
                    <input type="text" name="search" placeholder="Search by name or email" onChange={event => setSearchInput(event.target.value.toLowerCase().trim())} />
                    <button className={styled.search} onClick={searchHandler} > Search </button>
                    <button className={styled.deleteselect} style={check.length ? { display: "block" } : { display: "none" }} onClick={deleteSelectionRecordHandler}> delete selection record  </button>
                </header>
                <ContactsList contacts={contacts} deleteHandler={deleteHandler} editHandler={editHandler} selectHandler={selectHandler} />
            </main>

        </div >
    )
}
export default Contacts
