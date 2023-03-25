import data from "../data/data.json"
import Comment from "./Comment"
import TextBox from "./TextBox"
import { useState } from "react"

function CommentsList() {
    const [userComments, setUserComments] = useState(data)
    const { currentUser, comments } = userComments

    const onNewCommentSubmit = (value, currentUser) => {
        setUserComments(
            {
                ...userComments,
                comments:
                    [...comments, { id: Math.floor(Math.random() * 100000), content: value, createdAt: "now", score: 0, user: currentUser, replies: [] }]
            })
    }

    const onCommentReplySubmit = (replyObj, commentId, edit, del) => {

        let newComments = comments
        if (del) {

            function search(array, id) {
                for (let i = 0; i < array.length; i++) {
                    if (array[i].id === id) {
                        array.splice(array.indexOf(array[i], 1))
                        break
                    } else {
                        search(array[i].replies, replyObj.id)
                    }
                }
            }
            search(newComments, replyObj.id)
            setUserComments({ ...userComments, comments: newComments })

        } else if (edit) {

            function search(array, id) {
                for (let i = 0; i < array.length; i++) {
                    if (array[i].id === id) {
                        array[i] = { ...array[i], content: replyObj.content }
                        break
                    } else {
                        search(array[i].replies, commentId)
                    }
                }
            }
            search(newComments, commentId)
            setUserComments({ ...userComments, comments: newComments })

        } else {

            function search(array, id) {
                for (let i = 0; i < array.length; i++) {
                    if (array[i].id === id) {
                        array[i].replies = [...array[i].replies, replyObj]
                        break
                    } else {
                        search(array[i].replies, commentId)
                    }
                }
            }
            search(newComments, commentId)
            setUserComments({ ...userComments, comments: newComments })

        }
    }

    const renderedComments = comments.map((comment) => {
        return <div key={comment.id}>
            <Comment
                comment={comment}
                currentUser={currentUser}
                onCommentSubmit={onCommentReplySubmit} />
        </div>
    })

    return <div>
        <h1 className="hidden">Reply and vote other's comments and edit yours.</h1>
        {renderedComments}
        <TextBox
            currentUser={currentUser}
            onCommentSubmit={onNewCommentSubmit}
            newcomment />
    </div>
}

export default CommentsList