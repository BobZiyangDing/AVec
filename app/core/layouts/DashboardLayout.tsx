import { ReactNode } from "react"
import { Head } from "blitz"
import MiniDrawer from "app/core/components/NavBar/Navbar"

type LayoutProps = {
  title: string
  children: ReactNode
}

const DashboardLayout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "blitzAvecOne"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MiniDrawer children={children} title={title} />
    </>
  )
}

export default DashboardLayout
