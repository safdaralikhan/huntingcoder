import '../styles/globals.css'
import Navbar from '../components/Navbar'

function MyApp({ Component, pageProps,router }) {

  const renderNav = (currentScreen) => {
    const noNavScreens = [


    ];

    return noNavScreens.includes(currentScreen)
  }

  const res = renderNav(router.route)
  console.log("res",res)
  console.log("router.route",router.route)


  return (

      <>
        { res ? "" :<Navbar/>}
      <Component {...pageProps} />

      </>



  )

}

export default MyApp
