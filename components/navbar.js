export default function navbar(){

  const navList = [
    'Home',
    'Elder\'s quorum',
    'Relief Society',
    'Bishopric',
    'Calendar',
    'Young Men',
    'Young Women',
    'Sunday School',
    'Primary'
  ];

  return(
    <nav className="main-nav">
      <div className="nav-inner">
        <div className="nav-title">
          <h1><a>El Paso 5th Ward</a></h1>
        </div>
        <ul className="nav-items">
          {navList.map((navItem, index) => {
            return(
              <li key={index}><a className="nav-link">
                {navItem}
              </a></li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}