import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { db } from "./firebase.config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import CheckBoxs from "./components/CheckBoxs";
import DropDown from "./components/DropDown";
import RadioButtons from "./components/RadioButtons";

export default function App() {
  const departments = [
    "Information Science",
    "Information System",
    "Information Technology",
    "Computer Science",
    "Software Engineering",
  ];
  const courses = ["Java", "C++", "Python", "MySQL"];
  const [students, setStudents] = useState([]);
  const students_db = collection(db, "students");

  //form data
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [department, setDepartment] = useState();
  const [sex, setSex] = useState();
  const [selectedCourses, setSelectedCourses] = useState([]);

  //form validation
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [departmentError, setDepartmentError] = useState("");
  const [sexError, setSexError] = useState("");
  const [coursesError, setCoursesError] = useState("");

  const getStudents = async () => {
    const data = await getDocs(students_db);
    setStudents(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };
  const clearFrom = () => {
    setFirstName(undefined);
    setLastName(undefined);
    setSex(undefined);
    setDepartment(undefined);
    setSelectedCourses([]);
  };
  const addStudent = async (newStudent) => {
    const studRef = await addDoc(students_db, newStudent);
    newStudent.id = studRef.id;
    setStudents([...students, newStudent]);
    clearFrom();
  };

  const handleSubmit = () => {
    if (firstName == undefined || firstName == "") {
      setFirstNameError("First name is required");
      return;
    }
    if (lastName == undefined || lastName == "") {
      setLastNameError("Last name is required");
      return;
    }
    if (department == undefined) {
      setDepartmentError("please select department");
      return;
    }
    if (sex == undefined) {
      setSexError("please select one");
      return;
    }
    if (selectedCourses.length == 0) {
      setCoursesError("please select at least one course");
      return;
    }
    let newStudent = {
      FirstName: firstName,
      LastName: lastName,
      Department: department,
      Sex: sex,
      Courses: selectedCourses,
    };
    addStudent(newStudent);
    alert("Student Registered");
  };

  useEffect(() => {
    getStudents();
  }, []);
  return (
    <View className="flex-1 pt-20">
      <Text className="text-center text-indigo-600 font-bold italic m-4 text-xl my-5 mb-16">
        CCI Student Registration
      </Text>
      <StatusBar style="auto" />
      <View className="space-y-7">
        {/* First Name */}
        <View className="relative px-5">
          <TextInput
            className="border border-indigo-500 rounded p-2 focus:border-2"
            placeholder=""
            onChangeText={(text) => {
              setFirstName(text);
              setFirstNameError("");
            }}
          />
          <Text className="absolute -top-3 left-8 text-indigo-500 bg-white">
            First Name
          </Text>
          <Text
            className={
              firstNameError == ""
                ? "hidden"
                : " px-4 text-red-600 text-sm italic"
            }
          >
            {firstNameError}
          </Text>
        </View>
        {/* Last Name */}
        <View className="relative px-5">
          <TextInput
            className="border border-indigo-500 rounded p-2 focus:border-2"
            placeholder=""
            onChangeText={(text) => {
              setLastName(text);
              setLastNameError("");
            }}
          />
          <Text className="absolute -top-3 left-8 text-indigo-500 bg-white">
            Last Name
          </Text>
          <Text
            className={
              lastNameError == ""
                ? "hidden"
                : " px-4 text-red-600 text-sm italic"
            }
          >
            {lastNameError}
          </Text>
        </View>
        {/* Department */}
        <View className="px-5 relative">
          <DropDown
            title="Choose Department"
            options={departments}
            setSelectedOption={setDepartment}
          />
          <Text
            className={
              departmentError == ""
                ? "hidden"
                : " px-4 text-red-600 text-sm italic"
            }
          >
            {departmentError}
          </Text>
        </View>
        {/* Sex */}
        <View className="px-5">
          <RadioButtons
            title="Sex:"
            options={["Male", "Female"]}
            setSelectedOption={setSex}
          />
          <Text
            className={
              sexError == "" ? "hidden" : " px-4 text-red-600 text-sm italic"
            }
          >
            {sexError}
          </Text>
        </View>
        {/* Courses */}
        <View className="px-5">
          <CheckBoxs
            title="Courses: "
            options={courses}
            setSelectedOptions={setSelectedCourses}
          />
          <Text
            className={
              coursesError == ""
                ? "hidden"
                : " px-4 text-red-600 text-sm italic"
            }
          >
            {coursesError}
          </Text>
        </View>

        <View className="flex items-center">
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-indigo-500 w-52 py-2 rounded-full mt-8"
          >
            <Text className="text-white text-lg italic text-center">
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
