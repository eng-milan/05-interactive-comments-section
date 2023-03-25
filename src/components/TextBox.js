import { useState } from "react"

function TextBox({ currentUser, onCommentSubmit, handleReplyComment, onSubmitClick, newcomment, commentreply, edit, comment }) {
    const [textBoxValue, setTextBoxValue] = useState(() => {
        if (edit) {
            return comment.content
        } else {
            return ""
        }
    })

    const handleTextChange = (e) => {
        setTextBoxValue(e.target.value)
    }

    const handleTextSubmit = (e) => {
        e.preventDefault()

        if (newcomment) {
            onCommentSubmit(textBoxValue, currentUser)
        } else if (commentreply) {
            handleReplyComment(textBoxValue, edit)
        }

        setTextBoxValue("")
    }

    return <form className="lg:relative px-[15px] p-[15px] bg-white lg:px-[30px] rounded-lg lg:flex lg:flex-col-reverse lg:items-center lg:h-[130px]">
        <textarea
            className="px-[20px] py-[10px] w-full border-[#eaecf1] h-[100px] border rounded-lg cursor-pointer lg:absolute lg:top-[15px] lg:left-[120px] lg:w-[65%] 2xl:w-[70%]"
            style={{ resize: "none" }}
            value={textBoxValue}
            onChange={handleTextChange}
            placeholder="Add a comment" />
        <div className="mt-[10px] flex justify-between items-center lg:h-full lg:items-start lg:w-full">
            <img className="w-[50px]" src={currentUser.image.webp} alt="user" />
            <button className="px-[30px] py-[10px] bg-[#5457b6] text-white rounded-lg font-bold hover:bg-blue-500"
                onClick={handleTextSubmit}>
                {edit ? "Update" : "SEND"}
            </button>
        </div>
    </form>
}

export default TextBox