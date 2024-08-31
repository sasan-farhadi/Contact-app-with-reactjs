import styled from '../../public/css/ContactList.module.css'

const ContactItem = ({ data: { id, firstName, lastName, email, phone }, deleteHandler, editHandler }) => {

    return (
        <tr key={id}>
            <td>{firstName}</td>
            <td>{lastName}</td>
            <td>{email}</td>
            <td>{phone}</td>
            <td><button className={styled.edit} onClick={() => editHandler(id)}>Edit</button></td>
            <td><button className={styled.delete} onClick={() => deleteHandler(id)}>Delete</button></td>
        </tr>
    )
}

export default ContactItem
