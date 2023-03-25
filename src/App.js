import CommentsList from "./components/CommentsList"
import Footer from "./components/Footer"

function App() {

    return <main className="main-container pt-[40px] px-[15px] lg:px-[100px] xl:px-[200px]">
        <CommentsList />
        <Footer className="mt-[20px]" />
    </main>
}

export default App