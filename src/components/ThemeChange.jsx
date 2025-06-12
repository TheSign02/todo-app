import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../slices/themeSlice";

const ThemeChange = () => {
    const currentTheme = useSelector((state) => state.theme.currentTheme);
    const dispatch = useDispatch();

      function handleToggleTheme() {
    dispatch(toggleTheme());
  }
  return (
    <div>
      <button className="pd-1" onClick={handleToggleTheme}>
        {currentTheme === "light" ? "Light" : "Dark"}
      </button>
    </div>
  );
};

export default ThemeChange;
