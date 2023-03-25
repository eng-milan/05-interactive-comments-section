import ReactDOM from "react-dom"

function Modal({ children, handleDeleteClick }) {

    return ReactDOM.createPortal(
        <div>
            <div className="fixed inset-0 bg-gray-500 opacity-50" onClick={handleDeleteClick}></div>
            <div className="fixed inset-x-[85px] top-[35%] p-[20px] bg-white rounded-lg sm:inset-x-[140px] md:inset-x-[240px] lg:inset-x-[300px] xl:inset-x-[400px] 2xl:inset-x-[500px]">{children}</div>
        </div>
        , document.querySelector(".modal-container"))
}

export default Modal