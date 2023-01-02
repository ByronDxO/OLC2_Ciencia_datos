import Form from "./Form";
import FormRegister from "./FormRegister";

const Modal = ({ instanceSideNav, instanceModal, name, setName, typeForm }) => {

    let form = "";
    console.log(typeForm)
    if ( typeForm === "login" ) {
        form = (
            <Form instanceSideNav={instanceSideNav}
                  instanceModal={instanceModal}
                  name={name}
                  setName={setName} />
        )
    } else if ( typeForm === "sign_in" ) {
        form = (
            <FormRegister instanceSideNav={instanceSideNav}
                          instanceModal={instanceModal} />
        )
    }

    return (
        <div id="modal1" className="modal">
            <div className="modal-content grey darken-1">
                <div className="card">
                    { form }

                    <div className="card-action"></div>
                </div>
            </div>
        </div>
    );
}

export default Modal;