"use client"
import PrelineScript from "@/app/PrelineScript"
import Backtotop from "@/shared/layout-components/backtotop/backtotop"
import Footer from "@/shared/layout-components/footer/footer"
import Header from "@/shared/layout-components/header/header"
import Sidebar from "@/shared/layout-components/sidebar/sidebar"
import Switcher from "@/shared/layout-components/switcher/switcher"
import { ThemeChanger } from "@/shared/redux/action"
import store from "@/shared/redux/store"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Fragment, useEffect, useState } from "react"
import { connect } from "react-redux"

const Layout = ({ children, }: any) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [MyclassName, setMyClass] = useState("");

  const Bodyclickk = () => {
    const theme = store.getState();
    if (localStorage.getItem("ynexverticalstyles") == "icontext") {
      setMyClass("");
    }
    if (window.innerWidth > 992) {
      if (theme.iconOverlay === 'open') {
        ThemeChanger({ ...theme, iconOverlay: "" });
      }
    }
  }
  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) router.push("/login");
  }, [session, status, router]);

  if (status === "loading") {
    return <div className="h-svh justify-center items-center w-full">
      <span className="loading flex justify-center items-center h-full w-full">
        <i className="ri-loader-2-fill text-[3rem] animate-spin">
        </i>
      </span>
    </div>;
  }

  return session ? (
    <Fragment>
      {/* <Switcher/> */}
      <div className='page'>
        <Header />
        <Sidebar />
        <div className='content'>
          <div className='main-content'
            onClick={Bodyclickk}
          >
            {children}
          </div>
        </div>
        <Footer />
      </div>
      <Backtotop />
      <PrelineScript />
    </Fragment>
  ) : null
}

const mapStateToProps = (state: any) => ({
  local_varaiable: state
});

export default connect(mapStateToProps, { ThemeChanger })(Layout);
