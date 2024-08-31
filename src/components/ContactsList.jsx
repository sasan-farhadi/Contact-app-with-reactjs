import styled from '../../public/css/ContactList.module.css'
import ContactItem from './ContactItem'


const ContactsList = ({ contacts, deleteHandler, editHandler, selectHandler }) => {
    return (
        <div>
            <main>
                <section className={styled.sectionlist}>
                    <table className={styled.table}>
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        {contacts.length ? (
                            <tbody>
                                {
                                    contacts.map(x => {
                                        return (
                                            <ContactItem key={x.id} data={x} deleteHandler={deleteHandler} editHandler={editHandler} selectHandler={selectHandler} />
                                        )
                                    })
                                }
                            </tbody>) :
                            (<tbody><tr><td colSpan={6} style={{ textAlign: "center" }}><h3>No Contacts Yet !</h3></td></tr></tbody>)}

                    </table>
                </section>
            </main>

        </div>
    )
}

export default ContactsList
