import axios from "axios";

const url = "http://localhost:3001/api/course";

const CourseApi = {
  allCourses: async () => {
    const data = await axios.get(`${url}/all`);
    return data;
  },
  courseImg: async (name) => {
    const data = await axios.get(
      `http://localhost:3001/api/uploads/cover/${name}`
    );
    console.log(`http://localhost:3001/api/uploads/cover/${name}`);
    return data;
  },
  getLiked: async (userId) => {
    const data = await axios.get(`${url}/getliked/${userId}`);
    return data;
  },
};

export default CourseApi;
