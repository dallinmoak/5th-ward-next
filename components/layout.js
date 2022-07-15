import Navbar from "./navbar"
import Footer from "./footer"

import ItemList from '../components/cal/item-list';

export default function layout(props){
  return(
    <>
      <Navbar
        includeList={props.includeList}
        updateIncludeList={props.updateIncludeList}
      />
      <main>
        {props.children}
      </main>
      <Footer />
    </>
  )
}