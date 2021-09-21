import { createContext, useEffect, useState } from "react";
import Fuse from "fuse.js";

import reactPng from "./assets/images/react.png";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [userData, setUserData] = useState({});
  const [theme, setTheme] = useState(
    localStorage.getItem("edtech-theme") === true ? true : false
  );
  const [courseSelect, setCourseSelect] = useState({
    id: 1,
    name: "ReactJS",
    avatar: reactPng,
  });
  const [allCourses, setAllCourses] = useState([]);
  const [courseSearch, setCourseSearch] = useState("");
  const [courseSearchResult, setCourseSearchResult] = useState(allCourses);

  useEffect(() => {
    console.log(theme);
    console.log(localStorage.getItem("edtech-theme"));
    if (theme) {
      document.documentElement.classList.remove("dark");
      setTheme(true);
    } else {
      document.documentElement.classList.add("dark");
      setTheme(false);
    }
  }, [theme]);

  useEffect(() => {
    console.log(courseSelect);
  }, [courseSelect]);

  useEffect(() => {
    console.log(allCourses);
  }, [allCourses]);

  useEffect(() => {
    console.log(courseSearch);
    console.log(allCourses);
    const options = {
      includeScore: true,
      // Search in `author` and in `tags` array
      keys: ["title"],
    };

    const fuse = new Fuse(allCourses, options);
    const result = fuse.search(courseSearch);
    console.log(result);
    if (result && result.length === 0) {
      setCourseSearchResult(allCourses);
    } else {
      setCourseSearchResult([...result.map((elem) => elem.item)]);
    }
  }, [courseSearch]);
  return (
    <GlobalContext.Provider
      value={{
        user: [userData, setUserData],
        siteTheme: [theme, setTheme],
        courseSelection: [courseSelect, setCourseSelect],
        courseAll: [allCourses, setAllCourses],
        searchCourse: [courseSearch, setCourseSearch],
        searchCourseResult: [courseSearchResult, setCourseSearchResult],
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
