import Navbar from "./navbar"
import Footer from "./footer"

export default function layout({children}){
  return(
    <>
    {/* <h1>test</h1> */}
      <Navbar/>
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}