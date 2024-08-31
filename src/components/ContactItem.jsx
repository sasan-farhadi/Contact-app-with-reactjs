import styled from '../../public/css/ContactList.module.css'

const ContactItem = ({ data: { id, firstName, lastName, email, phone }, deleteHandler, editHandler, selectHandler }) => {

    return (
        <tr key={id}>
            <td><input type="checkbox" name={firstName} id={id} style={{ transform: "scale(2)" }} onChange={(event) => selectHandler(event)} /></td>
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
