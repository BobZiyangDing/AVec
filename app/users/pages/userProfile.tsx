import { BlitzPage } from "blitz"
import DashboardLayout from "app/core/layouts/DashboardLayout"
import { UserProfileForm } from "../components/profileForm"

const UserProfilePage: BlitzPage = () => {
  return (
    <div>
      <h1>This is user profile page</h1>
      <br />
      <UserProfileForm />
    </div>
  )
}

UserProfilePage.authenticate = {
  redirectTo: "/login",
}
UserProfilePage.getLayout = (page) => <DashboardLayout title="User Profile">{page}</DashboardLayout>

export default UserProfilePage
