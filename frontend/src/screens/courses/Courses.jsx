import React, { useContext, useEffect } from 'react';
import { SearchIcon } from '@heroicons/react/outline';

import { GlobalContext } from '../../GlobalContext';
import Navbar from '../../components/navbar/Navbar';
import CourseCard from '../../components/card/CourseCard';
import CoursesSelect from '../../components/select/CoursesSelect';

import CourseApi from '../../util/CourseApi';

const Courses = props => {
    const { courseAll } = useContext(GlobalContext);
    const [allCourses, setAllCourses] = courseAll;
    useEffect(() => {
        const fetcher = async () => {
            const data = await CourseApi.allCourses();
            setAllCourses(data.data.courses);
        };
        fetcher();
    }, []);
    return(
        <div className="bg-gray-50 dark:bg-gray-800">
            <Navbar />
            <div className="m-5 my-8 flex flex-row justify-center">
                <div className="relative flex flex-wrap items-stretch w-8/12 mr-4">
                    <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                        {/* <i className="fas fa-search text-pink bg-pink"></i> */}
                        <SearchIcon className="h-6 w-6" aria-hidden="true" style={{ color: 'rgb(151, 151, 151)' }}/>
                    </span>
                    <input type="text" placeholder="Search Courses..." className="px-3 py-3 placeholder-blueGray-300 text-gray-600 relative bg-white bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 rounded text-md border border-blueGray-300 outline-none focus:outline-none focus:ring w-full pl-10"/>
                </div>
                <CoursesSelect />
            </div>
            <section className='text-gray-600 body-font'>
                <div className="container px-5 mx-auto">
                    <div className="flex flex-wrap -m-4">
                        {allCourses.map(elem => (
                            <CourseCard key={elem} course={elem}/>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Courses;