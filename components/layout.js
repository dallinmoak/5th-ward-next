import Navbar from "./navbar"
import Footer from "./footer"

export default function layout(props){
  const styles = props.modal ? { overflow: "hidden", height: "100vh"}:{};
  return(
    <div id='layout' style={styles}>
      <Navbar
        includeList={props.includeList}
        updateIncludeList={props.updateIncludeList}
      />
      <main>
        {props.children}
      </main>
      <Footer />
    </div>
  )
}