import { useEffect, useState } from "react";
import { db , storage } from "@/config/firebaseConfig";
import { ref, uploadBytes, getDownloadURL, deleteObject , uploadBytesResumable} from "firebase/storage"
import {
    collection,
    addDoc,
    doc,
    getDocs,
    deleteDoc,
    updateDoc 
} from "firebase/firestore";
import { OutputFileType } from "typescript";
import { log } from "console";

type studentTypes = {
    no:number,
    id: string,
    name: string,
    fatherName: string,
    phone: string,
    image:any
}


const useStudents = () => {
    const [visible, setVisible] = useState(false)

    const [name, setName] = useState("")
    const [fatherName, setfatherName] = useState("")
    const [imageUrl, setImageUrl] = useState<any>()
    const [phone, setPhone] = useState("")
    const [students, setStudents] = useState<studentTypes[]>([])
    const [studentId, setStudentId] = useState<string>("")
    const [isUpdate, setIsUpdate] = useState(false)
    const [searchText , setSearchText] = useState("")


    useEffect(()=>{
        getStudentsHandler()
    }, [])

    const closeHandler = () => {
        setVisible(false);
    };

    const onAddHandler = () => {
        setVisible(true)
        setName("")
        setfatherName("")
        setPhone("")
        setImageUrl("")
    }

    const getStudentsHandler = async () =>{
        try {
            const querySnapshot = await getDocs(collection(db, "students"));
            const studentsList:any[] = []
            querySnapshot.forEach((doc) =>{
               studentsList.push({
                no:doc.data().no,
                name:doc.data().name,
                fatherName:doc.data().fatherName,
                phone:doc.data().phone,
                image:doc.data().image,
                id:doc.id
               })
            })

            setStudents(studentsList)
        } catch (error) {
            console.log(error);
            
        }
    }

    const onFileChangeHandler = async (e:any) =>{
        const file = e.target.files[0];
        setImageUrl(file);

    }


    const onSubmitHandler = async () => {

        console.log("it is working");
        

        try {


            const storageRef = ref(storage, name);
    const snapshot = await uploadBytesResumable(storageRef, imageUrl);

    const downloadUrl = await getDownloadURL(snapshot.ref);

            let newStudents= {
                no: students.length + 1,
                name,
                fatherName,
                image: downloadUrl,
                phone,
            }
            const docRef = await addDoc(collection(db, "students"), newStudents)

            setStudents([...students, { ...newStudents, id: docRef.id }])
            onAddHandler()
            setName("")
            setfatherName("")
            setPhone("")
            setImageUrl("")
        } catch (error) {
            console.log(error);
            
        }finally{
            setVisible(false)
        }


    }

    const onDeleteHandler = async (item:studentTypes) => {

        try {
            const fileRef = ref(storage, item.name);
            await Promise.all([deleteObject(fileRef)]);
            await deleteDoc(doc(db, "students", item.id ));
            let filteredStudents = students.filter((student) => student.id !== item.id)
            setStudents(filteredStudents)
        } catch (error) {
            console.log(error);
            
        }
    
    }

    const onEditHandler = (item: studentTypes) => {
        setName(item.name)
        setfatherName(item.fatherName)
        setPhone(item.phone)
        setStudentId(item.id)
        setIsUpdate(true)
        setVisible(true)
    }

    const onUpdateHandler = async() => {

        try {
            await updateDoc(doc(db , "students" , studentId),{
                id: studentId,
                name: name,
                fatherName: fatherName,
                image: imageUrl,
                phone: phone
            })
        let newStudent = {
            no: studentId,
            name: name,
            fatherName: fatherName,
            image: imageUrl,
            phone: phone
        }

        let updatedStudent:any = students.map((student) => {
            if (student.id === studentId) {
                return newStudent
            } else {
                return student
            }
        })
        setStudents(updatedStudent)
      
        } catch (error) {
            console.log(error);
            
        }finally{
            setIsUpdate(false)
            setVisible(false)
        }
    }


    

    return {
        name,
        fatherName,
        imageUrl,
        phone,
        students,
        visible,
        isUpdate,
        searchText,
        setName,
        setfatherName,
        setImageUrl,
        setPhone,
        setVisible,
        setSearchText,
        closeHandler,
        onSubmitHandler,
        onAddHandler,
        onDeleteHandler,
        onEditHandler,
        onUpdateHandler,
        onFileChangeHandler,
    }
}

export default useStudents