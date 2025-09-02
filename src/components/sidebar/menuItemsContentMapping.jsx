import QRCodesList from "../dashboard/QRCodeLists/QRCodesList";
import Profile from "../dashboard/profile/Profile";
import Invite from "../dashboard/invite/Invite"; // ✅ add this

export const MenuItemsContentMapping = {
  qrCodesLists: QRCodesList,
  profileUser: Profile,
  invite: Invite, // ✅ new page
};
