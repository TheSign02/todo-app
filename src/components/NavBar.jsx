import { useSelector } from "react-redux";
import ThemeChange from "./ThemeChange";


const NavBar = () => {
    const currentTheme = useSelector((state) => state.theme.currentTheme);
  return (
    <div className={`flex justify-between p-5 ${currentTheme === "light" ? "bg-[#ceb09f]" : "bg-[#1b162b]" }`}>
      <div className="flex gap-10">
        <a href="">Home</a>
        <a href="">Stats</a>
        <a href="">Settings</a>
      </div>
      <ThemeChange />
    </div>
  );
};

export default NavBar;
