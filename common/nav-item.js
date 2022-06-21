import navList from "./nav-list";

export default function NavItem(item){
  let out =  { name: 'test', route: '/'};
  navList.map(navListItem => {
    if (navListItem.name == item){
      out = navListItem;
    }
  })
  return out;
}