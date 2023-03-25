import { useState } from "react";

import { FaReply } from "react-icons/fa";
import { MdDelete, MdEdit } from "react-icons/md";

import TextBox from "./TextBox";
import Modal from "./Modal"

function Comment({ comment, currentUser, onCommentSubmit }) {
    const { content, createdAt, score, user, replyingTo, replies } = comment
    const [reply, setReply] = useState(false)
    const [edit, setEdit] = useState(false)
    const [userScore, setUserScore] = useState(score)
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const handleReplyClick = () => {
        setReply(!reply)
        setEdit(false)
    }

    const handleEditClick = () => {
        setEdit(!edit)
        setReply(false)
    }
    const handleDeleteClick = (e) => {
        setModalIsOpen(!modalIsOpen)
        if (e.target.textContent === "YES, DELETE") {
            onCommentSubmit(comment, null, null, e.target.textContent)
        }
    }

    const handleCountClick = (e) => {
        if (e.target.textContent === "+") {
            if (userScore === score) {
                setUserScore(userScore + 1)
            } else if (score - 2 < userScore && userScore < score + 1) {
                setUserScore(userScore + 2)
            }
        } else if (e.target.textContent === "-") {
            if (userScore !== 0) {
                if (userScore === score || userScore === 1) {
                    setUserScore(userScore - 1)
                } else if (score - 1 < userScore && userScore < score + 2) {
                    setUserScore(userScore - 2)
                }
            }
        }
    }

    const handleReplyComment = (value, edit) => {
        setReply(false)
        setEdit(false)

        onCommentSubmit({ id: Math.floor(Math.random() * 100000), content: value, createdAt: "now", score: 0, user: currentUser, replies: [] },
            comment.id, edit)
    }

    let renderedReplies = replies.map((reply) => {
        return <Comment key={reply.id} comment={reply} currentUser={currentUser} onCommentSubmit={onCommentSubmit} />
    })

    return <div>
        <div className="relative flex flex-col lg:flex-col-reverse mb-[20px] px-[15px] lg:px-[30px] py-[15px] lg:pt-[10px] lg:pb-[100px] xl:pb-[80px] bg-white rounded-lg">
            {modalIsOpen &&
                <Modal handleDeleteClick={handleDeleteClick}>
                    <h2 className="mb-[20px] font-bold text-[24px]">Delete comment</h2>
                    <p className="text-[#67727e] text-[20px]">Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
                    <div className="flex justify-center mt-[20px]">
                        <button onClick={handleDeleteClick} className="w-[50%] mr-[15px] py-[15px] bg-[#67727e] text-white rounded-lg font-bold">NO,CANCEL</button>
                        <button onClick={handleDeleteClick} className="w-[50%] py-[15px] bg-[#ed6468] text-white rounded-lg font-bold">YES, DELETE</button>
                    </div>
                </Modal>}

            <div className="lg:absolute lg:top-[30px] lg:left-[110px] lg:right-[70px]">
                <div className="flex items-center mb-[20px]">
                    <img className="mr-[20px] text-[#324152] w-[50px]" src={user.image.webp} alt="user icon" />
                    <p className="mr-[20px] text-[#324152] font-bold">{user.username}</p>
                    {user.username === currentUser.username ? <span className="mr-[15px] px-[8px] bg-[#5457b6] text-white font-bold rounded">you</span> : null}
                    <p className="text-[#67727e]">{createdAt}</p>
                </div>
                <p className="text-[#67727e] mb-[20px] text-[19px]">
                    {replyingTo ? <span className="text-[#5457b6] mr-[5px] font-bold">@{replyingTo}</span> : null}{content}
                </p>
            </div>

            <div className="flex lg:items-start justify-between w-full">
                <p className="flex items-center lg:flex-col lg:justify-center text-[#5457b6] bg-[#f5f6fa] rounded-xl px-[15px] py-[5px] text-[18px] lg:h-[100px] lg:w-[50px] lg:mr-[20px]">
                    <span
                        className="mr-[20px] lg:m-0 text-[20px] font-bold text-gray-300 cursor-pointer"
                        onClick={handleCountClick}>
                        +
                    </span>
                    {userScore}
                    <span
                        className="ml-[20px] lg:m-0 text-[20px] font-bold text-gray-300 cursor-pointer"
                        onClick={handleCountClick}>
                        -
                    </span>
                </p>

                {currentUser.username === user.username ?
                    <div className="flex items-center text-[#5457b6] font-bold">
                        <button className="flex items-center mr-[10px] hover:text-[#ed6468]"
                            onClick={handleDeleteClick}>
                            <MdDelete className="mr-[5px]" />Delete
                        </button>
                        <button className="flex items-center hover:text-[#c3c4ef]"
                            onClick={handleEditClick}>
                            <MdEdit className="mr-[5px]" />Edit
                        </button>
                    </div>
                    :
                    <button className="flex items-center text-[#5457b6] font-bold hover:text-[#c3c4ef]"
                        onClick={handleReplyClick}>
                        <FaReply className="mr-[10px]" />Reply
                    </button>}
            </div>

        </div>

        <div>
            {reply || edit ?
                <TextBox
                    currentUser={currentUser}
                    onCommentSubmit={onCommentSubmit}
                    onSubmitClick={handleReplyClick}
                    handleReplyComment={handleReplyComment}
                    user={user}
                    commentreply
                    edit={edit}
                    comment={comment}
                />
                : null}
        </div>
        {renderedReplies ? <div className="mt-[10px] pl-[15px] border-l-2 border-gray-200">
            {renderedReplies}
        </div> : null}
    </div>
}

export default Comment